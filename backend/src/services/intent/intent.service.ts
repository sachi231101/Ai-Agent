import geminiService from '../llm/gemini.service';
import { buildIntentPrompt, IntentResult } from '../../prompts/intent.prompt';
import logger from '../../config/logger';

export class IntentService {
  async detectIntent(userMessage: string, contextHistory: string = ''): Promise<IntentResult> {
    logger.info('Running Intent Detection Service...');
    
    const prompt = buildIntentPrompt(userMessage, contextHistory);
    const result = await geminiService.generateJSON<IntentResult>(prompt, {
      temperature: 0.1,
    });

    logger.info(`Intent Detected: ${result.primaryIntent} (Domain: ${result.businessDomain}, Confidence: ${result.confidence})`);
    return result;
  }
}

export const intentService = new IntentService();
export default intentService;
