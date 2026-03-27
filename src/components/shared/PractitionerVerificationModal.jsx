import React from 'react'
import { X, CheckCircle2, XCircle, FileText, User, MapPin, Shield } from 'lucide-react'
import { Modal, Badge } from '../ui/index'

export default function PractitionerVerificationModal({ data, onClose }) {
  return (
    <Modal onClose={onClose}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0D8C5A 0%, #1AB870 100%)', padding: '24px 28px', borderRadius: '16px 16px 0 0', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <X size={15} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>
            {data.initials}
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{data.name}</h2>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{data.spec}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Badge variant={data.statusVariant} dot>{data.status}</Badge>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 28px' }}>
        {/* Info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: User, label: 'Full Name', value: data.name },
            { icon: Shield, label: 'Specialization', value: data.spec },
            { icon: FileText, label: 'License Number', value: 'LCN-2023-4891' },
            { icon: MapPin, label: 'Practicing Region', value: 'Greater Accra' },
          ].map(item => (
            <div key={item.label} style={{ background: 'var(--bg-page)', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <item.icon size={13} color="var(--text-muted)" />
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Submitted Documents */}
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Submitted Documents</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {['Medical License Certificate', 'Board Certification', 'Professional Liability Insurance', 'Government-Issued ID'].map(doc => (
            <div key={doc} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-page)', borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={15} color="var(--green-primary)" />
                <span style={{ fontSize: 13 }}>{doc}</span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--green-primary)', fontWeight: 600, cursor: 'pointer' }}>View</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            className="btn"
            style={{ flex: 1, background: 'var(--red-light)', color: 'var(--red)', border: '1.5px solid var(--red)', borderRadius: 8, padding: '12px', cursor: 'pointer', fontFamily: 'var(--font)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            onClick={onClose}
          >
            <XCircle size={16} /> Reject
          </button>
          <button className="btn btn-primary" style={{ flex: 1, padding: '12px' }} onClick={onClose}>
            <CheckCircle2 size={16} /> Approve Practitioner
          </button>
        </div>
      </div>
    </Modal>
  )
}