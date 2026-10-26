import React from 'react';
import Link from 'next/link';
import { Search, Code2, Award, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Discover Opportunities',
      desc: 'Browse curated internships and live company challenges matched to your degree, skills, and availability.',
      icon: Search,
      badge: 'Step 1',
      color: 'var(--color-blue)',
      bg: 'var(--color-blue-light)',
    },
    {
      num: '02',
      title: 'Work on Real Sprints',
      desc: 'Collaborate with industry mentors on real enterprise projects, solving live problems with practical deliverables.',
      icon: Code2,
      badge: 'Step 2',
      color: 'var(--color-amber)',
      bg: 'var(--color-amber-light)',
    },
    {
      num: '03',
      title: 'Get Verified & Hired',
      desc: 'Earn tamper-proof credentials and university credits signed by supervisors that prove your real competence.',
      icon: Award,
      badge: 'Step 3',
      color: 'var(--color-emerald)',
      bg: 'var(--color-emerald-light)',
    },
  ];

  return (
    <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--soft-canvas)', borderBottom: '1px solid var(--border-medium)' }}>
      <div className="a2-container">
        <SectionHeader
          eyebrow="Simple 3-Step Process"
          title="From Learning to Career Impact"
          description="A clear pathway designed to turn academic knowledge into practical, verified industry experience."
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2.5rem',
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
                  borderRadius: '14px',
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-subtle)',
                  position: 'relative',
                  transition: 'transform 150ms ease, box-shadow 150ms ease',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        backgroundColor: step.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} color={step.color} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        fontFamily: 'ui-monospace, monospace',
                        color: step.color,
                        backgroundColor: step.bg,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                      }}
                    >
                      {step.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: 'var(--nordic-slate)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--neutral-600)',
                      lineHeight: 1.55,
                      margin: 0,
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
