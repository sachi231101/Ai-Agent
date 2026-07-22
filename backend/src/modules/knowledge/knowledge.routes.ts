import { Router } from 'express';
import { knowledgeController } from './knowledge.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const knowledgeRoutes = Router();
const ctrl = new knowledgeController();

knowledgeRoutes.use(authenticate);

knowledgeRoutes.get('/', (req, res, next) => ctrl.getAll(req, res, next));
knowledgeRoutes.get('/:id', (req, res, next) => ctrl.getById(req, res, next));
knowledgeRoutes.post('/', (req, res, next) => ctrl.create(req, res, next));
knowledgeRoutes.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
knowledgeRoutes.delete('/:id', (req, res, next) => ctrl.remove(req, res, next));
