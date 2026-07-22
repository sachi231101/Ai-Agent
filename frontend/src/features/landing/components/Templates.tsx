import { ArrowRight, Star, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Templates() {
  const templates = [
    {
      name: 'Customer Support Agent',
      desc: 'Triages support tickets, tags sentiment, and automatically syncs logs into HubSpot.',
      category: 'Support',
      rating: 4.9,
    },
    {
      name: 'HR Assistant',
      desc: 'Qualifies CVs, coordinates screening interviews, and matches candidates to role targets.',
      category: 'HR',
      rating: 4.7,
    },
    {
      name: 'Sales Copilot',
      desc: 'Extracts prospect corporate data, searches web for context, and drafts personalized emails.',
      category: 'Sales',
      rating: 4.8,
    },
    {
      name: 'Research Assistant',
      desc: 'Queries PubMed or bioRxiv databases, extracts metadata schemas, and compiles summaries.',
      category: 'Research',
      rating: 4.9,
    },
    {
      name: 'Marketing Agent',
      desc: 'Monitors brand mentions, writes viral Twitter threads, and drafts marketing blog templates.',
      category: 'Marketing',
      rating: 4.8,
    },
    {
      name: 'Coding Assistant',
      desc: 'Checks incoming GitHub PRs, comments on optimization areas, and checks styling compliance.',
      category: 'Engineering',
      rating: 4.9,
    },
    {
      name: 'Finance Assistant',
      desc: 'Validates invoices, routes receipt uploads to accounts, and flags budget variance logs.',
      category: 'Finance',
      rating: 4.6,
    },
    {
      name: 'Project Manager',
      desc: 'Triggers daily task summaries, updates Jira timelines, and checks active blockers.',
      category: 'Operations',
      rating: 4.7,
    },
  ];

  return (
    <div id="templates" className="py-20 sm:py-28 border-t border-white/[0.08] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-primary">Pre-built Blueprints</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Start instantly with Templates
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Verified template configurations built for fast deployment. Launch in one click.
            </p>
          </div>
          <button 
            onClick={() => alert('All templates are accessible inside the dashboard')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary hover:gap-3 transition-all"
          >
            View all templates
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.name}
              className="flex flex-col justify-between p-5 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] hover:border-primary/20 transition-all hover:shadow-lg"
            >
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold uppercase tracking-wider">
                  {tpl.category}
                </span>
                <h3 className="mt-4 text-sm font-bold text-foreground truncate">{tpl.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">{tpl.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span>{tpl.rating}</span>
                </div>
                
                <Button 
                  size="sm" 
                  onClick={() => alert(`Launching ${tpl.name} setup...`)}
                  className="bg-primary hover:bg-primary/95 text-primary-foreground text-[10px] font-bold h-8 rounded-lg flex items-center gap-1"
                >
                  <Rocket className="h-3 w-3" />
                  Quick Launch
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
