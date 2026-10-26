const http = require('http');

async function getWsUrl() {
  const res = await fetch('http://127.0.0.1:9222/json');
  const tabs = await res.json();
  const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:3000')) || tabs.find(t => t.type === 'page');
  if (!pageTab) throw new Error('No page tab found in Chrome');
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

async function main() {
  console.log('Connecting to Chrome...');
  const wsUrl = await getWsUrl();
  console.log('Target WS:', wsUrl);
  const client = new CDPClient(wsUrl);
  await client.connect();
  console.log('Connected to Chrome DevTools Protocol!');

  await client.send('Page.enable');
  await client.send('Runtime.enable');

  console.log('\n--- 1. NAVIGATING TO LANDING PAGE (http://localhost:3000/) ---');
  await client.send('Page.navigate', { url: 'http://localhost:3000/' });
  await sleep(2500);

  const title = await client.eval('document.title');
  console.log('Page Title:', title);

  console.log('\n--- 2. TESTING CONNECTED ARCHITECTURE TABS ---');
  const tabs = ['students', 'companies', 'universities', 'community'];
  for (const t of tabs) {
    const res = await client.eval(`
      (() => {
        const btn = document.getElementById('arch-tab-${t}');
        if (!btn) return { error: 'Tab arch-tab-${t} not found' };
        btn.click();
        return {
          id: 'arch-tab-${t}',
          selected: btn.getAttribute('aria-selected'),
          textContent: btn.innerText.trim()
        };
      })()
    `);
    console.log('Clicked Connected Architecture Tab:', res);
    await sleep(300);
  }

  console.log('\n--- 3. TESTING SPECIALIZED WORKSPACES TABS ---');
  const workspaces = ['students', 'companies', 'universities'];
  for (const w of workspaces) {
    const res = await client.eval(`
      (() => {
        const btn = document.getElementById('workspace-tab-${w}');
        if (!btn) return { error: 'Tab workspace-tab-${w} not found' };
        btn.click();
        return {
          id: 'workspace-tab-${w}',
          selected: btn.getAttribute('aria-selected'),
          textContent: btn.innerText.trim()
        };
      })()
    `);
    console.log('Clicked Specialized Workspace Tab:', res);
    await sleep(300);
  }

  console.log('\n--- 4. TESTING THEME TOGGLE (LIGHT & DARK MODE) ---');
  const initialTheme = await client.eval('document.documentElement.getAttribute("data-theme")');
  console.log('Initial theme:', initialTheme || 'light (default)');

  const toggle1 = await client.eval(`
    (() => {
      const btn = document.getElementById('theme-toggle-btn');
      if (!btn) return { error: 'theme-toggle-btn not found' };
      btn.click();
      return {
        newTheme: document.documentElement.getAttribute('data-theme'),
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        bodyColor: window.getComputedStyle(document.body).color
      };
    })()
  `);
  console.log('After Theme Toggle #1:', toggle1);
  await sleep(500);

  const toggle2 = await client.eval(`
    (() => {
      const btn = document.getElementById('theme-toggle-btn');
      btn.click();
      return {
        newTheme: document.documentElement.getAttribute('data-theme'),
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        bodyColor: window.getComputedStyle(document.body).color
      };
    })()
  `);
  console.log('After Theme Toggle #2:', toggle2);
  await sleep(500);

  console.log('\n--- 5. TESTING NAVIGATION BUTTONS & MOVE TO LOGIN PAGE ---');
  const navLoginResult = await client.eval(`
    (() => {
      const btn = document.getElementById('nav-login-btn');
      if (!btn) return { error: 'nav-login-btn not found' };
      btn.click();
      return { clicked: true, href: btn.getAttribute('href') };
    })()
  `);
  console.log('Clicked nav-login-btn:', navLoginResult);
  await sleep(2000);

  const loginUrl = await client.eval('window.location.href');
  console.log('Current URL after login click:', loginUrl);

  console.log('\n--- 6. VERIFYING LOGIN PAGE CONTROLS & DEMO ACCOUNTS ---');
  const loginChecks = await client.eval(`
    (() => {
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const submitBtn = document.getElementById('submit-login-btn');
      const studentBtn = document.getElementById('demo-student-btn');
      const companyBtn = document.getElementById('demo-company-btn');
      const universityBtn = document.getElementById('demo-university-btn');
      const adminBtn = document.getElementById('demo-admin-btn');
      const createAccountLink = document.getElementById('login-create-account-link');

      let demoTest = null;
      if (studentBtn) {
        studentBtn.click();
        demoTest = { email: email.value, passwordSet: password.value.length > 0 };
      }

      return {
        emailInputFound: !!email,
        passwordInputFound: !!password,
        submitBtnFound: !!submitBtn,
        submitBtnText: submitBtn ? submitBtn.innerText.trim() : null,
        demoButtonsFound: {
          student: !!studentBtn,
          company: !!companyBtn,
          university: !!universityBtn,
          admin: !!adminBtn,
        },
        demoAutoFillSuccess: demoTest,
        createAccountLinkFound: !!createAccountLink
      };
    })()
  `);
  console.log('Login Page Inspection:', JSON.stringify(loginChecks, null, 2));

  console.log('\n--- 7. TESTING THEME SWITCHING ON LOGIN PAGE ---');
  const loginThemeToggle = await client.eval(`
    (() => {
      const btn = document.getElementById('theme-toggle-btn');
      btn.click();
      const themeNow = document.documentElement.getAttribute('data-theme');
      return {
        themeNow,
        cardBg: window.getComputedStyle(document.querySelector('.a2-card')).backgroundColor,
        textColor: window.getComputedStyle(document.querySelector('.a2-card')).color
      };
    })()
  `);
  console.log('Login Page in Dark Mode:', loginThemeToggle);
  await sleep(500);

  console.log('\n--- 8. MOVING TO REGISTER PAGE ---');
  await client.eval(`document.getElementById('login-create-account-link').click()`);
  await sleep(2000);

  const regUrl = await client.eval('window.location.href');
  console.log('Current URL after register click:', regUrl);

  const regChecks = await client.eval(`
    (() => {
      const roleStudent = document.getElementById('register-role-student');
      const roleCompany = document.getElementById('register-role-company');
      const roleUniversity = document.getElementById('register-role-university');
      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const agreeTerms = document.getElementById('agreeTerms');
      const submitBtn = document.getElementById('register-submit-btn');

      // Test clicking company role
      if (roleCompany) roleCompany.click();
      const companySelectedBg = roleCompany ? window.getComputedStyle(roleCompany).backgroundColor : null;

      // Test clicking university role
      if (roleUniversity) roleUniversity.click();
      const uniSelectedBg = roleUniversity ? window.getComputedStyle(roleUniversity).backgroundColor : null;

      return {
        rolesFound: {
          student: !!roleStudent,
          company: !!roleCompany,
          university: !!roleUniversity,
        },
        roleCompanyInteraction: companySelectedBg,
        roleUniInteraction: uniSelectedBg,
        inputsFound: {
          firstName: !!firstName,
          lastName: !!lastName,
          email: !!email,
          password: !!password,
          agreeTerms: !!agreeTerms,
        },
        submitBtnFound: !!submitBtn,
        submitBtnText: submitBtn ? submitBtn.innerText.trim() : null
      };
    })()
  `);
  console.log('Register Page Inspection:', JSON.stringify(regChecks, null, 2));

  console.log('\n--- 9. VERIFYING ALTERNATIVE ROUTES /signin AND /signup ---');
  await client.send('Page.navigate', { url: 'http://localhost:3000/signin' });
  await sleep(1500);
  const signinUrl = await client.eval('window.location.pathname');
  const signinHasCard = await client.eval('!!document.querySelector(".a2-card")');
  console.log('Route /signin:', { path: signinUrl, rendered: signinHasCard });

  await client.send('Page.navigate', { url: 'http://localhost:3000/signup' });
  await sleep(1500);
  const signupUrl = await client.eval('window.location.pathname');
  const signupHasCard = await client.eval('!!document.querySelector(".a2-card")');
  console.log('Route /signup:', { path: signupUrl, rendered: signupHasCard });

  // Return to landing page
  await client.send('Page.navigate', { url: 'http://localhost:3000/' });
  await sleep(1500);
  console.log('\nReturned to landing page. All tests finished successfully!');

  client.close();
}

main().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
