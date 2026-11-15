const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempUserData = path.join(os.tmpdir(), 'chrome_flutter_' + Date.now());
fs.mkdirSync(tempUserData, { recursive: true });

const destSlms = path.resolve('public/assets/projects/slms.png');
const destApp = path.resolve('public/assets/projects/ripal-app.png');

try {
  console.log('Capturing SLMS with 14s budget...');
  execSync(`"${chromePath}" --headless=new --disable-gpu --no-first-run --no-default-browser-check --user-data-dir="${tempUserData}" --window-size=1440,900 --virtual-time-budget=14000 --run-all-compositor-stages-before-draw --screenshot="${destSlms}" "https://slms.ripaldesign.studio"`, { timeout: 45000 });
  console.log('SLMS capture size:', fs.statSync(destSlms).size);
} catch (e) {
  console.error('SLMS error:', e.message);
}

try {
  console.log('Capturing Ripal App with 14s budget...');
  execSync(`"${chromePath}" --headless=new --disable-gpu --no-first-run --no-default-browser-check --user-data-dir="${tempUserData}" --window-size=1440,900 --virtual-time-budget=14000 --run-all-compositor-stages-before-draw --screenshot="${destApp}" "https://app.ripaldesign.studio/"`, { timeout: 45000 });
  console.log('Ripal App capture size:', fs.statSync(destApp).size);
} catch (e) {
  console.error('Ripal App error:', e.message);
}

try {
  fs.rmSync(tempUserData, { recursive: true, force: true });
} catch (e) {}

