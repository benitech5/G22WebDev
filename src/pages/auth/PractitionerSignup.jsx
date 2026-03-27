import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, ShieldCheck, ArrowRight } from 'lucide-react'
import Logo from '../../components/ui/logo'
import { InputField } from '../../components/ui/index'
import Button from '../../components/ui/button'

export default function PractitionerSignup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '', agree: false })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/practitioner/credentials')
  }

  return (
    <div className="auth-page" style={{ background: 'var(--bg-page)' }}>
      <div className="auth-center">
        <div className="auth-card">
          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
            <div className="hl-logo">
              <Logo className="hl-logo-icon" style={{ width: 44, height: 44 }} />
            </div>
            <div style={{ marginTop: 10, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Practitioner Portal</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)' }}>Create Account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InputField label="Username" icon={User} placeholder="Enter your username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
            <InputField label="Password" icon={Lock} type="password" placeholder="Create a strong password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            <InputField label="Re-enter Password" icon={ShieldCheck} type="password" placeholder="Repeat your password" value={form.confirmPassword} onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))} />

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)' }}>
              <input type="checkbox" checked={form.agree} onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))} style={{ marginTop: 2, accentColor: 'var(--green-primary)' }} />
              <span>By creating an account, you agree to the{' '}
                <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>Terms of Service</span> and{' '}
                <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>Privacy Policy</span>.
              </span>
            </label>

            <Button type="submit" innerText="Provide Certification" variant="lg" iconRight={ArrowRight} style={{ marginTop: 4 }} />
          </form>

          <div className="divider" />

          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <span style={{ color: 'var(--green-primary)', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/practitioner/login')}>Login here</span>
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
            {['SSL Secure', 'HIPAA Compliant'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-muted)', fontSize: 12 }}>
                <ShieldCheck size={13} /><span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}