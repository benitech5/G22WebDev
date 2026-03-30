/**
 * scripts/reset-db.js
 * Run: node scripts/reset-db.js
 * Resets db.json back to the original seed data.
 */
const fs = require('fs')
const path = require('path')

const seedData = {
  users: [
    { id: 'u001', username: 'admin', email: 'admin@healthlinka.com', password: 'admin123', role: 'admin', name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/34?img=15' },
    { id: 'u002', username: 'dr.kofi', email: 'kofi.mensah@practitioners.com', password: 'doctor123', role: 'practitioner', name: 'Dr. Kofi Mensah', avatar: 'https://i.pravatar.cc/36?img=12' },
    { id: 'u003', username: 'dr.elena', email: 'elena.rodriguez@practitioners.com', password: 'doctor123', role: 'practitioner', name: 'Dr. Elena Rodriguez', avatar: 'https://i.pravatar.cc/40?img=5' },
    { id: 'u004', username: 'dr.james', email: 'james.wilson@practitioners.com', password: 'doctor123', role: 'practitioner', name: 'Dr. James Wilson', avatar: 'https://i.pravatar.cc/40?img=11' },
    { id: 'u005', username: 'perfecthealth', email: 'admin@perfecthealth.com', password: 'hospital123', role: 'hospital', name: 'Perfect Health and Wellness Centre', avatar: null },
    { id: 'u006', username: 'ridgemedical', email: 'admin@ridgemedical.gov.gh', password: 'hospital123', role: 'hospital', name: 'Ridge Medical Center', avatar: null },
    { id: 'u007', username: 'dr.marcus', email: 'marcus.thorne@practitioners.com', password: 'doctor123', role: 'practitioner', name: 'Dr. Marcus Thorne', avatar: 'https://i.pravatar.cc/40?img=7' },
    { id: 'u008', username: 'mark.thompson', email: 'mark.thompson@practitioners.com', password: 'doctor123', role: 'practitioner', name: 'Mark Thompson', avatar: 'https://i.pravatar.cc/40?img=3' },
  ],
  practitioners: [
    { id: 'p001', userId: 'u002', name: 'Dr. Kofi Mensah', initials: 'KM', specialization: 'Cardiology', licenseNumber: 'LCN-2023-4891', region: 'Greater Accra', status: 'Pending', registrationDate: '2023-10-12', online: true, avatar: 'https://i.pravatar.cc/40?img=12', phone: '+233 24 111 2233', email: 'kofi.mensah@practitioners.com', profession: 'Cardiologist', documentsSubmitted: 4, documentsRequired: 4 },
    { id: 'p002', userId: 'u003', name: 'Dr. Elena Rodriguez', initials: 'ER', specialization: 'Emergency Medicine', licenseNumber: 'LCN-2023-2211', region: 'Greater Accra', status: 'Verified', registrationDate: '2023-09-20', online: true, avatar: 'https://i.pravatar.cc/40?img=5', phone: '+233 24 222 3344', email: 'elena.rodriguez@practitioners.com', profession: 'Trauma Surgeon', documentsSubmitted: 4, documentsRequired: 4 },
    { id: 'p003', userId: 'u004', name: 'Dr. James Wilson', initials: 'JW', specialization: 'Pediatrics', licenseNumber: 'LCN-2023-3302', region: 'Ashanti', status: 'In Review', registrationDate: '2023-10-15', online: false, avatar: 'https://i.pravatar.cc/40?img=11', phone: '+233 24 333 4455', email: 'james.wilson@practitioners.com', profession: 'Pediatrician', documentsSubmitted: 3, documentsRequired: 4 },
    { id: 'p004', userId: 'u007', name: 'Dr. Marcus Thorne', initials: 'MT', specialization: 'Surgery', licenseNumber: 'LCN-2022-9981', region: 'Greater Accra', status: 'Verified', registrationDate: '2023-08-10', online: false, avatar: 'https://i.pravatar.cc/40?img=7', phone: '+233 24 444 5566', email: 'marcus.thorne@practitioners.com', profession: 'Surgeon', documentsSubmitted: 4, documentsRequired: 4 },
    { id: 'p005', userId: 'u008', name: 'Mark Thompson', initials: 'MT', specialization: 'Emergency Nursing', licenseNumber: 'LCN-2023-5512', region: 'Western', status: 'Verified', registrationDate: '2023-10-14', online: true, avatar: 'https://i.pravatar.cc/40?img=3', phone: '+233 24 555 6677', email: 'mark.thompson@practitioners.com', profession: 'Nurse Practitioner', documentsSubmitted: 4, documentsRequired: 4 },
  ],
}

const dbPath = path.join(__dirname, '..', 'db.json')
const originalPath = path.join(__dirname, '..', 'db.json')

// Read current db and replace only resettable collections
const current = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

const reset = {
  ...current,
  users: seedData.users,
  practitioners: seedData.practitioners,
}

fs.writeFileSync(dbPath, JSON.stringify(reset, null, 2))
console.log('✅ Database reset to seed data.')
console.log('   Collections reset: users, practitioners')
console.log('   Other collections preserved.')
