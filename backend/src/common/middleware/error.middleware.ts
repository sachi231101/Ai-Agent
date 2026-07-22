import { Request, Response, NextFunction } from 'express';
import { AppError } from '@common/errors/app.error';
import { logger } from '@common/utils/logger';
import env from '@config/env';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
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
