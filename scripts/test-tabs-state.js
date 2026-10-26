async function getWsUrl() {
  const res = await fetch('http://127.0.0.1:9222/json');
  const tabs = await res.json();
  const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:3000')) || tabs.find(t => t.type === 'page');
  return pageTab.webSocketDebuggerUrl;
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id && this.callbacks.has(data.id)) {
          const cb = this.callbacks.get(data.id);
          this.callbacks.delete(data.id);
          if (data.error) cb.reject(new Error(data.error.message));
          else cb.resolve(data.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const callId = this.id++;
      this.callbacks.set(callId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: callId, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  const wsUrl = await getWsUrl();
  const client = new CDPClient(wsUrl);
  await client.connect();

  console.log('Navigating to http://localhost:3000/');
  await client.send('Page.navigate', { url: 'http://localhost:3000/' });
  await sleep(2500);

  console.log('\n--- VERIFYING CONNECTED ARCHITECTURE TAB SWITCHING ---');
  for (const tab of ['companies', 'universities', 'community', 'students']) {
    await client.eval(`document.getElementById('arch-tab-${tab}').click()`);
    await sleep(400); // allow react render
    const status = await client.eval(`
      (() => {
        const btn = document.getElementById('arch-tab-${tab}');
        const heading = document.querySelector('#connected-architecture h3');
        return {
          tabId: 'arch-tab-${tab}',
          selected: btn.getAttribute('aria-selected'),
          headingText: heading ? heading.innerText.trim() : null
        };
      })()
    `);
    console.log(`Active Tab ${tab}:`, status);
  }

  console.log('\n--- VERIFYING SPECIALIZED WORKSPACES TAB SWITCHING ---');
  for (const ws of ['companies', 'universities', 'students']) {
    await client.eval(`document.getElementById('workspace-tab-${ws}').click()`);
    await sleep(400); // allow react render
    const status = await client.eval(`
      (() => {
        const btn = document.getElementById('workspace-tab-${ws}');
        const heading = document.querySelector('#stakeholder-workspaces h3');
        return {
          workspaceId: 'workspace-tab-${ws}',
          selected: btn.getAttribute('aria-selected'),
          headingText: heading ? heading.innerText.trim() : null
        };
      })()
    `);
    console.log(`Active Workspace ${ws}:`, status);
  }

  console.log('\n--- VERIFYING LOGIN DEMO ONE-CLICK FILL ---');
  await client.send('Page.navigate', { url: 'http://localhost:3000/login' });
  await sleep(1500);

  await client.eval(`document.getElementById('demo-student-btn').click()`);
  await sleep(300);
  const fillStudent = await client.eval(`({
    email: document.getElementById('email').value,
    passSet: document.getElementById('password').value.length > 0
  })`);
  console.log('Student autofill result:', fillStudent);

  await client.eval(`document.getElementById('demo-company-btn').click()`);
  await sleep(300);
  const fillCompany = await client.eval(`({
    email: document.getElementById('email').value,
    passSet: document.getElementById('password').value.length > 0
  })`);
  console.log('Company autofill result:', fillCompany);

  client.close();
}

run().catch(console.error);
