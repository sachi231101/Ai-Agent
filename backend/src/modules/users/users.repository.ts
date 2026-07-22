import { prisma } from '@database/prisma';

export class usersRepository {
  async findAll() {
    // TODO: implement findAll for users
    return [];
  }

  async findById(_id: string) {
    // TODO: implement findById for users
    return null;
  }

  async create(_data: Record<string, unknown>) {
    // TODO: implement create for users
    return null;
  }

  async update(_id: string, _data: Record<string, unknown>) {
    // TODO: implement update for users
    return null;
  }

  async remove(_id: string) {
    // TODO: implement remove for users
    return null;
  }
}
