import geminiService from '../llm/gemini.service';
import { buildConflictPrompt, ConflictResult, ConflictWarning } from '../../prompts/conflict.prompt';
import logger from '../../config/logger';

export class ConflictService {
  async evaluateConflicts(
    userMessage: string,
    historySummary: string,
    requirements: any
  ): Promise<ConflictResult> {
    logger.info('Running Conflict & Risk Detection Service...');

    const prompt = buildConflictPrompt(userMessage, historySummary, requirements);
    const rawResult = await geminiService.generateJSON<Partial<ConflictResult>>(prompt, {
      temperature: 0.1,
    });

    const warnings: ConflictWarning[] = Array.isArray(rawResult?.warnings) ? rawResult.warnings : [];

    const result: ConflictResult = {
      hasConflicts: warnings.length > 0,
      warnings,
    };

    if (result.hasConflicts) {
      logger.info(`Detected ${warnings.length} conflict/risk warnings.`);
    }

    return result;
  }
}

export const conflictService = new ConflictService();
export default conflictService;
