import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '@common/middleware/validate.middleware';
import { authenticate } from '@common/middleware/auth.middleware';
import { registerSchema, loginSchema, refreshTokenSchema } from './auth.validation';

export const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), (req, res, next) => authController.register(req, res, next));
authRoutes.post('/login', validate(loginSchema), (req, res, next) => authController.login(req, res, next));
authRoutes.post('/refresh', validate(refreshTokenSchema), (req, res, next) => authController.refresh(req, res, next));
authRoutes.post('/logout', authenticate, (req, res, next) => authController.logout(req, res, next));
authRoutes.get('/me', authenticate, (req, res, next) => authController.me(req, res, next));
