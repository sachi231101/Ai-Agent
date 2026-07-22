import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Sun, 
  Moon,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

export default function LoginPage() {
  const [email, setEmail] = useState('sachin@vibeagents.ai');
  const [password, setPassword] = useState('VibeAgent123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const loginMutation = useLogin();
  const { resolvedTheme, setTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleFillDemo = () => {
    setEmail('sachin@vibeagents.ai');
    setPassword('VibeAgent123!');
    loginMutation.mutate({ email: 'sachin@vibeagents.ai', password: 'VibeAgent123!' });
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-950 font-sans transition-colors overflow-hidden">
      
      {/* ─── LEFT COLUMN: User-Provided 3D Showcase Artwork (Lg: col-6) ──── */}
      <div className="lg:col-span-6 bg-[#f4f2fe] dark:bg-slate-900/60 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 lg:p-12 flex items-center justify-center relative overflow-hidden">
        
        {/* Ambient Soft Glow Backdrops */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-violet-300/30 dark:bg-violet-900/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-300/30 dark:bg-purple-900/20 blur-3xl rounded-full pointer-events-none" />

        {/* Hero Image Container */}
        <div className="relative z-10 w-full max-w-lg mx-auto flex items-center justify-center">
          <img 
            src="/images/login-hero.png" 
            alt="Vibe Agents - Build AI Agents with Plain English" 
            className="w-full h-auto object-contain rounded-3xl shadow-2xl shadow-violet-500/10 border border-white/80 dark:border-slate-800 transition-all hover:scale-[1.01]"
          />
        </div>

      </div>

      {/* ─── RIGHT COLUMN: Sign In Form Panel (Lg: col-6) ─────────────────── */}
      <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-white dark:bg-slate-950 relative">
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between w-full pb-6">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors shadow-sm"
          >
            {resolvedTheme === 'dark' ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span>Light mode</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-slate-600" />
                <span>Dark mode</span>
              </>
            )}
          </button>

          {/* Sign Up Redirect Link */}
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to={ROUTES.REGISTER} className="font-bold text-violet-600 dark:text-violet-400 hover:underline ml-1">
              Sign up
            </Link>
          </div>
        </div>

        {/* Center Auth Form Container */}
        <div className="max-w-md w-full mx-auto space-y-6 my-auto py-4">
          
          {/* Header Titles */}
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Sign in to continue building amazing AI agents.
            </p>
          </div>

          {/* ⚡ Demo Credentials Info Box */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/40 dark:to-slate-900 border border-violet-200 dark:border-violet-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-violet-900 dark:text-violet-300">
                <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <span>Demo Credentials</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-bold text-violet-700 dark:text-violet-300 hover:underline flex items-center gap-1"
              >
                <span>Instant Demo Login</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300 font-mono bg-white/80 dark:bg-slate-900/80 p-2 rounded-xl border border-violet-100 dark:border-slate-800">
              <div><span className="text-slate-400 font-sans">Email:</span> sachin@vibeagents.ai</div>
              <div><span className="text-slate-400 font-sans">Password:</span> VibeAgent123!</div>
            </div>
          </div>

          {/* OAuth Buttons Stack */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all shadow-sm"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all shadow-sm"
            >
              <GitHubIcon />
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Email address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
            </button>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 accent-violet-600 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs text-slate-600 dark:text-slate-400 font-medium cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

          </form>
        </div>

        {/* Footer Trust Indicator */}
        <div className="pt-6 text-center border-t border-slate-100 dark:border-slate-900">
          <div className="inline-flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <ShieldCheck className="h-4 w-4 text-slate-400" />
            <span>Trusted by 10,000+ builders worldwide</span>
          </div>
        </div>

      </div>

    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
    </svg>
  );
}
