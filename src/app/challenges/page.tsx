import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { FALLBACK_CHALLENGES } from '@/lib/fallback-data';
import { formatRigaDate, formatEur } from '@/lib/timezone';
import { Building2, Calendar, ArrowRight, Trophy } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ChallengesCatalogPage() {
  let challenges: any[] = [];
  try {
    challenges = await prisma.opportunity.findMany({
      where: {
        opportunityType: 'Challenge',
        status: 'Published',
      },
      include: {
        organization: true,
        requiredSkills: {
          include: { skill: true },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    console.warn('Database query failed in ChallengesCatalogPage, using fallback data:', err);
  }

  if (!challenges || challenges.length === 0) {
    challenges = FALLBACK_CHALLENGES;
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '3rem 0 5rem 0' }}>
      <div className="a2-container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="tag tag-amber" style={{ marginBottom: '0.5rem' }}>
            <Trophy size={12} /> Sponsored Case Sprints
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
            Innovation Challenges
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', maxWidth: '720px' }}>
            Form student teams to tackle real strategic and technological briefs sponsored by Latvian enterprises. Win awards, earn verified credentials, and secure job interviews.
          </p>
        </div>

        {/* Challenges Grid (Standardized Section 23 Rules) */}
        <div className="grid-cols-2">
          {challenges.map((c) => (
            <div
              key={c.id}
              className="a2-card a2-card-interactive"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.75rem' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
                  <span className="tag tag-amber">Sponsored Challenge</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={13} /> Deadline: {formatRigaDate(c.applicationDeadline)}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.35rem', lineHeight: 1.35 }}>
                  <Link href={`/opportunities/${c.id}`} style={{ color: 'inherit' }}>
                    {c.title}
                  </Link>
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--color-blue)', fontWeight: 600, marginBottom: '0.875rem' }}>
                  <Building2 size={15} />
                  <span>{c.organization.name}</span>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {c.description}
                </p>

                {/* Skills - max 4 visible */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
                  {c.requiredSkills.slice(0, 4).map((rs: any) => (
                    <span key={rs.id} className="tag tag-neutral">
                      {rs.skill.name}
                    </span>
                  ))}
                  {c.requiredSkills.length > 4 && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', alignSelf: 'center' }}>
                      +{c.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', textTransform: 'uppercase' }}>Award / Prize Pool</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-emerald)' }}>
                    {formatEur(c.stipendEur)}
                  </div>
                </div>

                <Link href={`/opportunities/${c.id}`} className="btn btn-secondary btn-sm">
                  Challenge Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

