import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { UnauthorizedError } from '../errors/api.error';
import { JwtPayload } from '../common/types/auth.types';

export const authenticateJwt = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // In development fallback for testing if no token is provided
    if (env.isDev || process.env.ALLOW_ANONYMOUS_DEV === 'true') {
      req.user = {
        userId: '00000000-0000-0000-0000-000000000000',
        email: 'dev@vibeagents.ai',
        role: 'ADMIN',
      };
      return next();
    }
    return next(new UnauthorizedError('Missing or invalid Authorization header'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (_err) {
    // In development fallback if expired or invalid token is sent
    if (env.isDev || process.env.ALLOW_ANONYMOUS_DEV === 'true') {
      req.user = {
        userId: '00000000-0000-0000-0000-000000000000',
        email: 'dev@vibeagents.ai',
        role: 'ADMIN',
      };
      return next();
    }
    next(new UnauthorizedError('Invalid or expired access token'));
  }
};
