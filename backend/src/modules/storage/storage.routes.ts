import { Router } from 'express';
import { storageController } from './storage.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const storageRoutes = Router();
const ctrl = new storageController();

storageRoutes.use(authenticate);

storageRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
storageRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
storageRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
storageRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
storageRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
