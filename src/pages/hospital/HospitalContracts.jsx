import React, { useState } from 'react'
import { Download, Plus, AlertCircle, ChevronDown } from 'lucide-react'
import HospitalSidebar from '../../components/layout/HospitalSidebar'
import HospitalTopbar from '../../components/layout/HospitalTopbar'
import { Badge } from '../../components/ui/index'
import Button from '../../components/ui/button'
import CreateContractModal from '../../components/shared/CreateContractModal'

const contracts = [
  { id: 'CT-2024-001', name: 'MedTech Imaging Services', dept: 'Radiology', status: 'Active', statusVariant: 'green', start: 'Jan 12, 2024', end: 'Jan 11, 2026', value: '$450,000' },
  { id: 'CT-2024-002', name: 'Central Nursing Agency', dept: 'General Ward', status: 'Active', statusVariant: 'green', start: 'Mar 01, 2024', end: 'Feb 28, 2025', value: '$120,000' },
  { id: 'CT-2024-003', name: 'Dr. James Wilson', dept: 'Cardiology', status: 'Pending Review', statusVariant: 'orange', start: 'Nov 01, 2024', end: 'Oct 31, 2025', value: '$85,000' },
  { id: 'CT-2024-004', name: 'PharmaCare Supplies Ltd', dept: 'Pharmacy', status: 'Expiring Soon', statusVariant: 'red', start: 'Jan 01, 2023', end: 'Dec 31, 2024', value: '$200,000' },
]

export default function HospitalContracts() {
  const [tab, setTab] = useState('all')
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="page-layout">
      <HospitalSidebar />
      <div className="main-content">
        <HospitalTopbar onCreateContract={() => setShowCreate(true)} />
        <div className="page-inner">
          {/* Header */}
          <div className="section-header" style={{ marginBottom: 24 }}>
            <div>
              <h1 className="page-title">Contract Management</h1>
              <p className="page-subtitle">Manage vendor agreements, clinical staffing, and facility services.</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button innerText="Export" variant="ghost" icon={Download} />
              <Button action={() => setShowCreate(true)} innerText="New Contract" icon={Plus} />
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Active Contracts', value: '1,248', sub: '+12% from last quarter', icon: '📄' },
              { label: 'Pending Review', value: '14', sub: '5 high priority', subColor: 'var(--orange)', icon: '⏱' },
              { label: 'Expiring Soon', value: '8', sub: 'Within 30 days', subColor: 'var(--red)', icon: '📅' },
              { label: 'Compliance Rate', value: '99.4%', sub: 'All benchmarks met', subColor: 'var(--green-primary)', icon: '✅' },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="stat-label">{s.label}</div>
                    <div className="stat-value" style={{ fontSize: 24, marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: s.subColor || 'var(--green-primary)', fontWeight: 600 }}>{s.sub}</div>
                  </div>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Contracts table */}
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="tabs" style={{ padding: '0 20px' }}>
              {[['all', 'All Contracts'], ['applicants', 'Applicants', 12], ['ext', 'Extension/Termination', 3]].map(([key, label, count]) => (
                <div key={key} className={`tab ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>
                  {label}
                  {count && <span className="tab-count">{count}</span>}
                </div>
              ))}
            </div>

            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                <div className="input-wrap" style={{ minWidth: 140 }}>
                  <select style={{ fontSize: 13 }}>
                    <option>Status: All</option><option>Active</option><option>Pending</option><option>Expired</option>
                  </select>
                  <ChevronDown size={13} color="var(--text-muted)" />
                </div>
                <div className="input-wrap" style={{ minWidth: 130 }}>
                  <select style={{ fontSize: 13 }}>
                    <option>Type: All</option><option>Staffing</option><option>Vendor</option><option>Equipment</option>
                  </select>
                  <ChevronDown size={13} color="var(--text-muted)" />
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-secondary)' }}>Showing 1-10 of 1,248</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ minWidth: 600 }}>
                  <thead>
                    <tr>
                      <th>Contract Name / ID</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Value</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map(c => (
                      <tr key={c.id}>
                        <td>
                          <div style={{ fontWeight: 700 }}>{c.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{c.id}</div>
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>{c.dept}</td>
                        <td><Badge variant={c.statusVariant} dot>{c.status}</Badge></td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{c.start}</td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{c.end}</td>
                        <td style={{ fontWeight: 700 }}>{c.value}</td>
                        <td><button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 18 }}>⋮</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                <button className="btn btn-ghost btn-sm">Previous</button>
                <button className="btn btn-ghost btn-sm">Next</button>
                <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-secondary)' }}>Page <strong>1</strong> of 125</span>
              </div>
            </div>
          </div>

          {/* Compliance Alerts */}
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={18} color="var(--text-secondary)" /> Compliance Alerts
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '❗', color: 'var(--red)', title: 'Insurance Policy Expired', desc: 'Regional Nursing Agency Ltd. needs updated liability coverage certificates.', action: 'Update', actionColor: 'var(--red)' },
                { icon: '⚠️', color: 'var(--orange)', title: 'Pending License Verification', desc: '3 new applicants for specialist clinical roles awaiting state board check.', action: 'Review', actionColor: 'var(--orange)' },
              ].map(alert => (
                <div key={alert.title} className="compliance-item">
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{alert.icon}</span>
                  <div className="compliance-text" style={{ flex: 1 }}>
                    <div className="title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                      {alert.title}
                      <span style={{ fontSize: 12, fontWeight: 700, color: alert.actionColor, cursor: 'pointer' }}>{alert.action}</span>
                    </div>
                    <div className="desc">{alert.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showCreate && <CreateContractModal onClose={() => setShowCreate(false)} />}
      </div>
    </div>
  )
}