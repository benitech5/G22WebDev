import React from 'react'
import { X, CheckCircle2, XCircle, Building2, MapPin, Mail, Phone } from 'lucide-react'
import { Modal, Badge } from '../ui/index'

export default function HospitalVerificationModal({ data, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div style={{ background: 'linear-gradient(135deg, #1C3048 0%, #2D5078 100%)', padding: '24px 28px', borderRadius: '16px 16px 0 0', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <X size={15} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={24} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: 19, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{data.name}</h2>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <MapPin size={12} /> {data.region}
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Badge variant={data.statusVariant} dot>{data.status}</Badge>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Registration Date', value: data.date },
            { label: 'Region', value: data.region },
            { label: 'License Number', value: 'HLN-2023-0091' },
            { label: 'Accreditation', value: 'Ghana Health Service' },
            { label: 'Contact Email', value: 'admin@hospital.com' },
            { label: 'Phone', value: '+233 24 000 0000' },
          ].map(item => (
            <div key={item.label} style={{ background: 'var(--bg-page)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 3, letterSpacing: '0.05em' }}>{item.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Submitted Documents</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {['Certificate of Incorporation', 'Hospital Operating License', 'Ghana Health Service Certificate', 'Tax Clearance Certificate'].map(doc => (
            <div key={doc} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-page)', borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={15} color="var(--green-primary)" />
                <span style={{ fontSize: 13 }}>{doc}</span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--green-primary)', fontWeight: 600, cursor: 'pointer' }}>View</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            className="btn"
            style={{ flex: 1, background: 'var(--red-light)', color: 'var(--red)', border: '1.5px solid var(--red)', borderRadius: 8, padding: '12px', cursor: 'pointer', fontFamily: 'var(--font)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            onClick={onClose}
          >
            <XCircle size={16} /> Reject
          </button>
          <button className="btn btn-primary" style={{ flex: 1, padding: '12px' }} onClick={onClose}>
            <CheckCircle2 size={16} /> Approve Hospital
          </button>
        </div>
      </div>
    </Modal>
  )
}