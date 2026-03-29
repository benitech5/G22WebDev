const jsonServer = require('json-server')
const bcrypt = require('bcryptjs')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const express = require('express')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const db = require('./db.json')

// ─── MULTER STORAGE CONFIG ────────────────────────────
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname).toLowerCase())
  }
})
const upload = multer({ storage })

// Serve the uploads folder statically
server.use('/uploads', express.static(uploadsDir))

// ─── RUN MIGRATION: HASH EXISTING PASSWORDS ──────────────────────────────────
try {
  const users = router.db.get('users').value() || [];
  let updated = false;
  users.forEach(u => {
    if (u.password && !u.password.startsWith('$2a$') && !u.password.startsWith('$2b$')) {
      u.password = bcrypt.hashSync(u.password, 10);
      updated = true;
    }
  });
  if (updated) router.db.write();
} catch (e) {
  console.error('Password migration failed:', e);
}// ─── CORS ────────────────────────────────────────────────────────────────────
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

server.use(jsonServer.bodyParser)
server.use(middlewares)

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function findUser(email, username, password) {
  const users = router.db.get('users').value()
  return users.find(u =>
    (u.email === email || u.username === username) && bcrypt.compareSync(password, u.password)
  )
}

function generateToken(user) {
  // Simple base64 token (not cryptographic — suitable for json-server mock)
  const payload = { id: user.id, role: user.role, name: user.name, exp: Date.now() + 86400000 }
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

function verifyToken(token) {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf8'))
    if (payload.exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

function getAuthUser(req) {
  const auth = req.headers.authorization || ''
  const token = auth.replace('Bearer ', '')
  if (!token) return null
  return verifyToken(token)
}

// ─── AUTH ROUTES ──────────────────────────────────────────────────────────────

// POST /api/auth/login  — works for all roles
server.post('/api/auth/login', (req, res) => {
  const { email, username, password } = req.body

  if (!password || (!email && !username)) {
    return res.status(400).json({ error: 'Email/username and password are required.' })
  }

  const user = findUser(email, username, password)
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials. Please try again.' })
  }

  const token = generateToken(user)

  // Get role-specific profile
  let profile = null
  if (user.role === 'practitioner') {
    profile = router.db.get('practitioners').find({ userId: user.id }).value()
  } else if (user.role === 'hospital') {
    profile = router.db.get('hospitals').find({ userId: user.id }).value()
  }

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    },
    profile,
  })
})

// POST /api/auth/register/practitioner
server.post('/api/auth/register/practitioner', (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' })
  }

  const users = router.db.get('users').value()
  const exists = users.find(u => u.email === email || u.username === username)
  if (exists) {
    return res.status(409).json({ error: 'An account with this email or username already exists.' })
  }

  const newId = 'u' + (users.length + 100)
  const newUser = {
    id: newId,
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    role: 'practitioner',
    name: username,
    avatar: null,
  }
  router.db.get('users').push(newUser).write()

  return res.status(201).json({
    message: 'Practitioner account created. Please complete your credentials.',
    userId: newId,
  })
})

// POST /api/auth/register/hospital
server.post('/api/auth/register/hospital', (req, res) => {
  const { hospitalName, email, password, contactName, phone, address, licenseNumber, accreditation } = req.body

  if (!hospitalName || !email || !password) {
    return res.status(400).json({ error: 'Hospital name, email, and password are required.' })
  }

  const users = router.db.get('users').value()
  const exists = users.find(u => u.email === email)
  if (exists) {
    return res.status(409).json({ error: 'An account with this email already exists.' })
  }

  const newUserId = 'u' + (users.length + 200)
  const newUser = {
    id: newUserId,
    username: email,
    email,
    password: bcrypt.hashSync(password, 10),
    role: 'hospital',
    name: hospitalName,
    avatar: null,
  }
  router.db.get('users').push(newUser).write()

  const hospitals = router.db.get('hospitals').value()
  const newHospId = 'h' + (hospitals.length + 100)
  const newHospital = {
    id: newHospId,
    userId: newUserId,
    name: hospitalName,
    shortName: hospitalName.split(' ').slice(0, 2).join(' '),
    region: address || '',
    address: address || '',
    type: 'PRIVATE',
    rating: 0,
    status: 'Pending',
    registrationDate: new Date().toISOString().split('T')[0],
    licenseNumber: licenseNumber || '',
    accreditation: accreditation || '',
    contactEmail: email,
    contactPhone: phone || '',
    website: '',
    image: null,
    tags: [],
    departments: [],
    about: '',
    escrowBalance: 0,
    pendingReleases: 0,
    disbursedQuarter: 0,
  }
  router.db.get('hospitals').push(newHospital).write()

  return res.status(201).json({
    message: 'Hospital registration submitted. Pending admin verification.',
    userId: newUserId,
    hospitalId: newHospId,
  })
})

