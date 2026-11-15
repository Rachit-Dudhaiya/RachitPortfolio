const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const outDir = path.resolve(__dirname, '../public/assets/projects');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const tempUserData = path.join(os.tmpdir(), 'chrome_headless_temp_' + Date.now());
if (!fs.existsSync(tempUserData)) {
  fs.mkdirSync(tempUserData, { recursive: true });
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const targets = [
  {
    name: 'a2z-properties.png',
    url: 'https://www.atozproperties.co.in/'
  },
  {
    name: 'panarait.png',
    url: 'https://panarait.vercel.app'
  },
  {
    name: 'slms.png',
    url: 'https://slms.ripaldesign.studio'
  },
  {
    name: 'ripal-design.png',
    url: 'https://ripaldesign.studio'
  },
  {
    name: 'ripal-app.png',
    url: 'https://app.ripaldesign.studio/'
  }
];

for (const t of targets) {
  const dest = path.join(outDir, t.name);
  console.log(`\nAttempting capture of ${t.url} -> ${t.name}...`);
  try {
    const cmd = `"${chromePath}" --headless=new --disable-gpu --no-first-run --no-default-browser-check --user-data-dir="${tempUserData}" --virtual-time-budget=6000 --window-size=1440,900 --hide-scrollbars --screenshot="${dest}" "${t.url}"`;
    execSync(cmd, { timeout: 35000 });
    if (fs.existsSync(dest)) {
      const stats = fs.statSync(dest);
      console.log(`SUCCESS: ${t.name} captured (${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      console.warn(`WARNING: File not created for ${t.name}`);
    }
  } catch (err) {
    console.error(`ERROR capturing ${t.name}:`, err.message);
  }
}

// Clean up temp dir if possible
try {
  fs.rmSync(tempUserData, { recursive: true, force: true });
} catch (e) {}
