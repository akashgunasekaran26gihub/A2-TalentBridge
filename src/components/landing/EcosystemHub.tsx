'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LucideIcon,
  GraduationCap,
  Building2,
  Landmark,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ArrowDownUp,
  Cpu,
  Layers,
} from 'lucide-react';

type StakeholderId = 'students' | 'companies' | 'universities' | 'community';

interface StakeholderData {
  id: StakeholderId;
  name: string;
  badge: string;
  roleTag: string;
  icon: LucideIcon;
  color: string;
  bgLight: string;
  borderColor: string;
  gradient: string;
  headline: string;
  summary: string;
  input: string;
  output: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  stats: { label: string; value: string; color: string }[];
}

const stakeholders: Record<StakeholderId, StakeholderData> = {
  students: {
    id: 'students',
    name: 'Students',
    badge: 'ACADEMIC TALENT',
    roleTag: 'Experience Builders',
    icon: GraduationCap,
    color: '#1E40AF',
    bgLight: '#EFF6FF',
    borderColor: '#BFDBFE',
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
    headline: 'Turn classroom potential into verified career experience.',
    summary:
      'Gain access to live project sprints, accredited internships, and mentor evaluations that prove your skills to future employers.',
    input: 'Student Project Deliverables & Verified Skills',
    output: 'Tamper-Proof Credentials & Employment Matches',
    features: [
      'Apply to curated internships and company challenges in Riga & the Baltics',
      'Collaborate on team sprints with verified industry mentors',
      'Earn tamper-proof credentials shareable on LinkedIn and portfolios',
      'Get explainable matching to roles fitting your schedule and degree field',
    ],
    ctaText: 'Explore Student Experience',
    ctaHref: '/students',
    stats: [
      { label: 'Active Project Teams', value: '48+', color: '#1E40AF' },
      { label: 'Avg Skill Match', value: '89%', color: '#059669' },
    ],
  },
  companies: {
    id: 'companies',
    name: 'Companies',
    badge: 'INDUSTRY PARTNERS',
    roleTag: 'Talent Seekers',
    icon: Building2,
    color: '#D97706',
    bgLight: '#FFFBEB',
    borderColor: '#FDE68A',
    gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    headline: 'Evaluate junior talent on real work before making hire decisions.',
    summary:
      'Launch project challenges, sponsor internships, and identify high-performing students based on actual deliverables, not theoretical resumes.',
    input: 'Industry Projects, Challenges & Mentorship',
    output: 'Pre-Vetted Candidates with Auditable Proof',
    features: [
      'Publish internships, live challenges, and team sprints in minutes',
      'Assess candidates with standardized milestone rubrics and mentor sign-offs',
      'Direct pipeline access to pre-verified university talent in Latvia',
      'Reduce junior hiring risk with auditable evidence of competency',
    ],
    ctaText: 'Discover Employer Solutions',
    ctaHref: '/companies',
    stats: [
      { label: 'Time Saved Screening', value: '60%', color: '#D97706' },
      { label: 'Retention Rate', value: '94%', color: '#059669' },
    ],
  },
  universities: {
    id: 'universities',
    name: 'Universities',
    badge: 'HIGHER EDUCATION',
    roleTag: 'Curriculum Anchors',
    icon: Landmark,
    color: '#059669',
    bgLight: '#ECFDF5',
    borderColor: '#A7F3D0',
    gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    headline: 'Connect academic curricula with verified industry outcomes.',
    summary:
      'Empower faculty to track student placements, accredit project-based learning with ECTS credits, and strengthen enterprise partnerships.',
    input: 'Accredited Curriculum & ECTS Validation',
    output: 'Auditable Placement Analytics & Outcome Proof',
    features: [
      'Monitor student participation across certified enterprise projects',
      'Streamline ECTS credit validation for industry coursework',
      'Access transparent outcome analytics for institutional accreditation',
      'Deepen relationships with Latvia’s leading technology employers',
    ],
    ctaText: 'Explore University Hub',
    ctaHref: '/universities',
    stats: [
      { label: 'ECTS Aligned Learning', value: '100%', color: '#059669' },
      { label: 'Partner Institutions', value: 'Latvia & EU', color: '#1E40AF' },
    ],
  },
  community: {
    id: 'community',
    name: 'Community & Mentors',
    badge: 'ECOSYSTEM DRIVERS',
    roleTag: 'Ecosystem Catalysts',
    icon: Users,
    color: '#4338CA',
    bgLight: '#EEF2FF',
    borderColor: '#C7D2FE',
    gradient: 'linear-gradient(135deg, #4338CA 0%, #6366F1 100%)',
    headline: 'Strengthen the Baltic innovation and talent landscape.',
    summary:
      'Mentors, startup clusters, and public innovation organizations come together to build a future-ready, European-aligned regional workforce.',
    input: 'Industry Mentorship & Evaluation Standards',
    output: 'Vibrant Regional Innovation Network',
    features: [
      'Mentor emerging engineers, designers, and domain specialists',
      'Support civic and sustainability challenges across Latvia',
      'Align education outcomes with European labor market standards',
      'Foster inclusive access to technology and professional networks',
    ],
    ctaText: 'Learn About Impact',
    ctaHref: '/impact',
    stats: [
      { label: 'Regional Focus', value: 'Riga / Baltics', color: '#4338CA' },
      { label: 'Accreditation', value: 'EU Standards', color: '#059669' },
    ],
  },
};

