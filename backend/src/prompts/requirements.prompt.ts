export interface RequirementsResult {
  tasks: string[];
  inputs: string[];
  outputs: string[];
  integrations: string[];
  permissions: string[];
  missingInformation: string[];
}

export const buildRequirementsPrompt = (
  userMessage: string,
  historySummary: string = '',
  currentRequirements?: RequirementsResult
): string => {
  return `You are a Senior Systems Architect extracting technical requirements for building an autonomous AI Agent.

Analyze the user's latest request along with previous context and extract structured system requirements.

${historySummary ? `CONVERSATION HISTORY:\n${historySummary}\n` : ''}
${currentRequirements ? `PREVIOUSLY EXTRACTED REQUIREMENTS:\n${JSON.stringify(currentRequirements, null, 2)}\n` : ''}

LATEST USER MESSAGE:
"${userMessage}"

Respond strictly with a JSON object matching this exact TypeScript structure:
{
  "tasks": ["Array of granular sub-tasks the agent must perform"],
  "inputs": ["Array of required input sources, payloads, or triggers (e.g., Scheduled CRON, Gmail Webhook, REST API)"],
  "outputs": ["Array of destination actions or target outputs (e.g., WhatsApp Message, Database Record, Email)"],
  "integrations": ["Array of external APIs, platforms, or services required (e.g., Gmail API, WhatsApp Cloud API, OpenAI, Google Sheets)"],
  "permissions": ["Array of necessary OAuth scopes or permission credentials needed"],
  "missingInformation": ["Array of specific ambiguous or unstated items required before the agent can be built (e.g., filter rules for important emails, phone number target, schedule frequency)"]
}

CRITICAL RULES:
1. Return ONLY valid JSON.
2. Merge any previously extracted requirements with new insights.
3. If an item is already clear from the conversation history, DO NOT list it under missingInformation.`;
};
