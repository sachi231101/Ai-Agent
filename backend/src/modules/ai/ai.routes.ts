import { Router } from 'express';
import { aiController } from './ai.controller';
import { authenticate } from '@common/middleware/auth.middleware';

export const aiRoutes = Router();

aiRoutes.use(authenticate);

aiRoutes.post('/chat', (req, res, next) => aiController.chat(req, res, next));
aiRoutes.post('/stream', (req, res, next) => aiController.stream(req, res, next));
aiRoutes.get('/providers', (req, res, next) => aiController.getProviders(req, res, next));
aiRoutes.post('/agent/run', (req, res, next) => aiController.runAgent(req, res, next));