// POST /api/auth/credentials — submit practitioner credentials after signup
server.post('/api/auth/credentials', (req, res) => {
  const authUser = getAuthUser(req)
  const { userId, fullName, profession, licenseNumber, region } = req.body

  const targetId = (authUser && authUser.id) || userId
  if (!targetId) return res.status(401).json({ error: 'Unauthorized.' })

  const practitioners = router.db.get('practitioners').value()
  const existing = practitioners.find(p => p.userId === targetId)
  if (existing) {
    return res.status(409).json({ error: 'Credentials already submitted.' })
  }

  const newPractId = 'p' + (practitioners.length + 100)
  const initials = (fullName || '').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

  const newPractitioner = {
    id: newPractId,
    userId: targetId,
    name: fullName || '',
    initials,
    specialization: profession || '',
    licenseNumber: licenseNumber || '',
    region: region || '',
    status: 'Pending',
    registrationDate: new Date().toISOString().split('T')[0],
    online: false,
    avatar: null,
    phone: '',
    email: '',
    profession: profession || '',
    documentsSubmitted: 0,
    documentsRequired: 4,
  }
  router.db.get('practitioners').push(newPractitioner).write()

  // Update user name
  router.db.get('users').find({ id: targetId }).assign({ name: fullName }).write()

  return res.status(201).json({
    message: 'Credentials submitted. Pending admin verification.',
    practitionerId: newPractId,
  })
})

// GET /api/auth/me — get current user info
server.get('/api/auth/me', (req, res) => {
  const authUser = getAuthUser(req)
  if (!authUser) return res.status(401).json({ error: 'Unauthorized.' })

  const user = router.db.get('users').find({ id: authUser.id }).value()
  if (!user) return res.status(404).json({ error: 'User not found.' })

  let profile = null
  if (user.role === 'practitioner') {
    profile = router.db.get('practitioners').find({ userId: user.id }).value()
  } else if (user.role === 'hospital') {
    profile = router.db.get('hospitals').find({ userId: user.id }).value()
  }

  const { password: _pw, ...safeUser } = user
  return res.json({ user: safeUser, profile })
})

// ─── ADMIN ROUTES ─────────────────────────────────────────────────────────────

