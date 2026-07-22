import { Router } from 'express';
import { workflowsController } from './workflows.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const workflowsRoutes = Router();
const ctrl = new workflowsController();

workflowsRoutes.use(authenticate);

workflowsRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
workflowsRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
workflowsRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
workflowsRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
workflowsRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
