import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '@config/auth.config';
import { UnauthorizedError, ForbiddenError } from '@common/errors/app.error';
import { JwtPayload } from '@common/types/auth.types';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.accessToken;

  if (!token) {
    return next(new UnauthorizedError('Access token required'));
  }

  try {
    const payload = jwt.verify(token, authConfig.jwt.secret) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired token'));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError());
    }
    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }
    next();
  };
};
