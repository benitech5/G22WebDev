import React, { useState } from 'react'
import { Filter, TrendingUp, Clock, CreditCard, ChevronDown } from 'lucide-react'
import HospitalSidebar from '../../components/layout/HospitalSidebar'
import HospitalTopbar from '../../components/layout/HospitalTopbar'
import { Badge } from '../../components/ui/index'
import Button from '../../components/ui/button'

const transactions = [
  { date: 'Oct 24', name: 'Dr. Elena Rodriguez', desc: 'Cardiology Consultation Group', type: 'RELEASE', typeVariant: 'green', status: 'Completed', statusVariant: 'green', amount: 'GH₵4,250.00' },
  { date: 'Oct 23', name: 'Internal Escrow Top-up', desc: 'Monthly Operating Allocation', type: 'DEPOSIT', typeVariant: 'blue', status: 'Completed', statusVariant: 'green', amount: '+GH₵25,000.00' },
  { date: 'Oct 22', name: 'Dr. Marcus Thorne', desc: 'Surgical Suite Fees - Period 04', type: 'RELEASE', typeVariant: 'green', status: 'Processing', statusVariant: 'orange', amount: '-GH₵12,800.00' },
  { date: 'Oct 21', name: 'Apex Medical Supplies', desc: 'Laboratory Equipment', type: 'RELEASE', typeVariant: 'green', status: 'Completed', statusVariant: 'green', amount: 'GH₵2,145.00' },
]

const payoutSummary = [
  { name: 'Rodriguez, E.', spec: 'Cardiology', amount: 'GH₵14.2k', img: 'https://i.pravatar.cc/40?img=5' },
  { name: 'Thorne, M.', spec: 'Surgery', amount: 'GH₵28.5k', img: 'https://i.pravatar.cc/40?img=7' },
  { name: 'Jenkins, S.', spec: 'Pediatrics', amount: 'GH₵9.8k', img: 'https://i.pravatar.cc/40?img=9' },
]

export default function HospitalPayments() {
  const [depositAmount, setDepositAmount] = useState('0.00')
  const [releaseAmount, setReleaseAmount] = useState('0.00')
  const [vendor, setVendor] = useState('Dr. Elena Rodriguez - Cardiology')

  return (
    <div className="page-layout">
      <HospitalSidebar />
      <div className="main-content">
        <HospitalTopbar />
        <div className="page-inner">
          <div style={{ marginBottom: 20 }}>
            <h1 className="page-title">Payment Management</h1>
            <p className="page-subtitle">Institutional Ledger & Escrow Control Center</p>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Total Escrow Balance', value: 'GH₵1,240,500.00', sub: '+2.4% vs last 6 months', subColor: 'var(--green-primary)', icon: TrendingUp, iconBg: 'var(--green-light)', iconColor: 'var(--green-primary)' },
              { label: 'Pending Releases', value: 'GH₵112,300.50', sub: '14 Transfers Awaiting', subColor: 'var(--orange)', icon: Clock, iconBg: '#FFFAF0', iconColor: 'var(--orange)' },
              { label: 'Disbursed This Quarter', value: 'GH₵892,400.00', sub: '98% Accuracy', subColor: 'var(--green-primary)', icon: CreditCard, iconBg: '#EBF8FF', iconColor: '#3182CE' },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="stat-label">{s.label}</div>
                    <div className="stat-value" style={{ fontSize: 18, marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: s.subColor }}>{s.sub}</div>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <s.icon size={18} color={s.iconColor} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {/* Forms column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Deposit to Escrow */}
              <div className="card" style={{ padding: 20 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--green-primary)', marginBottom: 16 }}>⊕ Deposit to Escrow</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>Source Account</label>
                    <div className="input-wrap">
                      <select style={{ fontSize: 13 }}>
                        <option>Operating Fund Main - 8842</option>
                        <option>Reserve Account - 4421</option>
                      </select>
                      <ChevronDown size={13} color="var(--text-muted)" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>Amount ($)</label>
                    <div className="input-wrap"><input type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} /></div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>Reference/Memo</label>
                    <div className="input-wrap"><input placeholder="e.g. Monthly Staff Allotment" /></div>
                  </div>
                  <Button innerText="Confirm Deposit" width="full" />
                </div>
              </div>

              {/* Release Payment */}
              <div className="card" style={{ padding: 20 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>⊡ Release Payment</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>Practitioner / Vendor</label>
                    <div className="input-wrap">
                      <select value={vendor} onChange={e => setVendor(e.target.value)} style={{ fontSize: 13 }}>
                        <option>Dr. Elena Rodriguez - Cardiology</option>
                        <option>Dr. Marcus Thorne - Surgery</option>
                        <option>Dr. Sarah Jenkins - Pediatrics</option>
                      </select>
                      <ChevronDown size={13} color="var(--text-muted)" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>Amount to Release ($)</label>
                    <div className="input-wrap"><input type="number" value={releaseAmount} onChange={e => setReleaseAmount(e.target.value)} /></div>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', background: 'var(--bg-page)', padding: '8px 12px', borderRadius: 6, display: 'block', marginTop: 4 }}>
                      Available: <strong style={{ color: 'var(--green-primary)' }}>GH₵124,500.00</strong>
                    </span>
                  </div>
                  <Button innerText="Authorize Transfer" colour="#0D1B2A" width="full" />
                </div>
              </div>
            </div>

            {/* Transactions + Payout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Transaction History */}
              <div className="card" style={{ padding: 20 }}>
                <div className="section-header">
                  <div>
                    <h2 style={{ fontSize: 16, fontWeight: 700 }}>Transaction History</h2>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Real-time financial audit trail</p>
                  </div>
                  <button className="btn btn-ghost btn-sm"><Filter size={13} /> Filter</button>
                </div>
                <div style={{ overflowX: 'auto', marginTop: 12 }}>
                  <table className="data-table" style={{ minWidth: 460 }}>
                    <thead>
                      <tr><th>Date</th><th>Recipient</th><th>Type</th><th>Status</th><th>Amount</th></tr>
                    </thead>
                    <tbody>
                      {transactions.map((t, i) => (
                        <tr key={i}>
                          <td style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{t.date}</td>
                          <td>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.desc}</div>
                          </td>
                          <td><Badge variant={t.typeVariant}>{t.type}</Badge></td>
                          <td><Badge variant={t.statusVariant} dot>{t.status}</Badge></td>
                          <td style={{ fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>{t.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payout Summary */}
              <div className="card" style={{ padding: 20 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Practitioner Payout Summary</h2>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {payoutSummary.map(p => (
                    <div key={p.name} style={{ flex: '1 1 100px', background: 'var(--bg-page)', borderRadius: 'var(--radius-md)', padding: '12px', textAlign: 'center' }}>
                      <img src={p.img} className="avatar" width={36} height={36} alt={p.name} style={{ margin: '0 auto 6px' }} />
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{p.spec}</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--green-primary)' }}>{p.amount}</div>
                      <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600, marginTop: 2 }}>TOTAL MTD</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)', flexWrap: 'wrap', gap: 12 }}>
            <span>🔒 Encrypted Institutional Financial Management Terminal</span>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['Audit Logs', 'Security Policy', 'System Health'].map(l => <span key={l} style={{ cursor: 'pointer', fontWeight: 600 }}>{l}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}