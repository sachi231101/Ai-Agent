import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What can AI agents do?',
      a: 'AI agents can monitor triggers, make planning decisions, execute code locally, query databases, read/sync knowledge base documents, and coordinate with other agents or platforms (like Slack or Notion) to automate complex administrative workflows.',
    },
    {
      q: 'Which AI models are supported?',
      a: 'We support all major foundation models including OpenAI (GPT-4o, GPT-4), Anthropic (Claude 3.5 Sonnet, Claude 3 Opus), and Google Gemini (Gemini 2.0 Flash, Gemini Pro). You can swap engines inside the agent settings at any time.',
    },
    {
      q: 'Can I connect my own APIs?',
      a: 'Absolutely. You can attach custom tool endpoints by providing OpenAPI/Swagger schemas. The agent automatically infers parameter requirements and schedules outgoing requests dynamically.',
    },
    {
      q: 'Is coding required?',
      a: 'No. You can construct agent system guidelines, attach tools, and connect pipeline triggers fully in natural language inside Vibe Agent Studio. However, developer SDKs are available for custom code integration.',
    },
    {
      q: 'Is there a free plan?',
      a: 'Yes. Our Developer tier is 100% free forever. It includes all core visual designer features and allows you to run up to three active agents simultaneously.',
    },
    {
      q: 'Can teams collaborate?',
      a: 'Yes. Team Pro and Enterprise plans allow you to invite team members, manage granular RBAC access controls, share prompts/blueprints, and check unified audit logs across shared workspaces.',
    },
  ];

  return (
    <div className="py-20 sm:py-28 border-t border-border/20 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-primary">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-white/[0.05] bg-white/[0.01] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-bold text-foreground">{faq.q}</span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <Plus className="h-4 w-4 text-primary shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-48 border-t border-white/[0.05]' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <p className="p-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
