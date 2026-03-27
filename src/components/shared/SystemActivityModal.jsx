import React from 'react'
import { X } from 'lucide-react'
import { Modal } from '../ui/index'

export default function SystemActivityModal({ data, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div style={{ padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>{data.icon}</span>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800 }}>Activity Details</h2>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{data.type} · {data.id}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <div style={{ background: 'var(--bg-page)', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>{data.action}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Reference ID', value: data.id },
            { label: 'Activity Type', value: data.type },
            { label: 'Timestamp', value: data.time },
            { label: 'Performed By', value: 'System Auto' },
            { label: 'Status', value: 'Completed' },
            { label: 'Region', value: 'Greater Accra' },
          ].map(item => (
            <div key={item.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Close</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={onClose}>Export Record</button>
        </div>
      </div>
    </Modal>
  )
}