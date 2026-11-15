const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_' + Date.now());
fs.mkdirSync(tempUserData, { recursive: true });

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function cdpRequest(method, pathStr) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: '127.0.0.1',
        port: 9222,
        path: pathStr,
        method: method,
      },
      (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try { resolve(JSON.parse(body)); } catch (e) { resolve(body); }
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

function sendCDP(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 100000);
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function captureTarget(url, destPath, waitMs = 8000) {
  console.log(`\nNavigating to ${url}...`);
  const targetInfo = await cdpRequest('PUT', `/json/new?${encodeURIComponent(url)}`);
  console.log('Target created:', targetInfo);
  if (!targetInfo.webSocketDebuggerUrl) {
    throw new Error('No webSocketDebuggerUrl returned: ' + JSON.stringify(targetInfo));
  }

  const ws = new WebSocket(targetInfo.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  console.log(`Connected to CDP for ${url}, waiting ${waitMs / 1000}s for complete rendering...`);
  await sendCDP(ws, 'Page.enable');
  await sendCDP(ws, 'Runtime.enable');
  
  await sleep(waitMs);

  console.log(`Capturing screenshot for ${url}...`);
  const { data } = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png', quality: 90 });
  const buffer = Buffer.from(data, 'base64');
  fs.writeFileSync(destPath, buffer);
  console.log(`SAVED: ${destPath} (${(buffer.length / 1024).toFixed(1)} KB)`);

  ws.close();
  await cdpRequest('GET', `/json/close/${targetInfo.id}`).catch(() => {});
}

async function run() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--user-data-dir=' + tempUserData,
    '--window-size=1440,900',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await sleep(2500);

  try {
    const outDir = path.resolve('public/assets/projects');
    await captureTarget('https://slms.ripaldesign.studio', path.join(outDir, 'slms.png'), 7000);
    await captureTarget('https://app.ripaldesign.studio/', path.join(outDir, 'ripal-app.png'), 7000);
  } catch (err) {
    console.error('Capture failed:', err);
  } finally {
    chrome.kill();
    try {
      fs.rmSync(tempUserData, { recursive: true, force: true });
    } catch (e) {}
  }
}

run();
