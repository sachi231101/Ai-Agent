export interface ClarificationResult {
  needsClarification: boolean;
  question: string | null;
  options?: string[];
  targetField: string | null;
  reasoning: string;
}

export const buildClarificationPrompt = (
  missingInformation: string[],
  previouslyAskedQuestions: string[],
  conversationHistory: string
): string => {
  return `You are a helpful, professional AI Solutions Architect interviewing a user to design their AI Agent.

MISSING INFORMATION IDENTIFIED:
${JSON.stringify(missingInformation, null, 2)}

PREVIOUSLY ASKED QUESTIONS (DO NOT REPEAT ANY OF THESE):
${JSON.stringify(previouslyAskedQuestions, null, 2)}

CONVERSATION HISTORY:
${conversationHistory}

YOUR TASK:
Determine if clarification is required. If missingInformation contains critical gaps that have NOT been answered yet:
1. Select ONLY the SINGLE MOST CRITICAL missing detail.
2. Formulate ONE clear, friendly, direct multiple-choice question to ask the user.
3. Provide 3 to 4 concise multiple-choice options for quick selection, ALWAYS including "Other" as the last option.
4. NEVER ask multiple questions at once.
5. NEVER repeat a previously asked question or ask about information already provided in the history.

Respond strictly with a JSON object matching this structure:
{
  "needsClarification": boolean (true if a question must be asked, false if requirements are sufficient),
  "question": string or null (The single, concise multiple-choice question to ask the user),
  "options": string[] or null (3 to 4 concise option choices, ending with "Other"),
  "targetField": string or null (The requirement field or topic this question resolves),
  "reasoning": string (Short architectural reason why this question is highest priority)
}

CRITICAL RULES:
1. Return ONLY the JSON object.
2. If all critical info is present or previously asked, set needsClarification to false, question to null, and options to null.`;
};
