import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, TrendingUp, Clock, Search, CreditCard, BarChart2, User, MapPin, Plus } from 'lucide-react'
import PractitionerSidebar from '../../components/layout/PractitionerSidebar'
import PractitionerTopbar from '../../components/layout/PractitionerTopbar'
import { StatCard } from '../../components/ui/index'
import Button from '../../components/ui/button'

const upcomingShifts = [
  { month: 'OCT', day: 24, title: 'General Practice - Morning Shift', hospital: "St. Mary's Hospital", start: '08:00 AM', end: '02:00 PM', pay: 'GH₵ 480.00' },
  { month: 'OCT', day: 26, title: 'Urgent Care Clinic', hospital: 'Downtown Wellness Center', start: '02:00 PM', end: '10:00 PM', pay: 'GH₵ 640.00' },
]

const quickLinks = [
  { label: 'Search for Hospitals', icon: Search, path: '/practitioner/hospitals' },
  { label: 'Payments', icon: CreditCard, path: '/practitioner/payments' },
  { label: 'Log Shifts', icon: BarChart2, path: '/practitioner/contracts' },
  { label: 'Profile', icon: User, path: '/practitioner/dashboard' },
]

export default function PractitionerDashboard() {
  const navigate = useNavigate()

  return (
    <div className="page-layout">
      <PractitionerSidebar />
      <div className="main-content">
        <PractitionerTopbar />
        <div className="page-inner">
          {/* Header */}
          <div className="section-header">
            <div>
              <h1 className="page-title">Dashboard Overview</h1>
              <p className="page-subtitle">Welcome back, Dr. Mensah. Here's your practice summary.</p>
            </div>
            <Button action={() => navigate('/practitioner/hospitals')} innerText="Find New Shifts" icon={Plus} />
          </div>

          {/* Stats */}
          <div className="grid-3 stats-grid" style={{ marginBottom: 28 }}>
            <StatCard label="Active Contracts" value="8" delta="+2" icon={FileText} />
            <StatCard label="Monthly Earnings" value="GH₵ 12,450" delta="+18%" icon={TrendingUp} iconColor="#DD6B20" iconBg="#FFFAF0" />
            <StatCard label="Completed Shifts" value="42" deltaLabel="This Month" icon={Clock} iconColor="#3182CE" iconBg="#EBF8FF" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {/* Left: Shifts + Contract */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Upcoming Shifts */}
              <div>
                <div className="section-header">
                  <h2 className="section-title">Upcoming Shifts</h2>
                  <span className="section-link" onClick={() => navigate('/practitioner/contracts')}>View Schedule</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {upcomingShifts.map(shift => (
                    <div key={shift.day} className="shift-card">
                      <div className="shift-date">
                        <span className="month">{shift.month}</span>
                        <span className="day">{shift.day}</span>
                      </div>
                      <div className="shift-info">
                        <div className="title">{shift.title}</div>
                        <div className="meta">
                          <span><MapPin size={11} /> {shift.hospital}</span>
                          <span><Clock size={11} /> {shift.start} - {shift.end}</span>
                        </div>
                      </div>
                      <div className="shift-pay">
                        <div className="pay-label">Est. Pay</div>
                        <div className="pay-amount">{shift.pay}</div>
                      </div>
                      <button className="btn btn-ghost btn-sm">Details</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Contract */}
              <div>
                <h2 className="section-title" style={{ marginBottom: 14 }}>Active Contract Management</h2>
                <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', gap: 0, flexWrap: 'wrap' }}>
                  <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=200&q=80" alt="Hospital" style={{ width: 'clamp(120px, 35%, 160px)', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ padding: '18px 20px', flex: 1, minWidth: 200 }}>
                    <span style={{ background: 'var(--green-light)', color: 'var(--green-primary)', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>ACTIVE NOW</span>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 8, marginBottom: 4, color: 'var(--text-primary)' }}>Perfect Health and Wellness Centre</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>Cardiography Specialist • $120/hr Fixed</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button className="btn btn-primary btn-sm">▶ Start Shift</button>
                      <button className="btn btn-blue btn-sm">⊙ End Shift</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Quick Links */}
              <div>
                <h2 className="section-title" style={{ marginBottom: 12 }}>Quick Links</h2>
                <div className="grid-2" style={{ gap: 10 }}>
                  {quickLinks.map(ql => (
                    <div key={ql.label} className="quick-link" onClick={() => navigate(ql.path)}>
                      <ql.icon size={22} />
                      <span>{ql.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promote card */}
              <div className="promote-card">
                <h3>Ready for more?</h3>
                <p>There are 24 high-paying shifts matching your profile in the area.</p>
                <button className="btn-white" onClick={() => navigate('/practitioner/hospitals')}>Explore Local Work</button>
                <div className="promote-bg-icon">
                  <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#fff"/>
                    <rect x="14.5" y="9" width="3" height="14" rx="1.5" fill="#fff"/>
                    <rect x="9" y="14.5" width="14" height="3" rx="1.5" fill="#fff"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}