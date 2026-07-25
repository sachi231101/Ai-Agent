export interface IntentResult {
  primaryIntent: 'CREATE_AGENT' | 'MODIFY_AGENT' | 'ASK_QUESTION' | 'UNKNOWN';
  businessDomain: string;
  underlyingProblem: string;
  businessObjective: string;
  kpis: string[];
  goal: string;
  confidence: number;
}

export const buildIntentPrompt = (
  userMessage: string,
  historySummary: string = ''
): string => {
  return `You are a Senior Business Consultant analyzing a user's request to build an AI Agent.

USER MESSAGE:
"${userMessage}"

CONVERSATION HISTORY:
${historySummary}

YOUR TASK:
Analyze the user's input and identify:
1. Primary Intent (CREATE_AGENT, MODIFY_AGENT, ASK_QUESTION)
2. Business Domain (e.g. Email Automation, Sales Lead Gen, Customer Support, DevOps)
3. Underlying Problem (WHY the user needs this solution)
4. Business Objective (The core business goal, e.g., Save 10 hours/week, Improve response times)
5. KPIs (2-3 measurable outcomes, e.g., 99% reduction in email processing latency)
6. Goal (Clear summary of the user's requested solution)
7. Confidence Score (0.0 to 1.0)

Respond strictly with a JSON object matching this structure:
{
  "primaryIntent": "CREATE_AGENT" | "MODIFY_AGENT" | "ASK_QUESTION" | "UNKNOWN",
  "businessDomain": "string",
  "underlyingProblem": "string",
  "businessObjective": "string",
  "kpis": ["KPI 1", "KPI 2"],
  "goal": "string",
  "confidence": number
}

CRITICAL RULES:
1. Return ONLY the JSON object.`;
};
