import 'dotenv/config';
import http from 'http';
import app from './app';
import { appConfig } from '@config/app.config';
import { prisma } from '@database/prisma';
import { initSocket } from '@socket/index';
import { logger } from '@common/utils/logger';

const server = http.createServer(app);

// ─── Socket.IO ────────────────────────────────────────────────────────────────
initSocket(server);

// ─── Graceful Shutdown ────────────────────────────────────────────────────────
const shutdown = async (signal: string) => {
  logger.info(`${signal} received — shutting down gracefully`);
  server.close(async () => {
    await prisma.$disconnect();
    logger.info('Database disconnected');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

// ─── Start ────────────────────────────────────────────────────────────────────
const start = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected');

    server.listen(appConfig.port, () => {
      logger.info(`🚀 Server running on port ${appConfig.port} [${appConfig.env}]`);
      logger.info(`📡 API: http://localhost:${appConfig.port}${appConfig.apiPrefix}`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
