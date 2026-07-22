import { Router } from 'express';
import { billingController } from './billing.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const billingRoutes = Router();
const ctrl = new billingController();

billingRoutes.use(authenticate);

billingRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
billingRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
billingRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
billingRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
billingRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
