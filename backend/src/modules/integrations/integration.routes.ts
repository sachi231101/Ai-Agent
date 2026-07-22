import { Router } from 'express';
import { IntegrationController } from './integration.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const integrationRoutes = Router();
const ctrl = new IntegrationController();

integrationRoutes.use(authenticate);
integrationRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
integrationRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
integrationRoutes.post('/connect', (req, res, next) => ctrl.connect(req, res, next));
integrationRoutes.delete('/:id/disconnect', (req, res, next) => ctrl.disconnect(req, res, next));
