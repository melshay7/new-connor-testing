import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'save-photos-plugin',
        configureServer(server) {
          server.middlewares.use('/api/send-order-notification', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body || '{}');
                  console.log('🌸 NEW ORDER NOTIFICATION FOR milkandmarigoldorganic@gmail.com:\n', JSON.stringify(data, null, 2));
                  const ordersFile = path.resolve(process.cwd(), 'public/orders_log.json');
                  let ordersList = [];
                  try {
                    if (fs.existsSync(ordersFile)) {
                      ordersList = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
                    }
                  } catch {
                    ordersList = [];
                  }
                  ordersList.push({
                    receivedAt: new Date().toISOString(),
                    targetEmail: 'milkandmarigoldorganic@gmail.com',
                    ...data
                  });
                  fs.writeFileSync(ordersFile, JSON.stringify(ordersList, null, 2), 'utf-8');
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, message: 'Order notification recorded for milkandmarigoldorganic@gmail.com' }));
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: String(err) }));
                }
              });
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });

          server.middlewares.use('/api/upload-single-photo', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', () => {
                try {
                  const { key, dataUrl } = JSON.parse(body || '{}');
                  if (!key || !dataUrl) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'Missing key or dataUrl' }));
                    return;
                  }
                  const filePath = path.resolve(process.cwd(), 'public/saved_photos.json');
                  let existing: Record<string, string> = {};
                  try {
                    if (fs.existsSync(filePath)) {
                      existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    }
                  } catch {
                    existing = {};
                  }
                  existing[key] = dataUrl;

                  const isRitualBath = key === 'guide_bath_ritual';
                  const isBathKey = !isRitualBath && /bath|pouch/i.test(key);
                  const bathKeys = ['prod_herbal-bath-pouches', 'guide_bath', 'product_organic-herbal-bath-pouches', 'herbal_bath_pouch'];
                  if (isBathKey) {
                    for (const bk of bathKeys) {
                      existing[bk] = dataUrl;
                    }
                  }

                  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');

                  // Also save image directly to public/uploads/ and src/assets/images
                  try {
                    const uploadsDir = path.resolve(process.cwd(), 'public/uploads');
                    if (!fs.existsSync(uploadsDir)) {
                      fs.mkdirSync(uploadsDir, { recursive: true });
                    }
                    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
                    const ext = dataUrl.startsWith('data:image/png') ? 'png' : 'jpg';
                    const diskFileName = `${key}.${ext}`;
                    const imgBuffer = Buffer.from(base64Data, 'base64');
                    fs.writeFileSync(path.join(uploadsDir, diskFileName), imgBuffer);

                    if (isRitualBath) {
                      const srcImgPath = path.resolve(process.cwd(), 'src/assets/images/madison_swann_bath_77.jpg');
                      fs.writeFileSync(srcImgPath, imgBuffer);
                    }

                    if (isBathKey) {
                      for (const bk of bathKeys) {
                        fs.writeFileSync(path.join(uploadsDir, `${bk}.${ext}`), imgBuffer);
                      }
                      const srcImgPath = path.resolve(process.cwd(), 'src/assets/images/madison_swann_herbal_bath_83.jpg');
                      fs.writeFileSync(srcImgPath, imgBuffer);
                    }
                  } catch (e) {
                    console.error('Could not save upload to disk:', e);
                  }

                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, key }));
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: String(err) }));
                }
              });
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });

          server.middlewares.use('/api/save-photos', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body || '{}');
                  const filePath = path.resolve(process.cwd(), 'public/saved_photos.json');
                  let existing = {};
                  try {
                    if (fs.existsSync(filePath)) {
                      existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    }
                  } catch {
                    existing = {};
                  }
                  const merged = { ...existing, ...data };
                  fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf-8');
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, count: Object.keys(merged).length }));
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: String(err) }));
                }
              });
            } else if (req.method === 'GET') {
              const filePath = path.resolve(process.cwd(), 'public/saved_photos.json');
              try {
                if (fs.existsSync(filePath)) {
                  const content = fs.readFileSync(filePath, 'utf-8');
                  res.setHeader('Content-Type', 'application/json');
                  res.end(content);
                  return;
                }
              } catch {}
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({}));
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });

          server.middlewares.use('/api/check-user-uploaded-images', (req, res) => {
            try {
              const searchDirs = [
                path.resolve(process.cwd(), 'src/assets/images'),
                path.resolve(process.cwd(), 'public'),
                process.cwd()
              ];
              let foundFile = '';
              for (const dir of searchDirs) {
                if (!fs.existsSync(dir)) continue;
                const files = fs.readdirSync(dir);
                const target = files.find(f => /77|websize/i.test(f) && /\.(jpg|jpeg|png)$/i.test(f));
                if (target) {
                  foundFile = path.join(dir, target);
                  break;
                }
              }

              if (foundFile) {
                const imgBuf = fs.readFileSync(foundFile);
                const ext = path.extname(foundFile).replace('.', '').toLowerCase();
                const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
                const dataUrl = `data:${mimeType};base64,${imgBuf.toString('base64')}`;
                
                const filePath = path.resolve(process.cwd(), 'public/saved_photos.json');
                let existing: Record<string, string> = {};
                try {
                  if (fs.existsSync(filePath)) {
                    existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                  }
                } catch {
                  existing = {};
                }
                existing['guide_bath_ritual'] = dataUrl;
                fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ found: true, key: 'guide_bath_ritual', path: foundFile }));
                return;
              }
            } catch (err) {
              console.error('Error checking user images:', err);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ found: false }));
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
