import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Mail, Lock, ShieldCheck, ArrowRight, User, HelpCircle, MapPin, Activity, UploadCloud, ChevronLeft,  } from 'lucide-react'
import Logo from '../../components/ui/logo'
import Button from '../../components/ui/button'


export default function HospitalRegistration() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const fileInputRef = React.useRef(null)
  const stepIcons = [User, Building2, ShieldCheck]
  const [form, setForm] = useState({
    hospitalName: '', email: '', password: '', confirmPassword: '', agree: false,
    contactName: '', phone: '', address: '',
    licenseNumber: '', accreditation: '',
    region: '', facilityType: '', streetAddress: '', file: null, departments: [],
  })

  const steps = ['Account Setup', 'Hospital Details', 'Accreditation']

  const handleNext = (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(s => s + 1)
    } else {
      // Handle form submission here
      console.log('Form submitted:', form)
      navigate('/hospital/login')
    }
  }

  const handleBack = () => {
    setStep(s => s - 1)
  }

  return (
    <div className='auth-page'>
      {/* Background Gradients */}
      <div style={{
        position: 'fixed',
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(22,163,74,0.2), transparent 100%)',
        top: -80,
        right: -80,
        filter: 'blur(40px)'
      }} />

      <div style={{
        position: 'fixed',
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent 100%)',
        bottom: -80,
        left: -80,
        filter: 'blur(40px)'
      }} />

      {/* HEADER */}
      <div style={{
        background: '#fff',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="hl-logo">
          <Logo className="hl-logo-icon" />
          <span className="hl-logo-text">HealthLinka</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'var(--green-primary)',
            textTransform: 'uppercase'
          }}>
            STEP {step} OF 3
          </div>

          <div style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'var(--green-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {React.createElement(stepIcons[step - 1], { size: 14, color: "#16A34A" })}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ margin: '0 auto', padding: '40px 16px', maxWidth: 600 }}>

        {/* STEP BAR */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: i < step ? 'var(--green-primary)' : '#E5EAF0'
            }} />
          ))}
        </div>

        {/* CARD */}
        <div className="auth-card" style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
            Hospital Registration
          </h1>

          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 22 }}>
            Join the HealthLinka network to streamline your healthcare management.
          </p>

          <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* STEP 1: Account Setup */}
            {step === 1 && (
              <>
                <div className="form-group">
                  <label className="form-label">Hospital Name</label>
                  <div className="input-wrap" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5EAF0', borderRadius: 8, padding: '8px 12px' }}>
                    <Building2 size={16} style={{ marginRight: 8, color: '#9CA3AF' }} />
                    <input 
                      placeholder="e.g. Perfect Health and Wellness Hospital"
                      value={form.hospitalName}
                      onChange={e => setForm(f => ({ ...f, hospitalName: e.target.value }))}
                      style={{ border: 'none', flex: 1, outline: 'none' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Work Email</label>
                  <div className="input-wrap" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5EAF0', borderRadius: 8, padding: '8px 12px' }}>
                    <Mail size={16} style={{ marginRight: 8, color: '#9CA3AF' }} />
                    <input 
                      type="email"
                      placeholder="admin@hospital.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      style={{ border: 'none', flex: 1, outline: 'none' }}
                    />
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', gap: 4, marginTop: 4 }}>
                    <HelpCircle size={11} /> Use official hospital email
                  </span>
                </div>

                {/* Passwords */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: 12
                }}>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="input-wrap" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5EAF0', borderRadius: 8, padding: '8px 12px' }}>
                      <Lock size={16} style={{ marginRight: 8, color: '#9CA3AF' }} />
                      <input
                        type="password"
                        value={form.password}
                        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                        placeholder="Enter password"
                        style={{ border: 'none', flex: 1, outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-wrap" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5EAF0', borderRadius: 8, padding: '8px 12px' }}>
                      <ShieldCheck size={16} style={{ marginRight: 8, color: '#9CA3AF' }} />
                      <input
                        type="password"
                        value={form.confirmPassword}
                        onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                        placeholder="Confirm password"
                        style={{ border: 'none', flex: 1, outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>

                <label style={{
                  display: 'flex',
                  gap: 10,
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  alignItems: 'center'
                }}>
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))}
                  />
                  I agree to Terms & Privacy Policy
                </label>

                <Button
                  type="submit"
                  innerText="Proceed to Certification"
                  variant="lg"
                  iconRight={ArrowRight}
                />
              </>
            )}

            {/* STEP 2: Hospital Details & Certification */}
            {step === 2 && (
              <>
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-primary)', textTransform: 'uppercase', marginBottom: 4 }}>
                    Location & Type
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div className="form-group">
                      <label className="form-label">Select Region</label>
                      <div className="input-wrap" style={{ border: '1px solid #E5EAF0', borderRadius: 8, padding: '8px 12px' }}>
                        <select 
                          value={form.region} 
                          onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                          style={{ border: 'none', width: '100%', outline: 'none', background: 'transparent' }}
                        >
                          <option value="">Select Region</option>
                          <option value="volta">Volta Region</option>
                          <option value="greater-accra">Greater Accra</option>
                          <option value="ashanti">Ashanti Region</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Facility Type</label>
                      <div className="input-wrap" style={{ border: '1px solid #E5EAF0', borderRadius: 8, padding: '8px 12px' }}>
                        <select 
                          value={form.facilityType} 
                          onChange={e => setForm(f => ({ ...f, facilityType: e.target.value }))}
                          style={{ border: 'none', width: '100%', outline: 'none', background: 'transparent' }}
                        >
                          <option value="">Select Type</option>
                          <option value="general">General Hospital</option>
                          <option value="clinic">Private Clinic</option>
                          <option value="specialist">Specialist Center</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Street Address</label>
                    <div className="input-wrap" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5EAF0', borderRadius: 8, padding: '8px 12px' }}>
                      <MapPin size={16} style={{ marginRight: 8, color: '#9CA3AF' }} />
                      <input 
                        placeholder="123 Health Blvd, Medical District"
                        value={form.address}
                        onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                        style={{ border: 'none', flex: 1, outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-primary)', textTransform: 'uppercase', marginBottom: 10 }}>
                    Core Departments
                  </p>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', 
                    gap: 8 
                  }}>
                    {['Cardiology', 'Neurology', 'Pediatrics', 'Radiology', 'Surgery', 'Oncology', 'Obstetrics', 'Emergency'].map(dept => (
                      <label key={dept} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8, 
                        padding: '10px 12px', 
                        cursor: 'pointer',
                        fontSize: 13,
                        border: form.departments.includes(dept) ? '1.5px solid var(--green-primary)' : '1px solid var(--border)',
                        borderRadius: 8,
                        backgroundColor: form.departments.includes(dept) ? 'rgba(22,163,74,0.05)' : 'transparent'
                      }}>
                        <input 
                          type="checkbox" 
                          style={{ width: 14, height: 14 }}
                          checked={form.departments.includes(dept)}
                          onChange={(e) => {
                            const nextDepts = e.target.checked 
                              ? [...form.departments, dept]
                              : form.departments.filter(d => d !== dept);
                            setForm(f => ({ ...f, departments: nextDepts }));
                          }}
                        />
                        {dept}
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-primary)', textTransform: 'uppercase', marginBottom: 10 }}>
                    Verification Documents
                  </p>
                  <div
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        setForm(f => ({ ...f, file: e.dataTransfer.files[0] }));
                      }
                    }}
                    style={{
                      border: '2px dashed var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: 'clamp(20px, 5vw, 40px)',
                      textAlign: 'center',
                      background: 'var(--bg-input)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <div style={{ 
                      width: 'clamp(40px, 10vw, 60px)', 
                      height: 'clamp(40px, 10vw, 60px)', 
                      borderRadius: '50%', 
                      background: 'var(--green-light)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <UploadCloud size={24} color="var(--green-primary)" />
                    </div>
                    
                    {form.file ? (
                      <p style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, margin: 0 }}>
                        {form.file.name}
                      </p>
                    ) : (
                      <>
                        <p style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, margin: 0 }}>
                          Click to upload or drag and drop
                        </p>
                        <p style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: 'var(--text-muted)', margin: 0 }}>
                          Hospital License, Certification of Operation (PDF, JPG up to 10MB)
                        </p>
                      </>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      style={{ display: 'none' }}
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setForm(f => ({ ...f, file: e.target.files[0] }));
                        }
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <Button 
                    type="button" 
                    onClick={handleBack}
                    innerText="Back" 
                    variant="ghost" 
                    style={{ flex: 1 }}
                    iconLeft={ChevronLeft}
                  />
                  <Button 
                    type="submit" 
                    innerText="Save & Continue" 
                    variant="primary" 
                    style={{ flex: 2 }}
                    iconRight={ArrowRight}
                  />
                </div>
              </>
            )}

            {/* STEP 3: Final Step */}
            {step === 3 && (
              <>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    background: 'var(--green-light)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 20px' 
                  }}>
                    <ShieldCheck size={40} color="var(--green-primary)" />
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Almost there!</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
                    Review your information and submit to complete registration.
                  </p>
                  
                  <div style={{ 
                    background: '#F9FAFB', 
                    borderRadius: 12, 
                    padding: 16, 
                    marginBottom: 24,
                    textAlign: 'left'
                  }}>
                    <p><strong>Hospital:</strong> {form.hospitalName}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Region:</strong> {form.region}</p>
                    <p><strong>Departments:</strong> {form.departments.join(', ') || 'None selected'}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <Button 
                    type="button" 
                    onClick={handleBack}
                    innerText="Back" 
                    variant="ghost" 
                    style={{ flex: 1 }}
                    iconLeft={ChevronLeft}
                  />
                  <Button 
                    type="submit" 
                    innerText="Complete Registration" 
                    variant="primary" 
                    style={{ flex: 2 }}
                    iconRight={ArrowRight}
                  />
                </div>
              </>
            )}
          </form>

          <p style={{
            textAlign: 'center',
            fontSize: 13,
            marginTop: 18
          }}>
            Already registered?{' '}
            <span
              onClick={() => navigate('/hospital/login')}
              style={{
                color: 'var(--green-primary)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Log in to dashboard
            </span>
          </p>
        </div>

        {/* FOOTER */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 18,
          marginTop: 22,
          fontSize: 11,
          color: 'var(--text-muted)'
        }}>
          {['HIPAA COMPLIANT', '256-BIT ENCRYPTED', '24/7 MEDSUPPORT'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <ShieldCheck size={12} /> {t}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
