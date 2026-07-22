import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import { 
  Eye, 
  EyeOff, 
  Zap, 
  Check, 
  Bot, 
  Lock, 
  Mail, 
  User,
  ShieldCheck, 
  Rocket, 
  Sun, 
  Moon,
  BarChart3
} from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationError, setValidationError] = useState('');
  
  const registerMutation = useRegister();
  const { resolvedTheme, setTheme } = useTheme();

  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters.');
      return;
    }
    if (!PASSWORD_REGEX.test(password)) {
      setValidationError('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }
    registerMutation.mutate({ name, email, password });
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const error = validationError || ((registerMutation.isError && ((registerMutation.error as any)?.response?.data?.message || 'Registration failed.')) || '');

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-950 font-sans transition-colors overflow-hidden">
      
      {/* ─── LEFT COLUMN: Brand Showcase Panel (Lg: col-6) ────────────────── */}
      <div className="lg:col-span-6 bg-gradient-to-br from-violet-100/90 via-indigo-50/70 to-purple-100/90 dark:from-slate-900 dark:via-violet-950/40 dark:to-slate-900 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-violet-300/40 dark:bg-violet-900/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-300/40 dark:bg-purple-900/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2.5 group w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-500/25 group-hover:scale-105 transition-transform">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Vibe Agents
            </span>
          </Link>

          {/* Heading */}
          <div className="max-w-md space-y-3 pt-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Start Building <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Agents Today.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
              Create your account in seconds and unlock autonomous AI automation.
            </p>
          </div>

          {/* 3D Graphic Canvas */}
          <div className="my-6 relative max-w-lg mx-auto py-6">
            <div className="w-full bg-white/70 dark:bg-slate-900/80 rounded-3xl border border-white/80 dark:border-slate-800 shadow-2xl p-6 backdrop-blur-xl relative">
              <div className="flex gap-1.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>

              <div className="py-4 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 text-white flex items-center justify-center shadow-xl shadow-violet-500/30">
                  <Bot className="h-11 w-11" />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>Free Developer Plan</span>
                  <span className="text-emerald-500">Unlimited Agents</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Connect Slack, Notion, GitHub, and custom APIs with 0 config.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="relative z-10 grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/60 dark:border-slate-800">
          <div className="flex items-start gap-2">
            <Zap className="h-4 w-4 text-violet-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">No Code Needed</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Plain English prompts</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Secure & Private</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">SOC2 compliant data</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Rocket className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Deploy Anywhere</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Cloud or webhooks</p>
            </div>
          </div>
        </div>

      </div>

      {/* ─── RIGHT COLUMN: Registration Form Panel (Lg: col-6) ─────────────── */}
      <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-white dark:bg-slate-950 relative">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between w-full pb-6">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors shadow-sm"
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

          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-bold text-violet-600 dark:text-violet-400 hover:underline ml-1">
              Sign in
            </Link>
          </div>
        </div>

        {/* Center Form */}
        <div className="max-w-md w-full mx-auto space-y-6 my-auto py-4">
          
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Create your account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Start building AI agents today — it's free.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Email Address */}
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

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 8 chars, uppercase & number"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 font-medium">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {registerMutation.isPending ? 'Creating account...' : 'Create Account'}
            </button>

          </form>
        </div>

        {/* Footer */}
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
