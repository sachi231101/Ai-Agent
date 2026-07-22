import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export function CTA() {
  return (
    <div className="py-24 sm:py-32 border-t border-white/[0.08] relative overflow-hidden bg-background">
      {/* Background glow leaks */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 ambient-glow-purple opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8 z-10">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Ready to build the future of agentic workflows?
        </h2>
        <p className="max-w-xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
          Create an account to deploy your first autonomous agent in minutes. No credit card required. Our Developer tier includes all core designer features.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={ROUTES.REGISTER}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-foreground font-semibold shadow-xl shadow-purple-500/20 transition-all hover:scale-105"
          >
            Start Building
            <ArrowRight className="h-5 w-5" />
          </Link>
          <button
            onClick={() => alert('Demo booking is currently queueing. Contact support@aetheric.ai')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-foreground font-semibold transition-all"
          >
            <Calendar className="h-4 w-4 text-primary" />
            Book a Demo
          </button>
        </div>
      </div>
    </div>
  );
}
