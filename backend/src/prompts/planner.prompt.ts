import { RequirementsResult } from './requirements.prompt';
import { IntentResult } from './intent.prompt';

export interface PlanResult {
  name: string;
  description: string;
  capabilities: string[];
  trigger: {
    type: 'SCHEDULED' | 'EVENT' | 'WEBHOOK' | 'MANUAL';
    detail: string;
  };
  memoryRequirements: {
    shortTerm: boolean;
    longTerm: boolean;
    vectorStoreNeeded: boolean;
    description: string;
  };
  permissions: string[];
  requiredIntegrations: Array<{
    name: string;
    authType: string;
    purpose: string;
  }>;
  schedule: string | null;
}

export const buildPlannerPrompt = (
  intent: IntentResult,
  requirements: RequirementsResult,
  conversationHistory: string
): string => {
  return `You are a Principal AI Agent Architect synthesizing an architectural plan for a custom AI Agent.

INTENT DETAILS:
${JSON.stringify(intent, null, 2)}

EXTRACTED REQUIREMENTS:
${JSON.stringify(requirements, null, 2)}

FULL CONVERSATION HISTORY:
${conversationHistory}

YOUR TASK:
Synthesize a comprehensive architectural plan for the AI Agent.

Respond strictly with a JSON object matching this structure:
{
  "name": "Catchy, professional name for the AI Agent (e.g. Gmail to WhatsApp Alert Assistant)",
  "description": "2-3 sentence executive description of what the agent does and its business value",
  "capabilities": ["Array of discrete autonomous capabilities (e.g., Read unread emails, Filter by urgency score, Format WhatsApp payload, Send SMS alert)"],
  "trigger": {
    "type": "SCHEDULED" | "EVENT" | "WEBHOOK" | "MANUAL",
    "detail": "Description of what triggers this agent to run"
  },
  "memoryRequirements": {
    "shortTerm": true/false,
    "longTerm": true/false,
    "vectorStoreNeeded": true/false,
    "description": "Explanation of memory strategy"
  },
  "permissions": ["List of OAuth scopes or system permissions needed"],
  "requiredIntegrations": [
    {
      "name": "Integration Name (e.g., Gmail API)",
      "authType": "OAuth2 / API Key",
      "purpose": "Why this integration is used"
    }
  ],
  "schedule": "Cron expression or human readable schedule (e.g. '0 8 * * *' or 'Every morning at 8:00 AM') or null if not scheduled"
}

CRITICAL RULES:
1. Return ONLY the JSON object.
2. Ensure name and capabilities are specific and directly align with the user's intent.`;
};
