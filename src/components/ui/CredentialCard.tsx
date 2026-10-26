import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { formatRigaDate } from '@/lib/timezone';

interface CredentialCardProps {
  id?: string;
  projectTitle: string;
  organizationName: string;
  completedAt?: Date | string | null;
  skillsVerified: string;
  credentialCode?: string | null;
  isPublicPreview?: boolean;
}

export default function CredentialCard({
  projectTitle,
  organizationName,
  completedAt,
  skillsVerified,
  credentialCode = 'A2-LV-2026-X89K',
  isPublicPreview = false,
}: CredentialCardProps) {
  const skillsList = skillsVerified.split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <div
      className="a2-credential-card"
      style={{
        backgroundColor: 'var(--surface-white)',
        border: '1.5px solid var(--border-medium)',
        borderRadius: '14px',
        padding: '1.5rem 1.75rem',
        boxShadow: 'var(--shadow-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Emerald Verification Seal */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.71875rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-emerald)',
            backgroundColor: 'var(--color-emerald-light)',
            border: '1px solid var(--color-emerald-border)',
            padding: '0.25rem 0.65rem',
            borderRadius: '999px',
          }}
        >
          <ShieldCheck size={14} /> ✓ A2 Verified Experience
        </span>

        {credentialCode && (
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--neutral-500)',
              backgroundColor: 'var(--soft-canvas)',
              border: '1px solid var(--border-medium)',
              padding: '0.15rem 0.5rem',
              borderRadius: '6px',
            }}
          >
            {credentialCode}
          </span>
        )}
      </div>

      {/* Project Title */}
      <h3
        style={{
          fontSize: '1.15rem',
          fontWeight: 800,
          color: 'var(--nordic-slate)',
          marginBottom: '0.75rem',
          lineHeight: 1.35,
        }}
      >
        {projectTitle}
      </h3>

      {/* Issuing Organization and Completion Date */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '0.75rem',
          paddingBottom: '1rem',
          marginBottom: '1rem',
          borderBottom: '1px solid var(--border-hairline)',
          fontSize: '0.8125rem',
        }}
      >
        <div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--neutral-500)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
            Issued by
          </span>
          <div style={{ fontWeight: 700, color: 'var(--nordic-slate)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
            <Building2 size={13} color="var(--neutral-400)" />
            {organizationName}
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--neutral-500)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
            Completed
          </span>
          <div style={{ fontWeight: 700, color: 'var(--nordic-slate)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
            <Calendar size={13} color="var(--neutral-400)" />
            {completedAt ? formatRigaDate(completedAt) : '25 Oct 2026'}
          </div>
        </div>
      </div>

      {/* Verified Competencies */}
      <div style={{ marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '0.6875rem', color: 'var(--neutral-500)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em', display: 'block', marginBottom: '0.4rem' }}>
          Verified Competencies
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {skillsList.map((skill, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--nordic-slate)',
                backgroundColor: 'var(--soft-canvas)',
                border: '1px solid var(--border-medium)',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <CheckCircle2 size={11} color="var(--color-emerald)" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Verification Link Action */}
      {credentialCode && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-hairline)' }}>
          <Link
            href={`/verify/${credentialCode}`}
            target={isPublicPreview ? '_blank' : '_self'}
            style={{
              fontSize: '0.8125rem',
              fontWeight: 800,
              color: 'var(--color-emerald)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'opacity 150ms ease',
            }}
          >
            VERIFY CREDENTIAL →
          </Link>
        </div>
      )}
    </div>
  );
}
