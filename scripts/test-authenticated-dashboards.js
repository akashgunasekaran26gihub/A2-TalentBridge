async function testAuthRole(email, password, dashboardPath, roleName) {
  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!loginRes.ok) {
    console.error(`Login failed for ${roleName}:`, loginRes.status);
    return false;
  }
  const cookieHeader = loginRes.headers.get('set-cookie');
  const dashRes = await fetch('http://localhost:3000' + dashboardPath, {
    headers: { Cookie: cookieHeader },
  });
  const html = await dashRes.text();
  const hasError = html.includes('Application error') || html.includes('Internal Server Error');
  if (dashRes.status === 200 && !hasError) {
    console.log(`✓ ${roleName.padEnd(15)} ${dashboardPath.padEnd(25)} Status: 200 OK`);
    return true;
  } else {
    console.error(`✗ ${roleName.padEnd(15)} ${dashboardPath.padEnd(25)} Status: ${dashRes.status} (hasError: ${hasError})`);
    return false;
  }
}

async function main() {
  console.log('--- TESTING ALL 4 AUTHENTICATED DASHBOARDS ---');
  const r1 = await testAuthRole('arturs.berzins@edu.rtu.lv', 'A2Bridge2026!', '/dashboard/student', 'Student');
  const r2 = await testAuthRole('talent@demotech.lv', 'A2Bridge2026!', '/dashboard/company', 'Company');
  const r3 = await testAuthRole('coordinator@rtu.lv', 'A2Bridge2026!', '/dashboard/university', 'University');
  const r4 = await testAuthRole('admin@a2talentbridge.lv', 'AdminRiga2026!', '/dashboard/admin', 'Admin');

  if (r1 && r2 && r3 && r4) {
    console.log('\nAll 4 Authenticated Dashboards: 100% SUCCESS');
  } else {
    console.error('\nSome dashboards failed verification');
    process.exit(1);
  }
}

main().catch(console.error);
