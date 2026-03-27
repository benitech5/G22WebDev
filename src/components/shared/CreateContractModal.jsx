import React, { useState } from 'react'
import { X, CheckCircle, XCircle, AlertTriangle, FileText, Calendar, User, Shield } from 'lucide-react'
import { Modal } from '../ui/index'

/* ─── Create Contract Modal ─────────────────────────────────── */
export default function CreateContractModal({ onClose }) {
  const [form, setForm] = useState({ name: '', dept: '', type: 'Staffing', start: '', end: '', value: '' })
  return (
    <Modal onClose={onClose}>
      <div style={{ padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>Create New Contract</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Contract Name</label>
            <div className="input-wrap">
              <FileText size={15} className="input-icon" />
              <input placeholder="e.g. ICU Specialist Staffing" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Department</label>
              <div className="input-wrap">
                <input placeholder="e.g. Cardiology" value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Contract Type</label>
              <div className="input-wrap">
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option>Staffing</option>
                  <option>Vendor</option>
                  <option>Equipment</option>
                  <option>Service</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <div className="input-wrap">
                <Calendar size={15} className="input-icon" />
                <input type="date" value={form.start} onChange={e => setForm(f => ({ ...f, start: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <div className="input-wrap">
                <Calendar size={15} className="input-icon" />
                <input type="date" value={form.end} onChange={e => setForm(f => ({ ...f, end: e.target.value }))} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Contract Value ($)</label>
            <div className="input-wrap">
              <input type="number" placeholder="0.00" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={onClose}>Create Contract</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}