import geminiService from '../llm/gemini.service';
import { buildSpecificationPrompt, SpecificationResult } from '../../prompts/specification.prompt';
import { PlanResult } from '../../prompts/planner.prompt';
import { RequirementsResult } from '../../prompts/requirements.prompt';
import logger from '../../config/logger';

export class SpecificationService {
  async generateSpecification(
    plan: PlanResult,
    requirements: RequirementsResult
  ): Promise<SpecificationResult> {
    logger.info('Running Agent Specification Service...');

    const prompt = buildSpecificationPrompt(plan, requirements);
    const rawResult = await geminiService.generateJSON<Partial<SpecificationResult>>(prompt, {
      temperature: 0.1,
    });

    const result: SpecificationResult = {
      version: rawResult?.version || '1.0.0',
      metadata: {
        name: rawResult?.metadata?.name || plan.name || 'Custom AI Agent',
        description: rawResult?.metadata?.description || plan.description || 'Autonomous AI Agent',
        category: rawResult?.metadata?.category || 'Automation',
        author: rawResult?.metadata?.author || 'Vibe Agents AI Architect',
        businessObjective: rawResult?.metadata?.businessObjective || 'Automate repetitive workflows and improve efficiency',
      },
      trigger: rawResult?.trigger || {
        type: 'SCHEDULED',
        config: { schedule: '0 8 * * *', detail: 'Daily Trigger' },
      },
      memory: rawResult?.memory || {
        shortTerm: true,
        longTerm: true,
        vectorStoreNeeded: false,
        description: 'Deduplicate processed items across runs',
      },
      workflow: {
        steps: Array.isArray(rawResult?.workflow?.steps) ? rawResult.workflow.steps : [],
      },
      tools: Array.isArray(rawResult?.tools) ? rawResult.tools : [],
      permissions: Array.isArray(rawResult?.permissions) ? rawResult.permissions : (plan.permissions || []),
      environmentVariables: Array.isArray(rawResult?.environmentVariables) ? rawResult.environmentVariables : [],
      riskAnalysis: Array.isArray(rawResult?.riskAnalysis) ? rawResult.riskAnalysis : [
        { title: 'API Throttling', level: 'LOW', mitigation: 'Exponential backoff enabled' }
      ],
      estimatedMonthlyCost: rawResult?.estimatedMonthlyCost || {
        llmTokensUsd: 2.50,
        apiCallsUsd: 0.50,
        totalUsd: 3.00,
      },
      improvementSuggestions: Array.isArray(rawResult?.improvementSuggestions) ? rawResult.improvementSuggestions : [
        'Enable automated failure retry policies'
      ],
    };

    logger.info(
      `Generated Specification v${result.version} for "${result.metadata.name}" with ${result.workflow.steps.length} workflow steps.`
    );
    return result;
  }
}

export const specificationService = new SpecificationService();
export default specificationService;
