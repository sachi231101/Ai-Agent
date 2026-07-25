import geminiService from '../llm/gemini.service';
import { buildRequirementsPrompt, RequirementsResult } from '../../prompts/requirements.prompt';
import logger from '../../config/logger';

export class RequirementService {
  async extractRequirements(
    userMessage: string,
    historySummary: string = '',
    previousRequirements?: RequirementsResult
  ): Promise<RequirementsResult> {
    logger.info('Running Requirement Extraction Service...');

    const prompt = buildRequirementsPrompt(userMessage, historySummary, previousRequirements);
    const rawResult = await geminiService.generateJSON<Partial<RequirementsResult>>(prompt, {
      temperature: 0.1,
    });

    const normalizedResult: RequirementsResult = {
      tasks: Array.isArray(rawResult?.tasks) ? rawResult.tasks : [],
      inputs: Array.isArray(rawResult?.inputs) ? rawResult.inputs : [],
      outputs: Array.isArray(rawResult?.outputs) ? rawResult.outputs : [],
      integrations: Array.isArray(rawResult?.integrations) ? rawResult.integrations : [],
      permissions: Array.isArray(rawResult?.permissions) ? rawResult.permissions : [],
      missingInformation: Array.isArray(rawResult?.missingInformation) ? rawResult.missingInformation : [],
    };

    logger.info(
      `Extracted ${normalizedResult.tasks.length} tasks, ${normalizedResult.integrations.length} integrations. Gaps: ${normalizedResult.missingInformation.length}`
    );

    return normalizedResult;
  }
}

export const requirementService = new RequirementService();
export default requirementService;
