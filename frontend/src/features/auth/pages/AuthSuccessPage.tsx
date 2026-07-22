import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import { useAuthStore } from '@/store/auth.store';

const STEPS = [
  { label: 'Authenticating your account…', sub: 'Verifying credentials', duration: 700 },
  { label: 'Preparing your Dashboard…', sub: 'Loading your workspace', duration: 900 },
  { label: 'Loading AI models…', sub: 'Connecting intelligence layer', duration: 800 },
  { label: 'Connecting to your workspace…', sub: 'Almost there', duration: 600 },
];

export default function AuthSuccessPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Animate through steps
  useEffect(() => {
    let elapsed = 0;
    const total = STEPS.reduce((acc, s) => acc + s.duration, 0);
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setStepIndex(i);
      }, elapsed);
      timers.push(t);
      elapsed += step.duration;
    });

    // Progress animation
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + (100 / (total / 30));
        return next >= 100 ? 100 : next;
      });
    }, 30);

    // Final redirect
    const finalTimer = setTimeout(() => {
      setDone(true);
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => navigate(ROUTES.DASHBOARD, { replace: true }), 400);
    }, total + 100);

    timers.push(finalTimer);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [navigate]);

  const currentStep = STEPS[stepIndex];

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', fontFamily: "'Inter', system-ui, sans-serif", background: '#07070e', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <style>{css}</style>

      {/* Background */}
      <div className="as-bg-grid" />
      <div className="as-orb as-orb1" />
      <div className="as-orb as-orb2" />
      <div className="as-orb as-orb3" />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div key={i} className="as-particle" style={{ '--i': i } as React.CSSProperties} />
      ))}

      <div className="as-center">
        {/* Logo */}
        <div className="as-logo-wrap">
          <div className={`as-logo-ring ${done ? 'as-logo-ring-done' : ''}`}>
            <div className="as-logo-inner">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="url(#grad)" strokeWidth="1.5" fill="none"/>
                <circle cx="16" cy="16" r="5" fill="url(#grad2)" />
                <defs>
                  <linearGradient id="grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a78bfa"/>
                    <stop offset="1" stopColor="#818cf8"/>
                  </linearGradient>
                  <linearGradient id="grad2" x1="11" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7c3aed"/>
                    <stop offset="1" stopColor="#4f46e5"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div className="as-brand">Vibe Agent</div>

        {/* Status text */}
        <div key={stepIndex} className="as-status-label">
          {currentStep.label}
        </div>
        <div key={`sub-${stepIndex}`} className="as-status-sub">
          {currentStep.sub}
        </div>

        {/* Progress bar */}
        <div className="as-progress-track">
          <div className="as-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Step dots */}
        <div className="as-dots">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`as-dot ${i < stepIndex ? 'as-dot-done' : i === stepIndex ? 'as-dot-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

.as-bg-grid {
  position: fixed; inset: 0;
  background-image: linear-gradient(rgba(139,92,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.04) 1px,transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

.as-orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; }
.as-orb1 { width: 500px; height: 500px; top: -150px; left: -100px; background: rgba(109,40,217,.25); animation: as-pulse 4s ease-in-out infinite; }
.as-orb2 { width: 400px; height: 400px; bottom: -100px; right: -80px; background: rgba(79,70,229,.2); animation: as-pulse 5s ease-in-out infinite .5s; }
.as-orb3 { width: 300px; height: 300px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: rgba(168,85,247,.15); animation: as-pulse 3s ease-in-out infinite 1s; }
@keyframes as-pulse { 0%,100% { opacity:.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
.as-orb3 { animation-name: as-pulse3; }
@keyframes as-pulse3 { 0%,100% { opacity:.7; transform: translate(-50%,-50%) scale(1); } 50% { opacity: 1; transform: translate(-50%,-50%) scale(1.15); } }

.as-particle {
  position: fixed; border-radius: 50%; pointer-events: none;
  width: calc(2px + (var(--i) % 3) * 2px);
  height: calc(2px + (var(--i) % 3) * 2px);
  background: rgba(167,139,250, .3);
  top: calc(var(--i) * 5%);
  left: calc(var(--i) * 5.2%);
  animation: as-float calc(5s + (var(--i) % 5) * 2s) ease-in-out infinite;
  animation-delay: calc((var(--i) % 8) * -1s);
}
@keyframes as-float {
  0%,100% { transform: translateY(0) translateX(0) scale(1); opacity: .4; }
  33% { transform: translateY(-30px) translateX(10px) scale(1.2); opacity: .8; }
  66% { transform: translateY(-15px) translateX(-8px) scale(0.9); opacity: .6; }
}

.as-center {
  position: relative; z-index: 10;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  padding: 0 24px;
}

.as-logo-wrap { margin-bottom: 28px; }
.as-logo-ring {
  width: 100px; height: 100px; border-radius: 50%; position: relative;
  background: conic-gradient(from 0deg, #7c3aed, #4f46e5, #818cf8, #7c3aed);
  animation: as-spin 3s linear infinite;
  display: flex; align-items: center; justify-content: center;
  transition: transform .4s;
}
.as-logo-ring::before {
  content: ''; position: absolute; inset: 3px; border-radius: 50%;
  background: #07070e;
}
.as-logo-ring-done { animation-duration: .4s; }
.as-logo-inner {
  position: relative; z-index: 1; width: 68px; height: 68px; border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(124,58,237,.4), rgba(79,70,229,.2));
  border: 1px solid rgba(124,58,237,.3);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 30px rgba(124,58,237,.4), inset 0 0 20px rgba(124,58,237,.15);
}
@keyframes as-spin { to { transform: rotate(360deg); } }

.as-brand {
  font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.8px; margin-bottom: 32px;
  background: linear-gradient(135deg, #e0d7ff, #fff, #c4b5fd);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.as-status-label {
  font-size: 22px; font-weight: 700; color: #fff; letter-spacing: -0.5px;
  margin-bottom: 8px;
  animation: as-fade-up .4s cubic-bezier(.22,1,.36,1);
}
.as-status-sub {
  font-size: 14px; color: rgba(255,255,255,.35); margin-bottom: 40px; font-weight: 400;
  animation: as-fade-up .4s cubic-bezier(.22,1,.36,1) .05s both;
}
@keyframes as-fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.as-progress-track {
  width: 280px; height: 3px; background: rgba(255,255,255,.08); border-radius: 99px;
  overflow: hidden; margin-bottom: 20px;
}
.as-progress-fill {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, #7c3aed, #818cf8, #c4b5fd);
  transition: width .06s linear;
  box-shadow: 0 0 8px rgba(124,58,237,.8);
}

.as-dots { display: flex; gap: 8px; }
.as-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: rgba(255,255,255,.12); transition: all .3s;
}
.as-dot-active {
  background: #7c3aed; width: 24px; border-radius: 4px;
  box-shadow: 0 0 8px rgba(124,58,237,.6);
}
.as-dot-done { background: rgba(124,58,237,.5); }
`;
