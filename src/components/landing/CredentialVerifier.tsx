import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import CredentialCard from '@/components/ui/CredentialCard';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CredentialVerifier() {
  return (
    <section style={{ padding: '5rem 0', backgroundColor: 'var(--surface-white)', borderBottom: '1px solid var(--border-medium)' }}>
      <div className="a2-container" style={{ maxWidth: '960px' }}>
        <SectionHeader
          eyebrow="Signature Differentiator"
          title="Experience you can verify."
          description="A2 TalentBridge records what students completed, which skills they demonstrated and who verified the experience."
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            marginTop: '2.5rem',
          }}
        >
          {/* Left Context: Why verification matters */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nordic-slate)', marginBottom: '0.75rem' }}>
              Proof over resume claims.
            </h3>
            <p style={{ color: 'var(--neutral-600)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Unlike self-reported skills on CVs, every A2 credential is tied to actual milestone deliverables, signed off by verified employers, and cross-referenced with university faculty.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="var(--color-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--neutral-600)' }}>
                  <strong style={{ color: 'var(--nordic-slate)' }}>Cryptographic Hash:</strong> Immutable verification code valid across European institutions.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="var(--color-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--neutral-600)' }}>
                  <strong style={{ color: 'var(--nordic-slate)' }}>ECTS Alignment:</strong> Designed to satisfy academic internship accreditation requirements.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="var(--color-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--neutral-600)' }}>
                  <strong style={{ color: 'var(--nordic-slate)' }}>Public Verification Portal:</strong> Employers can audit candidate deliverables in 1-click.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Signature Credential Card Component */}
          <div>
            <CredentialCard
              projectTitle="Full-Stack Web Development Project"
              organizationName="DemoTech Latvia"
              completedAt="2026-10-25"
              skillsVerified="React, TypeScript, PostgreSQL, Teamwork"
              credentialCode="A2-LV-2026-X89K"
              isPublicPreview={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
