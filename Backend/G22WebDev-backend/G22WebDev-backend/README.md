# HealthLinka Backend — Setup Guide

This is the mock API backend for HealthLinka using **JSON Server** with a custom Express middleware layer for auth, role-based logic, and business operations.

---

## Folder Structure

```
healthlinka-backend/
├── db.json              ← All mock data (the "database")
├── server.js            ← Custom JSON Server + auth/business routes
├── package.json         ← Node dependencies
├── api.js               ← Frontend API service (copy to src/services/api.js)
├── AuthContext.jsx       ← Updated AuthContext (copy to src/context/AuthContext.jsx)
└── scripts/
    └── reset-db.js      ← Resets db.json to seed data
```

---

## Step 1 — Install Node dependencies

```bash
cd healthlinka-backend
npm install
```

This installs:
- `json-server` — REST API from db.json
- `nodemon` — auto-restart on file changes (dev only)

---

## Step 2 — Start the backend server

```bash
# Production start
npm start

# Development (auto-restart on changes)
npm run dev
```

The API will run at: **http://localhost:4000**

You'll see this in the terminal:

```
  ╔═══════════════════════════════════════╗
  ║    HealthLinka Mock API Server        ║
  ║    Running on http://localhost:4000   ║
  ╚═══════════════════════════════════════╝
```

---

## Step 3 — Connect the frontend

### 3a. Copy the API service file
```bash
# From the root of your project:
cp healthlinka-backend/api.js healthlinka/src/services/api.js
```
> Create the `src/services/` folder first if it doesn't exist.

### 3b. Copy the updated AuthContext
```bash
cp healthlinka-backend/AuthContext.jsx healthlinka/src/context/AuthContext.jsx
```

### 3c. Start the frontend (in a separate terminal)
```bash
cd healthlinka
npm run dev
```

The frontend runs at **http://localhost:5173**.

---

## Test Credentials

| Role         | Username / Email              | Password     |
|--------------|-------------------------------|--------------|
| Admin        | `admin@healthlinka.com`       | `admin123`   |
| Practitioner | `dr.kofi`                     | `doctor123`  |
| Practitioner | `dr.elena`                    | `doctor123`  |
| Hospital     | `perfecthealth`               | `hospital123`|
| Hospital     | `ridgemedical`                | `hospital123`|

---

## API Endpoints Reference

### Auth
| Method | Endpoint                          | Description                        |
|--------|-----------------------------------|------------------------------------|
| POST   | `/api/auth/login`                 | Login (all roles)                  |
| POST   | `/api/auth/register/practitioner` | New practitioner account (step 1)  |
| POST   | `/api/auth/register/hospital`     | New hospital registration          |
| POST   | `/api/auth/credentials`           | Submit practitioner credentials    |
| GET    | `/api/auth/me`                    | Get current logged-in user         |

**Login request body:**
```json
{ "email": "admin@healthlinka.com", "password": "admin123" }
// OR for practitioners with username:
{ "username": "dr.kofi", "password": "doctor123" }
```

**Login response:**
```json
{
  "token": "eyJpZCI6...",
  "user": { "id": "u001", "role": "admin", "name": "Alex Rivera", ... },
  "profile": null
}
```

### Admin
| Method | Endpoint                             | Description                    |
|--------|--------------------------------------|--------------------------------|
| GET    | `/api/admin/stats`                   | Dashboard summary numbers      |
| GET    | `/api/practitioners`                 | All practitioners (table)      |
| GET    | `/api/hospitals`                     | All hospitals (table)          |
| PATCH  | `/api/admin/practitioners/:id/verify`| Approve/Reject practitioner    |
| PATCH  | `/api/admin/hospitals/:id/verify`    | Approve/Reject hospital        |
| GET    | `/api/systemActivity`                | System activity log            |
| GET    | `/api/complianceAlerts`              | Compliance alerts              |

**Verify body:** `{ "status": "Verified" }` or `{ "status": "Rejected" }`