// PATCH /api/admin/practitioners/:id/verify
server.patch('/api/admin/practitioners/:id/verify', (req, res) => {
  const authUser = getAuthUser(req)
  if (!authUser || authUser.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required.' })
  }

  const { status } = req.body // 'Verified' | 'Rejected'
  if (!['Verified', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Status must be Verified or Rejected.' })
  }

  const practitioner = router.db.get('practitioners').find({ id: req.params.id })
  if (!practitioner.value()) return res.status(404).json({ error: 'Practitioner not found.' })

  practitioner.assign({ status }).write()
  return res.json({ message: `Practitioner ${status.toLowerCase()} successfully.`, id: req.params.id, status })
})

// PATCH /api/admin/hospitals/:id/verify
server.patch('/api/admin/hospitals/:id/verify', (req, res) => {
  const authUser = getAuthUser(req)
  if (!authUser || authUser.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required.' })
  }

  const { status } = req.body // 'Active' | 'Rejected'
  if (!['Active', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Status must be Active or Rejected.' })
  }

  const hospital = router.db.get('hospitals').find({ id: req.params.id })
  if (!hospital.value()) return res.status(404).json({ error: 'Hospital not found.' })

  hospital.assign({ status }).write()
  return res.json({ message: `Hospital ${status.toLowerCase()} successfully.`, id: req.params.id, status })
})

// GET /api/admin/stats — dashboard summary stats
server.get('/api/admin/stats', (req, res) => {
  const authUser = getAuthUser(req)
  if (!authUser || authUser.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required.' })
  }

  const practitioners = router.db.get('practitioners').value()
  const hospitals = router.db.get('hospitals').value()
  const contracts = router.db.get('contracts').value()
  const transactions = router.db.get('transactions').value()

  return res.json({
    totalPractitioners: practitioners.length,
    pendingPractitioners: practitioners.filter(p => p.status === 'Pending').length,
    verifiedPractitioners: practitioners.filter(p => p.status === 'Verified').length,
    totalHospitals: hospitals.length,
    pendingHospitals: hospitals.filter(h => h.status === 'Pending').length,
    activeHospitals: hospitals.filter(h => h.status === 'Active').length,
    totalContracts: contracts.length,
    activeContracts: contracts.filter(c => c.status === 'Active').length,
    totalTransactionVolume: transactions.reduce((sum, t) => sum + (t.amount || 0), 0),
  })
})

// ─── HOSPITAL ROUTES ──────────────────────────────────────────────────────────

// GET /api/hospital/:id/stats
server.get('/api/hospital/:id/stats', (req, res) => {
  const hospital = router.db.get('hospitals').find({ id: req.params.id }).value()
  if (!hospital) return res.status(404).json({ error: 'Hospital not found.' })

  const contracts = router.db.get('contracts').filter({ hospitalId: req.params.id }).value()
  const transactions = router.db.get('transactions').filter({ hospitalId: req.params.id }).value()

  return res.json({
    escrowBalance: hospital.escrowBalance,
    pendingReleases: hospital.pendingReleases,
    disbursedQuarter: hospital.disbursedQuarter,
    activeContracts: contracts.filter(c => c.status === 'Active').length,
    pendingReview: contracts.filter(c => c.status === 'Pending Review').length,
    expiringSoon: contracts.filter(c => c.status === 'Expiring Soon').length,
    complianceRate: 99.4,
    totalTransactions: transactions.length,
  })
})

// POST /api/hospital/:id/deposit — deposit to escrow via Paystack
server.post('/api/hospital/:id/deposit', async (req, res) => {
  const { amount, sourceAccount, reference } = req.body
  if (!reference) return res.status(400).json({ error: 'Paystack transaction reference is required.' })

  const hospital = router.db.get('hospitals').find({ id: req.params.id })
  if (!hospital.value()) return res.status(404).json({ error: 'Hospital not found.' })

  try {
    const paystackSecret = 'sk_test_bb7fb916cba2cb9269e56a883e8abc2b477c50f6'
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${paystackSecret}` }
    })

    const data = response.data
    // Paystack amounts are in pesewas, so divided by 100
    const verifiedAmount = data.data.amount / 100

    if (!data.status || data.data.status !== 'success') {
      return res.status(400).json({ error: 'Payment verification failed with Paystack.' })
    }

    const newBalance = (hospital.value().escrowBalance || 0) + verifiedAmount
    hospital.assign({ escrowBalance: newBalance }).write()

    const txn = {
      id: 'TXN-' + Date.now(),
      hospitalId: req.params.id,
      practitionerId: null,
      contractId: null,
      date: new Date().toISOString().split('T')[0],
      name: sourceAccount || 'Paystack Deposit',
      description: `Escrow deposit (Ref: ${reference})`,
      type: 'DEPOSIT',
      status: 'Completed',
      amount: verifiedAmount,
      currency: 'GHS',
      direction: 'credit',
    }
    router.db.get('transactions').push(txn).write()

    return res.json({ message: 'Deposit successful and verified.', newBalance, transaction: txn })
  } catch (error) {
    console.error('Paystack API Error:', error.response?.data || error.message)
    return res.status(500).json({ error: 'Failed to verify payment with Paystack.' })
  }
})

// POST /api/hospital/:id/release — release payment from escrow
server.post('/api/hospital/:id/release', (req, res) => {
  const { amount, practitionerId, contractId, memo } = req.body
  if (!amount || amount <= 0) return res.status(400).json({ error: 'Valid amount is required.' })

  const hospital = router.db.get('hospitals').find({ id: req.params.id })
  if (!hospital.value()) return res.status(404).json({ error: 'Hospital not found.' })

  if ((hospital.value().escrowBalance || 0) < parseFloat(amount)) {
    return res.status(400).json({ error: 'Insufficient escrow balance.' })
  }

  const newBalance = hospital.value().escrowBalance - parseFloat(amount)
  hospital.assign({ escrowBalance: newBalance }).write()

  const practitioner = practitionerId
    ? router.db.get('practitioners').find({ id: practitionerId }).value()
    : null

  const txn = {
    id: 'TXN-' + Date.now(),
    hospitalId: req.params.id,
    practitionerId: practitionerId || null,
    contractId: contractId || null,
    date: new Date().toISOString().split('T')[0],
    name: practitioner ? practitioner.name : 'Vendor',
    description: memo || 'Payment release',
    type: 'RELEASE',
    status: 'Processing',
    amount: parseFloat(amount),
    currency: 'GHS',
    direction: 'debit',
  }
  router.db.get('transactions').push(txn).write()

  return res.json({ message: 'Payment release initiated.', newBalance, transaction: txn })
})

// ─── PRACTITIONER ROUTES ──────────────────────────────────────────────────────

// GET /api/practitioner/:id/stats
server.get('/api/practitioner/:id/stats', (req, res) => {
  const practitioner = router.db.get('practitioners').find({ id: req.params.id }).value()
  if (!practitioner) return res.status(404).json({ error: 'Practitioner not found.' })

  const contracts = router.db.get('contracts').filter({ practitionerId: req.params.id }).value()
  const shifts = router.db.get('shifts').filter({ practitionerId: req.params.id }).value()
  const escrow = router.db.get('escrow').filter({ practitionerId: req.params.id }).value()
  const transactions = router.db.get('transactions').filter({ practitionerId: req.params.id }).value()

  const totalEarnings = transactions
    .filter(t => t.direction === 'credit' && t.status === 'PAID')
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  const escrowTotal = escrow.reduce((sum, e) => sum + (e.pendingAmount || 0), 0)

  return res.json({
    activeContracts: contracts.filter(c => c.status === 'Active').length,
    totalContracts: contracts.length,
    completedShifts: shifts.filter(s => s.status === 'Completed').length,
    totalShifts: shifts.length,
    monthlyEarnings: 12450,
    totalEarnings: totalEarnings || 45200,
    escrowBalance: escrowTotal || 8400,
    paymentsReleased: 36800,
    hoursThisWeek: 38.5,
    weeklyHourLimit: 40,
  })
})

// PATCH /api/practitioner/:id/shift/:shiftId/start
server.patch('/api/practitioner/:id/shift/:shiftId/start', (req, res) => {
  const shift = router.db.get('shifts').find({ id: req.params.shiftId, practitionerId: req.params.id })
  if (!shift.value()) return res.status(404).json({ error: 'Shift not found.' })
  shift.assign({ status: 'Active', startedAt: new Date().toISOString() }).write()
  return res.json({ message: 'Shift started.', shift: shift.value() })
})

// PATCH /api/practitioner/:id/shift/:shiftId/end
server.patch('/api/practitioner/:id/shift/:shiftId/end', (req, res) => {
  const shift = router.db.get('shifts').find({ id: req.params.shiftId, practitionerId: req.params.id })
  if (!shift.value()) return res.status(404).json({ error: 'Shift not found.' })
  shift.assign({ status: 'Completed', endedAt: new Date().toISOString(), hoursLogged: req.body.hoursLogged || 8 }).write()
  return res.json({ message: 'Shift ended.', shift: shift.value() })
})

// ─── CONTRACTS ────────────────────────────────────────────────────────────────

// POST /api/contracts — create contract
server.post('/api/contracts', (req, res) => {
  const authUser = getAuthUser(req)
  if (!authUser || (authUser.role !== 'hospital' && authUser.role !== 'admin')) {
    return res.status(403).json({ error: 'Hospital or admin access required.' })
  }

  const { name, department, type, startDate, endDate, value, hospitalId } = req.body
  if (!name || !department || !startDate || !endDate || !value) {
    return res.status(400).json({ error: 'Name, department, dates, and value are required.' })
  }

  const contracts = router.db.get('contracts').value()
  const newContract = {
    id: 'CT-' + Date.now(),
    hospitalId: hospitalId || null,
    practitionerId: null,
    name,
    department,
    type: type || 'Staffing',
    status: 'Pending Review',
    startDate,
    endDate,
    value: parseFloat(value),
    currency: 'GHS',
    progress: 0,
    roles: 0,
    renewalDaysLeft: null,
    escrowAmount: 0,
    releasedAmount: 0,
    createdAt: new Date().toISOString(),
  }
  router.db.get('contracts').push(newContract).write()

  return res.status(201).json({ message: 'Contract created.', contract: newContract })
})

// PATCH /api/contracts/:id/status
server.patch('/api/contracts/:id/status', (req, res) => {
  const { status } = req.body
  const contract = router.db.get('contracts').find({ id: req.params.id })
  if (!contract.value()) return res.status(404).json({ error: 'Contract not found.' })
  contract.assign({ status }).write()
  return res.json({ message: 'Contract status updated.', id: req.params.id, status })
})

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

// PATCH /api/notifications/:id/read
server.patch('/api/notifications/:id/read', (req, res) => {
  const notif = router.db.get('notifications').find({ id: req.params.id })
  if (!notif.value()) return res.status(404).json({ error: 'Notification not found.' })
  notif.assign({ read: true }).write()
  return res.json({ message: 'Marked as read.' })
})

// ─── FILE UPLOADS ─────────────────────────────────────────────────────────────

// POST /api/upload — uploads file via Multer and returns the static url
server.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' })
  const PORT = process.env.PORT || 4000
  const url = `http://localhost:${PORT}/uploads/${req.file.filename}`
  return res.status(201).json({ url })
})

// ─── OPEN POSITIONS / APPLY ───────────────────────────────────────────────────

// POST /api/positions/:id/apply
server.post('/api/positions/:id/apply', (req, res) => {
  const authUser = getAuthUser(req)
  const { practitionerId } = req.body

  const position = router.db.get('openPositions').find({ id: req.params.id }).value()
  if (!position) return res.status(404).json({ error: 'Position not found.' })

  return res.json({
    message: `Application submitted for: ${position.title}. The hospital will review and get back to you.`,
    positionId: req.params.id,
    practitionerId: practitionerId || (authUser && authUser.id),
  })
})

// ─── FALLBACK TO JSON-SERVER ROUTER ──────────────────────────────────────────
server.use('/api', router)

// ─── START ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log('')
  console.log('  ╔═══════════════════════════════════════╗')
  console.log('  ║    HealthLinka Mock API Server        ║')
  console.log(`  ║    Running on http://localhost:${PORT}   ║`)
  console.log('  ╠═══════════════════════════════════════╣')
  console.log('  ║  Auth endpoints:                      ║')
  console.log('  ║  POST /api/auth/login                 ║')
  console.log('  ║  POST /api/auth/register/practitioner ║')
  console.log('  ║  POST /api/auth/register/hospital     ║')
  console.log('  ║  POST /api/auth/credentials           ║')
  console.log('  ║  GET  /api/auth/me                    ║')
  console.log('  ║                                       ║')
  console.log('  ║  Data endpoints (json-server):        ║')
  console.log('  ║  GET  /api/practitioners              ║')
  console.log('  ║  GET  /api/hospitals                  ║')
  console.log('  ║  GET  /api/contracts                  ║')
  console.log('  ║  GET  /api/shifts                     ║')
  console.log('  ║  GET  /api/transactions               ║')
  console.log('  ║  GET  /api/escrow                     ║')
  console.log('  ║  GET  /api/systemActivity             ║')
  console.log('  ║  GET  /api/notifications              ║')
  console.log('  ║  GET  /api/openPositions              ║')
  console.log('  ║  GET  /api/documents                  ║')
  console.log('  ║  GET  /api/complianceAlerts           ║')
  console.log('  ╚═══════════════════════════════════════╝')
  console.log('')
  console.log('  Test credentials:')
  console.log('  Admin:        admin@healthlinka.com / admin123')
  console.log('  Practitioner: dr.kofi / doctor123')
  console.log('  Hospital:     perfecthealth / hospital123')
  console.log('')
})
