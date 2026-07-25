import geminiService from '../llm/gemini.service';
import { buildPlannerPrompt, PlanResult } from '../../prompts/planner.prompt';
import { IntentResult } from '../../prompts/intent.prompt';
import { RequirementsResult } from '../../prompts/requirements.prompt';
import logger from '../../config/logger';

export class PlannerService {
  async generatePlan(
    intent: IntentResult,
    requirements: RequirementsResult,
    conversationHistory: string
  ): Promise<PlanResult> {
    logger.info('Running Agent Planner Service...');

    const prompt = buildPlannerPrompt(intent, requirements, conversationHistory);
    const rawResult = await geminiService.generateJSON<Partial<PlanResult>>(prompt, {
      temperature: 0.2,
    });

    const result: PlanResult = {
      name: rawResult?.name || 'Custom AI Agent',
      description: rawResult?.description || 'Autonomous AI Solution Agent',
      capabilities: Array.isArray(rawResult?.capabilities) ? rawResult.capabilities : [],
      trigger: rawResult?.trigger || { type: 'SCHEDULED', detail: 'Manual or Scheduled Trigger' },
      memoryRequirements: rawResult?.memoryRequirements || {
        shortTerm: true,
        longTerm: false,
        vectorStoreNeeded: false,
        description: 'Standard conversation memory',
      },
      permissions: Array.isArray(rawResult?.permissions) ? rawResult.permissions : [],
      requiredIntegrations: Array.isArray(rawResult?.requiredIntegrations) ? rawResult.requiredIntegrations : [],
      schedule: rawResult?.schedule || null,
    };

    logger.info(`Generated Agent Plan: "${result.name}" with ${result.capabilities.length} capabilities.`);
    return result;
  }
}

export const plannerService = new PlannerService();
export default plannerService;