### Hospital
| Method | Endpoint                        | Description                     |
|--------|---------------------------------|---------------------------------|
| GET    | `/api/hospital/:id/stats`       | Dashboard stats for a hospital  |
| GET    | `/api/contracts?hospitalId=:id` | Hospital's contracts            |
| GET    | `/api/transactions?hospitalId=:id` | Transaction history          |
| POST   | `/api/hospital/:id/deposit`     | Deposit to escrow               |
| POST   | `/api/hospital/:id/release`     | Release payment from escrow     |
| POST   | `/api/contracts`                | Create a new contract           |

**Deposit body:** `{ "amount": 5000, "sourceAccount": "Main Fund", "reference": "Oct Allocation" }`

**Release body:** `{ "amount": 2000, "practitionerId": "p001", "contractId": "CN-9042", "memo": "Shift payout" }`

### Practitioner
| Method | Endpoint                              | Description                      |
|--------|---------------------------------------|----------------------------------|
| GET    | `/api/practitioner/:id/stats`         | Dashboard stats                  |
| GET    | `/api/contracts?practitionerId=:id`   | Practitioner's contracts         |
| GET    | `/api/shifts?practitionerId=:id`      | Practitioner's shifts            |
| GET    | `/api/escrow?practitionerId=:id`      | Escrow status rows               |
| GET    | `/api/transactions?practitionerId=:id`| Payment history                  |
| PATCH  | `/api/practitioner/:id/shift/:shId/start` | Start a shift               |
| PATCH  | `/api/practitioner/:id/shift/:shId/end`   | End a shift                 |
| GET    | `/api/hospitals`                      | Search hospitals                 |
| GET    | `/api/openPositions?hospitalId=:id`   | Open positions at a hospital     |
| POST   | `/api/positions/:id/apply`            | Apply for a position             |

### JSON Server auto-routes (CRUD on all collections)
```
GET    /api/practitioners
GET    /api/practitioners/:id
GET    /api/hospitals
GET    /api/hospitals/:id
GET    /api/contracts
GET    /api/contracts/:id
GET    /api/shifts
GET    /api/transactions
GET    /api/escrow
GET    /api/openPositions
GET    /api/documents
GET    /api/notifications
GET    /api/systemActivity
GET    /api/complianceAlerts
```

All support filtering: `/api/contracts?hospitalId=h001&status=Active`

---

## How to wire API calls into your React pages

### Example: PractitionerLogin.jsx
```jsx
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

export default function PractitionerLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ username: form.username, password: form.password })
      if (res.user.role === 'practitioner') navigate('/practitioner/dashboard')
    } catch (err) {
      setError(err.message)  // "Invalid credentials. Please try again."
    }
  }
}
```

### Example: HospitalDashboard.jsx — fetch real stats
```jsx
import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function HospitalDashboard() {
  const { profile } = useAuth()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (profile?.id) {
      api.hospitals.getStats(profile.id).then(setStats)
    }
  }, [profile])

  // Use stats.escrowBalance, stats.activeContracts, etc.
}
```

### Example: AdminDashboard.jsx — verify a practitioner
```jsx
const handleApprove = async (practitionerId) => {
  await api.admin.verifyPractitioner(practitionerId, 'Verified')
  // refresh list
}

const handleReject = async (practitionerId) => {
  await api.admin.verifyPractitioner(practitionerId, 'Rejected')
}
```

---

## Reset the database

If you've added test data and want to start fresh:

```bash
npm run db:reset
```

This resets `users` and `practitioners` back to seed data while keeping other collections.

---

## Running Both Servers

Open two terminals:

```bash
# Terminal 1 — Backend
cd healthlinka-backend
npm run dev

# Terminal 2 — Frontend
cd healthlinka
npm run dev
```

Frontend: http://localhost:5173  
Backend API: http://localhost:4000

---

## Notes

- **Passwords are stored in plain text** — this is a mock API for development only. Do not use in production.
- The token is a simple base64-encoded payload (not JWT). It expires after 24 hours.
- `db.json` is written to on every POST/PATCH/DELETE — changes persist across server restarts.
- JSON Server supports `_page` and `_limit` for pagination: `/api/contracts?_page=1&_limit=10`
- JSON Server supports `_sort` and `_order`: `/api/transactions?_sort=date&_order=desc`
- JSON Server supports full-text search: `/api/practitioners?q=kofi`
