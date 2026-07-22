import { Sparkles, Compass, Cpu, Zap } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Describe your agent',
      desc: 'Use natural language to outline your agent’s goals, behavior, and output format.',
      icon: Compass,
      glow: 'shadow-blue-500/10 border-primary/20',
    },
    {
      step: '02',
      title: 'AI generates blueprint',
      desc: 'Our engine creates the execution plan, prompt strategies, and required state storage.',
      icon: Sparkles,
      glow: 'shadow-purple-500/10 border-secondary/20',
    },
    {
      step: '03',
      title: 'Connect custom tools',
      desc: 'Attach APIs, PostgreSQL, vector search bases, or communication hooks like Slack.',
      icon: Cpu,
      glow: 'shadow-indigo-500/10 border-primary/20',
    },
    {
      step: '04',
      title: 'Deploy instantly',
      desc: 'Host your agent on our managed sandbox and stream operations via webhook or UI.',
      icon: Zap,
      glow: 'shadow-pink-500/10 border-secondary/20',
    },
  ];

  return (
    <div className="py-20 sm:py-28 border-t border-border/20 bg-background relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/5 via-secondary/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-primary">Execution Model</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            How Aetheric OS Works
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            From natural language instruction to production-ready API deployments in four steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.step}
                className={`relative flex flex-col justify-between p-6 rounded-2xl border bg-card/45 backdrop-blur-md transition-all hover:bg-card/70 group ${step.glow}`}
              >
                {/* Connector line (desktop only) */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 border-t border-dashed border-white/10 z-0 pointer-events-none" />
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-muted-foreground/50">
                      STEP {step.step}
                    </span>
                    <Icon className="h-5 w-5 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold mt-6 text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
