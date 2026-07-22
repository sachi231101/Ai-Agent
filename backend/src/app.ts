import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { appConfig } from '@config/app.config';
import { router } from '@/routes';
import { errorHandler } from '@common/middleware/error.middleware';
import { notFound } from '@common/middleware/not-found.middleware';

const app: Application = express();

// ─── Security ────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: appConfig.corsOrigin, credentials: true }));
app.use(rateLimit({
  windowMs: appConfig.rateLimit.windowMs,
  max: appConfig.rateLimit.max,
  message: 'Too many requests, please try again later.',
}));

// ─── Parsing ──────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

// ─── Logging ──────────────────────────────────────────────────────────────────
if (appConfig.env !== 'test') {
  app.use(morgan('dev'));
}

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', env: appConfig.env, version: appConfig.version });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use(appConfig.apiPrefix, router);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
