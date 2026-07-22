import { prisma } from '@database/prisma';

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: { name: string; email: string; password: string; role?: string }) {
    return prisma.user.create({ data });
  }

  async updateRefreshToken(userId: string, token: string | null) {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshToken: token },
    });
  }
}

export const authRepository = new AuthRepository();
