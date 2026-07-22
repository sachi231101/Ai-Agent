import { Router } from 'express';
import { blueprintController } from './blueprint.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const blueprintRoutes = Router();
const ctrl = new blueprintController();

blueprintRoutes.use(authenticate);

blueprintRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
blueprintRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
blueprintRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
blueprintRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
blueprintRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
