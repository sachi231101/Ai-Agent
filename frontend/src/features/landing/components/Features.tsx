import { MessageSquareText, Puzzle, Brain, Zap, Rocket } from 'lucide-react';

export function Features() {
  const mainFeatures = [
    {
      name: 'AI Architect',
      description: 'Our AI understands your idea and designs the perfect agent for you.',
      icon: MessageSquareText,
      color: 'bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400',
    },
    {
      name: 'Smart Integrations',
      description: 'Connect 100+ apps and services in just a few clicks.',
      icon: Puzzle,
      color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    },
    {
      name: 'Memory & Context',
      description: 'Your agent remembers and learns from every interaction.',
      icon: Brain,
      color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
    },
    {
      name: 'Test in Real-time',
      description: 'Chat with your agent, test flows and refine instantly.',
      icon: Zap,
      color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
    },
    {
      name: 'Deploy Anywhere',
      description: 'Deploy to cloud, Slack, Discord, or your own platform.',
      icon: Rocket,
      color: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-slate-50/50 dark:bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Everything you need
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Powerful features to build any agent
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-normal">
            From idea to deployment, we handle the heavy lifting.
          </p>
        </div>

        {/* 5 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {mainFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.name}
                className="group p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-5 shadow-sm`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {feature.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
