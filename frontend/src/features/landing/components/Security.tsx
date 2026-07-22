import { Shield, Key, Lock, EyeOff, FileSpreadsheet, ShieldAlert } from 'lucide-react';

export function Security() {
  const securityItems = [
    {
      title: 'End-to-End Encryption',
      desc: 'All session states, database payloads, and API requests are fully encrypted using AES-256 and TLS 1.3.',
      icon: Lock,
    },
    {
      title: 'Secure API Key Rotation',
      desc: 'Connect your model keys with encrypted variables. Keys never leak to clients and rotate automatically.',
      icon: Key,
    },
    {
      title: 'Granular Access (RBAC)',
      desc: 'Restrict workspace control, model configurations, and pipeline actions based on strict role assignments.',
      icon: Shield,
    },
    {
      title: 'Audit Logs & Telemetry',
      desc: 'Detailed action history logs documenting every agent run, tool invocation, and settings adjustment.',
      icon: FileSpreadsheet,
    },
    {
      title: 'Vulnerability Guardrails',
      desc: 'Real-time safety sanitizers prevent prompt injection vectors and check outputs before execution.',
      icon: ShieldAlert,
    },
    {
      title: 'Data Privacy Isolation',
      desc: 'We never train models on your proprietary business logs or uploaded vector database records.',
      icon: EyeOff,
    },
  ];

  return (
    <div className="py-20 sm:py-28 border-t border-border/20 bg-background relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 ambient-glow-purple opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-primary">Compliance & Trust</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Security built for Enterprise AI
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Operational safety is at the core of our platform architecture, keeping your variables and credentials isolated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityItems.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title} 
                className="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] transition-all hover:border-primary/20 space-y-4"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
