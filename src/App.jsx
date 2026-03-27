import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Public
import LandingPage from './pages/LandingPage'

// Auth
import PractitionerLogin from './pages/auth/PractitionerLogin'
import PractitionerSignup from './pages/auth/PractitionerSignup'
import PractitionerCredentials from './pages/auth/PractitionerCredentials'
import VerifyPending from './pages/auth/VerifyPending'
import HospitalLogin from './pages/auth/HospitalLogin'
import HospitalRegistration from './pages/auth/HospitalRegistration'
import AdminLogin from './pages/auth/AdminLogin'

// Practitioner
import PractitionerDashboard from './pages/practitioner/PractitionerDashboard'
import MyContracts from './pages/practitioner/MyContracts'
import PractitionerPayments from './pages/practitioner/PractitionerPayments'
import HospitalSearch from './pages/practitioner/HospitalSearch'

// Hospital
import HospitalDashboard from './pages/hospital/HospitalDashboard'
import HospitalContracts from './pages/hospital/HospitalContracts'
import HospitalPayments from './pages/hospital/HospitalPayments'

// Admin
import AdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />

          {/* Practitioner Auth */}
          <Route path="/practitioner/login" element={<PractitionerLogin />} />
          <Route path="/practitioner/signup" element={<PractitionerSignup />} />
          <Route path="/practitioner/credentials" element={<PractitionerCredentials />} />
          <Route path="/practitioner/verify-pending" element={<VerifyPending />} />

          {/* Practitioner Portal */}
          <Route path="/practitioner/dashboard" element={<PractitionerDashboard />} />
          <Route path="/practitioner/contracts" element={<MyContracts />} />
          <Route path="/practitioner/payments" element={<PractitionerPayments />} />
          <Route path="/practitioner/hospitals" element={<HospitalSearch />} />

          {/* Hospital Auth */}
          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route path="/hospital/register" element={<HospitalRegistration />} />

          {/* Hospital Portal */}
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
          <Route path="/hospital/contracts" element={<HospitalContracts />} />
          <Route path="/hospital/payments" element={<HospitalPayments />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}