import { GoogleGenerativeAI } from '@google/generative-ai';
import { aiConfig } from '@config/ai.config';

let client: GoogleGenerativeAI | null = null;

export const getGeminiClient = (): GoogleGenerativeAI => {
  if (!client) {
    if (!aiConfig.gemini.apiKey) throw new Error('GEMINI_API_KEY not set');
    client = new GoogleGenerativeAI(aiConfig.gemini.apiKey);
  }
  return client;
};

export class GeminiProvider {
  private client = getGeminiClient();
  readonly modelName = aiConfig.gemini.defaultModel;

  getModel() {
    return this.client.getGenerativeModel({ model: this.modelName });
  }

  async chat(prompt: string) {
    const model = this.getModel();
    return model.generateContent(prompt);
  }

  async stream(prompt: string) {
    const model = this.getModel();
    return model.generateContentStream(prompt);
  }
}
