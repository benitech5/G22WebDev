import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Mail, Lock, ShieldCheck, ArrowRight, User, HelpCircle } from 'lucide-react'
import Logo from '../../components/ui/logo'
import Button from '../../components/ui/button'

export default function HospitalRegistration() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    hospitalName: '', email: '', password: '', confirmPassword: '', agree: false,
    contactName: '', phone: '', address: '',
    licenseNumber: '', accreditation: '',
  })

  const steps = ['Account Setup', 'Hospital Details', 'Accreditation']

  const handleNext = (e) => {
    e.preventDefault()
    if (step < 3) setStep(s => s + 1)
    else navigate('/hospital/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0faf4 0%, #e8f7ef 100%)' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: 12 }}>
        <div className="hl-logo">
          <Logo className="hl-logo-icon" />
          <span className="hl-logo-text">HealthLinka</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.06em' }}>Step {step} of 3</span>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{steps[step - 1]}</span>
        </div>
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '32px 16px' }}>
        {/* Step indicators */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? 'var(--green-primary)' : 'var(--border)', transition: 'background 0.3s' }} />
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '28px 24px', boxShadow: 'var(--shadow-md)' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
            {step === 1 ? 'Hospital Registration' : step === 2 ? 'Hospital Details' : 'Accreditation Info'}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>
            {step === 1 ? 'Join the HealthLinka network to streamline your healthcare management.' :
              step === 2 ? 'Provide your hospital contact and location information.' :
              'Upload your accreditation documents for verification.'}
          </p>

          <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {step === 1 && (
              <>
                <div className="form-group">
                  <label className="form-label">Hospital Name</label>
                  <div className="input-wrap">
                    <Building2 size={16} className="input-icon" />
                    <input placeholder="e.g. Perfect Health and Wellness Hospital" value={form.hospitalName} onChange={e => setForm(f => ({ ...f, hospitalName: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Work Email</label>
                  <div className="input-wrap">
                    <Mail size={16} className="input-icon" />
                    <input type="email" placeholder="admin@hospital.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><HelpCircle size={11} /> Use official hospital email</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="input-wrap">
                      <Lock size={16} className="input-icon" />
                      <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-wrap">
                      <ShieldCheck size={16} className="input-icon" />
                      <input type="password" placeholder="••••••••" value={form.confirmPassword} onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))} />
                    </div>
                  </div>
                </div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)' }}>
                  <input type="checkbox" checked={form.agree} onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))} style={{ marginTop: 2, accentColor: 'var(--green-primary)' }} />
                  <span>I agree to the <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>Privacy Policy</span>.</span>
                </label>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-group">
                  <label className="form-label">Contact Person Name</label>
                  <div className="input-wrap"><User size={16} className="input-icon" /><input placeholder="Full name" value={form.contactName} onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))} /></div>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <div className="input-wrap"><input placeholder="+233 XX XXX XXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
                </div>
                <div className="form-group">
                  <label className="form-label">Hospital Address</label>
                  <div className="input-wrap"><input placeholder="Street, City, Region" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} /></div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="form-group">
                  <label className="form-label">Hospital License Number</label>
                  <div className="input-wrap"><input placeholder="HLN-0000-0000" value={form.licenseNumber} onChange={e => setForm(f => ({ ...f, licenseNumber: e.target.value }))} /></div>
                </div>
                <div className="form-group">
                  <label className="form-label">Accreditation Body</label>
                  <div className="input-wrap">
                    <select value={form.accreditation} onChange={e => setForm(f => ({ ...f, accreditation: e.target.value }))}>
                      <option value="">Select accreditation body</option>
                      <option>Ghana Health Service</option>
                      <option>Medical and Dental Council</option>
                      <option>Private Hospitals Association of Ghana</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <Button
              type="submit"
              innerText={step < 3 ? 'Proceed to Certification' : 'Complete Registration'}
              variant="lg"
              iconRight={ArrowRight}
              style={{ marginTop: 8 }}
            />
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)', marginTop: 20 }}>
            Already registered?{' '}
            <span style={{ color: 'var(--green-primary)', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/hospital/login')}>
              Log in to dashboard
            </span>
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 24, flexWrap: 'wrap' }}>
          {['HIPAA COMPLIANT', '256-BIT ENCRYPTED', '24/7 MEDSUPPORT'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-muted)', fontSize: 11, fontWeight: 600 }}>
              <ShieldCheck size={12} />{t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}