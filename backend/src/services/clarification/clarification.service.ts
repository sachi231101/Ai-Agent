import geminiService from '../llm/gemini.service';
import { buildClarificationPrompt, ClarificationResult } from '../../prompts/clarification.prompt';
import logger from '../../config/logger';

export class ClarificationService {
  async evaluateClarification(
    missingInformation: string[],
    previouslyAskedQuestions: string[],
    conversationHistory: string
  ): Promise<ClarificationResult> {
    logger.info('Running Clarification Service...');

    const safeMissing = Array.isArray(missingInformation) ? missingInformation : [];
    const safeAsked = Array.isArray(previouslyAskedQuestions) ? previouslyAskedQuestions : [];

    if (safeMissing.length === 0) {
      logger.info('No missing information identified. Skipping clarification question.');
      return {
        needsClarification: false,
        question: null,
        options: [],
        targetField: null,
        reasoning: 'All necessary requirements are present.',
      };
    }

    const prompt = buildClarificationPrompt(
      safeMissing,
      safeAsked,
      conversationHistory
    );

    const rawResult = await geminiService.generateJSON<Partial<ClarificationResult>>(prompt, {
      temperature: 0.2,
    });

    let options = Array.isArray(rawResult?.options) ? rawResult.options : [];
    const questionLower = (rawResult?.question || '').toLowerCase();
    const historyLower = (conversationHistory || '').toLowerCase();

    // Generate intelligent multiple choice options if LLM didn't supply them
    if (rawResult?.needsClarification && options.length === 0) {
      if (questionLower.includes('email') || historyLower.includes('email')) {
        options = ['my-email@company.com', 'admin@company.com', 'Specify Custom Email', 'Other'];
      } else if (questionLower.includes('channel') || questionLower.includes('notification') || questionLower.includes('send')) {
        options = ['WhatsApp', 'Email', 'Slack', 'Other'];
      } else if (questionLower.includes('time') || questionLower.includes('schedule') || questionLower.includes('when')) {
        options = ['Every morning at 8:00 AM', 'Every hour', 'On incoming trigger', 'Other'];
      } else {
        options = ['Default Configuration', 'Custom Settings', 'Other'];
      }
    }

    // Ensure "Other" is always present as the last option
    if (rawResult?.needsClarification && !options.some(opt => opt.toLowerCase().includes('other'))) {
      options.push('Other');
    }

    const result: ClarificationResult = {
      needsClarification: !!rawResult?.needsClarification,
      question: rawResult?.question || null,
      options,
      targetField: rawResult?.targetField || null,
      reasoning: rawResult?.reasoning || 'Evaluated clarification needs.',
    };

    if (result.needsClarification && result.question) {
      logger.info(`Clarification question generated for [${result.targetField}]: "${result.question}" with ${options.length} options.`);
    } else {
      logger.info('Clarification not needed according to AI evaluation.');
    }

    return result;
  }
}

export const clarificationService = new ClarificationService();
export default clarificationService;
