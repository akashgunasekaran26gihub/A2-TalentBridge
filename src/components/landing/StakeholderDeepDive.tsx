'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Building2,
  Landmark,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Check,
  Users,
  Briefcase,
} from 'lucide-react';

type StakeholderTab = 'students' | 'companies' | 'universities';

export default function StakeholderDeepDive() {
  const [activeTab, setActiveTab] = useState<StakeholderTab>('students');

  return (
    <section className="stakeholder-studio-section" id="stakeholder-experiences" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-app)', borderBottom: '1px solid var(--border-medium)' }}>
      <div className="a2-container">
        
        {/* Top Control Tabs */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: 'var(--surface-white)',
              border: '1.5px solid var(--border-medium)',
              borderRadius: '12px',
              padding: '0.35rem',
              gap: '0.35rem',
              boxShadow: 'var(--shadow-subtle)',
            }}
            role="tablist"
          >
            <button
              id="workspace-tab-students"
              type="button"
              role="tab"
              aria-selected={activeTab === 'students'}
              onClick={() => setActiveTab('students')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.84375rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                backgroundColor: activeTab === 'students' ? 'var(--color-blue)' : 'transparent',
                color: activeTab === 'students' ? '#FFFFFF' : 'var(--neutral-600)',
              }}
            >
              <GraduationCap size={15} />
              <span>For Students</span>
            </button>

            <button
              id="workspace-tab-companies"
              type="button"
              role="tab"
              aria-selected={activeTab === 'companies'}
              onClick={() => setActiveTab('companies')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.84375rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                backgroundColor: activeTab === 'companies' ? 'var(--color-amber)' : 'transparent',
                color: activeTab === 'companies' ? '#FFFFFF' : 'var(--neutral-600)',
              }}
            >
              <Building2 size={15} />
              <span>For Companies</span>
            </button>

            <button
              id="workspace-tab-universities"
              type="button"
              role="tab"
              aria-selected={activeTab === 'universities'}
              onClick={() => setActiveTab('universities')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.84375rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                backgroundColor: activeTab === 'universities' ? 'var(--color-emerald)' : 'transparent',
                color: activeTab === 'universities' ? '#FFFFFF' : 'var(--neutral-600)',
              }}
            >
              <Landmark size={15} />
              <span>For Universities</span>
            </button>
          </div>
        </div>

        {/* 1. STUDENT SECTION (Section 26) */}
        {activeTab === 'students' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-blue)',
                  marginBottom: '0.5rem',
                  display: 'inline-block',
                }}
              >
                Student Experience
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                  fontWeight: 800,
                  color: 'var(--nordic-slate)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  marginBottom: '1rem',
                }}
              >
                Build experience employers can trust.
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--neutral-600)',
                  marginBottom: '1.5rem',
                }}
              >
                Turn academic coursework into verifiable capability. Collaborate with high-growth companies in Latvia on live problems and graduate with proof of work.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  'Discover internships matching your degree and schedule',
                  'Join live projects with mentor guidance',
                  'Work with industry professionals in Riga and the Baltics',
                  'Build verified skills through milestone evaluations',
                  'Earn shareable credentials recognized by European employers',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-blue-light)',
                        color: 'var(--color-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--nordic-slate)', fontWeight: 500 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/opportunities"
                className="btn btn-primary btn-lg"
                style={{
                  backgroundColor: 'var(--color-blue)',
                  fontWeight: 700,
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.75rem 1.5rem',
                  textDecoration: 'none',
                }}
              >
                Explore opportunities <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right-Side Product Preview (Section 26 Spec) */}
            <div
              className="a2-card"
              style={{
                backgroundColor: 'var(--surface-white)',
                border: '1.5px solid var(--border-medium)',
                borderRadius: '14px',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              {/* Profile Strength */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Profile strength
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-blue)' }}>
                    82%
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-medium)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', backgroundColor: 'var(--color-blue)', borderRadius: '999px' }} />
                </div>
              </div>

              {/* Recommended for you */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.65rem' }}>
                  Recommended for you
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    { title: 'Full-Stack Developer', match: 92, tag: 'Internship' },
                    { title: 'Data Analytics Intern', match: 88, tag: 'Internship' },
                    { title: 'Sustainability Project', match: 84, tag: 'Challenge' },
                  ].map((opp, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'var(--soft-canvas)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '8px',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--nordic-slate)' }}>
                          {opp.title}
                        </div>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--neutral-500)' }}>
                          {opp.tag}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          color: 'var(--color-emerald)',
                          backgroundColor: 'var(--color-emerald-light)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '999px',
                        }}
                      >
                        {opp.match}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Experience */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.5rem' }}>
                  Verified experience
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['React', 'TypeScript', 'Team Leadership'].map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--color-emerald-light)',
                        color: 'var(--color-emerald)',
                        border: '1px solid var(--color-emerald-border)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <CheckCircle2 size={12} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. COMPANY SECTION (Section 27) */}
        {activeTab === 'companies' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-amber)',
                  marginBottom: '0.5rem',
                  display: 'inline-block',
                }}
              >
                Employer Solutions
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                  fontWeight: 800,
                  color: 'var(--nordic-slate)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  marginBottom: '1rem',
                }}
              >
                Find talent through real experience.
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--neutral-600)',
                  marginBottom: '1.5rem',
                }}
              >
                Observe candidate collaboration, problem-solving, and milestone delivery under realistic team conditions before extending full-time hiring offers.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  'Publish internships and live sprint opportunities in minutes',
                  'Launch sponsored projects to evaluate emerging software & engineering talent',
                  'Discover pre-screened students from top universities in Latvia',
                  'Evaluate candidates with standardized rubrics rather than resume buzzwords',
                  'Build junior talent pipelines with high retention and proven competence',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-amber-light)',
                        color: 'var(--color-amber)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--nordic-slate)', fontWeight: 500 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/students"
                className="btn btn-primary btn-lg"
                style={{
                  backgroundColor: 'var(--color-amber)',
                  fontWeight: 700,
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.75rem 1.5rem',
                  textDecoration: 'none',
                }}
              >
                Find talent <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right-Side Product Preview (Section 27 Spec) */}
            <div
              className="a2-card"
              style={{
                backgroundColor: 'var(--surface-white)',
                border: '1.5px solid var(--border-medium)',
                borderRadius: '14px',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--nordic-slate)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Candidate Pipeline
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-amber)' }}>
                  DemoTech Latvia
                </span>
              </div>

              {/* Pipeline funnel tiles */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                {[
                  { label: 'Applied', count: 18, color: 'var(--nordic-slate)' },
                  { label: 'Reviewing', count: 8, color: 'var(--color-blue)' },
                  { label: 'Shortlisted', count: 4, color: 'var(--color-amber)' },
                  { label: 'Selected', count: 1, color: 'var(--color-emerald)' },
                ].map((st, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.75rem 0.5rem',
                      backgroundColor: 'var(--soft-canvas)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: st.color }}>
                      {st.count}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--neutral-500)', fontWeight: 600 }}>
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Candidate Card Preview */}
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--soft-canvas)',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--nordic-slate)', fontSize: '0.9375rem' }}>
                    Artūrs Bērziņš
                  </span>
                  <span
                    style={{
                      fontSize: '0.71875rem',
                      fontWeight: 800,
                      color: 'var(--color-emerald)',
                      backgroundColor: 'var(--color-emerald-light)',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '999px',
                    }}
                  >
                    92% skill match
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginBottom: '0.65rem' }}>
                  Riga Technical University · Computer Science
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.71875rem', fontWeight: 700, color: 'var(--color-emerald)' }}>
                  <ShieldCheck size={13} /> ✓ Verified experience
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. UNIVERSITY SECTION (Section 28) */}
        {activeTab === 'universities' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-emerald)',
                  marginBottom: '0.5rem',
                  display: 'inline-block',
                }}
              >
                Faculty &amp; Administration
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                  fontWeight: 800,
                  color: 'var(--nordic-slate)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  marginBottom: '1rem',
                }}
              >
                Connect learning with industry outcomes.
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--neutral-600)',
                  marginBottom: '1.5rem',
                }}
              >
                Track student progress across accredited company internships, validate ECTS academic coursework, and generate data-backed employability reports for institutional accreditation.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  'Real-time tracking of participating students and placements',
                  'Oversight across multi-department active live projects',
                  'Manage and expand verified industry partner relationships',
                  'Automatic generation of auditable verified experience credentials',
                  'Accreditation-ready graduate placement outcome metrics',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-emerald-light)',
                        color: 'var(--color-emerald)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--nordic-slate)', fontWeight: 500 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/universities"
                className="btn btn-primary btn-lg"
                style={{
                  backgroundColor: 'var(--color-emerald)',
                  fontWeight: 700,
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.75rem 1.5rem',
                  textDecoration: 'none',
                }}
              >
                Institutional Overview <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right-Side Clean Institutional Dashboard Preview (Section 28 Spec) */}
            <div
              className="a2-card"
              style={{
                backgroundColor: 'var(--surface-white)',
                border: '1.5px solid var(--border-medium)',
                borderRadius: '14px',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--nordic-slate)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Institutional Oversight
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-emerald)' }}>
                  Riga Technical University
                </span>
              </div>

              {/* 4 Clean Institutional Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Students Participating', val: '120+' },
                  { label: 'Active Live Projects', val: '14' },
                  { label: 'Industry Partners', val: '32' },
                  { label: 'Verified Outcomes', val: '86' },
                ].map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.85rem',
                      backgroundColor: 'var(--soft-canvas)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-emerald)' }}>
                      {m.val}
                    </div>
                    <div style={{ fontSize: '0.71875rem', color: 'var(--neutral-500)', fontWeight: 600 }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Verified Outcomes list preview */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.5rem' }}>
                  Recent Verified Experiential Placements
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {[
                    { student: 'Artūrs Bērziņš', org: 'DemoTech Latvia', role: 'Full-Stack Project' },
                    { student: 'Elīna Kalniņa', org: 'Baltic Green Labs', role: 'IoT Sensor Sprint' },
                  ].map((p, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.78125rem',
                        padding: '0.55rem 0.75rem',
                        backgroundColor: 'var(--soft-canvas)',
                        borderRadius: '6px',
                        border: '1px solid var(--border-medium)',
                      }}
                    >
                      <span style={{ fontWeight: 700, color: 'var(--nordic-slate)' }}>{p.student}</span>
                      <span style={{ color: 'var(--neutral-500)' }}>{p.org}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
