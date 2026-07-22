import { deploymentsRepository } from './deployments.repository';

const repo = new deploymentsRepository();

export class deploymentsService {
  async findAll(_userId: string) {
    return repo.findAll();
  }

  async findById(id: string, _userId: string) {
    return repo.findById(id);
  }

  async create(data: unknown, _userId: string) {
    return repo.create(data as Record<string, unknown>);
  }

  async update(id: string, data: unknown, _userId: string) {
    return repo.update(id, data as Record<string, unknown>);
  }

  async remove(id: string, _userId: string) {
    return repo.remove(id);
  }
}
