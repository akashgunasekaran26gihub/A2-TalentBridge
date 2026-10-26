async function run() {
  const routes = [
    '/dashboard/student',
    '/dashboard/company',
    '/dashboard/university',
    '/dashboard/admin',
    '/students',
    '/companies',
    '/universities',
  ];

  console.log('--- TESTING ALL ROLE ROUTES (HTTP STATUS) ---');
  let allPass = true;
  for (const r of routes) {
    try {
      const res = await fetch('http://localhost:3000' + r);
      const text = await res.text();
      const hasError = text.includes('Application error') || text.includes('Internal Server Error');
      if (res.status === 200 && !hasError) {
        console.log(`✓ ${r.padEnd(25)} Status: ${res.status}`);
      } else {
        console.error(`✗ ${r.padEnd(25)} Status: ${res.status} (hasError: ${hasError})`);
        allPass = false;
      }
    } catch (err) {
      console.error(`✗ ${r.padEnd(25)} Fetch failed: ${err.message}`);
      allPass = false;
    }
  }

  console.log('\nAll role routes tested:', allPass ? 'SUCCESS (ALL 200 OK)' : 'FAILED');
  if (!allPass) process.exit(1);
}

run();
