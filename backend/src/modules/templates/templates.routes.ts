import { Router } from 'express';
import { templatesController } from './templates.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const templatesRoutes = Router();
const ctrl = new templatesController();

templatesRoutes.use(authenticate);

templatesRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
templatesRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
templatesRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
templatesRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
templatesRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
