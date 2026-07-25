import geminiService from '../llm/gemini.service';
import { buildImprovementPrompt, ImprovementResult, ImprovementSuggestion } from '../../prompts/improvement.prompt';
import logger from '../../config/logger';

export class ImprovementService {
  async generateImprovements(
    userMessage: string,
    historySummary: string,
    intent: any,
    requirements: any
  ): Promise<ImprovementResult> {
    logger.info('Running Proactive Improvement Engine...');

    const prompt = buildImprovementPrompt(userMessage, historySummary, intent, requirements);
    const rawResult = await geminiService.generateJSON<Partial<ImprovementResult>>(prompt, {
      temperature: 0.2,
    });

    const suggestions: ImprovementSuggestion[] = Array.isArray(rawResult?.suggestions) ? rawResult.suggestions : [];

    // Fallback proactive improvements if LLM didn't return any
    if (suggestions.length === 0) {
      suggestions.push(
        {
          id: 'imp-1',
          category: 'RELIABILITY',
          title: 'Automated Retry on Failure',
          description: 'Enable exponential backoff retry for failed API requests.',
          valueAdd: 'Prevents transient network glitches from breaking executions.',
        },
        {
          id: 'imp-2',
          category: 'ANALYTICS',
          title: 'Weekly Summary Digest',
          description: 'Generate weekly metrics digest to track automated work.',
          valueAdd: 'Provides clear executive visibility into agent performance.',
        }
      );
    }

    logger.info(`Generated ${suggestions.length} proactive improvement suggestions.`);
    return { suggestions };
  }
}

export const improvementService = new ImprovementService();
export default improvementService;
