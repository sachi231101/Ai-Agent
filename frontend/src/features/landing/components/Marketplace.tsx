import { useState } from 'react';
import { CloudDownload, Heart, ArrowRight, Star, Bot, Share2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Marketplace() {
  const [activeCategory, setActiveCategory] = useState<'agents' | 'integrations' | 'templates'>('agents');

  const categories = [
    { id: 'agents' as const, name: 'Popular Agents', icon: Bot },
    { id: 'integrations' as const, name: 'Featured Integrations', icon: Share2 },
    { id: 'templates' as const, name: 'Community Templates', icon: Layers },
  ];

  const items = {
    agents: [
      { name: 'SQL Query Generator', author: 'SupaDB', downloads: '14.2k', rating: 4.9, desc: 'Generates optimized Postgres/MySQL queries from plain English prompts.' },
      { name: 'Auto PDF Summarizer', author: 'VibeCore', downloads: '9.8k', rating: 4.8, desc: 'Extracts references, index values, and abstract summaries from PDFs.' },
      { name: 'Sentimental Ticket Router', author: 'ZenDeskDev', downloads: '8.4k', rating: 4.7, desc: 'Classifies incoming ticket text mood and routes priority bugs.' },
      { name: 'GitHub Code Reviewer', author: 'OctoReview', downloads: '7.6k', rating: 4.9, desc: 'Scans PR diffs, marks styling bugs, and recommends fixes.' },
    ],
    integrations: [
      { name: 'Notion Sync Engine', author: 'Notion Labs', downloads: '24.1k', rating: 4.9, desc: 'Reads databases and syncs doc changes directly into vector indexes.' },
      { name: 'Slack Dispatcher Hook', author: 'SlackDev', downloads: '18.5k', rating: 4.8, desc: 'Allows agents to trigger posts and listen to commands in Slack channels.' },
      { name: 'HubSpot Lead Logger', author: 'HubSpot', downloads: '12.4k', rating: 4.7, desc: 'Appends qualified prospects directly into CRM sales deal pipelines.' },
      { name: 'Jira Automator API', author: 'Atlassian', downloads: '9.2k', rating: 4.6, desc: 'Triggers issue status changes and checks blockers automatically.' },
    ],
    templates: [
      { name: 'Customer Support Router', author: 'Vibe', downloads: '18k', rating: 4.9, desc: 'Complete support blueprint with routing rules, triggers, and Slack alerts.' },
      { name: 'Daily Standup compiler', author: 'OpsPro', downloads: '12k', rating: 4.8, desc: 'Collects tasks, highlights status block logs, and mails summaries.' },
      { name: 'Financial Receipt Audit', author: 'StripeDev', downloads: '9.8k', rating: 4.8, desc: 'Scans files, parses pricing totals, and updates invoice schemas.' },
      { name: 'Corporate FAQ Trainer', author: 'DocuTrain', downloads: '8.4k', rating: 4.7, desc: 'Uploads doc folders, embeds logs, and spins up customer bots.' },
    ]
  };

  const activeItems = items[activeCategory];

  return (
    <div id="marketplace" className="py-20 sm:py-28 border-t border-white/[0.08] bg-card/10 backdrop-blur-md relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-0 w-80 h-80 ambient-glow-purple opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-primary">Community Extensions</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Explore the Agent Marketplace
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Install custom database adapters, agent profiles, triggers, and integrations made by devs.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <Button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-xs font-semibold ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/10'
                    : 'bg-white/[0.02] border-white/[0.08] text-muted-foreground hover:text-foreground'
                }`}
              >
                <CatIcon className="h-4 w-4" />
                {cat.name}
              </Button>
            );
          })}
        </div>

        {/* Grid display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {activeItems.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] hover:border-primary/20 transition-all hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>by {item.author}</span>
                  <Heart className="h-4 w-4 hover:text-rose-500 hover:fill-rose-500 transition-colors cursor-pointer" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-foreground truncate">{item.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                <div className="flex items-center gap-1.5">
                  <CloudDownload className="h-3.5 w-3.5" />
                  <span>{item.downloads}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
