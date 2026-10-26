import React from 'react';
import Link from 'next/link';
import { GraduationCap, Building2, Landmark, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function EcosystemGrid() {
  const cards = [
    {
      title: 'For Students',
      badge: 'Academic Talent',
      desc: 'Transform coursework into verified experience with high-growth companies.',
      icon: GraduationCap,
      color: 'var(--color-blue)',
      bg: 'var(--color-blue-light)',
      borderColor: '#BFDBFE',
      features: [
        'Curated internships and paid project challenges in Riga & the EU',
        'Direct mentorship from senior engineers and executives',
        'Verifiable digital credentials that satisfy university ECTS credits',
        'Build a real-world portfolio that outshines standard resumes',
      ],
      linkText: 'Explore Opportunities',
      href: '/opportunities',
    },
    {
      title: 'For Companies',
      badge: 'Industry Partners',
      desc: 'Evaluate emerging talent on real deliverables before making hiring decisions.',
      icon: Building2,
      color: 'var(--color-amber)',
      bg: 'var(--color-amber-light)',
      borderColor: 'var(--color-amber-border)',
      features: [
        'Post internships and live sprints in under 2 minutes',
        'Assess candidates on actual code, models, and presentations',
        'Connect directly with pre-screened students at top universities',
        'Dramatically reduce hiring risk and junior onboarding time',
      ],
      linkText: 'Post an Opportunity',
      href: '/register',
    },
    {
      title: 'For Universities',
      badge: 'Academic Institutions',
      desc: 'Monitor student practicums and accredit real-world experiential learning.',
      icon: Landmark,
      color: 'var(--color-emerald)',
      bg: 'var(--color-emerald-light)',
      borderColor: 'var(--color-emerald-border)',
      features: [
        'Track student internship progress with supervisor evaluation rubrics',
        'Accredit learning outcomes seamlessly for Bologna ECTS transfer',
        'Foster lasting partnerships with regional tech and business leaders',
        'Showcase tangible graduate employment and placement rates',
      ],
      linkText: 'Learn More for Universities',
      href: '/universities',
    },
  ];

  return (
    <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--surface-white)', borderBottom: '1px solid var(--border-medium)' }}>
      <div className="a2-container">
        <SectionHeader
          eyebrow="One Platform · Three Perspectives"
          title="Designed for the Entire Ecosystem"
          description="A shared digital bridge connecting ambitious students, innovative companies, and leading universities."
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem',
            marginTop: '2.5rem',
          }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
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
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        backgroundColor: card.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} color={card.color} />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: card.color,
                        }}
                      >
                        {card.badge}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0 }}>
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                    {card.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                    {card.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <CheckCircle2 size={16} color="var(--color-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.8125rem', color: 'var(--nordic-slate)', lineHeight: 1.45 }}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={card.href}
                  className="btn btn-secondary btn-sm"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontWeight: 700,
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.84375rem',
                    backgroundColor: 'var(--soft-canvas)',
                    borderColor: 'var(--border-medium)',
                    color: 'var(--nordic-slate)',
                    textDecoration: 'none',
                    width: '100%',
                  }}
                >
                  {card.linkText} <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
