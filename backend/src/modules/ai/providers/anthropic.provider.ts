import Anthropic from '@anthropic-ai/sdk';
import { aiConfig } from '@config/ai.config';

let client: Anthropic | null = null;

export const getAnthropicClient = (): Anthropic => {
  if (!client) {
    if (!aiConfig.anthropic.apiKey) throw new Error('ANTHROPIC_API_KEY not set');
    client = new Anthropic({ apiKey: aiConfig.anthropic.apiKey });
  }
  return client;
};

export class AnthropicProvider {
  private client = getAnthropicClient();
  readonly model = aiConfig.anthropic.defaultModel;

  async chat(messages: Anthropic.MessageParam[], systemPrompt?: string) {
    return this.client.messages.create({
      model: this.model,
      max_tokens: 8192,
      system: systemPrompt,
      messages,
    });
  }

  async stream(messages: Anthropic.MessageParam[], systemPrompt?: string) {
    return this.client.messages.stream({
      model: this.model,
      max_tokens: 8192,
      system: systemPrompt,
      messages,
    });
  }
}
