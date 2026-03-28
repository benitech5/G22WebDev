import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronDown, ArrowRight, TrendingUp, Users, Shield, Building2, Menu, X } from 'lucide-react'
import Logo from '../components/ui/logo'

export default function LandingPage() {
  const navigate = useNavigate()
  const [loginOpen, setLoginOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [numOfPractitioners, setNumOfPractitioners] = useState("2000+")
  const [numOfHealthcareCenters, setNumOfHealthcareCenters] = useState("500+")
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font)' }}>
      {/* Navbar */}
      <nav style={{ height: 60, background: '#fff', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="hl-logo">
          <Logo className="hl-logo-icon" />
          <span className="hl-logo-text">HealthLinka</span>
        </div>
        {/* Desktop nav actions */}
        <div className="landing-nav-actions" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-blue btn-sm"
              onClick={() => setLoginOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              Login <ChevronDown size={14} />
            </button>
            {loginOpen && (
              <div style={{ position: 'absolute', right: 0, top: '110%', background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', minWidth: 200, boxShadow: 'var(--shadow-md)', zIndex: 100 }}>
                {[
                  { label: 'Practitioner Portal', path: '/practitioner/login' },
                  { label: 'Hospital Portal', path: '/hospital/login' },
                  { label: 'Super Admin', path: '/admin/login' },
                ].map(item => (
                  <div
                    key={item.path}
                    onClick={() => { setLoginOpen(false); navigate(item.path) }}
                    style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-page)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/practitioner/signup')}>
            Get Started <ArrowRight size={14} />
          </button>
        </div>
        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(o => !o)}
          style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Practitioner Login', path: '/practitioner/login' },
            { label: 'Hospital Login', path: '/hospital/login' },
            { label: 'Admin Login', path: '/admin/login' },
          ].map(item => (
            <div key={item.path} onClick={() => { setMobileMenuOpen(false); navigate(item.path) }}
              style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', padding: '6px 0' }}>
              {item.label}
            </div>
          ))}
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/practitioner/signup')}>
            Get Started
          </button>
        </div>
      )}

      {/* Hero */}
      <section style={{ background: 'var(--bg-page)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--green-transparent)', border: '1px solid var(--border)', borderRadius: 20, padding: '6px 14px', marginBottom: 28 }}>
              <CheckCircle2 size={14} color="var(--green-primary)" />
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', }}>Trusted by {numOfHealthcareCenters} Healthcare Centers</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: 20 }}>
              Unified<br />Healthcare<br />
              <span style={{ color: 'var(--green-primary)' }}>Staffing</span> &<br />Management
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
              Empowering practitioners, hospitals, and administrators with a seamless enterprise SaaS solution for modern healthcare collaboration.
            </p>
            <button className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px', borderRadius: 'var(--radius-md)' }} onClick={() => navigate('/practitioner/signup')}>
              Get Started
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex' }}>
                {[1,2,3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/32?img=${i+20}`} className="avatar" width={32} height={32} style={{ marginLeft: i > 1 ? -10 : 0, border: '2px solid #fff' }} alt="" />
                ))}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Joined by <strong style={{ color: 'var(--text-primary)' }}>{numOfPractitioners}</strong> medical practitioners this month
              </p>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 'var(--radius-xxl)', overflow: 'hidden', boxShadow: 'var(--shadow-xxl)', border: '8px solid var(--border-white)'}}>
              <img
                src="https://visionplatform.ai/wp-content/uploads/2025/12/Healthcare-monitoring-with-analytics-dashboards.png"
                alt="Healthcare facility"
                style={{ width: '100%', height: 'clamp(550px, 35vw, 380px)', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: 24, left: -10, background: '#fff', borderRadius: 'var(--radius-md)', padding: '12px 18px', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={18} color="var(--green-primary)" />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Efficiency Boost</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>+42% Higher Staffing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Portals */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Enterprise-Grade Portals</h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)' }}>A specialized ecosystem designed for every stakeholder in the healthcare journey.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              {
                icon: Users, iconBg: '#E8F7EF', iconColor: '#1E9B5B',
                title: 'Health Practitioners',
                desc: 'Manage your professional profile, track shifts, and streamline clinical documentation in one place.',
                features: ['Smart Scheduling', 'Instant Credentialing'],
                path: '/practitioner/login',
              },
              {
                icon: Building2, iconBg: '#EBF8FF', iconColor: '#3182CE',
                title: 'Hospital Facilities',
                desc: 'Optimize workforce management, fill shifts instantly, and reduce administrative overhead.',
                features: ['Auto-Staffing Matching', 'Compliance Monitoring'],
                path: '/hospital/login',
              },
              {
                icon: Shield, iconBg: '#F3E8FF', iconColor: '#805AD5',
                title: 'Super Admin',
                desc: 'Enterprise-wide oversight with advanced analytics, user management, and global configurations.',
                features: ['Global Data Insights', 'Access Control Systems'],
                path: '/admin/login',
              },
            ].map(portal => (
              <div key={portal.title} className="card" style={{ padding: 28 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: portal.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <portal.icon size={24} color={portal.iconColor} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{portal.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>{portal.desc}</p>
                {portal.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <CheckCircle2 size={14} color="var(--green-primary)" />
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{f}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--border)', marginTop: 20, paddingTop: 16 }}>
                  <button
                    onClick={() => navigate(portal.path)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--green-primary)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, padding: 0, fontFamily: 'var(--font)', textShadow: '0 2px 2px rgba(0,0,0,0.5)'}}
                  >
                    Enter Portal <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div className="hl-logo">
            <Logo className="hl-logo-icon" />
            <span className="hl-logo-text">HealthLinka</span>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Security'].map(l => (
              <span key={l} style={{ fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500 }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2024 HealthLinka SaaS. All rights reserved.</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 600px) {
          .landing-nav-actions { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
