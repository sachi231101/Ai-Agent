import { Request, Response, NextFunction } from 'express';
import { IntegrationService } from './integration.service';

const service = new IntegrationService();

export class IntegrationController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.findAll(req.user!.userId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.findById(req.params['id'] as string);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }

  async connect(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.connect(req.body, req.user!.userId);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  }

  async disconnect(req: Request, res: Response, next: NextFunction) {
    try {
      await service.disconnect(req.params['id'] as string);
      res.status(204).send();
    } catch (err) { next(err); }
  }
}
