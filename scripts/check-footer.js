async function check() {
  const pages = ['/', '/login', '/register', '/signin', '/signup', '/how-it-works', '/opportunities'];
  for (const p of pages) {
    const res = await fetch('http://localhost:3000' + p);
    const html = await res.text();
    const hasFooter = html.includes('a2-footer') || html.includes('<footer');
    console.log(p.padEnd(20), `status: ${res.status}`, hasFooter ? 'HAS FOOTER' : 'NO FOOTER');
  }
}

check().catch(console.error);
