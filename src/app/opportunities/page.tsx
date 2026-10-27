import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { FALLBACK_OPPORTUNITIES } from '@/lib/fallback-data';
import { formatRigaDate, formatEur } from '@/lib/timezone';
import { Search, MapPin, Filter, Briefcase } from 'lucide-react';

interface OpportunitiesPageProps {
  searchParams: {
    query?: string;
    type?: string;
    remote?: string;
    city?: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function OpportunitiesPage({ searchParams }: OpportunitiesPageProps) {
  const query = searchParams.query || '';
  const typeFilter = searchParams.type || '';
  const remoteFilter = searchParams.remote || '';
  const cityFilter = searchParams.city || '';

  const whereClause: any = { status: 'Published' };

  if (query) {
    whereClause.OR = [
      { title: { contains: query } },
      { description: { contains: query } },
    ];
  }

  if (typeFilter) whereClause.opportunityType = typeFilter;
  if (remoteFilter) whereClause.remoteType = remoteFilter;
  if (cityFilter) whereClause.locationCity = cityFilter;

  let opportunities: any[] = [];
  try {
    opportunities = await prisma.opportunity.findMany({
      where: whereClause,
      include: {
        organization: true,
        requiredSkills: { include: { skill: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    console.warn('Database query failed in OpportunitiesPage, using fallback data:', err);
  }

  if (!opportunities || opportunities.length === 0) {
    opportunities = FALLBACK_OPPORTUNITIES.filter((opp) => {
      if (typeFilter && opp.opportunityType !== typeFilter) return false;
      if (remoteFilter && opp.remoteType !== remoteFilter) return false;
      if (cityFilter && opp.locationCity.toLowerCase() !== cityFilter.toLowerCase()) return false;
      if (query) {
        const q = query.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesDesc = opp.description.toLowerCase().includes(q);
        const matchesOrg = opp.organization.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesOrg) return false;
      }
      return true;
    });
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '3rem 0 5rem 0' }}>
      <div className="a2-container">
        
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
            Opportunities in Latvia
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            Explore verified internships, team live projects, and challenges from Latvian employers.
          </p>
        </div>

        {/* Clean Filter Bar */}
        <div
          className="a2-card"
          style={{
            padding: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          <form method="GET" action="/opportunities" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ flex: '2 1 260px' }}>
              <input
                type="text"
                name="query"
                defaultValue={query}
                placeholder="Search by title or keyword..."
                className="form-input"
              />
            </div>

            <div style={{ flex: '1 1 160px' }}>
              <select name="type" defaultValue={typeFilter} className="form-select">
                <option value="">All Types</option>
                <option value="Internship">Internship</option>
                <option value="Live Project">Live Project</option>
                <option value="Challenge">Challenge</option>
                <option value="Job">Job</option>
              </select>
            </div>

            <div style={{ flex: '1 1 150px' }}>
              <select name="remote" defaultValue={remoteFilter} className="form-select">
                <option value="">All Formats</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div style={{ flex: '1 1 150px' }}>
              <select name="city" defaultValue={cityFilter} className="form-select">
                <option value="">All Cities</option>
                <option value="Riga">Riga</option>
                <option value="Liepāja">Liepāja</option>
                <option value="Jelgava">Jelgava</option>
                <option value="Daugavpils">Daugavpils</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-sm">
              <Filter size={14} /> Filter
            </button>
          </form>
        </div>

        {/* Results Count */}
        <div style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', marginBottom: '1.25rem', fontWeight: 600 }}>
          Showing {opportunities.length} {opportunities.length === 1 ? 'opportunity' : 'opportunities'}
        </div>

        {/* Standardized Cards Grid (Section 23 Rule) */}
        {opportunities.length === 0 ? (
          <div className="empty-state">
            <Briefcase className="empty-state-icon" />
            <div className="empty-state-title">No opportunities found</div>
            <div className="empty-state-desc">Try clearing filters or search terms to view all open opportunities.</div>
            <Link href="/opportunities" className="btn btn-secondary btn-sm">Reset Filters</Link>
          </div>
        ) : (
          <div className="grid-cols-3">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="a2-card a2-card-interactive"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  {/* 1. Top Type Badge & Deadline */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="tag tag-blue">{opp.opportunityType}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                      Deadline: {formatRigaDate(opp.applicationDeadline)}
                    </span>
                  </div>

                  {/* 2. Clear Title */}
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem', lineHeight: 1.35 }}>
                    <Link href={`/opportunities/${opp.id}`} style={{ color: 'inherit' }}>
                      {opp.title}
                    </Link>
                  </h3>

                  {/* 3. Organization */}
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-blue)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {opp.organization.name}
                  </div>

                  {/* 4. Metadata (Location, Duration, Compensation) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', color: 'var(--neutral-600)', marginBottom: '0.875rem' }}>
                    <span><MapPin size={12} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> {opp.locationCity} ({opp.remoteType})</span>
                    <span>{formatEur(opp.stipendEur)}</span>
                  </div>

                  {/* 5. Skills (Max 4 visible rule) */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {opp.requiredSkills.slice(0, 4).map((rs: any) => (
                      <span key={rs.id} className="tag tag-neutral">
                        {rs.skill.name}
                      </span>
                    ))}
                    {opp.requiredSkills.length > 4 && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', alignSelf: 'center' }}>
                        +{opp.requiredSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* 6. CTA */}
                <Link href={`/opportunities/${opp.id}`} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  View details
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
