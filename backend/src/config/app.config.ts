import env from './env';

export const appConfig = {
  name: 'AI Agent Platform',
  version: '1.0.0',
  env: env.NODE_ENV,
  port: env.PORT,
  apiVersion: env.API_VERSION,
  apiPrefix: `/api/${env.API_VERSION}`,
  corsOrigin: env.CORS_ORIGIN,
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX_REQUESTS,
  },
  upload: {
    dir: env.UPLOAD_DIR,
    maxFileSize: env.MAX_FILE_SIZE,
  },
};