export default function EcosystemHub() {
  const [activeTab, setActiveTab] = useState<StakeholderId>('students');
  const activeData = stakeholders[activeTab];
  const ActiveIcon = activeData.icon;

  const stakeholderList: StakeholderId[] = ['students', 'companies', 'universities', 'community'];

  return (
    <section className="ecosystem-hub-section" id="connected-architecture">
      <div className="a2-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2rem auto' }}>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--baltic-navy)',
              marginBottom: '0.5rem',
              display: 'inline-block',
              backgroundColor: 'var(--baltic-navy-light)',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid #BFDBFE',
            }}
          >
            Connected Architecture
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--nordic-slate)',
              letterSpacing: '-0.02em',
              marginBottom: '0.65rem',
            }}
          >
            One ecosystem. Four perspectives.
          </h2>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'var(--neutral-600)',
            }}
          >
            A2 TalentBridge connects academic institutions, high-growth employers, student talent, and industry mentors into a verified value-exchange loop.
          </p>

          {/* Interactive Top Pill Switcher */}
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: 'var(--surface-white)',
              border: '1px solid var(--border-medium)',
              borderRadius: '12px',
              padding: '0.35rem',
              gap: '0.35rem',
              marginTop: '1.25rem',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            role="tablist"
            aria-label="Connected Architecture Pillars"
          >
            {stakeholderList.map((key) => {
              const s = stakeholders[key];
              const Icon = s.icon;
              const isSelected = activeTab === key;
              return (
                <button
                  key={key}
                  id={`arch-tab-${key}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(key)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 0.95rem',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    backgroundColor: isSelected ? s.color : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'var(--neutral-700)',
                    boxShadow: isSelected ? `0 4px 12px ${s.color}33` : 'none',
                  }}
                >
                  <Icon size={15} />
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Architecture Layout: Left Network Architecture / Right Detail View */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.05fr',
            gap: '2.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Left Column: Interconnected System Architecture Matrix */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            {/* 2x2 Grid of Stakeholder Modules */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              {stakeholderList.map((key) => {
                const s = stakeholders[key];
                const Icon = s.icon;
                const isSelected = activeTab === key;

                return (
                  <button
                    key={key}
                    id={`arch-card-${key}`}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    style={{
                      backgroundColor: 'var(--surface-white)',
                      border: isSelected ? `2px solid ${s.color}` : '1.5px solid var(--border-medium)',
                      borderRadius: '14px',
                      padding: '1.15rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      boxShadow: isSelected
                        ? `0 8px 24px -4px ${s.color}25, 0 0 0 1px ${s.color}`
                        : '0 2px 8px rgba(15, 23, 42, 0.04)',
                      transform: isSelected ? 'translateY(-2px)' : 'none',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Top Accent Strip when selected */}
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: s.gradient,
                        }}
                      />
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          backgroundColor: s.bgLight,
                          border: `1px solid ${s.borderColor}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={18} color={s.color} />
                      </div>

                      <span
                        style={{
                          fontSize: '0.625rem',
                          fontWeight: 800,
                          letterSpacing: '0.05em',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '999px',
                          backgroundColor: isSelected ? `${s.color}15` : 'var(--neutral-100)',
                          color: isSelected ? s.color : 'var(--neutral-500)',
                          border: isSelected ? `1px solid ${s.borderColor}` : '1px solid var(--border-hairline)',
                        }}
                      >
                        {isSelected ? 'ACTIVE VIEW' : s.badge}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--nordic-slate)', marginBottom: '0.2rem' }}>
                      {s.name}
                    </div>

                    <div style={{ fontSize: '0.71875rem', color: 'var(--neutral-500)', lineHeight: 1.35 }}>
                      {s.roleTag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Central Platform Engine Core Visual Banner */}
            <div
              style={{
                backgroundColor: 'var(--surface-white)',
                border: '1.5px solid var(--border-medium)',
                borderRadius: '14px',
                padding: '1.25rem 1.5rem',
                boxShadow: 'var(--shadow-elevation)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #1E3A8A 0%, #D97706 33%, #059669 66%, #4338CA 100%)',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--baltic-navy-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Cpu size={15} color="var(--baltic-navy)" />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--nordic-slate)', letterSpacing: '0.04em' }}>
                    A2 PLATFORM CORE ENGINE
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'var(--brand-emerald)',
                    backgroundColor: 'var(--brand-emerald-light)',
                    border: '1px solid var(--brand-emerald-border)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-emerald)' }} />
                  REAL-TIME VALUE LOOP · RIGA / EU
                </span>
              </div>

              {/* Data Flow Indicator between selected stakeholder and ecosystem */}
              <div
                style={{
                  backgroundColor: 'var(--neutral-50)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.78125rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ArrowDownUp size={14} color={activeData.color} />
                  <span style={{ color: 'var(--neutral-700)' }}>
                    Exchange with <strong>{activeData.name}</strong>:
                  </span>
                </div>
                <span
                  style={{
                    color: activeData.color,
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textAlign: 'right',
                  }}
                >
                  {activeData.output}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Stakeholder Detail View Card */}
          <div
            style={{
              backgroundColor: 'var(--surface-white)',
              border: `2px solid ${activeData.borderColor}`,
              borderRadius: '18px',
              padding: '1.75rem 2rem',
              boxShadow: 'var(--shadow-elevation)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Top Color Accent Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: activeData.gradient,
              }}
            />

            <div>
              {/* Header inside Card */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.15rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: activeData.bgLight,
                    border: `1.5px solid ${activeData.borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ActiveIcon size={22} color={activeData.color} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      color: activeData.color,
                      textTransform: 'uppercase',
                    }}
                  >
                    {activeData.badge}
                  </span>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
                    {activeData.name} Perspective
                  </div>
                </div>
              </div>

              {/* Headline */}
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--nordic-slate)',
                  lineHeight: 1.35,
                  marginBottom: '0.65rem',
                }}
              >
                {activeData.headline}
              </h3>

              {/* Summary */}
              <p
                style={{
                  fontSize: '0.925rem',
                  lineHeight: 1.6,
                  color: 'var(--neutral-600)',
                  marginBottom: '1.25rem',
                }}
              >
                {activeData.summary}
              </p>

              {/* Features Bullet List */}
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  marginBottom: '1.5rem',
                }}
              >
                {activeData.features.map((feature, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.55rem',
                      fontSize: '0.875rem',
                      color: 'var(--neutral-700)',
                      lineHeight: 1.45,
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      color="var(--brand-emerald)"
                      style={{ flexShrink: 0, marginTop: '2px' }}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Bar & Stats */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border-hairline)',
                paddingTop: '1.15rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', gap: '1.75rem' }}>
                {activeData.stats.map((st) => (
                  <div key={st.label}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: st.color }}>
                      {st.value}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--neutral-500)', fontWeight: 600 }}>
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href={activeData.ctaHref}
                className="btn btn-secondary btn-sm"
                style={{
                  fontWeight: 700,
                  borderColor: activeData.borderColor,
                  color: activeData.color,
                  backgroundColor: 'var(--surface-white)',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                {activeData.ctaText} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
