import React, { useState, useEffect, useCallback } from 'react';

const STORAGE_PREFIX = 'mm_img_v3_';
const PERMANENT_BACKUP_KEY = 'mm_permanent_photos_backup_v3';

// In-memory cache for fast lookup
const memoryCache: Record<string, string> = {};

export function getStoredImage(key: string, defaultSrc: string): string {
  if (memoryCache[key]) return memoryCache[key];
  if (typeof window === 'undefined') return defaultSrc;
  try {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (saved) {
      memoryCache[key] = saved;
      return saved;
    }
    // Check backup key
    const backupStr = localStorage.getItem(PERMANENT_BACKUP_KEY);
    if (backupStr) {
      const backup = JSON.parse(backupStr);
      if (backup && backup[key]) {
        memoryCache[key] = backup[key];
        return backup[key];
      }
    }
    return defaultSrc;
  } catch {
    return defaultSrc;
  }
}

export function saveStoredImage(key: string, dataUrl: string): void {
  memoryCache[key] = dataUrl;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, dataUrl);
    // Also save to consolidated permanent backup
    const backupStr = localStorage.getItem(PERMANENT_BACKUP_KEY);
    const backup = backupStr ? JSON.parse(backupStr) : {};
    backup[key] = dataUrl;
    localStorage.setItem(PERMANENT_BACKUP_KEY, JSON.stringify(backup));
  } catch (err) {
    console.warn(`Could not save image to localStorage for key ${key}:`, err);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mm_image_change', { detail: { key, src: dataUrl } }));
  }
}

export function resetStoredImage(key: string): void {
  delete memoryCache[key];
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    const backupStr = localStorage.getItem(PERMANENT_BACKUP_KEY);
    if (backupStr) {
      const backup = JSON.parse(backupStr);
      delete backup[key];
      localStorage.setItem(PERMANENT_BACKUP_KEY, JSON.stringify(backup));
    }
  } catch (err) {
    console.warn(`Could not remove image from localStorage for key ${key}:`, err);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mm_image_change', { detail: { key, src: null } }));
  }
}

let hasTriggeredSync = false;

// Helper to compress image before storing to avoid localStorage quota issues
export function compressImageFile(file: File, maxWidth = 2400, quality = 0.92): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Prefer jpeg for photos unless png with transparency
          const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const dataUrl = canvas.toDataURL(mimeType, quality);
          resolve(dataUrl);
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

// Automatically synchronize local stored images with permanent backend storage
export async function syncStoredPhotos(): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    // 1. Fetch saved photos from server first
    const res = await fetch(`/saved_photos.json?t=${Date.now()}`).catch(() => null);
    if (res && res.ok) {
      const serverPhotos = await res.json().catch(() => ({}));
      if (serverPhotos && typeof serverPhotos === 'object' && Object.keys(serverPhotos).length > 0) {
        let hasNew = false;
        for (const [k, v] of Object.entries(serverPhotos)) {
          if (typeof v === 'string' && v.length > 0) {
            const existingLocal = localStorage.getItem(`${STORAGE_PREFIX}${k}`);
            if (!existingLocal) {
              memoryCache[k] = v;
              try {
                localStorage.setItem(`${STORAGE_PREFIX}${k}`, v);
              } catch {}
              hasNew = true;
            } else {
              memoryCache[k] = existingLocal;
            }
          }
        }
        if (hasNew) {
          window.dispatchEvent(new CustomEvent('mm_images_synced'));
        }
      }
    }

    // 2. Also ensure all local storage items are safely backed up to the server
    const localPhotos: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        const val = localStorage.getItem(key);
        if (val) {
          const cleanKey = key.replace(STORAGE_PREFIX, '');
          localPhotos[cleanKey] = val;
          memoryCache[cleanKey] = val;
        }
      }
    }

    if (Object.keys(localPhotos).length > 0) {
      await fetch('/api/save-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localPhotos)
      }).catch(() => {});
    }
  } catch (err) {
    console.debug('Photo sync completed:', err);
  }
}

// Kick off sync in browser once on startup (no periodic loop overwriting user changes)
if (typeof window !== 'undefined') {
  syncStoredPhotos();
}

export function useStoredImage(key: string, defaultSrc: string): [string, (file: File) => Promise<void>, () => void, boolean] {
  const [src, setSrc] = useState<string>(() => getStoredImage(key, defaultSrc));
  const [isCustom, setIsCustom] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !!localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === `${STORAGE_PREFIX}${key}`) {
        const newSrc = e.newValue || defaultSrc;
        setSrc(newSrc);
        memoryCache[key] = newSrc;
        setIsCustom(!!e.newValue);
      }
    };

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; src: string | null }>;
      if (customEvent.detail && customEvent.detail.key === key) {
        const newSrc = customEvent.detail.src || defaultSrc;
        setSrc(newSrc);
        memoryCache[key] = newSrc;
        setIsCustom(!!customEvent.detail.src);
      }
    };

    const handleSync = () => {
      const stored = getStoredImage(key, defaultSrc);
      setSrc(stored);
      setIsCustom(stored !== defaultSrc);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('mm_image_change', handleCustomChange);
    window.addEventListener('mm_images_synced', handleSync);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('mm_image_change', handleCustomChange);
      window.removeEventListener('mm_images_synced', handleSync);
    };
  }, [key, defaultSrc]);

  const updateWithFile = useCallback(
    async (file: File): Promise<void> => {
      if (!file.type.startsWith('image/')) return;
      try {
        const dataUrl = await compressImageFile(file);
        if (dataUrl) {
          setSrc(dataUrl);
          setIsCustom(true);
          const isBath = /bath|pouch/i.test(key) && !key.includes('ritual');
          const related = isBath ? ['prod_herbal-bath-pouches', 'product_organic-herbal-bath-pouches', 'herbal_bath_pouch'] : [key];
          for (const k of related) {
            saveStoredImage(k, dataUrl);
            fetch('/api/upload-single-photo', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ key: k, dataUrl })
            }).catch(() => {});
          }
        }
      } catch (err) {
        console.error('Failed to update image:', err);
      }
    },
    [key]
  );

  const reset = useCallback(() => {
    resetStoredImage(key);
    setSrc(defaultSrc);
    setIsCustom(false);
  }, [key, defaultSrc]);

  return [src, updateWithFile, reset, isCustom];
}
