import React from 'react';

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '80vh', padding: '4rem 0' }}>
      <div className="a2-container" style={{ maxWidth: '850px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-neutral" style={{ marginBottom: '0.75rem' }}>
            Legal Framework
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--neutral-900)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Terms of Service
          </h1>
          <p style={{ color: 'var(--neutral-600)', fontSize: '1rem' }}>
            Applicable to Students, Companies, and Higher Education Institutions participating in A2 TalentBridge.
          </p>
        </div>

        <div className="a2-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--neutral-900)' }}>
              1. Platform Purpose & Scope
            </h2>
            <p style={{ color: 'var(--neutral-700)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              A2 TalentBridge provides an experiential learning and project verification ecosystem. Participation does not create an automatic employment relationship between students and A2 TalentBridge; formal internship and employment contracts are concluded directly between participating employers and students in accordance with the Labor Law of the Republic of Latvia (Darba likums).
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--neutral-900)' }}>
              2. Integrity of Verified Credentials
            </h2>
            <p style={{ color: 'var(--neutral-700)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Organizations issuing milestone evaluations warrant that deliverables have been reviewed under rigorous professional criteria. Students warrant that submitted project deliverables represent their own original work or proper team contributions.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--neutral-900)' }}>
              3. Intellectual Property (IP) in Challenges & Projects
            </h2>
            <p style={{ color: 'var(--neutral-700)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Unless explicitly specified otherwise in the opportunity brief, student teams retain copyright over academic coursework deliverables while granting sponsoring companies an irrevocable license to evaluate, test, and adopt solutions developed during sponsored challenges.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--neutral-900)' }}>
              4. Governing Law & Jurisdiction
            </h2>
            <p style={{ color: 'var(--neutral-700)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              These Terms are governed by and construed in accordance with the laws of the Republic of Latvia. Any disputes arising in connection with the platform shall be settled in the competent courts of Riga, Latvia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
