import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, CreditCard, Search } from 'lucide-react'
import Logo from '../ui/logo'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/practitioner/dashboard' },
  { label: 'My Contracts', icon: FileText, path: '/practitioner/contracts' },
  { label: 'Payments', icon: CreditCard, path: '/practitioner/payments' },
]

export default function PractitionerSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="sidebar">
      {/* User info */}
      <div className="sidebar-user" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <img src="https://i.pravatar.cc/36?img=12" className="avatar" width={36} height={36} alt="Dr. Kofi Mensah" />
        <div>
          <div className="user-name">Dr. Kofi Mensah</div>
          <div className="user-role">Senior Cardiologist</div>
        </div>
      </div>

      {/* Logo */}
      <div className="sidebar-logo" style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
        <Logo className="hl-logo-icon" />
        <span className="hl-logo-text">HealthLinka</span>
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

      {/* Contract status */}
      <div className="contract-status">
        <div className="cs-label">Contract Status</div>
        <div className="cs-value"><span className="cs-dot" /> Currently On-Shift</div>
      </div>

      {/* Pro tip */}
      <div className="sidebar-tip">
        <div className="tip-label">Pro Tip</div>
        <p>Complete your profile to unlock high-priority shifts.</p>
        <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => navigate('/practitioner/dashboard')}>Complete Profile</button>
      </div>
    </aside>
  )
}