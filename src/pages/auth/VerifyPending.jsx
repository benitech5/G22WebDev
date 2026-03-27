import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, CheckCircle2, Clock } from 'lucide-react'
import Logo from '../../components/ui/logo'
import { AvatarInitials } from '../../components/ui/index'

const steps = [
  { num: 1, title: 'Data Validation', desc: 'Our team cross-references your medical license with national databases.', active: true },
  { num: 2, title: 'Board Approval', desc: 'Final verification by our medical regulatory board members.', active: false },
  { num: 3, title: 'Portal Activation', desc: "You'll receive an email notification once your profile is live.", active: false },
]

const docs = [
  { name: 'State Medical License', date: 'Uploaded Oct 12, 2023' },
  { name: 'Board Certification (Internal Medicine)', date: 'Uploaded Oct 12, 2023' },
  { name: 'Professional Liability Insurance', date: 'Uploaded Oct 12, 2023' },
  { name: 'Government Issued ID', date: 'Uploaded Oct 12, 2023' },
]

export default function VerifyPending() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font)' }}>
      {/* Topbar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="hl-logo">
          <Logo className="hl-logo-icon" />
          <span className="hl-logo-text">HealthLinka</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Bell size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
          <AvatarInitials name="JD" size={34} />
        </div>
      </div>

      <div style={{ maxWidth: 660, margin: '0 auto', padding: '32px 16px' }}>
        {/* Main card */}
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Clock size={24} color="var(--orange)" />
            <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Verification Pending</h1>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
            Welcome, Dr. Kofi Mensah. We're currently reviewing your professional credentials to ensure the highest standard of patient care.
          </p>

          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 20 }}>
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80" alt="Medical review" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            <div style={{ background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)', padding: '14px 16px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Estimated Wait Time</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--green-primary)' }}>3-5 Business Days</div>
            </div>
            <div style={{ background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)', padding: '14px 16px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Current Status</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }} />
                In Review
              </div>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>What happens next?</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {steps.map(step => (
              <div key={step.num} style={{ flex: '1 1 160px' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: step.active ? 'var(--green-primary)' : 'var(--border)', color: step.active ? '#fff' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, marginBottom: 10 }}>
                  {step.num}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: step.active ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom: 4 }}>{step.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Submitted documents */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Submitted Documents</h3>
            <span style={{ background: 'var(--green-light)', color: 'var(--green-primary)', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>4 of 4 completed</span>
          </div>
          {docs.map(doc => (
            <div key={doc.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-light)', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={18} color="var(--green-primary)" />
                <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{doc.name}</span>
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{doc.date}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 28, marginBottom: 20 }}>
          © 2026 Practitioner Portal Inc. All rights reserved.
        </p>
      </div>
    </div>
  )
}