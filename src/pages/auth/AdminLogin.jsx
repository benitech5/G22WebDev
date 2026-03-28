import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, HelpCircle, LogIn } from 'lucide-react'
import Logo from '../../components/ui/logo'
import Button from '../../components/ui/button'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', fontFamily: 'var(--font)' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="hl-logo">
          <Logo className="hl-logo-icon" />
          <span className="hl-logo-text">HealthLinka</span>
          <span className="hl-logo-text" style={{ color: 'var(--green-primary)' }}>Super Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--green-primary)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          <HelpCircle size={15} /> Support
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', padding: '20px 16px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 460, overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          {/* Hero */}
          <div style={{ position: 'relative' }}>
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.x-ELeinJFNf_a8tLkEl_NQHaDT?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Hospital"
              style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block', filter: 'brightness(0.5)' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px' }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Welcome Back</h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Enterprise Management Portal</p>
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Email Address or Username</label>
                <div className="input-wrap">
                  <Mail size={16} className="input-icon" />
                  <input type="email" placeholder="admin@healthlinka.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrap">
                  <Lock size={16} className="input-icon" />
                  <input type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                  <button type="button" onClick={() => setShowPw(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)', cursor: 'pointer' }}>Forgot Password?</span>
              </div>
              <Button
                action={() => navigate('/admin/dashboard')}
                innerText="Login to Dashboard"
                variant="lg"
                iconRight={LogIn}
              />
            </div>

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 20, lineHeight: 1.5 }}>
              Secure Enterprise Access Controlled by HealthLinka Security Protocols.
            </p>
          </div>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', paddingBottom: 20 }}>
        © 2024 HealthLinka. All rights reserved.
      </p>
    </div>
  )
}
