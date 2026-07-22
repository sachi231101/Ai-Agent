import env from './env';

export const aiConfig = {
  openai: {
    apiKey: env.OPENAI_API_KEY,
    defaultModel: 'gpt-4o',
  },
  anthropic: {
    apiKey: env.ANTHROPIC_API_KEY,
    defaultModel: 'claude-3-5-sonnet-20241022',
  },
  gemini: {
    apiKey: env.GEMINI_API_KEY,
    defaultModel: 'gemini-2.0-flash',
  },
  defaultProvider: 'openai' as const,
};

export type AIProvider = 'openai' | 'anthropic' | 'gemini';
