import { useState } from 'react';
import { 
  Bot, 
  GitFork, 
  MessageSquare, 
  Database, 
  BarChart3, 
  Cpu, 
  Check, 
  ArrowRight,
  TrendingUp,
  Clock,
  Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProductPreview() {
  const [selectedSection, setSelectedSection] = useState<'studio' | 'workflow' | 'chat' | 'knowledge' | 'analytics'>('studio');

  const sections = [
    {
      id: 'studio' as const,
      name: 'Agent Studio',
      title: 'Design specific AI personas',
      desc: 'Define custom prompt logic, select models (Claude, GPT, Gemini), attach vector knowledge bases, and whitelist system APIs for tools.',
      benefits: ['Custom system prompts', 'Dynamic model swapping', 'Autonomous execution limits'],
    },
    {
      id: 'workflow' as const,
      name: 'Workflow Builder',
      title: 'Choreograph visual agent graphs',
      desc: 'Connect triggers (webhooks, email, GitHub) to sequential or parallel agent execution blocks. Add conditional logic routers.',
      benefits: ['Drag-and-drop canvas', 'Parallel branch executing', 'State & memory variables'],
    },
    {
      id: 'chat' as const,
      name: 'Chat Interface',
      title: 'Human-in-the-loop debugging',
      desc: 'Test agent capabilities directly inside the canvas. View step-by-step reasoning outputs, tool invocation parameters, and logs.',
      benefits: ['Reasoning path inspect', 'Real-time telemetry streams', 'Instant variable injection'],
    },
    {
      id: 'knowledge' as const,
      name: 'Knowledge Management',
      title: 'Secure Vector Embeddings',
      desc: 'Upload PDFs, Notion pages, or Postgres tables. The engine parses, embeds, and syncs chunks automatically with agent memory caches.',
      benefits: ['Automatic sync schedules', 'Token usage optimize', 'Strict RBAC isolation'],
    },
    {
      id: 'analytics' as const,
      name: 'Analytics Dashboard',
      title: 'Track performance and cost metrics',
      desc: 'Keep an eye on latency distributions, model call charges, token usage statistics, and task automation success ratios in real time.',
      benefits: ['Latency heatmaps', 'Dynamic token budgets', 'Uptime monitoring'],
    },
  ];

  const current = sections.find(s => s.id === selectedSection)!;

  return (
    <div className="py-20 sm:py-28 border-t border-border/20 bg-background relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] ambient-glow-purple opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-primary">Advanced Showcase</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Designed for AI Engineering Teams
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Explore the high-fidelity panels of Vibe Agent Studio. Everything you need to scale AI from experiments to production.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left selector */}
          <div className="lg:col-span-4 space-y-3">
            {sections.map((sect) => (
              <button
                key={sect.id}
                onClick={() => setSelectedSection(sect.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  selectedSection === sect.id
                    ? 'bg-white/[0.04] border-primary/30 shadow-md shadow-primary/5'
                    : 'bg-transparent border-transparent hover:bg-white/[0.01] text-muted-foreground'
                }`}
              >
                <div className={`p-2 rounded-xl border ${
                  selectedSection === sect.id 
                    ? 'bg-primary/10 border-primary/20 text-primary' 
                    : 'bg-white/[0.02] border-white/[0.05]'
                }`}>
                  {sect.id === 'studio' && <Bot className="h-5 w-5" />}
                  {sect.id === 'workflow' && <GitFork className="h-5 w-5" />}
                  {sect.id === 'chat' && <MessageSquare className="h-5 w-5" />}
                  {sect.id === 'knowledge' && <Database className="h-5 w-5" />}
                  {sect.id === 'analytics' && <BarChart3 className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${selectedSection === sect.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {sect.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {sect.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right layout showcase */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.01] backdrop-blur-xl space-y-8 animate-fade-in relative min-h-[380px] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                {current.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">{current.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {current.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.05]">
                {current.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center">
                      <Check className="h-2.5 w-2.5" />
                    </div>
                    <span className="text-xs font-medium text-foreground/90">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Live Interface Panel (specific to selected section) */}
            <div className="mt-6 p-4 rounded-xl border border-white/[0.08] bg-black/40 relative overflow-hidden">
              
              {/* Studio Live preview */}
              {selectedSection === 'studio' && (
                <div className="space-y-3 font-mono text-[10px] text-muted-foreground">
                  <div className="text-primary font-semibold">// qualifier-agent.yaml</div>
                  <div>model: claude-3-5-sonnet</div>
                  <div>temperature: 0.1</div>
                  <div>tools: [web_search, slack_notifier, postgres_query]</div>
                  <div>system_prompt: "Resolve priority from ticket descriptions..."</div>
                </div>
              )}

              {/* Workflow Live preview */}
              {selectedSection === 'workflow' && (
                <div className="flex items-center justify-between text-xs font-semibold py-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Run Status: Completed</span>
                  </div>
                  <span className="text-muted-foreground font-mono">1.21s / 4 steps</span>
                </div>
              )}

              {/* Chat Live preview */}
              {selectedSection === 'chat' && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-primary">Chat Console</div>
                  <p className="text-xs text-muted-foreground italic">"I have automatically qualified lead #902 as enterprise-ready based on employee size (500+) and funding round (Series B)."</p>
                </div>
              )}

              {/* Knowledge Live preview */}
              {selectedSection === 'knowledge' && (
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">knowledge_vectors.db</span>
                  <span className="text-emerald-400 border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[9px] font-bold">1.2M Vectors Synced</span>
                </div>
              )}

              {/* Analytics Live preview */}
              {selectedSection === 'analytics' && (
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Latency</span>
                    <span className="text-xs font-extrabold flex items-center justify-center gap-1 mt-0.5">
                      <Clock className="h-3.5 w-3.5 text-primary" /> 185ms
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Accuracy</span>
                    <span className="text-xs font-extrabold flex items-center justify-center gap-1 mt-0.5">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> 99.98%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Total Saved</span>
                    <span className="text-xs font-extrabold flex items-center justify-center gap-1 mt-0.5">
                      <Coins className="h-3.5 w-3.5 text-secondary" /> $14,200
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
