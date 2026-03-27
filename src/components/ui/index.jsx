import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
export { default as Button } from './button'

export function InputField({ label, icon: Icon, type = 'text', placeholder, value, onChange, hint, rightElement }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div className="input-wrap">
        {Icon && <Icon className="input-icon" />}
        <input
          type={isPassword ? (show ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        {rightElement}
      </div>
      {hint && <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>{hint}</span>}
    </div>
  )
}

export function SelectField({ label, icon: Icon, value, onChange, children }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div className="input-wrap">
        {Icon && <Icon className="input-icon" />}
        <select value={value} onChange={onChange} style={{ width: '100%' }}>
          {children}
        </select>
      </div>
    </div>
  )
}

export function Badge({ children, variant = 'grey', dot = false }) {
  return (
    <span className={`badge badge-${variant} ${dot ? 'badge-dot' : ''}`}>
      {children}
    </span>
  )
}

export function StatCard({ label, value, delta, deltaLabel, icon: Icon, iconColor = '#1E9B5B', iconBg = '#E8F7EF' }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="stat-label">{label}</div>
          <div className="stat-value">{value}</div>
          {delta && (
            <div className="stat-delta">
              <span>↗ {delta}</span>
              {deltaLabel && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{deltaLabel}</span>}
            </div>
          )}
        </div>
        {Icon && (
          <div style={{ width: 44, height: 44, borderRadius: 10, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={22} color={iconColor} />
          </div>
        )}
      </div>
    </div>
  )
}

export function AvatarInitials({ name = '', size = 36, bg = '#E8F7EF', color = '#1E9B5B', fontSize = 13 }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className="avatar-initials" style={{ width: size, height: size, background: bg, color, fontSize, flexShrink: 0 }}>
      {initials}
    </div>
  )
}

export function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {children}
      </div>
    </div>
  )
}

export function ProgressBar({ value, max = 100, color = 'var(--green-primary)' }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}