import { AIProvider } from '@config/ai.config';
import { OpenAIProvider } from './openai.provider';
import { AnthropicProvider } from './anthropic.provider';
import { GeminiProvider } from './gemini.provider';

type AnyProvider = OpenAIProvider | AnthropicProvider | GeminiProvider;

const instances = new Map<AIProvider, AnyProvider>();

export class ProviderFactory {
  static get(provider: AIProvider): AnyProvider {
    if (!instances.has(provider)) {
      switch (provider) {
        case 'openai':
          instances.set(provider, new OpenAIProvider());
          break;
        case 'anthropic':
          instances.set(provider, new AnthropicProvider());
          break;
        case 'gemini':
          instances.set(provider, new GeminiProvider());
          break;
        default:
          throw new Error(`Unknown AI provider: ${provider}`);
      }
    }
    return instances.get(provider)!;
  }

  static getOpenAI(): OpenAIProvider {
    return this.get('openai') as OpenAIProvider;
  }

  static getAnthropic(): AnthropicProvider {
    return this.get('anthropic') as AnthropicProvider;
  }

  static getGemini(): GeminiProvider {
    return this.get('gemini') as GeminiProvider;
  }
}
