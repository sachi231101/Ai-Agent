import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Zap, Check, Star, ChevronRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { InteractiveDashboard } from './InteractiveDashboard';

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-slate-50/50 dark:bg-background transition-colors">
      
      {/* Background Soft Glow Gradients */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-violet-200/40 via-indigo-100/40 to-purple-200/30 dark:from-violet-950/20 dark:via-indigo-950/15 dark:to-purple-950/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-purple-300/20 dark:bg-purple-900/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header Text Block */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Announcement Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-200 dark:border-violet-800/60 bg-white/80 dark:bg-slate-900/80 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm hover:shadow transition-all backdrop-blur-md cursor-pointer group">
            <span className="px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-bold text-[10px]">
              ✨ New
            </span>
            <span className="text-slate-700 dark:text-slate-300">
              Build AI agents 10x faster with our AI Architect
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white">
            Build AI Agents <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              with Plain English.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Describe what you want. Our AI Architect understands, designs and prepares your agent — you test and deploy.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to={ROUTES.REGISTER}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-xl shadow-violet-500/25 transition-all hover:scale-105"
            >
              Start Building for Free
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              onClick={() => alert('Demo video launching soon!')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm shadow-sm transition-all hover:scale-105"
            >
              <Play className="h-4 w-4 fill-slate-800 dark:fill-slate-100 text-slate-800 dark:text-slate-100" />
              Watch Demo
            </button>
          </div>

          {/* 3 Feature Highlights Under Buttons */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            
            {/* Highlight 1 */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 p-2 rounded-xl text-left">
              <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Zap className="h-4 w-4 fill-current" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  No Code Needed
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Just plain English
                </p>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 p-2 rounded-xl text-left">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Launch in Minutes
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  From idea to agent
                </p>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 p-2 rounded-xl text-left">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Powerful & Flexible
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  For any use case
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Studio Canvas Card Stage */}
        <div className="mt-12 sm:mt-16 max-w-6xl mx-auto relative">
          <InteractiveDashboard />
        </div>

      </div>
    </section>
  );
}
