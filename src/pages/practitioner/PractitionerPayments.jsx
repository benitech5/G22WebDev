import React from 'react'
import { Bell, Download, Filter, TrendingUp, Shield, CreditCard } from 'lucide-react'
import PractitionerSidebar from '../../components/layout/PractitionerSidebar'
import Logo from '../../components/ui/logo'
import { Badge } from '../../components/ui/index'
import Button from '../../components/ui/button'

const escrowRows = [
  { hospital: 'Perfect Health & Wellness', contract: 'Cardiology Night Shift', amount: 'GH₵ 1,200.00', total: 'GH₵ 2,400.00', shifts: 4, totalShifts: 8, status: 'Escrow Funded', statusVariant: 'blue' },
  { hospital: 'Ridge Medical Center', contract: 'General Practice Support', amount: 'GH₵ 3,000.00', total: 'GH₵ 6,000.00', shifts: 2, totalShifts: 10, status: 'Awaiting Shifts', statusVariant: 'grey' },
]

const history = [
  { detail: "St. Mary's Clinic", sub: 'Escrow Release - Pediatrics', amount: 'GH₵ 2,150.00', status: 'PAID', statusVariant: 'green', date: 'Oct 12, 2023' },
  { detail: 'HealthPort Specialized', sub: 'Escrow Release - Surgery', amount: 'GH₵ 4,800.00', status: 'PROCESSING', statusVariant: 'blue', date: 'Oct 14, 2023' },
  { detail: 'Korle-Bu (Private Wing)', sub: 'Direct Deposit - Consultation', amount: 'GH₵ 1,200.00', status: 'PAID', statusVariant: 'green', date: 'Oct 08, 2023' },
]

const activity = [
  { dot: 'green', title: 'Escrow released', desc: 'Payment released for completed cardiology shifts at Perfect Health.', time: 'Today, 2:45 PM' },
  { dot: 'blue', title: 'Escrow funded', desc: 'Ridge Medical deposited GH₵ 6,000.00 into contract escrow.', time: 'Yesterday, 10:20 AM' },
  { dot: 'grey', title: 'New contract escrow created', desc: 'Initial setup for General Practice Support shifts.', time: 'Oct 12, 2023' },
  { dot: 'green', title: 'Bank withdrawal processed', desc: 'GH₵ 12,000.00 transferred to GCB Bank account.', time: 'Oct 10, 2023' },
]

export default function PractitionerPayments() {
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
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
            <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Bell size={18} color="var(--text-secondary)" />
              <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, borderRadius: '50%', background: 'var(--red)', border: '1.5px solid #fff' }} />
            </button>
            <Button innerText="Withdraw Funds" icon={CreditCard} variant="sm" />
          </div>
        </div>

        <div className="page-inner">
          <div style={{ marginBottom: 20 }}>
            <h1 className="page-title">Practitioner Payments</h1>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="stat-label">Total Earnings</div>
                  <div className="stat-value" style={{ fontSize: 20 }}>GH₵ 45,200.00</div>
                  <div className="stat-delta">↗ +12% from last month</div>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={18} color="var(--green-primary)" />
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="stat-label">Funds in Escrow</div>
                  <div className="stat-value" style={{ fontSize: 20 }}>GH₵ 8,400.00</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><Shield size={11} /> Secured & verified</div>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EBF8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={18} color="#3182CE" />
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="stat-label">Payments Released</div>
                  <div className="stat-value" style={{ fontSize: 20 }}>GH₵ 36,800.00</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Paid to bank account</div>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FFFAF0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CreditCard size={18} color="#DD6B20" />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Escrow Payment Status */}
              <div className="card" style={{ padding: 20 }}>
                <div className="section-header">
                  <h2 style={{ fontSize: 16, fontWeight: 700 }}>Escrow Payment Status</h2>
                  <span className="section-link">View All Active</span>
                </div>
                <div style={{ overflowX: 'auto', marginTop: 12 }}>
                  <table className="data-table" style={{ minWidth: 460 }}>
                    <thead>
                      <tr><th>Hospital & Contract</th><th>Amount</th><th>Shifts</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {escrowRows.map(row => (
                        <tr key={row.hospital}>
                          <td>
                            <div style={{ fontWeight: 600 }}>{row.hospital}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{row.contract}</div>
                          </td>
                          <td>
                            <div style={{ fontWeight: 700 }}>{row.amount}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Total: {row.total}</div>
                          </td>
                          <td>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{row.shifts}/{row.totalShifts}</div>
                            <div style={{ width: 60, height: 4, background: 'var(--border)', borderRadius: 2, marginTop: 4 }}>
                              <div style={{ width: `${(row.shifts / row.totalShifts) * 100}%`, height: '100%', background: 'var(--green-primary)', borderRadius: 2 }} />
                            </div>
                          </td>
                          <td><Badge variant={row.statusVariant}>{row.status}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment History */}
              <div className="card" style={{ padding: 20 }}>
                <div className="section-header">
                  <h2 style={{ fontSize: 16, fontWeight: 700 }}>Payment History</h2>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm"><Filter size={13} /></button>
                    <button className="btn btn-ghost btn-sm"><Download size={13} /></button>
                  </div>
                </div>
                <div style={{ overflowX: 'auto', marginTop: 12 }}>
                  <table className="data-table" style={{ minWidth: 380 }}>
                    <thead>
                      <tr><th>Details</th><th>Amount</th><th>Status</th><th>Date</th></tr>
                    </thead>
                    <tbody>
                      {history.map(row => (
                        <tr key={row.detail}>
                          <td>
                            <div style={{ fontWeight: 600 }}>{row.detail}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{row.sub}</div>
                          </td>
                          <td style={{ fontWeight: 700 }}>{row.amount}</td>
                          <td><Badge variant={row.statusVariant}>{row.status}</Badge></td>
                          <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Payment Activity */}
            <div className="card" style={{ padding: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Payment Activity</h2>
              {activity.map((a, i) => (
                <div key={i} className="activity-item">
                  <div className={`activity-dot ${a.dot}`} style={{ marginTop: 5 }} />
                  <div>
                    <div className="activity-title">{a.title}</div>
                    <div className="activity-desc">{a.desc}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
              <button className="btn btn-ghost" style={{ width: '100%', marginTop: 12 }}>View Full Log</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}