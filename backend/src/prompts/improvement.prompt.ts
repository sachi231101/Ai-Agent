export interface ImprovementSuggestion {
  id: string;
  category: 'FEATURE' | 'RELIABILITY' | 'SECURITY' | 'ANALYTICS' | 'COST_SAVING';
  title: string;
  description: string;
  valueAdd: string;
}

export interface ImprovementResult {
  suggestions: ImprovementSuggestion[];
}

export const buildImprovementPrompt = (
  userMessage: string,
  historySummary: string,
  intent: any,
  requirements: any
): string => {
  return `You are a Senior Business Consultant and Innovation Architect enhancing an AI Agent design.

USER MESSAGE:
"${userMessage}"

CONVERSATION HISTORY:
${historySummary}

CURRENT INTENT & REQUIREMENTS:
${JSON.stringify({ intent, requirements }, null, 2)}

YOUR TASK:
Proactively recommend 2 to 3 smart, high-value improvements to elevate the user's original idea into a world-class enterprise AI Agent.

EXAMPLES OF SMART IMPROVEMENTS:
- Instead of "Read Gmail" -> Suggest "Filter promotional & spam emails before processing".
- Instead of "Send Message" -> Suggest "Store execution history & audit trail in database".
- Instead of "Run Execution" -> Suggest "Retry failed messages automatically with exponential backoff".
- Instead of "Send Daily Summary" -> Suggest "Generate weekly executive analytics reports".

Respond strictly with a JSON object matching this structure:
{
  "suggestions": [
    {
      "id": "imp-1",
      "category": "FEATURE" | "RELIABILITY" | "SECURITY" | "ANALYTICS" | "COST_SAVING",
      "title": "Short title (e.g. Filter Promotional Emails)",
      "description": "Explanation of what this improvement adds",
      "valueAdd": "Why this makes the agent significantly better"
    }
  ]
}

CRITICAL RULES:
1. Return ONLY the JSON object.
2. Provide 2 to 3 practical, high-value suggestions.`;
};
