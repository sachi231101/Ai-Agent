import { ApiError } from '../errors/api.error';

/**
 * Safely extracts and parses JSON string returned by LLM, handling markdown wrappers & surrounding prose.
 */
export function parseCleanJson<T>(rawText: string): T {
  if (!rawText) {
    throw new ApiError('Received empty response from LLM', 500);
  }

  let cleaned = rawText.trim();

  // Strip markdown code fences if present
  if (cleaned.includes('```')) {
    cleaned = cleaned.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
  }

  // Extract JSON object from first '{' to last '}'
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(cleaned) as T;
  } catch (err: any) {
    throw new ApiError(`Failed to parse structured JSON from LLM: ${err.message}. Raw text: ${rawText}`, 500);
  }
}
