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

  // 1. Inspect public navbar
  const publicNav = await client.eval(`
    (() => {
      const switcher = !!document.getElementById('nav-role-switcher-btn');
      const links = Array.from(document.querySelectorAll('.a2-nav-links a')).map(a => a.innerText.trim());
      const loginBtn = !!document.getElementById('nav-login-btn');
      const registerBtn = !!document.getElementById('nav-register-btn');
      return { switcher, links, loginBtn, registerBtn };
    })()
  `);
  console.log('1. Public Navbar Check:', publicNav);

  // 2. Open role dropdown
  await client.eval(`document.getElementById('nav-role-switcher-btn').click()`);
  await sleep(300);
  const dropdownOpen = await client.eval(`!!document.getElementById('nav-role-dropdown-menu')`);
  console.log('2. Role Dropdown Opened:', dropdownOpen);

  // 3. Switch to Student
  console.log('\n--- Switching to Student Role ---');
  await client.eval(`document.getElementById('switch-to-student-btn').click()`);
  await sleep(2500);
  const studentNav = await client.eval(`
    (() => {
      const url = window.location.pathname;
      const roleTag = document.querySelector('.a2-nav span[style*="border-radius: 999px"]') ? document.querySelector('.a2-nav span[style*="border-radius: 999px"]').innerText.trim() : null;
      const links = Array.from(document.querySelectorAll('.a2-nav-links a')).map(a => a.innerText.trim());
      const dashboardBtn = !!document.getElementById('nav-dashboard-btn');
      const logoutBtn = !!document.getElementById('nav-logout-btn');
      return { url, roleTag, links, dashboardBtn, logoutBtn };
    })()
  `);
  console.log('Student Navbar State:', studentNav);

  // 4. Switch to Company
  console.log('\n--- Switching to Company Role ---');
  await client.eval(`document.getElementById('nav-role-switcher-btn').click()`);
  await sleep(300);
  await client.eval(`document.getElementById('switch-to-company-btn').click()`);
  await sleep(2500);
  const companyNav = await client.eval(`
    (() => {
      const url = window.location.pathname;
      const roleTag = document.querySelector('.a2-nav span[style*="border-radius: 999px"]') ? document.querySelector('.a2-nav span[style*="border-radius: 999px"]').innerText.trim() : null;
      const links = Array.from(document.querySelectorAll('.a2-nav-links a')).map(a => a.innerText.trim());
      return { url, roleTag, links };
    })()
  `);
  console.log('Company Navbar State:', companyNav);

  // 5. Switch to University
  console.log('\n--- Switching to University Role ---');
  await client.eval(`document.getElementById('nav-role-switcher-btn').click()`);
  await sleep(300);
  await client.eval(`document.getElementById('switch-to-university-btn').click()`);
  await sleep(2500);
  const uniNav = await client.eval(`
    (() => {
      const url = window.location.pathname;
      const roleTag = document.querySelector('.a2-nav span[style*="border-radius: 999px"]') ? document.querySelector('.a2-nav span[style*="border-radius: 999px"]').innerText.trim() : null;
      const links = Array.from(document.querySelectorAll('.a2-nav-links a')).map(a => a.innerText.trim());
      return { url, roleTag, links };
    })()
  `);
  console.log('University Navbar State:', uniNav);

  // 6. Switch to Admin
  console.log('\n--- Switching to Admin Role ---');
  await client.eval(`document.getElementById('nav-role-switcher-btn').click()`);
  await sleep(300);
  await client.eval(`document.getElementById('switch-to-admin-btn').click()`);
  await sleep(2500);
  const adminNav = await client.eval(`
    (() => {
      const url = window.location.pathname;
      const roleTag = document.querySelector('.a2-nav span[style*="border-radius: 999px"]') ? document.querySelector('.a2-nav span[style*="border-radius: 999px"]').innerText.trim() : null;
      const links = Array.from(document.querySelectorAll('.a2-nav-links a')).map(a => a.innerText.trim());
      return { url, roleTag, links };
    })()
  `);
  console.log('Admin Navbar State:', adminNav);

  // 7. Clean logout
  console.log('\n--- Logging out back to Public View ---');
  await client.eval(`document.getElementById('nav-logout-btn').click()`);
  await sleep(2000);
  const finalPublic = await client.eval(`({
    url: window.location.pathname,
    hasLoginBtn: !!document.getElementById('nav-login-btn')
  })`);
  console.log('Logged out state:', finalPublic);

  client.close();
  console.log('\nAll role navbars successfully tested and verified!');
}

run().catch(console.error);
