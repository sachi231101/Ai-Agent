import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export function PricingPreview() {
  const plans = [
    {
      name: 'Developer',
      price: '$0',
      period: 'forever',
      desc: 'Perfect for building, prototyping, and testing agent models locally.',
      features: [
        'Up to 3 active AI agents',
        'Visual workflow designer',
        'Community templates',
        'Basic webhooks & API triggers',
        'Community forum support',
      ],
      cta: 'Start Free',
      primary: false,
    },
    {
      name: 'Team Pro',
      price: '$79',
      period: 'per month',
      desc: 'For growing teams connecting production tools and executing high-volume loops.',
      features: [
        'Unlimited active agents',
        'Shared collaborative workspaces',
        'Vector knowledge sync (Notion, Drive)',
        'Custom tool & API attachments',
        'Priority email support (under 4h)',
        'Custom SLA guarantees',
      ],
      cta: 'Start Pro Trial',
      primary: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'tailored pricing',
      desc: 'For high-scale organizations requiring advanced compliance, audits, and custom models.',
      features: [
        'Everything in Team Pro',
        'Dedicated agent sandboxes',
        'SSO/SAML authentication logs',
        'On-prem database vector syncing',
        'Designated account engineer',
        'Custom contract security terms',
      ],
      cta: 'Contact Sales',
      primary: false,
    },
  ];

  return (
    <div id="pricing" className="py-20 sm:py-28 border-t border-border/20 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-primary/5 via-secondary/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-primary">Simple Pricing</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Plans built to scale with you
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            From single developer sandbox projects to globally managed enterprise workloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`p-8 rounded-2xl border flex flex-col justify-between relative transition-all hover:-translate-y-1 ${
                plan.primary
                  ? 'bg-white/[0.03] border-primary/45 shadow-xl shadow-primary/5'
                  : 'bg-white/[0.01] border-white/[0.05]'
              }`}
            >
              {plan.primary && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed min-h-[48px]">{plan.desc}</p>
                
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-xs text-muted-foreground">/{plan.period}</span>
                </div>

                <ul className="mt-8 space-y-4 border-t border-white/[0.05] pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs text-foreground/90">
                      <div className="h-4.5 w-4.5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  to={ROUTES.REGISTER}
                  className={`w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    plan.primary
                      ? 'bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/10'
                      : 'border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-foreground'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
