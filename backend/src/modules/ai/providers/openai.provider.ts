import OpenAI from 'openai';
import { aiConfig } from '@config/ai.config';

let client: OpenAI | null = null;

export const getOpenAIClient = (): OpenAI => {
  if (!client) {
    if (!aiConfig.openai.apiKey) throw new Error('OPENAI_API_KEY not set');
    client = new OpenAI({ apiKey: aiConfig.openai.apiKey });
  }
  return client;
};

export class OpenAIProvider {
  private client = getOpenAIClient();
  readonly model = aiConfig.openai.defaultModel;

  async chat(messages: OpenAI.Chat.ChatCompletionMessageParam[], options?: Partial<OpenAI.Chat.ChatCompletionCreateParamsNonStreaming>) {
    return this.client.chat.completions.create({
      model: this.model,
      messages,
      ...options,
    });
  }

  async stream(messages: OpenAI.Chat.ChatCompletionMessageParam[], options?: Partial<OpenAI.Chat.ChatCompletionCreateParamsNonStreaming>) {
    return this.client.chat.completions.create({
      model: this.model,
      messages,
      stream: true,
      ...options,
    });
  }
}
