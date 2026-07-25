import { Request, Response, NextFunction } from 'express';
import { AppError } from '@common/errors/app.error';
import { ApiError } from '@/errors/api.error';
import { logger } from '@common/utils/logger';
import env from '@config/env';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = (err as any).statusCode || (err as any).status;

  if (err instanceof AppError || err instanceof ApiError || (statusCode && statusCode >= 400 && statusCode < 600)) {
    const code = statusCode || 400;
    if (code >= 500) {
      logger.error('Server error:', err);
    } else {
      logger.warn(`Client error [${code}]: ${err.message}`);
    }
    res.status(code).json({
      success: false,
      message: err.message,
      ...(env.isDev && { stack: err.stack }),
    });
    return;
  }

  logger.error('Unhandled error:', err);

  res.status(500).json({
    success: false,
    message: env.isProd ? 'Internal Server Error' : err.message,
    ...(env.isDev && { stack: err.stack }),
  });
};
