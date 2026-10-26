import React from 'react';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight, Building2 } from 'lucide-react';
import { formatRigaDate, formatEur } from '@/lib/timezone';

interface RequiredSkill {
  id: string;
  skill: {
    id: string;
    name: string;
    category?: string;
  };
}

interface OpportunityCardProps {
  id: string;
  title: string;
  opportunityType: string;
  organization: {
    name: string;
    city?: string | null;
  };
  locationCity: string;
  remoteType: string;
  stipendEur: number;
  applicationDeadline: Date | string;
  requiredSkills?: RequiredSkill[];
  matchScore?: number;
}

export default function OpportunityCard({
  id,
  title,
  opportunityType,
  organization,
  locationCity,
  remoteType,
  stipendEur,
  applicationDeadline,
  requiredSkills = [],
  matchScore,
}: OpportunityCardProps) {
  const visibleSkills = requiredSkills.slice(0, 3);
  const remainingCount = requiredSkills.length - visibleSkills.length;

  return (
    <div
      className="a2-card a2-card-interactive"
      style={{
        backgroundColor: 'var(--surface-white)',
        border: '1.5px solid var(--border-medium)',
        borderRadius: '12px',
        padding: '1.35rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-subtle)',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
      }}
    >
      <div>
        {/* Top Header: Opportunity Type & Optional Match Score */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-blue)',
              backgroundColor: 'var(--color-blue-light)',
              padding: '0.2rem 0.55rem',
              borderRadius: '999px',
            }}
          >
            {opportunityType}
          </span>

          {matchScore && (
            <span
              style={{
                fontSize: '0.71875rem',
                fontWeight: 800,
                color: 'var(--color-emerald)',
                backgroundColor: 'var(--color-emerald-light)',
                border: '1px solid var(--color-emerald-border)',
                padding: '0.15rem 0.5rem',
                borderRadius: '999px',
              }}
            >
              {matchScore}% Match
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            color: 'var(--nordic-slate)',
            marginBottom: '0.35rem',
            lineHeight: 1.35,
          }}
        >
          <Link href={`/opportunities/${id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {title}
          </Link>
        </h3>

        {/* Organization */}
        <div
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--neutral-600)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginBottom: '0.75rem',
          }}
        >
          <Building2 size={13} color="var(--neutral-400)" />
          {organization.name}
        </div>

        {/* Location & Compensation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            fontSize: '0.8125rem',
            color: 'var(--neutral-500)',
            marginBottom: '0.85rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <MapPin size={12} color="var(--neutral-400)" />
            {locationCity} · {remoteType}
          </span>
          <span style={{ fontWeight: 700, color: 'var(--nordic-slate)' }}>
            {formatEur(stipendEur)}
          </span>
        </div>

        {/* Skills Tags (Maximum 3-4 visible) */}
        {requiredSkills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
            {visibleSkills.map((rs) => (
              <span
                key={rs.id}
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  backgroundColor: 'var(--soft-canvas)',
                  color: 'var(--neutral-600)',
                  border: '1px solid var(--border-medium)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '6px',
                }}
              >
                {rs.skill.name}
              </span>
            ))}
            {remainingCount > 0 && (
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--neutral-400)',
                  padding: '0.15rem 0.35rem',
                }}
              >
                +{remainingCount} more
              </span>
            )}
          </div>
        )}

        {/* Deadline */}
        <div style={{ fontSize: '0.71875rem', color: 'var(--neutral-400)', marginBottom: '1.25rem' }}>
          Deadline: {formatRigaDate(applicationDeadline)}
        </div>
      </div>

      {/* Primary CTA */}
      <Link
        href={`/opportunities/${id}`}
        className="btn btn-secondary btn-sm"
        style={{
          width: '100%',
          justifyContent: 'center',
          fontWeight: 700,
          backgroundColor: 'var(--soft-canvas)',
          borderColor: 'var(--border-medium)',
          color: 'var(--nordic-slate)',
          borderRadius: '8px',
          padding: '0.55rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
        }}
      >
        View opportunity <ArrowRight size={13} />
      </Link>
    </div>
  );
}
