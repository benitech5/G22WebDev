import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, LogIn } from 'lucide-react'
import Logo from '../../components/ui/logo'
import Button from '../../components/ui/button'

export default function HospitalLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)

  return (
    <div className="auth-page" style={{ background: 'var(--bg-page)' }}>
      {/* Header */}
      <div style={{ padding: '14px 24px', background: '#fff', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>
        <div className="hl-logo">
          <Logo className="hl-logo-icon" />
          <span className="hl-logo-text">HealthLinka</span>
        </div>
      </div>

      <div className="auth-center">
        <div className="auth-card" style={{ maxWidth: 440, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '28px 28px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-primary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Hospital Portal</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Welcome Back</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Access your administrative healthcare dashboard</p>
          </div>

          <div style={{ position: 'relative', margin: '20px 28px 0' }}>
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80"
              alt="Hospital"
              style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 'var(--radius-md)', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)', borderRadius: '0 0 var(--radius-md) var(--radius-md)', padding: '8px 16px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Hospital Email or Phone</div>
            </div>
          </div>

          <div style={{ padding: '0 28px 28px' }}>
            <div className="input-wrap" style={{ marginBottom: 16, marginTop: 8 }}>
              <Mail size={16} className="input-icon" />
              <input type="email" placeholder="administrator@hospital.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>

            <div className="form-group" style={{ marginBottom: 8 }}>
              <label className="form-label">Password</label>
              <div className="input-wrap">
                <Lock size={16} className="input-icon" />
                <input type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                <button type="button" onClick={() => setShowPw(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)', cursor: 'pointer' }}>FORGOT PASSWORD?</span>
            </div>

            <Button action={() => navigate('/hospital/dashboard')} innerText="Login to Dashboard" variant="lg" icon={LogIn} />

            <div className="divider" />

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              By logging in, you agree to HealthLinka's{' '}
              <span style={{ color: 'var(--green-primary)', cursor: 'pointer' }}>Terms of Service</span>
              {' '}and{' '}
              <span style={{ color: 'var(--green-primary)', cursor: 'pointer' }}>Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', paddingBottom: 24, display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap', padding: '0 16px 24px' }}>
        {['HIPAA COMPLIANT', 'SSL SECURED'].map(t => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}>
            <ShieldCheck size={14} />{t}
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', paddingBottom: 20 }}>
        © 2024 HealthLinka Enterprise Solutions. All rights reserved.
      </p>
    </div>
  )
}