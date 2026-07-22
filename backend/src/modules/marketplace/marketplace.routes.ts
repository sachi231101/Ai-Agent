import { Router } from 'express';
import { marketplaceController } from './marketplace.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const marketplaceRoutes = Router();
const ctrl = new marketplaceController();

marketplaceRoutes.use(authenticate);

marketplaceRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
marketplaceRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
marketplaceRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
marketplaceRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
marketplaceRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
