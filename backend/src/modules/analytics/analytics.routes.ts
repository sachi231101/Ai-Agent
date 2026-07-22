import { Router } from 'express';
import { analyticsController } from './analytics.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const analyticsRoutes = Router();
const ctrl = new analyticsController();

analyticsRoutes.use(authenticate);

analyticsRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
analyticsRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
analyticsRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
analyticsRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
analyticsRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
