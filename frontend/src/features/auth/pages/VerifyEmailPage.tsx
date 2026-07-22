import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import { Sparkles, Mail, RefreshCw } from 'lucide-react';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'your email';
  const [resent, setResent] = useState(false);
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);
    await new Promise(r => setTimeout(r, 1200));
    setResending(false);
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', fontFamily: "'Inter', system-ui, sans-serif", background: '#0a0a0f', alignItems: 'center', justifyContent: 'center', padding: 24, boxSizing: 'border-box' }}>
      <style>{css}</style>
      <div className="ve-orb ve-orb1" />
      <div className="ve-orb ve-orb2" />
      {/* Animated floating particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="ve-particle" style={{ '--i': i } as React.CSSProperties} />
      ))}

      <div className="ve-card">
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 36 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(124,58,237,.4)' }}>
            <Sparkles size={15} color="#fff" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Vibe Agent</span>
        </div>

        {/* Animated mail icon */}
        <div className="ve-icon-ring">
          <div className="ve-icon-inner">
            <Mail size={32} color="#a78bfa" strokeWidth={1.5} />
          </div>
        </div>

        <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 12, textAlign: 'center' }}>
          Verify your email
        </div>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,.45)', lineHeight: 1.7, textAlign: 'center', marginBottom: 8 }}>
          We've sent a verification link to
        </p>
        <p style={{ fontSize: 15, color: '#c4b5fd', fontWeight: 600, textAlign: 'center', marginBottom: 32, wordBreak: 'break-all' }}>
          {email}
        </p>

        <div className="ve-hint">
          <div className="ve-hint-dot" />
          <span>Click the link in the email to verify your account</span>
        </div>
        <div className="ve-hint">
          <div className="ve-hint-dot" />
          <span>Check your spam or junk folder if you don't see it</span>
        </div>
        <div className="ve-hint" style={{ marginBottom: 32 }}>
          <div className="ve-hint-dot" />
          <span>The link expires in 24 hours</span>
        </div>

        {resent && (
          <div className="ve-success-toast">
            ✓ Verification email resent successfully!
          </div>
        )}

        <button
          type="button"
          className="ve-btn-ghost"
          onClick={handleResend}
          disabled={resending || resent}
          style={{ marginBottom: 12 }}
        >
          {resending ? (
            <><RefreshCw size={15} className="ve-spin" /> Resending…</>
          ) : resent ? (
            '✓ Email Sent!'
          ) : (
            <><RefreshCw size={15} /> Resend Email</>
          )}
        </button>

        <Link to={ROUTES.LOGIN} className="ve-back-link">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.ve-orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; }
.ve-orb1 { width: 500px; height: 500px; top: -120px; right: -100px; background: rgba(109,40,217,.18); }
.ve-orb2 { width: 400px; height: 400px; bottom: -80px; left: -80px; background: rgba(79,70,229,.14); }

.ve-particle {
  position: fixed; border-radius: 50%; pointer-events: none;
  width: calc(4px + var(--i) * 2px); height: calc(4px + var(--i) * 2px);
  background: rgba(167,139,250, calc(0.15 + var(--i) * 0.05));
  top: calc(10% + var(--i) * 11%);
  left: calc(5% + var(--i) * 13%);
  animation: ve-float calc(6s + var(--i) * 1.5s) ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.8s);
}
@keyframes ve-float {
  0%, 100% { transform: translateY(0) scale(1); opacity: .5; }
  50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
}

.ve-card {
  width: 100%; max-width: 460px; position: relative; z-index: 1;
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
  border-radius: 28px; padding: 48px 40px; backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.05);
  text-align: center;
}

.ve-icon-ring {
  width: 96px; height: 96px; border-radius: 50%; margin: 0 auto 28px;
  background: conic-gradient(from 0deg, rgba(124,58,237,.4), rgba(79,70,229,.4), rgba(124,58,237,.4));
  display: flex; align-items: center; justify-content: center;
  animation: ve-rotate 8s linear infinite;
  position: relative;
}
.ve-icon-ring::before {
  content: ''; position: absolute; inset: 3px; border-radius: 50%;
  background: #0f0c1a;
}
.ve-icon-inner {
  position: relative; z-index: 1; width: 64px; height: 64px; border-radius: 50%;
  background: rgba(124,58,237,.2); border: 1px solid rgba(124,58,237,.3);
  display: flex; align-items: center; justify-content: center;
}
@keyframes ve-rotate { to { transform: rotate(360deg); } }

.ve-hint {
  display: flex; align-items: flex-start; gap: 10px; text-align: left;
  font-size: 13px; color: rgba(255,255,255,.4); line-height: 1.5; margin-bottom: 10px;
}
.ve-hint-dot {
  width: 6px; height: 6px; border-radius: 50%; background: rgba(167,139,250,.5);
  flex-shrink: 0; margin-top: 5px;
}

.ve-success-toast {
  background: rgba(52,211,153,.1); border: 1px solid rgba(52,211,153,.25);
  border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #34d399;
  margin-bottom: 16px; animation: ve-fadein .3s ease;
}
@keyframes ve-fadein { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

.ve-btn-ghost {
  width: 100%; padding: 13px; border-radius: 12px; font-size: 14px; font-weight: 600; font-family: inherit;
  background: rgba(124,58,237,.15); border: 1px solid rgba(124,58,237,.3); color: #c4b5fd;
  cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 8px;
}
.ve-btn-ghost:hover:not(:disabled) { background: rgba(124,58,237,.25); transform: translateY(-1px); }
.ve-btn-ghost:disabled { opacity: .6; cursor: not-allowed; }

.ve-spin { animation: ve-spin-anim .8s linear infinite; }
@keyframes ve-spin-anim { to { transform: rotate(360deg); } }

.ve-back-link {
  display: block; font-size: 13px; color: rgba(255,255,255,.3); text-decoration: none; font-weight: 500;
  transition: color .2s; padding: 8px;
}
.ve-back-link:hover { color: #a78bfa; }
`;
