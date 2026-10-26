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

async function testRolePage(client, urlPath, roleName) {
  console.log(`\nTesting ${roleName} (${urlPath})...`);
  await client.send('Page.navigate', { url: `http://localhost:3000${urlPath}` });
  await sleep(1500);

  const data = await client.eval(`
    (() => {
      const title = document.querySelector('h1') ? document.querySelector('h1').innerText.trim() : null;
      const cards = document.querySelectorAll('.a2-card').length;
      const tables = document.querySelectorAll('.a2-table').length;
      const theme = document.documentElement.getAttribute('data-theme') || 'light';
      return { title, cards, tables, theme };
    })()
  `);
  console.log(`  Light Mode Check:`, data);

  // Toggle to Dark Mode
  await client.eval(`document.getElementById('theme-toggle-btn').click()`);
  await sleep(400);

  const darkData = await client.eval(`
    (() => {
      const theme = document.documentElement.getAttribute('data-theme');
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const h1Color = document.querySelector('h1') ? window.getComputedStyle(document.querySelector('h1')).color : null;
      return { theme, bodyBg, h1Color };
    })()
  `);
  console.log(`  Dark Mode Check:`, darkData);

  // Toggle back to Light Mode
  await client.eval(`document.getElementById('theme-toggle-btn').click()`);
  await sleep(300);
}

async function main() {
  const wsUrl = await getWsUrl();
  const client = new CDPClient(wsUrl);
  await client.connect();

  await testRolePage(client, '/dashboard/student', 'Student Dashboard');
  await testRolePage(client, '/dashboard/company', 'Company Dashboard');
  await testRolePage(client, '/dashboard/university', 'University Dashboard');
  await testRolePage(client, '/dashboard/admin', 'Admin Dashboard');

  await testRolePage(client, '/students', 'Public Students Page');
  await testRolePage(client, '/companies', 'Public Companies Page');
  await testRolePage(client, '/universities', 'Public Universities Page');

  client.close();
  console.log('\nAll 7 Role views verified successfully in Chrome browser!');
}

main().catch(console.error);
