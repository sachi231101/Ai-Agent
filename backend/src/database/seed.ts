import { prisma } from './prisma';
import { logger } from '@common/utils/logger';
import bcrypt from 'bcrypt';
import { authConfig } from '@config/auth.config';

async function main() {
  logger.info('🌱 Seeding database...');

  const hashedPassword = await bcrypt.hash('Admin@123', authConfig.bcrypt.saltRounds);

  // Create super admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aiagent.com' },
    update: {},
    create: {
      email: 'admin@aiagent.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  logger.info(`✅ Admin user: ${admin.email}`);
  logger.info('✅ Seeding complete');
}

main()
  .catch((e) => {
    logger.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
