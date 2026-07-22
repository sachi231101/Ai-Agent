import { 
  Bot, 
  Cpu, 
  MessageSquare, 
  FileText, 
  Mail, 
  HardDrive, 
  MessageCircle, 
  Database, 
  Network, 
  Link2,
  CheckCircle2
} from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

export function IntegrationsGrid() {
  const integrations = [
    { name: 'OpenAI GPT', desc: 'GPT-4o & GPT-4 models', icon: Bot, color: 'text-[#10a37f] bg-[#10a37f]/10' },
    { name: 'Anthropic Claude', desc: 'Claude 3.5 Sonnet & Opus', icon: Cpu, color: 'text-[#d97706] bg-[#d97706]/10' },
    { name: 'Google Gemini', desc: 'Gemini 2.0 Flash & Pro', icon: Network, color: 'text-[#1b72e8] bg-[#1b72e8]/10' },
    { name: 'Slack Workspace', desc: 'Trigger alerts & list commands', icon: MessageSquare, color: 'text-[#4a154b] bg-[#4a154b]/10' },
    { name: 'Notion Documents', desc: 'Query databases & sync pages', icon: FileText, color: 'text-[#ffffff] bg-[#ffffff]/10' },
    { name: 'GitHub Repositories', desc: 'Verify PR diffs & open bugs', icon: GithubIcon, color: 'text-[#24292f] bg-[#24292f]/10' },
    { name: 'Gmail Inbox', desc: 'Trigger loops & draft mails', icon: Mail, color: 'text-[#ea4335] bg-[#ea4335]/10' },
    { name: 'Google Drive', desc: 'Sync vector files & docs', icon: HardDrive, color: 'text-[#34a853] bg-[#34a853]/10' },
    { name: 'Discord Command Bot', desc: 'Operate triggers in channels', icon: MessageSquare, color: 'text-[#5865f2] bg-[#5865f2]/10' },
    { name: 'WhatsApp Business', desc: 'Automate support chat flow', icon: MessageCircle, color: 'text-[#25d366] bg-[#25d366]/10' },
    { name: 'Postgres Database', desc: 'Run SQL & store outputs', icon: Database, color: 'text-[#336791] bg-[#336791]/10' },
    { name: 'REST APIs (HTTP)', desc: 'Connect Swagger OpenAPI', icon: Link2, color: 'text-[#adc6ff] bg-[#adc6ff]/10' },
  ];

  return (
    <div className="py-20 sm:py-28 border-t border-white/[0.08] bg-background relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 ambient-glow-blue opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-primary">Connected Stack</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Connect your existing tools
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Attach foundation LLM engines, databases, webhook endpoints, and communication channels in one click.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {integrations.map((integ) => {
            const Icon = integ.icon;
            return (
              <div 
                key={integ.name} 
                className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] hover:border-primary/20 transition-all flex items-start gap-4"
              >
                <div className={`p-2.5 rounded-xl border border-white/[0.08] flex items-center justify-center shrink-0 ${integ.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-foreground truncate">{integ.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-1 truncate">{integ.desc}</p>
                  
                  <div className="flex items-center gap-1 mt-2 text-[9px] text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>SDK Supported</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
