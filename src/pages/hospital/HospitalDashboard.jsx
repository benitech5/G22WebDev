import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, CreditCard, FileCheck } from 'lucide-react'
import HospitalSidebar from '../../components/layout/HospitalSidebar'
import HospitalTopbar from '../../components/layout/HospitalTopbar'
import { StatCard } from '../../components/ui/index'
import CreateContractModal from '../../components/shared/CreateContractModal'

const activeContracts = [
  { id: 1, unit: 'Cardiology Unit', sub: 'Specialist Wing A', badge: 'ACTIVE', roles: 12, renewal: 'In 15 days', renewalUrgent: true, image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&q=80', progress: 80 },
  { id: 2, unit: 'Emergency Room (ER)', sub: 'Main Trauma Center', badge: 'ACTIVE', roles: 8, renewal: 'In 30 days', renewalUrgent: false, image: 'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?w=300&q=80', progress: 65 },
]

const practitioners = [
  { name: 'Dr. James Wilson', spec: 'Cardiologist (Senior)', online: true, img: 'https://i.pravatar.cc/40?img=11' },
  { name: 'Dr. Elena Rodriguez', spec: 'Trauma Surgeon (ER)', online: true, img: 'https://i.pravatar.cc/40?img=5' },
  { name: 'Dr. Marcus Thorne', spec: 'ER Specialist', online: false, img: 'https://i.pravatar.cc/40?img=7' },
  { name: 'Dr. Sarah Chen', spec: 'Echo Specialist', online: true, img: 'https://i.pravatar.cc/40?img=9' },
  { name: 'Dr. Robert Vance', spec: 'Vascular Surgeon', online: true, img: 'https://i.pravatar.cc/40?img=6' },
]

export default function HospitalDashboard() {
  const navigate = useNavigate()
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="page-layout">
      <HospitalSidebar />
      <div className="main-content">
        <HospitalTopbar onCreateContract={() => setShowCreate(true)} />
        <div className="page-inner">
          {/* Page header */}
          <div style={{ marginBottom: 20 }}>
            <h1 className="page-title">Hospital Dashboard</h1>
            <p className="page-subtitle">Welcome back. Monitoring hospital logistics and personnel.</p>
          </div>

          {/* Stats */}
          <div className="grid-3 stats-grid" style={{ marginBottom: 28 }}>
            <div className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="stat-label">Funds in Escrow</div>
                  <div className="stat-value" style={{ fontSize: 22 }}>$420,500.00</div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={20} color="var(--green-primary)" />
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="stat-label">Released Payments</div>
                  <div className="stat-value" style={{ fontSize: 22 }}>$1,245,000.00</div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#EBF8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CreditCard size={20} color="#3182CE" />
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="stat-label">Pending Approvals</div>
                  <div className="stat-value" style={{ fontSize: 22 }}>12 Invoices</div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileCheck size={20} color="#805AD5" />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {/* Contracts overview */}
            <div className="card" style={{ padding: 24 }}>
              <div className="section-header">
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>Active Contracts Overview</h2>
                <span className="section-link" onClick={() => navigate('/hospital/contracts')}>View All</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 16 }}>
                {activeContracts.map(c => (
                  <div key={c.id} className="card-sm" style={{ overflow: 'hidden' }}>
                    <img src={c.image} alt={c.unit} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{c.unit}</span>
                        <span style={{ background: 'var(--green-light)', color: 'var(--green-primary)', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4 }}>ACTIVE</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{c.sub}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8, fontSize: 12 }}>
                        <div>
                          <div style={{ color: 'var(--text-muted)' }}>Active Roles</div>
                          <div style={{ fontWeight: 700 }}>{c.roles} Practitioners</div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-muted)' }}>Renewal</div>
                          <div style={{ fontWeight: 700, color: c.renewalUrgent ? 'var(--orange)' : 'var(--text-primary)' }}>{c.renewal}</div>
                        </div>
                      </div>
                      <div style={{ height: 4, background: 'var(--border)', borderRadius: 2 }}>
                        <div style={{ width: `${c.progress}%`, height: '100%', background: 'var(--green-primary)', borderRadius: 2 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Practitioners */}
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Assigned Practitioners</h2>
              {practitioners.map(p => (
                <div key={p.name} className="practitioner-item">
                  <img src={p.img} className="avatar" width={38} height={38} alt={p.name} />
                  <div className="practitioner-info">
                    <div className="name">{p.name}</div>
                    <div className="spec">{p.spec}</div>
                  </div>
                  <div className={p.online ? 'online-dot' : 'offline-dot'} />
                </div>
              ))}
              <button className="btn btn-blue" style={{ width: '100%', marginTop: 16 }} onClick={() => navigate('/hospital/contracts')}>
                Manage Practitioners
              </button>
            </div>
          </div>
        </div>

        {showCreate && <CreateContractModal onClose={() => setShowCreate(false)} />}
      </div>
    </div>
  )
}