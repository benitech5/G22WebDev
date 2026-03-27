import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HelpCircle, ChevronDown, Upload, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react'
import Logo from '../../components/ui/logo'
import { ProgressBar } from '../../components/ui/index'
import Button from '../../components/ui/button'

export default function PractitionerCredentials() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: 'Dr. Kofi Mensah', profession: '', licenseNumber: '', region: '' })
  const [dragging, setDragging] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/practitioner/verify-pending')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#5A6A7A', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
        <div className="hl-logo">
          <Logo className="hl-logo-icon" />
          <span className="hl-logo-text">HealthLinka</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <HelpCircle size={15} /> Help Center
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 16px' }}>
        <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 740, padding: '28px 24px' }}>
          {/* Progress */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Registration Progress</div>
                <div style={{ fontSize: 12, color: 'var(--green-primary)', fontWeight: 600 }}>Next: Verification Review</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>50% Completed</span>
            </div>
            <ProgressBar value={50} />
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>Professional Credentials</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>Provide your licensing information to join our verified health network.</p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 18 }}>
              <div className="form-group">
                <label className="form-label">Legal Full Name</label>
                <div className="input-wrap"><input value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} /></div>
              </div>
              <div className="form-group">
                <label className="form-label">Profession</label>
                <div className="input-wrap">
                  <select value={form.profession} onChange={e => setForm(f => ({ ...f, profession: e.target.value }))}>
                    <option value="">Select your role</option>
                    <option>Cardiologist</option><option>General Practitioner</option>
                    <option>Surgeon</option><option>Nurse Practitioner</option>
                    <option>Pediatrician</option><option>Radiologist</option>
                  </select>
                  <ChevronDown size={14} color="var(--text-muted)" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">License Number</label>
                <div className="input-wrap"><input placeholder="LCN-000-0000" value={form.licenseNumber} onChange={e => setForm(f => ({ ...f, licenseNumber: e.target.value }))} /></div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <HelpCircle size={11} /> Found on your official professional card
                </span>
              </div>
              <div className="form-group">
                <label className="form-label">Practicing Region</label>
                <div className="input-wrap">
                  <select value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))}>
                    <option value="">Select Region</option>
                    <option>Greater Accra</option><option>Ashanti</option>
                    <option>Western</option><option>Eastern</option>
                    <option>Central</option><option>Volta</option>
                  </select>
                  <ChevronDown size={14} color="var(--text-muted)" />
                </div>
              </div>
            </div>

            {/* Upload area */}
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label className="form-label">Upload Credentials (PDF, JPG, PNG)</label>
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false) }}
                style={{
                  border: `2px dashed ${dragging ? 'var(--green-primary)' : '#C8E6D4'}`,
                  borderRadius: 'var(--radius-md)', background: dragging ? 'var(--green-light)' : '#F8FBF9',
                  padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 10, cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Upload size={20} color="var(--green-primary)" />
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center' }}>Click to upload or drag and drop</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Maximum file size: 10MB</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, background: 'var(--green-light)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 28 }}>
              <ShieldCheck size={18} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                By uploading, you certify that these documents are authentic. Verification typically takes <strong>24-48 hours</strong>.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <Button action={() => navigate('/practitioner/signup')} innerText="Back" variant="ghost" icon={ArrowLeft} />
              <Button type="submit" innerText="Save & Continue" iconRight={ArrowRight} style={{ padding: '12px 28px', fontSize: 15, fontWeight: 700 }} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}