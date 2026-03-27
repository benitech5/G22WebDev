import React from 'react'
import { Search, Bell, Plus } from 'lucide-react'
import Logo from '../ui/logo'

export default function HospitalTopbar({ onCreateContract }) {
  return (
    <div className="topbar">
      {/* Logo */}
      <div className="hl-logo" style={{ flexShrink: 0 }}>
        <Logo className="hl-logo-icon" />
        <span className="hl-logo-text">HealthLinka</span>
      </div>

      <div className="topbar-search">
        <Search size={15} color="var(--text-muted)" />
        <input placeholder="Search records..." />
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Bell size={18} color="var(--text-secondary)" />
          <span style={{ position: 'absolute', top: 5, right: 5, width: 7, height: 7, borderRadius: '50%', background: 'var(--red)', border: '1.5px solid #fff' }} />
        </button>
        <button className="btn btn-primary btn-sm" onClick={onCreateContract} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={16} /> Create Contract
        </button>
      </div>
    </div>
  )
}