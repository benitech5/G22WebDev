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
    <div className="auth-page">

      {/* HEADER */}
      <div style={{
        padding: '14px 24px',
        background: '#fff',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="hl-logo">
          <Logo className="hl-logo-icon" />
          <span className="hl-logo-text">HealthLinka</span>
        </div>
      </div>

      {/* TITLE */}
      <div style={{ paddingTop: 30, textAlign: 'center' }}>
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--green-primary)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 6
        }}>
          Hospital Portal
        </div>

        <h1 style={{
          fontSize: 30,
          fontWeight: 800,
          marginBottom: 6
        }}>
          Welcome Back
        </h1>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          Access your administrative healthcare dashboard
        </p>
      </div>

      {/* CARD */}
      <div className="auth-center">
        <div className="auth-card" style={{
          maxWidth: 420,
          padding: 0,
          overflow: 'hidden',
          borderRadius: '16px'
        }}>

          {/* IMAGE */}
          <div style={{ position: 'relative' }}>
            <img
              src="https://img.freepik.com/premium-photo/hall-deep-empty-hospital-corridor_839035-462243.jpg"
              alt="Hospital"
              style={{
                width: '100%',
                height: 160,
                objectFit: 'cover'
              }}
            />

            {/* FADE OVERLAY */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.2) 30%,rgba(255,255,255,0.6) 65%,rgba(255,255,255,0.98) 100%)`
            }} />

            {/* LABEL */}
            <div style={{
              position: 'absolute',
              bottom: 10,
              left: 20,
              fontSize: 13,
              fontWeight: 600
            }}>
              Hospital Email or Phone
            </div>
          </div>

          {/* FORM */}
          <div style={{ padding: '20px 24px 26px' }}>

            {/* EMAIL */}
            <div className="input-wrap" style={{ marginBottom: 16 }}>
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                placeholder="administrator@hospital.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
            </div>

            {/* PASSWORD */}
            <div style={{ marginBottom: 6 }}>
              <div style={{
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 6
              }}>
                Password
              </div>

              <div className="input-wrap">
                <Lock size={16} className="input-icon" />

                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                />

                <button
                  type="button"
                  onClick={() => setShowPw(s => !s)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* FORGOT */}
            <div style={{ textAlign: 'right', marginBottom: 18 }}>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--orange)',
                cursor: 'pointer'
              }}>
                FORGOT PASSWORD?
              </span>
            </div>

            {/* BUTTON */}
            <Button
              action={() => navigate('/hospital/dashboard')}
              innerText="Login to Dashboard"
              variant="lg"
              icon={LogIn}
            />

            <div className="divider" />

            {/* TERMS */}
            <p style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}>
              By logging in, you agree to HealthLinka's{' '}
              <span style={{ color: 'var(--green-primary)', cursor: 'pointer' }}>
                Terms of Service
              </span>{' '}
              and{' '}
              <span style={{ color: 'var(--green-primary)', cursor: 'pointer' }}>
                Privacy Policy
              </span>
            </p>

          </div>
        </div>
      </div>
  
      <div style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        gap: 24,
        flexWrap: 'wrap',
        marginBottom: 16,
      }}>
        {['HIPAA COMPLIANT', 'SSL SECURED'].map(t => (
          <div key={t} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: 'var(--text-muted)',
            fontWeight: 600
          }}>
            <ShieldCheck size={14} /> {t}
          </div>
        ))}
      </div>
      <footer style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '28px 24px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: 12,
          color: 'var(--text-muted)',
        }}>
          © 2024 HealthLinka Enterprise Solutions. All rights reserved.
        </p>
      </footer>

    </div>
  )
}
