// src/services/api.js
// ─────────────────────────────────────────────────────────────────────────────
// Central API service for HealthLinka frontend.
// All components should import from here instead of calling fetch() directly.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = 'http://localhost:4000/api'

// ─── TOKEN HELPERS ────────────────────────────────────────────────────────────
export function getToken() {
  return localStorage.getItem('hl_token')
}

export function setToken(token) {
  localStorage.setItem('hl_token', token)
}

export function clearToken() {
  localStorage.removeItem('hl_token')
  localStorage.removeItem('hl_user')
  localStorage.removeItem('hl_profile')
}

export function saveSession(token, user, profile) {
  localStorage.setItem('hl_token', token)
  localStorage.setItem('hl_user', JSON.stringify(user))
  localStorage.setItem('hl_profile', JSON.stringify(profile))
}

export function loadSession() {
  const token = localStorage.getItem('hl_token')
  const user = JSON.parse(localStorage.getItem('hl_user') || 'null')
  const profile = JSON.parse(localStorage.getItem('hl_profile') || 'null')
  return { token, user, profile }
}

// ─── BASE REQUEST ─────────────────────────────────────────────────────────────
async function request(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || `Request failed: ${response.status}`)
  }

  return data
}

const get = (path) => request(path)
const post = (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) })
const patch = (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) })
const put = (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) })
const del = (path) => request(path, { method: 'DELETE' })

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const auth = {
  /**
   * Login any user (practitioner, hospital, admin).
   * @param {{ email?: string, username?: string, password: string }} credentials
   */
  login: (credentials) => post('/auth/login', credentials),

  /** Register a new practitioner account (step 1) */
  registerPractitioner: (data) => post('/auth/register/practitioner', data),

  /** Register a new hospital account */
  registerHospital: (data) => post('/auth/register/hospital', data),

  /** Submit practitioner credentials after signup (step 2) */
  submitCredentials: (data) => post('/auth/credentials', data),

  /** Get logged-in user's info and profile */
  me: () => get('/auth/me'),
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
export const admin = {
  /** Get admin dashboard summary stats */
  getStats: () => get('/admin/stats'),

  /** Get all practitioners (for verification table) */
  getPractitioners: () => get('/practitioners'),

  /** Get all hospitals (for verification table) */
  getHospitals: () => get('/hospitals'),

  /** Approve or reject a practitioner */
  verifyPractitioner: (id, status) => patch(`/admin/practitioners/${id}/verify`, { status }),

  /** Approve or reject a hospital */
  verifyHospital: (id, status) => patch(`/admin/hospitals/${id}/verify`, { status }),

  /** Get system activity log */
  getSystemActivity: () => get('/systemActivity'),

  /** Get compliance alerts */
  getComplianceAlerts: () => get('/complianceAlerts'),
}

// ─── HOSPITALS ────────────────────────────────────────────────────────────────
export const hospitals = {
  /** Get all hospitals (public — for practitioner search) */
  getAll: (params = '') => get(`/hospitals${params}`),

  /** Get a single hospital by ID */
  getById: (id) => get(`/hospitals/${id}`),

  /** Get hospital dashboard stats */
  getStats: (hospitalId) => get(`/hospital/${hospitalId}/stats`),

  /** Get contracts for a hospital */
  getContracts: (hospitalId) => get(`/contracts?hospitalId=${hospitalId}`),

  /** Get transactions for a hospital */
  getTransactions: (hospitalId) => get(`/transactions?hospitalId=${hospitalId}`),

  /** Get open positions for a hospital */
  getOpenPositions: (hospitalId) => get(`/openPositions?hospitalId=${hospitalId}`),

  /** Get practitioners assigned to this hospital */
  getPractitioners: (hospitalId) => get(`/practitioners?hospitalId=${hospitalId}`),

  /** Get compliance alerts for a hospital */
  getComplianceAlerts: (hospitalId) => get(`/complianceAlerts?hospitalId=${hospitalId}`),

  /** Deposit funds to escrow */
  deposit: (hospitalId, data) => post(`/hospital/${hospitalId}/deposit`, data),

  /** Release payment from escrow to practitioner */
  releasePayment: (hospitalId, data) => post(`/hospital/${hospitalId}/release`, data),
}

// ─── PRACTITIONERS ────────────────────────────────────────────────────────────
export const practitioners = {
  /** Get all practitioners */
  getAll: () => get('/practitioners'),

  /** Get a single practitioner by ID */
  getById: (id) => get(`/practitioners/${id}`),

  /** Get practitioner dashboard stats */
  getStats: (practitionerId) => get(`/practitioner/${practitionerId}/stats`),

  /** Get contracts for a practitioner */
  getContracts: (practitionerId) => get(`/contracts?practitionerId=${practitionerId}`),

  /** Get shifts for a practitioner */
  getShifts: (practitionerId) => get(`/shifts?practitionerId=${practitionerId}`),

  /** Get escrow rows for a practitioner */
  getEscrow: (practitionerId) => get(`/escrow?practitionerId=${practitionerId}`),

  /** Get payment history (transactions) for a practitioner */
  getTransactions: (practitionerId) => get(`/transactions?practitionerId=${practitionerId}`),

  /** Get submitted documents for a practitioner */
  getDocuments: (practitionerId) => get(`/documents?practitionerId=${practitionerId}`),

  /** Start a shift */
  startShift: (practitionerId, shiftId) =>
    patch(`/practitioner/${practitionerId}/shift/${shiftId}/start`, {}),

  /** End a shift */
  endShift: (practitionerId, shiftId, hoursLogged) =>
    patch(`/practitioner/${practitionerId}/shift/${shiftId}/end`, { hoursLogged }),
}

// ─── CONTRACTS ────────────────────────────────────────────────────────────────
export const contracts = {
  /** Get all contracts */
  getAll: () => get('/contracts'),

  /** Get a single contract */
  getById: (id) => get(`/contracts/${id}`),

  /** Create a new contract */
  create: (data) => post('/contracts', data),

  /** Update contract status */
  updateStatus: (id, status) => patch(`/contracts/${id}/status`, { status }),

  /** Update contract (full) */
  update: (id, data) => put(`/contracts/${id}`, data),
}

// ─── OPEN POSITIONS ───────────────────────────────────────────────────────────
export const positions = {
  /** Get all open positions */
  getAll: () => get('/openPositions'),

  /** Get positions for a specific hospital */
  getByHospital: (hospitalId) => get(`/openPositions?hospitalId=${hospitalId}`),

  /** Apply to a position */
  apply: (positionId, practitionerId) => post(`/positions/${positionId}/apply`, { practitionerId }),
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
export const notifications = {
  /** Get notifications for a user */
  getForUser: (userId) => get(`/notifications?userId=${userId}`),

  /** Mark a notification as read */
  markRead: (id) => patch(`/notifications/${id}/read`, {}),
}

// ─── SYSTEM ACTIVITY ─────────────────────────────────────────────────────────
export const activity = {
  getAll: () => get('/systemActivity'),
}

// ─── DEFAULT EXPORT ───────────────────────────────────────────────────────────
const api = {
  auth,
  admin,
  hospitals,
  practitioners,
  contracts,
  positions,
  notifications,
  activity,
}

export default api
