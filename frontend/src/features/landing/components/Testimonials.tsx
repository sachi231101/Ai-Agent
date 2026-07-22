import { Quote } from 'lucide-react';

export function Testimonials() {
  const list = [
    {
      quote: 'Vibe Agent allowed us to build an automated PR reviewer agent in a single afternoon. Our DevOps team saves hours every week.',
      author: 'Alex Rivera',
      role: 'VP of Engineering, Vercel Stack',
    },
    {
      quote: 'The visual workflow builder coupled with stateful agents is magical. It bridged the gap between raw LLM completions and production workflows.',
      author: 'Sarah Chen',
      role: 'Co-Founder, Synthetix AI',
    },
    {
      quote: 'Data privacy was our biggest blocker for adopting agentic workflows. Vibe Agent’s key isolation and strict local context guarantees sealed the deal.',
      author: 'Marcus Vance',
      role: 'Director of Security, FinTech Global',
    },
  ];

  return (
    <div className="py-20 sm:py-28 border-t border-border/20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-primary">Success Stories</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Adopted by leading tech teams
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            See how developers and engineering leaders are scaling operations with autonomous systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-2xl border border-white/[0.05] bg-white/[0.01] flex flex-col justify-between relative hover:bg-white/[0.02] transition-all"
            >
              <Quote className="h-6 w-6 text-primary/30 absolute top-6 right-8" />
              <p className="text-sm text-foreground/90 italic leading-relaxed pt-4">
                "{item.quote}"
              </p>
              <div className="mt-8 pt-4 border-t border-white/[0.05]">
                <h4 className="text-sm font-bold">{item.author}</h4>
                <span className="text-xs text-muted-foreground mt-0.5 block">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
