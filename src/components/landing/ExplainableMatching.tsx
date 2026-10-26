import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import MatchScore from '@/components/ui/MatchScore';
import { ShieldCheck } from 'lucide-react';

export default function ExplainableMatching() {
  return (
    <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-app)', borderBottom: '1px solid var(--border-medium)' }}>
      <div className="a2-container" style={{ maxWidth: '960px' }}>
        <SectionHeader
          eyebrow="Transparent Matching"
          title="Recommendations you can understand."
          description="A2 TalentBridge removes algorithmic opacity. Both students and employers see exactly why a match was recommended — based on verified skills, degree programs, and real availability."
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
            marginTop: '2rem',
          }}
        >
          {/* Left Contextual Assurance */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nordic-slate)', marginBottom: '0.75rem' }}>
              Built for trust, not mystery.
            </h3>
            <p style={{ color: 'var(--neutral-600)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Traditional job portals use opaque AI that students cannot inspect. A2 provides an explainable breakdown so you know what competencies made you stand out — and what skills to build next.
            </p>

            <div
              style={{
                backgroundColor: 'var(--surface-white)',
                border: '1.5px solid var(--color-emerald-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
              }}
            >
              <ShieldCheck size={20} color="var(--color-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.84375rem', color: 'var(--neutral-600)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--nordic-slate)' }}>European AI Transparency:</strong> All recommendation weights follow explainability standards with auditable factor scores.
              </div>
            </div>
          </div>

          {/* Right: Signature MatchScore Component */}
          <div>
            <MatchScore
              score={92}
              breakdown={[
                { label: 'Skills Alignment', rating: 'Strong', score: 95 },
                { label: 'Education & Degree', rating: 'Good', score: 90 },
                { label: 'Interests & Pathway', rating: 'Strong', score: 92 },
                { label: 'Location & Modality', rating: 'Compatible', score: 100 },
                { label: 'Workload & Availability', rating: 'Compatible', score: 85 },
              ]}
              showDetailsButton={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
