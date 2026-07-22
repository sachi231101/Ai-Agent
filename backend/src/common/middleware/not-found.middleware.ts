import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '@common/errors/app.error';

export const notFound = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new NotFoundError(`Route ${_req.originalUrl} not found`));
};
