import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatRigaDate, formatEur, isRigaDeadlinePassed } from '@/lib/timezone';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface OpportunityDetailPageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';

export default async function OpportunityDetailPage({ params }: OpportunityDetailPageProps) {
  const opp = await prisma.opportunity.findUnique({
    where: { id: params.id },
    include: {
      organization: true,
      requiredSkills: { include: { skill: true } },
      _count: { select: { applications: true } },
    },
  });

  if (!opp) notFound();

  const isExpired = isRigaDeadlinePassed(opp.applicationDeadline);

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '2.5rem 0 5rem 0' }}>
      <div className="a2-container">
        
        {/* Back Link */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            href="/opportunities"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={14} /> Back to opportunities
          </Link>
        </div>

        {/* 2-Column Desktop Layout (Section 24 Rule) */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* MAIN COLUMN */}
          <div className="a2-card" style={{ padding: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="tag tag-blue">{opp.opportunityType}</span>
              <span className="tag tag-neutral">{opp.remoteType}</span>
              {opp.organization.isVerified && (
                <span className="tag tag-emerald">
                  <ShieldCheck size={12} /> Verified Employer
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
              {opp.title}
            </h1>

            <div style={{ fontSize: '1rem', color: 'var(--color-blue)', fontWeight: 600, marginBottom: '2rem' }}>
              {opp.organization.name} • {opp.locationCity}, Latvia
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                About the Opportunity
              </h2>
              <div style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                {opp.description}
              </div>
            </div>

            {/* Required Skills */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Required Competencies
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {opp.requiredSkills.map((rs) => (
                  <span key={rs.id} className="tag tag-blue" style={{ fontSize: '0.8125rem', padding: '0.35rem 0.65rem' }}>
                    <CheckCircle2 size={13} /> {rs.skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Experience Note */}
            <div
              style={{
                backgroundColor: 'var(--color-emerald-light)',
                border: '1px solid var(--color-emerald-border)',
                borderRadius: 'var(--radius-input)',
                padding: '1rem 1.25rem',
              }}
            >
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-emerald)', marginBottom: '0.25rem' }}>
                Verified Experience Outcome
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-700)', lineHeight: 1.5 }}>
                Upon successful completion of this {opp.opportunityType.toLowerCase()}, the supervising mentor completes a standardized rubric evaluation, issuing an official public credential.
              </p>
            </div>
          </div>

          {/* SIDE COLUMN: STICKY APPLICATION CARD (SECTION 24) */}
          <div style={{ position: 'sticky', top: '5.5rem' }}>
            <div className="a2-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
                {formatEur(opp.stipendEur)}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Monthly stipend / award
              </div>

              {/* Match Score Indicator (Section 25 Rule: Clean 92% Match) */}
              <div
                style={{
                  backgroundColor: 'var(--color-emerald-light)',
                  border: '1px solid var(--color-emerald-border)',
                  borderRadius: 'var(--radius-input)',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-emerald)' }}>
                    92% Match Score
                  </span>
                  <span className="tag tag-emerald" style={{ fontSize: '0.7rem' }}>Strong Fit</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--neutral-600)', marginTop: '0.2rem' }}>
                  Skills match • Education match • Location fit
                </div>
              </div>

              {/* Key metadata list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8125rem', color: 'var(--neutral-700)', marginBottom: '1.5rem' }}>
                <div>
                  <strong>Format:</strong> {opp.locationCity} ({opp.remoteType})
                </div>
                <div>
                  <strong>Duration:</strong> {opp.durationWeeks ? `${opp.durationWeeks} weeks` : 'Flexible'}
                </div>
                <div>
                  <strong>Deadline:</strong> {formatRigaDate(opp.applicationDeadline)}
                </div>
                <div>
                  <strong>Applicants:</strong> {opp._count.applications} submitted
                </div>
              </div>

              {/* Action */}
              {isExpired ? (
                <div style={{ backgroundColor: 'var(--color-red-light)', color: 'var(--color-red)', padding: '0.625rem', borderRadius: 'var(--radius-input)', fontSize: '0.8125rem', textAlign: 'center', fontWeight: 600 }}>
                  This opportunity is now closed.
                </div>
              ) : (
                <Link
                  href={`/login?redirect=/opportunities/${opp.id}`}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  id="apply-btn"
                >
                  Apply for Opportunity
                </Link>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
