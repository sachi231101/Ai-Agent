import { Router } from 'express';
import { deploymentsController } from './deployments.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const deploymentsRoutes = Router();
const ctrl = new deploymentsController();

deploymentsRoutes.use(authenticate);

deploymentsRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
deploymentsRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
deploymentsRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
deploymentsRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
deploymentsRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
