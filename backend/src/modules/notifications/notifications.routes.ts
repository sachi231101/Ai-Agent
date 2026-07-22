import { Router } from 'express';
import { notificationsController } from './notifications.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const notificationsRoutes = Router();
const ctrl = new notificationsController();

notificationsRoutes.use(authenticate);

notificationsRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
notificationsRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
notificationsRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
notificationsRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
notificationsRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
