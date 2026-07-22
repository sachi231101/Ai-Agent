import { Request, Response, NextFunction } from 'express';
import { organizationsService } from './organizations.service';

const service = new organizationsService();

export class organizationsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.findAll(req.user!.userId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.findById((req.params['id'] as string), req.user!.userId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.create(req.body, req.user!.userId);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.update((req.params['id'] as string), req.body, req.user!.userId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await service.remove((req.params['id'] as string), req.user!.userId);
      res.status(204).send();
    } catch (err) { next(err); }
  }
}

