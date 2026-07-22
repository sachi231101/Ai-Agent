import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useResetPassword } from '../hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import { Sparkles, Eye, EyeOff, KeyRound } from 'lucide-react';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationError, setValidationError] = useState('');
  const resetMutation = useResetPassword();

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
    if (!token) {
      setValidationError('Invalid reset link. Please request a new one.');
      return;
    }
    resetMutation.mutate({ token, password });
  };

  const error = validationError || ((resetMutation.isError && ((resetMutation.error as any)?.response?.data?.message || 'Reset failed.')) || '');

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', fontFamily: "'Inter', system-ui, sans-serif", background: '#0a0a0f', alignItems: 'center', justifyContent: 'center', padding: 24, boxSizing: 'border-box' }}>
      <style>{css}</style>
      <div className="rp-orb rp-orb1" />
      <div className="rp-orb rp-orb2" />

      <div className="rp-card">
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(124,58,237,.4)' }}>
            <Sparkles size={15} color="#fff" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Vibe Agent</span>
        </div>

        <div className="rp-icon">
          <KeyRound size={26} color="#a78bfa" strokeWidth={1.5} />
        </div>

        <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 8 }}>Set new password</div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,.4)', lineHeight: 1.65, marginBottom: 28 }}>
          Choose a strong password for your account.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label className="rp-label">New Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="rp-input"
                style={{ paddingRight: 44 }}
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoFocus
                autoComplete="new-password"
              />
              <button type="button" className="rp-eye" onClick={() => setShowPassword(v => !v)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label className="rp-label">Confirm New Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="rp-input"
                style={{ paddingRight: 44, borderColor: confirmPassword && password !== confirmPassword ? 'rgba(239,68,68,.5)' : undefined }}
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repeat your new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button type="button" className="rp-eye" onClick={() => setShowConfirm(v => !v)}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Password strength indicator */}
          {password && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                {[1, 2, 3, 4].map(i => {
                  const strength = Math.min(Math.floor(password.length / 3), 4);
                  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
                  return <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? colors[strength - 1] : 'rgba(255,255,255,.1)', transition: 'background .3s' }} />;
                })}
              </div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,.3)' }}>
                {password.length < 4 ? 'Too short' : password.length < 7 ? 'Weak' : password.length < 10 ? 'Good' : 'Strong'}
              </span>
            </div>
          )}

          {error && <div className="rp-error">{error}</div>}

          <button type="submit" className="rp-btn" disabled={resetMutation.isPending}>
            {resetMutation.isPending ? 'Updating…' : 'Update Password'}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Link to={ROUTES.LOGIN} style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none', fontWeight: 500 }}>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
.rp-orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; }
.rp-orb1 { width: 400px; height: 400px; top: -100px; left: -80px; background: rgba(109,40,217,.15); }
.rp-orb2 { width: 350px; height: 350px; bottom: -80px; right: -60px; background: rgba(79,70,229,.12); }
.rp-card {
  width: 100%; max-width: 420px; position: relative; z-index: 1;
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
  border-radius: 24px; padding: 40px; backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.05);
}
.rp-icon {
  width: 56px; height: 56px; border-radius: 16px;
  background: rgba(124,58,237,.15); border: 1px solid rgba(124,58,237,.25);
  display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
}
.rp-label { display: block; font-size: 13px; font-weight: 500; color: rgba(255,255,255,.6); margin-bottom: 8px; }
.rp-input {
  width: 100%; padding: 13px 16px; border-radius: 12px; font-size: 15px; font-family: inherit;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); color: #fff;
  outline: none; transition: border-color .2s, box-shadow .2s; box-sizing: border-box;
}
.rp-input::placeholder { color: rgba(255,255,255,.2); }
.rp-input:focus { border-color: rgba(139,92,246,.6); box-shadow: 0 0 0 3px rgba(139,92,246,.15); }
.rp-eye {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer; color: rgba(255,255,255,.3);
  padding: 4px; display: flex; align-items: center; transition: color .2s;
}
.rp-eye:hover { color: rgba(255,255,255,.7); }
.rp-error {
  background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3);
  border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #f87171; margin-bottom: 16px;
}
.rp-btn {
  width: 100%; padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 600; font-family: inherit;
  background: linear-gradient(135deg,#7c3aed,#4f46e5); color: #fff; border: none; cursor: pointer;
  transition: all .2s; box-shadow: 0 4px 20px rgba(124,58,237,.4);
}
.rp-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(124,58,237,.55); }
.rp-btn:disabled { opacity: .6; cursor: not-allowed; }
`;
