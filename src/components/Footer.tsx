import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="a2-footer" style={{ borderTop: '1px solid var(--border-hairline)', backgroundColor: '#FFFFFF', paddingTop: '3.5rem', paddingBottom: '2rem' }}>
      <div className="a2-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <span className="a2-logo-badge">A2</span>
              <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>TalentBridge</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--neutral-600)', marginBottom: '1.25rem', maxWidth: '280px' }}>
              Bridging Talent, Education &amp; Opportunity. From Education → Experience → Employment.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: 'var(--neutral-500)' }}>
              <MapPin size={14} color="var(--baltic-navy)" />
              <span>Riga, Latvia · Europe</span>
            </div>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--nordic-slate)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Ecosystem
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li><Link href="/students" className="footer-link">Students</Link></li>
              <li><Link href="/companies" className="footer-link">Companies</Link></li>
              <li><Link href="/universities" className="footer-link">Universities</Link></li>
              <li><Link href="/impact" className="footer-link">Community</Link></li>
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--nordic-slate)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Opportunities
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li><Link href="/opportunities?type=Internship" className="footer-link">Internships</Link></li>
              <li><Link href="/projects" className="footer-link">Live Projects</Link></li>
              <li><Link href="/challenges" className="footer-link">Challenges</Link></li>
              <li><Link href="/verify/A2-LV-2026-X89K" className="footer-link">Credentials</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--nordic-slate)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li><Link href="/how-it-works" className="footer-link">How It Works</Link></li>
              <li><Link href="/opportunities" className="footer-link">Opportunities</Link></li>
              <li><Link href="/verify/A2-LV-2026-X89K" className="footer-link">Verify Credential</Link></li>
              <li><Link href="/about" className="footer-link">About</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--nordic-slate)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li><Link href="/privacy" className="footer-link">Privacy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms</Link></li>
              <li><Link href="/privacy" className="footer-link">GDPR</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: 600 }}>
              <ShieldCheck size={14} />
              <span>EU Compliant</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & credits */}
        <div
          style={{
            borderTop: '1px solid var(--border-hairline)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8125rem',
            color: 'var(--neutral-500)',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem 1rem' }}>
            <span>© 2026 A2 TalentBridge. All rights reserved.</span>
            <span style={{ color: 'var(--border-medium)' }}>•</span>
            <span>Planned and R&amp;D by Dr. Arunkumar and Chaminda</span>
            <span style={{ color: 'var(--border-medium)' }}>•</span>
            <span style={{ fontWeight: 600, color: 'var(--nordic-slate)' }}>Designed by Elevon Stack</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontWeight: 600 }}>
            <span>Riga, Latvia · Europe</span>
            <span>EUR (€)</span>
            <span>Europe/Riga</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
