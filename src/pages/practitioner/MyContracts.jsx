import React, { useState } from 'react'
import { Search, Settings, Bell, MapPin, Calendar, AlertTriangle, Lock } from 'lucide-react'
import PractitionerSidebar from '../../components/layout/PractitionerSidebar'
import Logo from '../../components/ui/logo'
import { Badge, ProgressBar } from '../../components/ui/index'

const contracts = [
  { id: 'CN-8821', title: 'Senior Nurse Practitioner - City General', location: 'Downtown Medical District', period: 'Jan 2024 - June 2024', status: 'active', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&q=80', onShift: false },
  { id: 'CN-9042', title: "ICU Specialist - St. Jude's Medical", location: 'North Wing, Level 4', period: 'Ongoing Contract', status: 'active', image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=200&q=80', onShift: true },
]

export default function MyContracts() {
  const [activeTab, setActiveTab] = useState('active')
  const [selectedContract, setSelectedContract] = useState(contracts[1])

  return (
    <div className="page-layout">
      <PractitionerSidebar />
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div className="hl-logo" style={{ flexShrink: 0 }}>
            <Logo className="hl-logo-icon" />
            <span className="hl-logo-text">HealthLinka</span>
          </div>
          <div className="topbar-search" style={{ marginLeft: 12 }}>
            <Search size={14} color="var(--text-muted)" />
            <input placeholder="Search contracts..." />
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
            <Bell size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
            <Settings size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
            <img src="https://i.pravatar.cc/34?img=12" className="avatar" width={34} height={34} alt="user" />
          </div>
        </div>

        <div className="page-inner">
          <div style={{ marginBottom: 20 }}>
            <h1 className="page-title">My Contracts</h1>
            <p className="page-subtitle">Review, manage, and track your active clinical engagements.</p>
          </div>

          {/* Tabs */}
          <div className="tabs" style={{ marginBottom: 20 }}>
            {[['active', 'Active Contracts'], ['pending', 'Pending Applications'], ['ext', 'Extension/Termination']].map(([key, label]) => (
              <div key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</div>
            ))}
          </div>

          {/* Contract cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
            {contracts.map(contract => (
              <div
                key={contract.id}
                className="card"
                style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', border: selectedContract?.id === contract.id ? '2px solid var(--green-primary)' : '1px solid var(--border)', position: 'relative' }}
                onClick={() => setSelectedContract(contract)}
              >
                {contract.onShift && (
                  <div style={{ position: 'absolute', top: 10, right: 10, background: 'var(--green-primary)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 4, zIndex: 1 }}>ON-SHIFT NOW</div>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
                  <img src={contract.image} alt={contract.title} style={{ width: 'clamp(80px, 25%, 120px)', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ padding: '14px 16px', flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <Badge variant="green">ACTIVE</Badge>
                      <h3 style={{ fontSize: 14, fontWeight: 700, marginTop: 6, marginBottom: 4 }}>{contract.title}</h3>
                      <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{contract.location}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={11} />{contract.period}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <button className="btn btn-ghost btn-sm" onClick={e => e.stopPropagation()}>View Details</button>
                      <button className="btn btn-primary btn-sm" onClick={e => e.stopPropagation()}>▶ Start</button>
                      <button className={`btn btn-sm ${contract.onShift ? 'btn-danger' : 'btn-ghost'}`} onClick={e => e.stopPropagation()}>⊙ End</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contract Detail panel */}
          {selectedContract && (
            <div className="card" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Contract Details</h2>
              <div style={{ background: 'var(--bg-page)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{selectedContract.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 20 }}>Detailed View & Management Portal</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
                  {/* Shift log panel */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>📊 Shift Log Panel</span>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Hours This Week</span>
                        <span style={{ fontWeight: 700, color: 'var(--orange)' }}>38.5 / 40h</span>
                      </div>
                      <ProgressBar value={38.5} max={40} color="var(--green-primary)" />
                    </div>
                    <div style={{ background: '#FFFAF0', border: '1px solid #F6D860', borderRadius: 8, padding: '10px 14px', marginBottom: 14 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <AlertTriangle size={14} color="var(--orange)" style={{ flexShrink: 0, marginTop: 1 }} />
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)' }}>Overtime Warning</div>
                          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Approaching weekly hour limit. Additional hours may require approval.</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Recent Activity</div>
                    {[{ dot: 'green', title: 'Shift Started', time: 'Today, 08:00 AM' }, { dot: 'grey', title: 'Shift Ended', time: 'Yesterday, 06:15 PM' }].map(a => (
                      <div key={a.title} className="activity-item">
                        <div className={`activity-dot ${a.dot}`} />
                        <div><div className="activity-title">{a.title}</div><div className="activity-time">{a.time}</div></div>
                      </div>
                    ))}
                  </div>

                  {/* Payment & Escrow */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>💰 Payment & Escrow</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '12px' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Total Earned</div>
                        <div style={{ fontSize: 17, fontWeight: 800 }}>GH₵14,250</div>
                      </div>
                      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '12px' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Completed</div>
                        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--green-primary)' }}>GH₵12,000</div>
                      </div>
                    </div>
                    <div style={{ background: 'var(--bg-page)', borderRadius: 8, padding: '12px 14px', marginBottom: 14 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', marginBottom: 6 }}>Pending Escrow</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Lock size={18} color="var(--text-muted)" />
                        <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>GH₵2,250</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--green-primary)', fontWeight: 600, marginTop: 6, cursor: 'pointer' }}>View Disbursement Schedule →</div>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', marginBottom: 8 }}>Request Extension</button>
                    <button className="btn btn-danger" style={{ width: '100%' }}>Request Termination</button>
                  </div>
                </div>

                <div className="divider" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <img src="https://i.pravatar.cc/32?img=8" className="avatar" width={32} height={32} alt="Admin" />
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Admin Support (Marcus K.)</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Last message: Extension request received, processing currently…</div>
                  </div>
                  <button className="btn btn-ghost btn-sm">Reply</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}