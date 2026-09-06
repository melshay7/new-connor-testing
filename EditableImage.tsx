import React from 'react';
import { useStoredImage } from '../utils/imageStore';

export interface EditableImageProps {
  storageKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  showControls?: boolean;
  buttonLabel?: string;
  compactButton?: boolean;
  buttonPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  children?: React.ReactNode;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  alsoUpdatesKeys?: string[];
}

export const EditableImage: React.FC<EditableImageProps> = ({
  storageKey,
  defaultSrc,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden',
  children,
  imgProps,
}) => {
  const [currentSrc] = useStoredImage(storageKey, defaultSrc);

  return (
    <div className={`${containerClassName} transition-all`}>
      <img
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        className={className}
        {...imgProps}
      />

      {/* Additional Overlay Content (Gradients, Badges, etc.) */}
      {children}
    </div>
  );
};


