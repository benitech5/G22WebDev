// src/context/AuthContext.jsx
// Connects the React app to the HealthLinka backend API.
// Drop this file into src/context/ replacing the existing AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react'
import api, { saveSession, loadSession, clearToken } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)  // restoring session on mount
  const [error, setError] = useState(null)

  // ── Restore session on page reload ──────────────────────────────────────────
  useEffect(() => {
    const { token, user: savedUser, profile: savedProfile } = loadSession()
    if (token && savedUser) {
      setUser(savedUser)
      setProfile(savedProfile)
    }
    setLoading(false)
  }, [])

  // ── Login ────────────────────────────────────────────────────────────────────
  const login = async (credentials) => {
    setError(null)
    try {
      const res = await api.auth.login(credentials)
      saveSession(res.token, res.user, res.profile)
      setUser(res.user)
      setProfile(res.profile)
      return res
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // ── Register practitioner (step 1: account) ──────────────────────────────────
  const registerPractitioner = async (data) => {
    setError(null)
    try {
      const res = await api.auth.registerPractitioner(data)
      return res
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // ── Register hospital ────────────────────────────────────────────────────────
  const registerHospital = async (data) => {
    setError(null)
    try {
      const res = await api.auth.registerHospital(data)
      return res
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // ── Submit practitioner credentials (step 2: credentials) ────────────────────
  const submitCredentials = async (data) => {
    setError(null)
    try {
      const res = await api.auth.submitCredentials(data)
      return res
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // ── Logout ───────────────────────────────────────────────────────────────────
  const logout = () => {
    clearToken()
    setUser(null)
    setProfile(null)
    setError(null)
  }

  // ── Role helpers ─────────────────────────────────────────────────────────────
  const isAdmin = user?.role === 'admin'
  const isHospital = user?.role === 'hospital'
  const isPractitioner = user?.role === 'practitioner'

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      error,
      login,
      logout,
      registerPractitioner,
      registerHospital,
      submitCredentials,
      isAdmin,
      isHospital,
      isPractitioner,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
