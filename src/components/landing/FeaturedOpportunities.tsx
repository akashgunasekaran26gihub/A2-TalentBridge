import React from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import OpportunityCard from '@/components/ui/OpportunityCard';

interface SkillItem {
  id: string;
  skill: {
    id: string;
    name: string;
    category?: string;
  };
}

interface OpportunityItem {
  id: string;
  title: string;
  opportunityType: string;
  organization: {
    name: string;
    city?: string | null;
  };
  locationCity: string;
  remoteType: string;
  stipendEur: number | null;
  applicationDeadline: Date | string;
  requiredSkills: SkillItem[];
}

interface FeaturedOpportunitiesProps {
  opportunities: OpportunityItem[];
}

export default function FeaturedOpportunities({ opportunities }: FeaturedOpportunitiesProps) {
  const matchScores = [92, 86, 79];

  return (
    <section style={{ padding: '5rem 0', backgroundColor: 'var(--surface-white)', borderBottom: '1px solid var(--border-medium)' }}>
      <div className="a2-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <SectionHeader
            eyebrow="Curated Marketplace"
            title="Opportunities built around real experience."
            description="Explore internships and project challenges created by vetted organizations in Latvia."
          />

          <Link
            href="/opportunities"
            className="btn btn-secondary btn-sm"
            style={{
              fontWeight: 700,
              backgroundColor: 'var(--soft-canvas)',
              borderColor: 'var(--border-medium)',
              color: 'var(--nordic-slate)',
              padding: '0.6rem 1.25rem',
              borderRadius: '8px',
              textDecoration: 'none',
              marginBottom: '1.75rem',
            }}
          >
            View All Opportunities →
          </Link>
        </div>

        {/* 3 Featured Opportunity Cards */}
        <div className="grid-cols-3" style={{ gap: '1.5rem' }}>
          {opportunities.slice(0, 3).map((opp, idx) => (
            <OpportunityCard
              key={opp.id}
              id={opp.id}
              title={opp.title}
              opportunityType={opp.opportunityType}
              organization={opp.organization}
              locationCity={opp.locationCity}
              remoteType={opp.remoteType}
              stipendEur={opp.stipendEur || 0}
              applicationDeadline={opp.applicationDeadline}
              requiredSkills={opp.requiredSkills}
              matchScore={matchScores[idx] || 85}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
