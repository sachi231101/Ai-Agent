import { Router } from 'express';
import { usersController } from './users.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const usersRoutes = Router();
const ctrl = new usersController();

usersRoutes.use(authenticate);

usersRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
usersRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
usersRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
usersRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
usersRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
