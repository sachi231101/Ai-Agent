import { Router } from 'express';
import { organizationsController } from './organizations.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const organizationsRoutes = Router();
const ctrl = new organizationsController();

organizationsRoutes.use(authenticate);

organizationsRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
organizationsRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
organizationsRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
organizationsRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
organizationsRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
