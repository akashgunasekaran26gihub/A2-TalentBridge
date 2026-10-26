const fs = require('fs');

async function testPage(urlPath) {
  console.log(`\nTesting page: ${urlPath}`);
  const html = await (await fetch(`http://localhost:3000${urlPath}`)).text();
  const scriptRegex = /src="(\/_next\/static\/[^"]+)"/g;
  let match;
  const scripts = [];
  while ((match = scriptRegex.exec(html)) !== null) {
    scripts.push(match[1]);
  }
  console.log(`Total scripts found: ${scripts.length}`);
  let allOk = true;
  for (const s of scripts) {
    const res = await fetch(`http://localhost:3000${s}`);
    if (res.status !== 200) {
      console.error(`  FAIL: ${s} (${res.status})`);
      allOk = false;
    } else {
      console.log(`  OK: ${s}`);
    }
  }
  return allOk;
}

async function run() {
  const p1 = await testPage('/');
  const p2 = await testPage('/login');
  const p3 = await testPage('/register');
  console.log('\nSUMMARY:', { landing: p1, login: p2, register: p3 });
}

run().catch(console.error);
