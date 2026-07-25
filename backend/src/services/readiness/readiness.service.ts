import logger from '../../config/logger';

export interface ReadinessBreakdown {
  businessUnderstanding: number;
  requirementCompleteness: number;
  securityReadiness: number;
  deploymentReadiness: number;
  integrationReadiness: number;
  conversationCompleteness: number;
  overall: number;
}

export class ReadinessService {
  calculateReadiness(
    intent: any,
    requirements: any,
    conflicts: any,
    spec: any,
    needsClarification: boolean
  ): ReadinessBreakdown {
    logger.info('Calculating Multi-Dimensional Agent Readiness Score...');

    // 1. Business Understanding (Has domain, goal, objective)
    let businessScore = 40;
    if (intent?.businessDomain) businessScore += 20;
    if (intent?.goal) businessScore += 20;
    if (intent?.businessObjective) businessScore += 20;

    // 2. Requirement Completeness (Tasks, inputs, outputs, gaps)
    const taskCount = (requirements?.tasks || []).length;
    const missingGaps = (requirements?.missingInformation || []).length;
    let reqScore = Math.min(100, taskCount * 25);
    if (missingGaps > 0) reqScore = Math.max(20, reqScore - missingGaps * 20);

    // 3. Security Readiness (Permissions, auth warnings)
    const hasWarnings = (conflicts?.warnings || []).length;
    let secScore = 90;
    if (hasWarnings > 0) secScore = Math.max(30, 90 - hasWarnings * 20);
    if ((requirements?.permissions || []).length > 0) secScore = Math.min(100, secScore + 10);

    // 4. Integration Readiness
    const intCount = (requirements?.integrations || []).length;
    let intScore = intCount > 0 ? 85 : 40;

    // 5. Deployment Readiness (Trigger, schedule, spec status)
    let depScore = spec ? 95 : 50;

    // 6. Conversation Completeness
    let convScore = needsClarification ? 60 : 100;

    // Overall Weighted Score
    const overall = Math.round(
      businessScore * 0.15 +
      reqScore * 0.25 +
      secScore * 0.15 +
      intScore * 0.15 +
      depScore * 0.15 +
      convScore * 0.15
    );

    const breakdown: ReadinessBreakdown = {
      businessUnderstanding: Math.min(100, businessScore),
      requirementCompleteness: Math.min(100, reqScore),
      securityReadiness: Math.min(100, secScore),
      deploymentReadiness: Math.min(100, depScore),
      integrationReadiness: Math.min(100, intScore),
      conversationCompleteness: Math.min(100, convScore),
      overall: Math.min(100, overall),
    };

    logger.info(`Overall Agent Readiness Score: ${breakdown.overall}%`);
    return breakdown;
  }
}

export const readinessService = new ReadinessService();
export default readinessService;
