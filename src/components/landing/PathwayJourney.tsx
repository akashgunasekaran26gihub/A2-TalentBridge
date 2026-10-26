import React from 'react';
import { BookOpen, Search, Briefcase, CheckCircle, ShieldCheck, TrendingUp } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function PathwayJourney() {
  const steps = [
    {
      num: '01',
      title: 'Education',
      tagline: 'Academic Foundation',
      desc: 'Rigorous coursework and academic degree programs across accredited universities in Latvia.',
      icon: BookOpen,
      color: '#1E3A8A',
    },
    {
      num: '02',
      title: 'Opportunity',
      tagline: 'Direct Discovery',
      desc: 'Transparent access to accredited internships, sponsored innovation challenges, and industry projects.',
      icon: Search,
      color: '#0F766E',
    },
    {
      num: '03',
      title: 'Experience',
      tagline: 'Applied Execution',
      desc: 'Collaborate on live enterprise problems under realistic constraints, deadlines, and mentor guidance.',
      icon: Briefcase,
      color: '#D97706',
    },
    {
      num: '04',
      title: 'Evaluation',
      tagline: 'Objective Rubrics',
      desc: 'Direct supervisors and faculty coordinators review delivered milestones against standardized criteria.',
      icon: CheckCircle,
      color: '#4338CA',
    },
    {
      num: '05',
      title: 'Verified Skills',
      tagline: 'Auditable Proof',
      desc: 'Earn tamper-proof credentials recording demonstrated competencies, issuing partner, and verified outcomes.',
      icon: ShieldCheck,
      color: '#059669',
    },
    {
      num: '06',
      title: 'Employment',
      tagline: 'Accelerated Hiring',
      desc: 'Transition smoothly into full-time roles based on verified competence rather than generic resume claims.',
      icon: TrendingUp,
      color: '#1E3A8A',
    },
  ];

  return (
    <section className="pathway-section" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-app)' }}>
      <div className="a2-container">
        {/* Section Header (Section 24) */}
        <SectionHeader
          eyebrow="The Core Career Loop"
          title="From Learning to Opportunity"
          description="A2 TalentBridge turns education into practical experience — and practical experience into verified career value."
          centered
        />

        {/* Sophisticated Connected 6-Stage Visual Journey */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            position: 'relative',
          }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="a2-card"
                style={{
                  backgroundColor: 'var(--surface-white)',
                  border: '1.5px solid var(--border-medium)',
                  borderTop: `3px solid ${step.color}`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-subtle)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span
                      style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '0.8125rem',
                        fontWeight: 800,
                        color: step.color,
                        backgroundColor: 'var(--soft-canvas)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-medium)',
                      }}
                    >
                      {step.num}
                    </span>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--soft-canvas)',
                        border: '1px solid var(--border-medium)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={16} color={step.color} />
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: step.color,
                      display: 'block',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {step.tagline}
                  </span>

                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: 'var(--nordic-slate)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.84375rem',
                      lineHeight: 1.55,
                      color: 'var(--neutral-500)',
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
