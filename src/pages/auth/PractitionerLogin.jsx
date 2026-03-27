import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react'
import Logo from '../../components/ui/logo'
import { InputField } from '../../components/ui/index'
import Button from '../../components/ui/button'

export default function PractitionerLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/practitioner/dashboard')
  }

  return (
    <div className="auth-page">
      {/* Header */}
      <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)', background: '#fff' }}>
        <div className="hl-logo">
          <Logo className="hl-logo-icon" />
          <span className="hl-logo-text">HealthLinka</span>
        </div>
      </div>

      <div className="auth-center">
        <div className="auth-card" style={{ maxWidth: 520 }}>
          {/* Logo + header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div className="hl-logo" style={{ justifyContent: 'center' }}>
              <Logo className="hl-logo-icon" style={{ width: 44, height: 44 }} />
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Practitioner Portal</div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)' }}>Practitioner Login</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <InputField
              label="Username"
              icon={User}
              placeholder="Enter your username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            />
            <InputField
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />

            <Button type="submit" innerText="Login" icon={ArrowRight} variant="lg" style={{ marginTop: 4 }} />
          </form>

          <div className="divider" />

          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <span style={{ color: 'var(--green-primary)', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/practitioner/signup')}>
              Create an Account
            </span>
          </p>

          <div style={{ marginTop: 28, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>© 2024 HealthLinka Systems Inc. All rights reserved.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
              {['Privacy Policy', 'Terms of Service', 'Support'].map(l => (
                <span key={l} style={{ fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer' }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}