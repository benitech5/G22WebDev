import React, { useState } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import { Modal } from '../ui/index'

export default function TerminationModal({ contractName = 'ICU Specialist - St. Jude\'s Medical', onClose }) {
  const [reason, setReason] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  return (
    <Modal onClose={onClose}>
      <div style={{ padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--red-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={20} color="var(--red)" />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>Request Contract Termination</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <div style={{ background: 'var(--red-light)', border: '1px solid #FEB2B2', borderRadius: 8, padding: '12px 16px', marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: 'var(--red)', fontWeight: 500 }}>
            ⚠️ You are requesting termination for: <strong>{contractName}</strong>. This action will trigger a review process and may affect your escrow balance.
          </p>
        </div>

        <div className="form-group" style={{ marginBottom: 16 }}>
          <label className="form-label">Reason for Termination</label>
          <div className="input-wrap">
            <select value={reason} onChange={e => setReason(e.target.value)} style={{ fontSize: 13 }}>
              <option value="">Select a reason</option>
              <option>Personal circumstances</option>
              <option>Workplace safety concerns</option>
              <option>Contract terms dispute</option>
              <option>Relocation</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label">Additional Comments (Optional)</label>
          <textarea
            placeholder="Provide any additional context..."
            style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--font)', fontSize: 13, color: 'var(--text-primary)', outline: 'none', resize: 'vertical', minHeight: 80, background: 'var(--bg-input)' }}
          />
        </div>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>
          <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} style={{ marginTop: 2, accentColor: 'var(--red)' }} />
          <span>I understand that submitting this request will initiate a termination review and any pending escrow may be held during the process.</span>
        </label>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button
            className="btn"
            style={{ flex: 1, background: confirmed ? 'var(--red)' : '#FEB2B2', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', cursor: confirmed ? 'pointer' : 'not-allowed', fontFamily: 'var(--font)', fontWeight: 700, fontSize: 14, transition: 'background 0.15s' }}
            onClick={confirmed ? onClose : undefined}
            disabled={!confirmed}
          >
            Submit Termination Request
          </button>
        </div>
      </div>
    </Modal>
  )
}