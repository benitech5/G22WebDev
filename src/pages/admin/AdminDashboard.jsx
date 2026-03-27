import React, { useState } from 'react'
import { Search, Bell, ShieldCheck, History, ArrowRight, RefreshCw } from 'lucide-react'
import Logo from '../../components/ui/logo'
import { Badge, AvatarInitials } from '../../components/ui/index'
import PractitionerVerificationModal from '../../components/shared/PractitionerVerificationModal'
import HospitalVerificationModal from '../../components/shared/HospitalVerificationModal'
import SystemActivityModal from '../../components/shared/SystemActivityModal'

const practitioners = [
  { initials: 'KM', bg: '#E8F7EF', color: '#1E9B5B', name: 'Dr. Kofi Mensah', spec: 'Cardiology', date: 'Oct 12, 2023', status: 'Pending', statusVariant: 'orange' },
  { initials: 'MT', bg: '#EBF8FF', color: '#3182CE', name: 'Mark Thompson', spec: 'Emergency Nursing', date: 'Oct 14, 2023', status: 'Verified', statusVariant: 'green' },
  { initials: 'JW', bg: '#F3E8FF', color: '#805AD5', name: 'Dr. James Wilson', spec: 'Pediatrics', date: 'Oct 15, 2023', status: 'In Review', statusVariant: 'grey' },
]

const hospitals = [
  { name: 'Perfect Health and Wellness Centre', region: 'Greater Accra', date: 'Sep 28, 2023', status: 'Active', statusVariant: 'green' },
  { name: 'Central Care Clinic', region: 'Ashanti', date: 'Oct 05, 2023', status: 'Pending', statusVariant: 'orange' },
]

const systemActivity = [
  { type: 'Contract', id: '#CT-4892', action: "New contract created between St. Mary's and Dr. Osei", time: '2 min ago', icon: '📄' },
  { type: 'Payment', id: '#PAY-1104', action: 'Escrow released: GH₵8,400 to Dr. Kofi Mensah', time: '14 min ago', icon: '💰' },
  { type: 'Alert', id: '#ALT-002', action: 'Compliance flag raised for Ridge Medical license renewal', time: '1 hr ago', icon: '⚠️' },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState('verification')
  const [showPractVerify, setShowPractVerify] = useState(null)
  const [showHospVerify, setShowHospVerify] = useState(null)
  const [showActivity, setShowActivity] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font)' }}>
      {/* Admin Topbar */}
      <div className="topbar" style={{ padding: '0 24px' }}>
        <div className="hl-logo" style={{ flexShrink: 0 }}>
          <Logo className="hl-logo-icon" />
          <span className="hl-logo-text">HealthLinka</span>
        </div>
        <div className="topbar-search">
          <Search size={14} color="var(--text-muted)" />
          <input placeholder="Search records..." />
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <Bell size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ textAlign: 'right', display: 'none' }} className="admin-name">
              <div style={{ fontSize: 13, fontWeight: 700 }}>Alex Rivera</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Super Admin</div>
            </div>
            <img src="https://i.pravatar.cc/34?img=15" className="avatar" width={34} height={34} alt="admin" />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
        {/* Tabs */}
        <div className="tabs" style={{ marginBottom: 24 }}>
          <div className={`tab ${tab === 'verification' ? 'active' : ''}`} onClick={() => setTab('verification')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={16} /> <span>Verification</span>
          </div>
          <div className={`tab ${tab === 'activity' ? 'active' : ''}`} onClick={() => setTab('activity')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <History size={16} /> <span>System Activity</span>
          </div>
        </div>

        {tab === 'verification' && (
          <>
            {/* Practitioner Verification */}
            <div className="card" style={{ padding: '20px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 32 32" fill="none"><rect x="14.5" y="9" width="3" height="14" rx="1.5" fill="#1E9B5B"/><rect x="9" y="14.5" width="14" height="3" rx="1.5" fill="#1E9B5B"/></svg>
                  </div>
                  <h2 style={{ fontSize: 17, fontWeight: 700 }}>Practitioner Verification</h2>
                </div>
                <span style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>12 Pending</span>
              </div>
              <div className="table-wrap" style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ minWidth: 560 }}>
                  <thead>
                    <tr>
                      <th>Practitioner Name</th>
                      <th>Specialization</th>
                      <th>Registration Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {practitioners.map(p => (
                      <tr key={p.name}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <AvatarInitials name={p.initials} size={32} bg={p.bg} color={p.color} fontSize={12} />
                            <span style={{ fontWeight: 600 }}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>{p.spec}</td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{p.date}</td>
                        <td><Badge variant={p.statusVariant} dot>{p.status}</Badge></td>
                        <td>
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font)', padding: 0 }} onClick={() => setShowPractVerify(p)}>
                            View <ArrowRight size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hospital Verification */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#EBF8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏢</div>
                <h2 style={{ fontSize: 17, fontWeight: 700 }}>Hospital Verification</h2>
              </div>
              <div className="table-wrap" style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ minWidth: 500 }}>
                  <thead>
                    <tr>
                      <th>Hospital Name</th>
                      <th>Region</th>
                      <th>Registration Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitals.map(h => (
                      <tr key={h.name}>
                        <td style={{ fontWeight: 600 }}>{h.name}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{h.region}</td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{h.date}</td>
                        <td><Badge variant={h.statusVariant} dot>{h.status}</Badge></td>
                        <td>
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font)', padding: 0 }} onClick={() => setShowHospVerify(h)}>
                            View <ArrowRight size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="btn btn-ghost" style={{ width: '100%', marginTop: 16, fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>
                LOAD MORE HOSPITALS
              </button>
            </div>
          </>
        )}

        {tab === 'activity' && (
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>System Activity Log</h2>
              <button className="btn btn-ghost btn-sm"><RefreshCw size={13} /> Refresh</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {systemActivity.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} onClick={() => setShowActivity(a)}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{a.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.action}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{a.type} · {a.id}</div>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{a.time}</span>
                  <ArrowRight size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', paddingBottom: 24 }}>© 2024 HealthLinka. All rights reserved.</p>

      {showPractVerify && <PractitionerVerificationModal data={showPractVerify} onClose={() => setShowPractVerify(null)} />}
      {showHospVerify && <HospitalVerificationModal data={showHospVerify} onClose={() => setShowHospVerify(null)} />}
      {showActivity && <SystemActivityModal data={showActivity} onClose={() => setShowActivity(null)} />}
    </div>
  )
}