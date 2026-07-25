import { useState, useEffect, useRef } from "react";
import {
  HelpCircle,
  Check,
  Send,
  Sparkles,
  Lock,
  MoreHorizontal,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useStudioEngine } from "../hooks/useStudioEngine";
import { AiMessage } from "./chat/AiMessage";
import { ThinkingIndicator } from "./chat/ThinkingIndicator";
import { SpecificationView } from "./SpecificationView";

// ─── Props ────────────────────────────────────────────────────────────────────

interface StudioCanvasProps {
  onBack?: () => void;
  onNextToReview?: () => void;
  agentName?: string;
  initialPrompt?: string;
}

// ─── Pipeline steps shown in Col-2 ───────────────────────────────────────────
// Keys match real backend stage names from useStudioEngine / PIPELINE_STAGE_STEP

const PIPELINE_STEPS = [
  {
    id: 1,
    stageKey: "INTENT_DETECTION",
    title: "Understanding your idea",
    subtitle: "Goal identified",
  },
  {
    id: 2,
    stageKey: "REQUIREMENT_GATHERING",
    title: "Identifying requirements",
    subtitle: "Extracted key requirements",
  },
  {
    id: 3,
    stageKey: "CLARIFICATION",
    title: "Asking missing questions",
    subtitle: "Getting important details",
  },
  {
    id: 4,
    stageKey: "PLANNING",
    title: "Designing your agent",
    subtitle: "Creating capabilities & flow",
  },
  {
    id: 5,
    stageKey: "SPECIFICATION_GENERATED",
    title: "Agent ready!",
    subtitle: "Specification complete",
  },
];

