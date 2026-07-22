import { Router } from 'express';
import { agentsController } from './agents.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const agentsRoutes = Router();
const ctrl = new agentsController();

agentsRoutes.use(authenticate);

agentsRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
agentsRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
agentsRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
agentsRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
agentsRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
