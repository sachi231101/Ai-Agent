import { ProviderFactory } from './providers/provider.factory';
import { aiConfig, AIProvider } from '@config/ai.config';

export class AIService {
  async chat(prompt: string, provider: AIProvider = aiConfig.defaultProvider) {
    const p = ProviderFactory.get(provider);

    if (provider === 'openai') {
      const openai = ProviderFactory.getOpenAI();
      const res = await openai.chat([{ role: 'user', content: prompt }]);
      return res.choices[0]?.message.content;
    }

    if (provider === 'anthropic') {
      const anthropic = ProviderFactory.getAnthropic();
      const res = await anthropic.chat([{ role: 'user', content: prompt }]);
      return res.content[0].type === 'text' ? res.content[0].text : '';
    }

    if (provider === 'gemini') {
      const gemini = ProviderFactory.getGemini();
      const res = await gemini.chat(prompt);
      return res.response.text();
    }

    throw new Error(`Provider ${provider} not supported`);
  }

  getAvailableProviders(): { provider: AIProvider; model: string; available: boolean }[] {
    return [
      { provider: 'openai', model: aiConfig.openai.defaultModel, available: !!aiConfig.openai.apiKey },
      { provider: 'anthropic', model: aiConfig.anthropic.defaultModel, available: !!aiConfig.anthropic.apiKey },
      { provider: 'gemini', model: aiConfig.gemini.defaultModel, available: !!aiConfig.gemini.apiKey },
    ];
  }
}

export const aiService = new AIService();