/** Map the current backend stage string to a 1-based step number. */
function getStepNumber(stage: string): number {
  const order: Record<string, number> = {
    INTENT_DETECTION: 1,
    REQUIREMENT_GATHERING: 2,
    CLARIFICATION: 3,
    PLANNING: 4,
    SPECIFICATION_GENERATED: 5,
    ERROR: 1,
  };
  return order[stage] ?? 1;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StudioCanvas({
  onBack,
  onNextToReview,
  agentName: propAgentName = "Custom AI Agent",
  initialPrompt,
}: StudioCanvasProps) {
  // ─── Engine hook — single source of truth ───────────────────────────────────
  const {
    messages: engineMessages,
    isProcessing,
    isInitializing,
    currentStage,
    readiness,
    specification,
    isComplete,
    sendMessage,
    answerClarification,
    resetConversation,
  } = useStudioEngine({ initialPrompt });

  // ─── Derived state ───────────────────────────────────────────────────────────
  /** isLoading — disables input/buttons during init AND active AI response */
  const isLoading = isProcessing || isInitializing;
  /** showThinking — only show AI "thinking" bubble when responding to user input */
  const showThinking = isProcessing && !isInitializing;
  const currentStep = getStepNumber(currentStage);
  const agentDisplayName = specification?.name || propAgentName || "Custom AI Agent";

  // ─── Local UI refs ───────────────────────────────────────────────────────────
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [engineMessages, showThinking]);

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleSend = (e?: React.FormEvent, custom?: string) => {
    if (e) e.preventDefault();
    const text = (custom || inputVal).trim();
    if (!text || isLoading) return;
    if (!custom) setInputVal("");
    sendMessage(text);
  };

  const focusInput = () => inputRef.current?.focus();

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen w-full bg-[#f5f6fa] font-sans text-slate-800 flex flex-col overflow-x-hidden">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="h-[60px] px-5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <img src="/vibe-logo-icon.png" alt="Vibe Agents" className="w-8 h-8 object-contain drop-shadow-sm" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-extrabold text-slate-900">
                Vibe Agent Studio
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-semibold border border-slate-200">
                {isComplete ? "Complete" : "Draft"}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {agentDisplayName} — Build powerful AI agents with plain English.
            </p>
          </div>
        </div>

        {/* Stepper */}
        <div className="hidden md:flex items-center">
          {[
            { label: "Build", n: 1 },
            { label: "Review", n: 2 },
            { label: "Test", n: 3 },
            { label: "Deploy", n: 4 },
          ].map(({ label, n }, i, arr) => (
            <div key={label} className="flex items-center">
              <button
                onClick={n === 2 ? onNextToReview : undefined}
                disabled={n !== 1 && !(n === 2 && isComplete)}
                className="flex flex-col items-center gap-0.5 px-3"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all ${
                    n === 1
                      ? "bg-violet-600 border-violet-600 text-white"
                      : n === 2 && isComplete
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-slate-300 text-slate-400"
                  }`}
                >
                  {n === 2 && isComplete ? <Check className="h-3 w-3" /> : n}
                </div>
                <span
                  className={`text-[11px] font-semibold ${
                    n === 1 ? "text-violet-600" : n === 2 && isComplete ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </button>
              {i < arr.length - 1 && (
                <div
                  className={`w-10 h-[2px] rounded-full mb-3 ${
                    n === 1 ? "bg-violet-300" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetConversation}
            disabled={isLoading || engineMessages.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-40"
            title="Start a new conversation"
          >
            <HelpCircle className="h-3.5 w-3.5" /> New Design
          </button>
          <button
            onClick={onNextToReview}
            disabled={!isComplete}
            className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-[12px] font-semibold transition-colors shadow-md shadow-violet-200"
          >
            {isComplete ? "Review Agent" : "Save Draft"}
          </button>
        </div>
      </header>

      {/* ── 3-COLUMN GRID ──────────────────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 max-w-[1400px] w-full mx-auto">

        {/* ── COL 1: CONVERSATION ──────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 flex flex-col shadow-sm overflow-hidden">
          {/* Col header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
            <svg viewBox="0 0 20 20" className="w-4 h-4 text-slate-400 fill-current flex-shrink-0">
              <path d="M18 2H2C.9 2 0 2.9 0 4v10c0 1.1.9 2 2 2h2v3l4-3h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
            <span className="text-[13px] font-bold text-slate-700">Conversation</span>
            {isInitializing && (
              <span className="ml-auto flex items-center gap-1 text-[11px] text-slate-400">
                <Loader2 className="h-3 w-3 animate-spin" /> Connecting…
              </span>
            )}
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0"
            style={{ maxHeight: "calc(100vh - 280px)" }}
          >
            {engineMessages.map((msg) => (
              <div key={msg.id}>
                {msg.role === "user" ? (
                  /* ── User bubble ── */
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] font-bold text-slate-700">You</span>
                    <div
                      className={`max-w-[85%] bg-slate-100 rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-[12.5px] text-slate-800 font-medium leading-relaxed ${
                        msg.isOptimistic ? "opacity-60 italic" : ""
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{" "}
                      {msg.isOptimistic ? "…" : "✓"}
                    </span>
                  </div>
                ) : (
                  /* ── AI bubble ── */
                  <AiMessage
                    message={msg}
                    stageLabel={msg.stage}
                    isDisabled={isLoading}
                    onOptionSelect={answerClarification}
                    onImprovementClick={(title) => handleSend(undefined, `Add: ${title}`)}
                  />
                )}
              </div>
            ))}

            {/* Thinking indicator — only shown while AI is responding */}
            {showThinking && (
              <ThinkingIndicator
                stageLabel={currentStage.replace(/_/g, " ").toLowerCase() + "…"}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="px-4 py-3 border-t border-slate-100 space-y-2.5">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder={isInitializing ? "Connecting to AI…" : "Ask anything…"}
                value={inputVal}
                disabled={isLoading}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputVal.trim()}
                className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition-all disabled:opacity-40 shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>

            {/* Quick suggestion chips */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => handleSend(undefined, "Add WhatsApp notifications")}
                disabled={isLoading}
                className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-violet-600 transition-colors font-medium disabled:opacity-40"
              >
                <img src="/assets-icons/whatsapp.png" alt="" className="w-3.5 h-3.5 object-contain" />
                Add WhatsApp notifications
              </button>
              <button
                onClick={() => handleSend(undefined, "Only unread emails")}
                disabled={isLoading}
                className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium hover:text-emerald-700 transition-colors disabled:opacity-40"
              >
                <Check className="h-3 w-3" /> Only unread emails
              </button>
              <button
                onClick={() => handleSend(undefined, "Include important emails only")}
                disabled={isLoading}
                className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-violet-600 transition-colors font-medium disabled:opacity-40"
              >
                <Sparkles className="h-3 w-3" /> Important emails only
              </button>
            </div>
          </div>
        </div>

        {/* ── COL 2: BUILDING PROGRESS ─────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 flex flex-col shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
            <Sparkles className="h-4 w-4 text-violet-500" />
            <span className="text-[13px] font-bold text-slate-700">Building Progress</span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            {PIPELINE_STEPS.map((step) => {
              const done   = step.id < currentStep;
              const active = step.id === currentStep;
              const locked = step.id > currentStep;

              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 px-4 py-3 rounded-2xl border transition-all ${
                    active
                      ? "border-violet-300 bg-violet-50/60 shadow-sm"
                      : done
                      ? "border-emerald-100 bg-emerald-50/30"
                      : "border-slate-100 bg-slate-50/50"
                  }`}
                >
                  {/* Step circle */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[12px] font-bold ${
                      done
                        ? "bg-emerald-500 text-white"
                        : active
                        ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : step.id}
                  </div>

                  {/* Labels */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-[13px] font-semibold ${
                        active ? "text-violet-700" : done ? "text-slate-700" : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    {(done || active) && (
                      <p
                        className={`text-[11px] mt-0.5 ${
                          done ? "text-emerald-500" : "text-violet-500"
                        }`}
                      >
                        {active && isProcessing ? (
                          <span className="flex items-center gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" /> In progress…
                          </span>
                        ) : (
                          step.subtitle
                        )}
                      </p>
                    )}
                  </div>

                  {/* Right icon */}
                  <div className="shrink-0 mt-1">
                    {done && <Check className="h-4 w-4 text-emerald-400" />}
                    {active && !isProcessing && (
                      <MoreHorizontal className="h-4 w-4 text-violet-400 animate-pulse" />
                    )}
                    {locked && <Lock className="h-3.5 w-3.5 text-slate-300" />}
                  </div>
                </div>
              );
            })}

            {/* Next step CTA */}
            <div className="mt-3 p-4 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                  <ArrowRight className="h-3.5 w-3.5 text-violet-600" />
                </div>
                <span className="text-[13px] font-bold text-slate-700">Next Step</span>
              </div>
              <p className="text-[12px] text-slate-500 leading-relaxed mb-3">
                {isComplete
                  ? "Your agent is ready! Review and deploy it."
                  : "Answer the questions in the chat to complete your agent."}
              </p>
              <button
                onClick={isComplete ? onNextToReview : focusInput}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-[13px] font-semibold transition-all shadow-md shadow-violet-200"
              >
                {isComplete ? "Review Agent" : "Answer Question"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── COL 3: LIVE AGENT SPECIFICATION ──────────────────────────────── */}
        <SpecificationView
          specification={specification}
          readiness={readiness}
          isComplete={isComplete}
          onNextToReview={onNextToReview}
          onFocusInput={focusInput}
        />
      </div>
    </div>
  );
}
