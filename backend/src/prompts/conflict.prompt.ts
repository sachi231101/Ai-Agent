export interface ConflictWarning {
  type: 'SECURITY' | 'AUTHENTICATION' | 'RATE_LIMIT' | 'SCHEDULE' | 'COST' | 'PRIVACY' | 'PERMISSION';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  mitigation: string;
}

export interface ConflictResult {
  hasConflicts: boolean;
  warnings: ConflictWarning[];
}

export const buildConflictPrompt = (
  userMessage: string,
  historySummary: string,
  requirements: any
): string => {
  return `You are a Senior Security Engineer and System Architect reviewing an AI Agent design for conflicts and risks.

USER MESSAGE:
"${userMessage}"

CONVERSATION HISTORY:
${historySummary}

CURRENT REQUIREMENTS & INTEGRATIONS:
${JSON.stringify(requirements, null, 2)}

YOUR TASK:
Analyze the proposed AI Agent design for:
1. Missing permissions or auth scopes (e.g. reading private emails requires OAuth2 read-only scopes).
2. Rate limits or API throttling risks (e.g. polling APIs too frequently).
3. Invalid schedule or execution combinations (e.g. real-time requirements mapped to monthly crons).
4. Security & Privacy risks (e.g. sending sensitive credentials over unencrypted channels).
5. Cost risks (e.g. unbounded LLM loops or high-frequency API polling).

Respond strictly with a JSON object matching this structure:
{
  "hasConflicts": boolean,
  "warnings": [
    {
      "type": "SECURITY" | "AUTHENTICATION" | "RATE_LIMIT" | "SCHEDULE" | "COST" | "PRIVACY" | "PERMISSION",
      "severity": "HIGH" | "MEDIUM" | "LOW",
      "title": "Short title of the warning",
      "description": "Detailed explanation of the risk",
      "mitigation": "Recommended action to resolve the conflict"
    }
  ]
}

CRITICAL RULES:
1. Return ONLY the JSON object.
2. If no conflicts or risks exist, return hasConflicts: false and an empty warnings array [].`;
};
