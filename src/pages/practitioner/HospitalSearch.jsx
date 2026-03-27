import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, ChevronDown, MapPin, Star, X, Clock, Users, Map } from 'lucide-react'
import Logo from '../../components/ui/logo'

const hospitals = [
  {
    id: 1,
    name: 'Perfect Health and Wellness Hospital',
    location: 'East Legon, Accra',
    address: '12 Garden St, East Legon, Accra',
    type: 'PRIVATE',
    rating: 4.7,
    tags: ['Cardiology', 'Diagnostics', 'ICU'],
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&q=80',
    about: 'A premier multi-specialist private hospital dedicated to delivering exceptional medical care through advanced technology and compassionate service.',
    departments: ['Cardiology', 'Internal Medicine', 'Radiology', 'Pediatrics'],
    website: 'visit-website.org',
    phone: '+233 24 000 0000',
    contracts: [
      { title: 'Locum Cardiologist', pay: 'GH₵ 4,500 / mo', type: 'Part-time', positions: '1 Position', desc: 'Temporary 3-month contract for evening shifts (4 PM - 10 PM).' },
      { title: 'Resident Surgeon', pay: 'Competitive Pay', type: 'Full-time', positions: '2 Positions', desc: 'Full-time resident position for general surgery department.' },
    ],
  },
  {
    id: 2,
    name: 'Ridge Medical Center (Accra)',
    location: 'Ridge, Accra',
    address: '25 Ridge Road, Accra',
    type: 'PUBLIC',
    rating: 4.2,
    tags: ['Emergency', 'Surgery', 'Maternity'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
    about: 'A leading public referral hospital providing high-quality, affordable healthcare to the people of Accra and surrounding regions.',
    departments: ['Emergency Medicine', 'Surgery', 'Maternity', 'Pediatrics'],
    website: 'ridgemedical.gov.gh',
    phone: '+233 30 222 1234',
    contracts: [
      { title: 'Emergency Physician', pay: 'GH₵ 3,800 / mo', type: 'Full-time', positions: '2 Positions', desc: 'Night shift emergency physician for the main trauma unit.' },
    ],
  },
  {
    id: 3,
    name: 'Korle-Bu Teaching Hospital',
    location: 'Korle-Bu, Accra',
    address: 'Guggisberg Ave, Accra',
    type: 'PUBLIC',
    rating: 4.5,
    tags: ['Teaching', 'Research', 'Oncology'],
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=400&q=80',
    about: "Ghana's largest hospital and a leading center of medical education and research in sub-Saharan Africa.",
    departments: ['Oncology', 'Neurology', 'Cardiology', 'Research'],
    website: 'kbth.gov.gh',
    phone: '+233 30 266 1630',
    contracts: [
      { title: 'Clinical Research Associate', pay: 'GH₵ 5,200 / mo', type: 'Full-time', positions: '3 Positions', desc: 'Support active clinical trials in the oncology department.' },
    ],
  },
]

export default function HospitalSearch() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [region, setRegion] = useState('Greater Accra')
  const [type, setType] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = hospitals.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) &&
    (type === 'All' || h.type === type.toUpperCase())
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font)' }}>
      {/* Topbar */}
      <div className="topbar" style={{ padding: '0 20px', gap: 12 }}>
        {/* Logo */}
        <div className="hl-logo" style={{ flexShrink: 0 }}>
          <Logo className="hl-logo-icon" />
          <span className="hl-logo-text" style={{ display: 'none' }}>HealthLinka</span>
        </div>

        {/* Nav links — hide on small screens */}
        <div className="search-nav-links" style={{ display: 'flex', gap: 16 }}>
          {[['Find Hospitals', '/practitioner/hospitals'], ['My Contracts', '/practitioner/contracts'], ['Schedule', '/practitioner/dashboard']].map(([label, path]) => (
            <span
              key={label}
              onClick={() => navigate(path)}
              style={{
                fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                color: label === 'Find Hospitals' ? 'var(--green-primary)' : 'var(--text-secondary)',
                borderBottom: label === 'Find Hospitals' ? '2px solid var(--green-primary)' : 'none',
                paddingBottom: 2,
              }}
            >{label}</span>
          ))}
        </div>

        <div className="topbar-search" style={{ maxWidth: 300 }}>
          <Search size={14} color="var(--text-muted)" />
          <input placeholder="Search hospitals..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <Bell size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
          <img src="https://i.pravatar.cc/30?img=12" className="avatar" width={30} height={30} alt="" />
        </div>
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        {/* Header + filters */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Find Healthcare Facilities</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Discover hospitals and open contract opportunities across Ghana.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>REGION</div>
              <div className="input-wrap" style={{ minWidth: 140 }}>
                <select value={region} onChange={e => setRegion(e.target.value)} style={{ fontSize: 13 }}>
                  <option>Greater Accra</option>
                  <option>Ashanti</option>
                  <option>Western</option>
                  <option>Eastern</option>
                </select>
                <ChevronDown size={13} color="var(--text-muted)" />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>TYPE</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {['All', 'Public', 'Private'].map(t => (
                  <button key={t} onClick={() => setType(t)} className={`btn btn-sm ${type === t ? 'btn-primary' : 'btn-ghost'}`}>{t}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hospital cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, paddingBottom: 80 }}>
          {filtered.map(h => (
            <div
              key={h.id}
              className="card"
              style={{ cursor: 'pointer', overflow: 'hidden', transition: 'box-shadow 0.15s' }}
              onClick={() => setSelected(h)}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
            >
              <div style={{ position: 'relative' }}>
                <img src={h.image} alt={h.name} style={{ width: '100%', height: 150, objectFit: 'cover', display: 'block' }} />
                <span style={{ position: 'absolute', top: 10, right: 10, background: h.type === 'PRIVATE' ? 'var(--navy)' : 'var(--blue)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4 }}>
                  {h.type}
                </span>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{h.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                    <Star size={12} fill="#F6AD55" color="#F6AD55" />
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{h.rating}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 12, marginTop: 4, marginBottom: 10 }}>
                  <MapPin size={11} /> {h.location}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                  {h.tags.map(tag => (
                    <span key={tag} style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>{tag}</span>
                  ))}
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }}>View Contracts</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ maxWidth: 720 }} onClick={e => e.stopPropagation()}>
            {/* Header gradient */}
            <div className="modal-header-gradient">
              <button className="modal-close" onClick={() => setSelected(null)}><X size={16} /></button>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{selected.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>
                <MapPin size={13} /> {selected.address}
              </div>
            </div>

            <div style={{ padding: '24px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
              {/* Left */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>About Facility</div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>{selected.about}</p>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Departments</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {selected.departments.map(d => (
                    <span key={d} style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 500 }}>{d}</span>
                  ))}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Quick Contact</div>
                <div style={{ fontSize: 13, color: 'var(--blue)', cursor: 'pointer', marginBottom: 4 }}>{selected.website}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{selected.phone}</div>
              </div>

              {/* Right: Contracts */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Available Contracts</div>
                  <span style={{ background: 'var(--green-light)', color: 'var(--green-primary)', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
                    {selected.contracts.length} Active
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selected.contracts.map((c, i) => (
                    <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '14px 16px', background: i === 0 ? 'var(--green-light)' : '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{c.title}</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--green-primary)', whiteSpace: 'nowrap' }}>{c.pay}</span>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>{c.desc}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 10, fontSize: 11, color: 'var(--text-muted)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} />{c.type}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={11} />{c.positions}</span>
                        </div>
                        <button className="btn btn-primary btn-sm">Apply Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Map FAB */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 50 }}>
        <button className="btn btn-primary" style={{ borderRadius: 30, padding: '12px 20px', boxShadow: 'var(--shadow-lg)' }}>
          <Map size={16} /> View Map
        </button>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .search-nav-links { display: none !important; }
        }
      `}</style>
    </div>
  )
}