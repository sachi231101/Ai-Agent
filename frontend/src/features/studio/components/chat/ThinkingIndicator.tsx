/**
 * ThinkingIndicator — Animated AI thinking bubble
 *
 * Shows a 3-dot bouncing animation with the current pipeline stage label
 * while the AI is processing. Used inside the chat conversation column.
 */
import { Loader2 } from 'lucide-react';

interface ThinkingIndicatorProps {
  stageLabel?: string;
}

export function ThinkingIndicator({ stageLabel = 'AI Architect is thinking...' }: ThinkingIndicatorProps) {
  return (
    <div className="flex gap-2.5 items-start animate-fade-in">
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden border border-violet-200 bg-violet-50 shrink-0 mt-0.5 flex items-center justify-center">
        <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />
      </div>

      {/* Thinking Bubble */}
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold text-violet-600">AI Architect</span>
        <div className="bg-white border border-violet-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-3 shadow-sm">
          {/* Bouncing dots */}
          <div className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="w-2 h-2 rounded-full bg-violet-500 animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <span
              className="w-2 h-2 rounded-full bg-violet-600 animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>
          <span className="text-[11.5px] text-violet-600 font-medium italic">{stageLabel}</span>
        </div>
      </div>
    </div>
  );
}
