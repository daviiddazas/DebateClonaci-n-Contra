import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '15mb' }));

  // Endpoint to compile motives and save permanently to disk
  app.post('/api/compile-motives', (req, res) => {
    try {
      const { motives } = req.body;
      if (!motives || !Array.isArray(motives) || motives.length === 0) {
        return res.status(400).json({ error: 'Formato de datos no válido o vacío' });
      }

      const filePath = path.resolve(process.cwd(), 'src/data/compiledMotives.json');
      fs.writeFileSync(filePath, JSON.stringify(motives, null, 2), 'utf-8');

      console.log(`[COMPILE] Successfully saved ${motives.length} motives to compiledMotives.json`);
      return res.json({ success: true, count: motives.length });
    } catch (err: any) {
      console.error('[COMPILE ERROR]', err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Serve static files in production or mount Vite middleware in development
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(process.cwd(), 'dist'))) {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Application server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
