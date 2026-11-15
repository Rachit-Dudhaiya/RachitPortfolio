const fs = require('fs');
const path = require('path');

const files = ['a2z-properties.png', 'panarait.png', 'slms.png', 'ripal-app.png', 'attendx-admin.png'];

files.forEach(f => {
  const p = path.resolve('public/assets/projects', f);
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    console.log(`${f}: ${(stat.size / 1024).toFixed(1)} KB`);
  } else {
    console.log(`${f}: NOT FOUND`);
  }
});

