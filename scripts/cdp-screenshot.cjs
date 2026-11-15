const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_' + Date.now());
fs.mkdirSync(tempUserData, { recursive: true });

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (e) { resolve(body); }
      });
    }).on('error', reject);
  });
}

async function captureWithCDP(url, destFile, waitSec = 10) {
  console.log(`Starting Chrome to capture ${url} -> ${destFile}`);
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--user-data-dir=' + tempUserData,
    '--window-size=1440,900',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await sleep(2000);

  try {
    const pages = await httpGet('http://127.0.0.1:9222/json/list');
    console.log('Open targets:', pages.length);
    const target = pages[0];
    const wsUrl = target.webSocketDebuggerUrl;

    const WebSocket = require('ws'); // If ws not installed, we can check
  } catch (err) {
    console.log('CDP error or ws missing:', err.message);
  } finally {
    chrome.kill();
  }
}

captureWithCDP('https://slms.ripaldesign.studio', 'slms.png');

