const fs = require('fs');
const path = require('path');

try {
  const dbPath = path.join(__dirname, 'db.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  let changed = false;
  db.users.forEach(u => {
    if (u.password && (u.password.startsWith('$2a$') || u.password.startsWith('$2b$'))) {
      if (u.role === 'admin') u.password = 'admin123';
      else if (u.role === 'practitioner') u.password = 'doctor123';
      else if (u.role === 'hospital') u.password = 'hospital123';
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log('Successfully repaired corrupted passwords.');
  } else {
    console.log('No corrupted passwords found.');
  }
} catch(err) {
  console.error(err);
}
