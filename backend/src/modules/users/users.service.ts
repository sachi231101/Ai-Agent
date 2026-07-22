import { usersRepository } from './users.repository';

const repo = new usersRepository();

export class usersService {
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
