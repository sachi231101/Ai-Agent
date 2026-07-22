import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Sun, Moon, Zap } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useTheme } from '@/providers/ThemeProvider';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const links = [
    { name: 'Features', href: '#features' },
    { name: 'Templates', href: '#templates' },
    { name: 'Marketplace', href: '#marketplace' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Docs', href: '#docs' },
    { name: 'Changelog', href: '#changelog' },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-background/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link 
            to={ROUTES.HOME} 
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <Zap className="h-4.5 w-4.5 fill-current" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              Vibe Agents
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-violet-600 dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTAs & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
              title="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Sun className="h-4 w-4 text-slate-600" />
              )}
            </button>

            <Link 
              to={ROUTES.LOGIN} 
              className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-white transition-colors px-3 py-2"
            >
              Sign in
            </Link>

            <Link 
              to={ROUTES.REGISTER} 
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-105"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
            >
              {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-white/[0.08] bg-white/95 dark:bg-background/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-violet-600"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.05] flex flex-col gap-3">
            <Link 
              to={ROUTES.LOGIN} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Sign in
            </Link>
            <Link 
              to={ROUTES.REGISTER} 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-md"
            >
              Start Building
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

