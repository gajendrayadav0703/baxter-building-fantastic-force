import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { getDbStatusLabel } from './config/db.js';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(express.json({ limit: '10kb' }));

  app.get('/api/health', (_req, res) => {
    const dbStatus = getDbStatusLabel();
    const isHealthy = dbStatus === 'connected';

    res.status(isHealthy ? 200 : 503).json({
      success: isHealthy,
      service: 'baxter-nexus-api',
      status: isHealthy ? 'ok' : 'degraded',
      db: dbStatus,
      timestamp: new Date().toISOString(),
    });
  });

  app.use('/api/auth', authRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
