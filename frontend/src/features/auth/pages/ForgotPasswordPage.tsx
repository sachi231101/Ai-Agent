import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '../hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import { Sparkles, ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const forgotMutation = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotMutation.mutate(email, {
      onSuccess: () => setSubmitted(true),
      onError: () => setSubmitted(true), // show success regardless for security
    });
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', fontFamily: "'Inter', system-ui, sans-serif", background: '#0a0a0f', alignItems: 'center', justifyContent: 'center', padding: 24, boxSizing: 'border-box' }}>
      <style>{css}</style>
      <div className="fp-orb fp-orb1" />
      <div className="fp-orb fp-orb2" />

      <div className="fp-card">
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(124,58,237,.4)' }}>
            <Sparkles size={15} color="#fff" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Vibe Agent</span>
        </div>

        {submitted ? (
          /* ── Success state ── */
          <div style={{ textAlign: 'center' }}>
            <div className="fp-success-icon">
              <CheckCircle size={36} color="#34d399" strokeWidth={1.5} />
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.8px', marginBottom: 10 }}>Check your email</div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.45)', lineHeight: 1.7, marginBottom: 32 }}>
              We've sent a password reset link to<br />
              <strong style={{ color: 'rgba(255,255,255,.7)' }}>{email}</strong>
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', marginBottom: 28 }}>Didn't receive it? Check your spam folder or try again.</p>
            <button
              type="button"
              className="fp-btn-ghost"
              onClick={() => { setSubmitted(false); setEmail(''); }}
            >
              Try a different email
            </button>
            <div style={{ marginTop: 20 }}>
              <Link to={ROUTES.LOGIN} className="fp-back-link">
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            <div className="fp-icon-wrap">
              <Mail size={26} color="#a78bfa" strokeWidth={1.5} />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 8 }}>Forgot password?</div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.4)', lineHeight: 1.65, marginBottom: 28 }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label className="fp-label">Email address</label>
                <input
                  className="fp-input"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              {forgotMutation.isError && !submitted && (
                <div className="fp-error">Something went wrong. Please try again.</div>
              )}

              <button type="submit" className="fp-btn" disabled={forgotMutation.isPending}>
                {forgotMutation.isPending ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Link to={ROUTES.LOGIN} className="fp-back-link">
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
.fp-orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; }
.fp-orb1 { width: 400px; height: 400px; top: -100px; right: -80px; background: rgba(109,40,217,.15); }
.fp-orb2 { width: 350px; height: 350px; bottom: -80px; left: -60px; background: rgba(79,70,229,.12); }
.fp-card {
  width: 100%; max-width: 420px; position: relative; z-index: 1;
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
  border-radius: 24px; padding: 40px; backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.05);
}
.fp-icon-wrap {
  width: 56px; height: 56px; border-radius: 16px;
  background: rgba(124,58,237,.15); border: 1px solid rgba(124,58,237,.25);
  display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
}
.fp-label { display: block; font-size: 13px; font-weight: 500; color: rgba(255,255,255,.6); margin-bottom: 8px; }
.fp-input {
  width: 100%; padding: 13px 16px; border-radius: 12px; font-size: 15px; font-family: inherit;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); color: #fff;
  outline: none; transition: border-color .2s, box-shadow .2s; box-sizing: border-box;
}
.fp-input::placeholder { color: rgba(255,255,255,.2); }
.fp-input:focus { border-color: rgba(139,92,246,.6); box-shadow: 0 0 0 3px rgba(139,92,246,.15); }
.fp-error {
  background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3);
  border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #f87171; margin-bottom: 16px;
}
.fp-btn {
  width: 100%; padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 600; font-family: inherit;
  background: linear-gradient(135deg,#7c3aed,#4f46e5); color: #fff; border: none; cursor: pointer;
  transition: all .2s; box-shadow: 0 4px 20px rgba(124,58,237,.4);
}
.fp-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(124,58,237,.55); }
.fp-btn:disabled { opacity: .6; cursor: not-allowed; }
.fp-btn-ghost {
  width: 100%; padding: 13px; border-radius: 12px; font-size: 14px; font-weight: 500; font-family: inherit;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.7);
  cursor: pointer; transition: all .2s;
}
.fp-btn-ghost:hover { background: rgba(255,255,255,.1); color: #fff; }
.fp-back-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; color: rgba(255,255,255,.35); text-decoration: none; transition: color .2s; font-weight: 500;
}
.fp-back-link:hover { color: #a78bfa; }
.fp-success-icon {
  width: 72px; height: 72px; border-radius: 20px; margin: 0 auto 24px;
  background: rgba(52,211,153,.12); border: 1px solid rgba(52,211,153,.25);
  display: flex; align-items: center; justify-content: center;
  animation: fp-pop .4s cubic-bezier(.34,1.56,.64,1);
}
@keyframes fp-pop { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: scale(1); } }
`;
