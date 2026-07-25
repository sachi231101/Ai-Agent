import { Request, Response, NextFunction } from 'express';
import { ApiError } from './api.error';
import { logger } from '../config/logger';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let apiError: ApiError;

  if (err instanceof ApiError) {
    apiError = err;
  } else if (err && typeof err.statusCode === 'number') {
    apiError = new ApiError(err.message || 'Error', err.statusCode, err.errors || [], true);
  } else {
    const statusCode = err?.status || err?.statusCode || 500;
    const message = err?.message || 'Internal Server Error';
    apiError = new ApiError(message, statusCode, err?.errors || [], false);
  }

  const isProduction = process.env.NODE_ENV === 'production';

  logger.error(`[${apiError.statusCode}] ${apiError.message}`, {
    stack: apiError.stack,
    errors: apiError.errors,
  });

  res.status(apiError.statusCode).json({
    success: false,
    error: {
      message: apiError.message,
      statusCode: apiError.statusCode,
      ...(apiError.errors && apiError.errors.length > 0 && { details: apiError.errors }),
      ...(!isProduction && { stack: apiError.stack }),
    },
  });
};
