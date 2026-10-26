import React from 'react';
import { ShieldCheck, Lock, Eye, Trash2, Download } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '80vh', padding: '4rem 0' }}>
      <div className="a2-container" style={{ maxWidth: '850px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
            GDPR & EU Regulation (EU) 2016/679
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--neutral-900)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Privacy Policy & Data Protection
          </h1>
          <p style={{ color: 'var(--neutral-600)', fontSize: '1rem' }}>
            Last updated: October 2026 • Governed under Latvian & European Union data protection standards.
          </p>
        </div>

        <div className="a2-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--neutral-900)' }}>
              1. Data Controller
            </h2>
            <p style={{ color: 'var(--neutral-700)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              The data controller responsible for the processing of your personal data on A2 TalentBridge is the A2 TalentBridge Ecosystem Operator, registered in Riga, Latvia. For inquiries, you may contact our Data Protection Officer at <code>dpo@a2talentbridge.lv</code>.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--neutral-900)' }}>
              2. Data We Collect & Principles of Minimization
            </h2>
            <p style={{ color: 'var(--neutral-700)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
              We adhere strictly to the principle of data minimization under Article 5(1)(c) of the GDPR. We only collect information essential for facilitating experiential student-industry collaboration:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--neutral-700)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              <li><strong>Identity & Account:</strong> Name, academic email address, password hash (Argon2/Bcrypt).</li>
              <li><strong>Academic Profile:</strong> University affiliation (e.g. RTU, LU), degree level, field of study, study year.</li>
              <li><strong>Skills & Deliverables:</strong> Declared and project-verified skills, portfolio links, submitted milestone artifacts.</li>
              <li><strong>Audit & Security:</strong> Timestamped action logs, IP addresses (hashed for abuse prevention).</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--neutral-900)' }}>
              3. Purpose & Legal Basis for Processing
            </h2>
            <p style={{ color: 'var(--neutral-700)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              We process your data based on Article 6(1)(b) (performance of a contract to provide career matching) and Article 6(1)(a) (explicit consent for public credential verification sharing).
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--neutral-900)' }}>
              4. Your Rights Under GDPR
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ backgroundColor: 'var(--neutral-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <Eye size={20} color="var(--primary-700)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Right of Access</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--neutral-600)' }}>Inspect all personal data stored in our database at any time.</p>
              </div>

              <div style={{ backgroundColor: 'var(--neutral-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <Download size={20} color="var(--primary-700)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Data Portability</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--neutral-600)' }}>Export your profile and verified credentials in machine-readable JSON.</p>
              </div>

              <div style={{ backgroundColor: 'var(--neutral-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <Trash2 size={20} color="var(--danger-600)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Right to Erasure</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--neutral-600)' }}>Permanently delete your profile and private applications on demand.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
