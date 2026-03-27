import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, CreditCard, AlertCircle } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/hospital/dashboard' },
  { label: 'Contracts', icon: FileText, path: '/hospital/contracts' },
  { label: 'Payments', icon: CreditCard, path: '/hospital/payments' },
]

export default function HospitalSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="sidebar">
      {/* Logo / Hospital */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#1E9B5B" fillOpacity="0.12"/>
            <rect x="14.5" y="9" width="3" height="14" rx="1.5" fill="#1E9B5B"/>
            <rect x="9" y="14.5" width="14" height="3" rx="1.5" fill="#1E9B5B"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--green-primary)' }}>Perfect Health</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Wellness Hospital</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <a
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={18} />
            {item.label}
          </a>
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Emergency */}
      <div style={{ padding: '0 12px 12px' }}>
        <button className="emergency-btn">
          <AlertCircle size={14} />
          EMERGENCY ALERT
        </button>
      </div>

      {/* Admin user */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="https://i.pravatar.cc/32?img=5" className="avatar" width={32} height={32} alt="Admin" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Admin Sarah</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Chief of Operations</div>
        </div>
      </div>
    </aside>
  )
}