export const logger = {
  info: (...args: unknown[]) => {
    if (import.meta.env.DEV) console.info('[INFO]', ...args);
  },
  warn: (...args: unknown[]) => {
    if (import.meta.env.DEV) console.warn('[WARN]', ...args);
  },
  error: (...args: unknown[]) => {
    console.error('[ERROR]', ...args);
  },
  debug: (...args: unknown[]) => {
    if (import.meta.env.DEV) console.debug('[DEBUG]', ...args);
  },
};
