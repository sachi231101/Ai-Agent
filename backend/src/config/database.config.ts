import env from './env';

export const databaseConfig = {
  url: env.DATABASE_URL,
  redis: {
    url: env.REDIS_URL,
  },
};
