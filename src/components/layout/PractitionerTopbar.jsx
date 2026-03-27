import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Settings } from 'lucide-react'
import Logo from '../ui/logo'

export default function PractitionerTopbar() {
  const navigate = useNavigate()
  return (
    <div className="topbar">
      {/* Logo */}
      <div className="hl-logo" style={{ flexShrink: 0 }}>
        <Logo className="hl-logo-icon" />
        <span className="hl-logo-text">HealthLinka</span>
      </div>

      <div className="topbar-search" style={{ marginLeft: 8 }}>
        <Search size={15} color="var(--text-muted)" />
        <input placeholder="Search shifts..." />
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}><Bell size={20} /></button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}><Settings size={20} /></button>
        <img src="https://i.pravatar.cc/34?img=12" className="avatar" width={34} height={34} alt="user" style={{ cursor: 'pointer' }} />
      </div>
    </div>
  )
}