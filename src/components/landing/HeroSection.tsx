'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Building2,
  GraduationCap,
  Award,
  TrendingUp,
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="landing-hero">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="a2-container">
        <div className="hero-layout-grid">
          {/* Left Column: Brand Copy & Strong European Positioning */}
          <div>
            {/* Eyebrow */}
            <div className="hero-eyebrow">
              <span className="hero-pulse-dot" />
              <span>BALTIC TALENT &amp; ENTERPRISE NETWORK</span>
            </div>

            {/* Headline with vibrant gradient */}
            <h1 className="hero-title">
              Bridge the Gap Between{' '}
              <span className="hero-title-gradient">
                Classroom &amp; Career
              </span>
            </h1>

            {/* Supporting statement */}
            <p className="hero-lead-text">
              Connect with leading companies in Latvia, collaborate on live industry projects, and graduate with verified credentials that get you hired.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="hero-actions">
              <Link
                href="/opportunities"
                className="btn btn-primary btn-lg"
                id="hero-explore-btn"
                style={{
                  backgroundColor: 'var(--baltic-navy)',
                  color: '#FFFFFF',
                  boxShadow: 'var(--shadow-glow-blue)',
                  padding: '0.875rem 1.75rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                }}
              >
                Explore Opportunities <ArrowRight size={17} />
              </Link>
              <Link
                href="/register"
                className="btn btn-secondary btn-lg"
                id="hero-join-btn"
                style={{
                  padding: '0.875rem 1.75rem',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: '10px',
                  fontWeight: 700,
                  color: 'var(--nordic-slate)',
                  backgroundColor: '#FFFFFF',
                }}
              >
                Get Started
              </Link>
            </div>

            {/* Below CTA: Stakeholder Pills */}
            <div className="hero-trust-bar">
              <span className="hero-trust-bullet" style={{ color: 'var(--baltic-navy)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--baltic-blue)' }} />
                <span>Students</span>
              </span>
              <span style={{ color: 'var(--border-medium)' }}>·</span>
              <span className="hero-trust-bullet" style={{ color: 'var(--riga-amber)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--riga-amber)' }} />
                <span>Companies</span>
              </span>
              <span style={{ color: 'var(--border-medium)' }}>·</span>
              <span className="hero-trust-bullet" style={{ color: 'var(--brand-emerald)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--brand-emerald)' }} />
                <span>Universities</span>
              </span>
            </div>
          </div>

          {/* Right Column: Unified, Realistic European Product Dashboard UI */}
          <div className="hero-product-stage">
            <div className="hero-product-ambient" aria-hidden="true" />

            <div className="hero-product-window">
              {/* Product Top Header Bar */}
              <div className="hero-product-bar">
                <div className="hero-product-controls">
                  <div className="hero-product-ctrl ctrl-red" />
                  <div className="hero-product-ctrl ctrl-yellow" />
                  <div className="hero-product-ctrl ctrl-green" />
                </div>
                <div className="hero-product-status">
                  <span className="hero-pulse-dot" style={{ width: '7px', height: '7px' }} />
                  <span>A2 REPOSITORIES · RIGA / EU</span>
                </div>
              </div>

              {/* Product Content Body */}
              <div className="hero-product-content">
                {/* 1. Verified Student Profile Bar */}
                <div className="hero-candidate-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                        boxShadow: '0 2px 8px rgba(30, 58, 138, 0.25)',
                      }}
                    >
                      AB
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
                          Artūrs Bērziņš
                        </span>
                        <ShieldCheck size={14} color="var(--brand-emerald)" />
                      </div>
                      <div style={{ fontSize: '0.71875rem', color: 'var(--neutral-500)' }}>
                        RTU Computer Science · 4th Semester
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.71875rem', fontWeight: 700, color: 'var(--brand-emerald)' }}>
                      Profile Strength: 94%
                    </div>
                    <div
                      style={{
                        width: '100px',
                        height: '5px',
                        backgroundColor: '#CBD5E1',
                        borderRadius: '999px',
                        overflow: 'hidden',
                        marginTop: '0.3rem',
                      }}
                    >
                      <div
                        style={{
                          width: '94%',
                          height: '100%',
                          background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
                          borderRadius: '999px',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Main Recommended Opportunity Card */}
                <div className="hero-opp-card-panel">
                  {/* Top Opportunity Header & Match Score */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--baltic-navy)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        backgroundColor: 'var(--baltic-navy-light)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid #BFDBFE',
                      }}
                    >
                      <Sparkles size={12} color="var(--baltic-navy)" /> Recommended Opportunity
                    </span>
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
                        color: 'var(--brand-emerald-dark)',
                        border: '1.5px solid var(--brand-emerald-border)',
                        fontSize: '0.78125rem',
                        fontWeight: 800,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 2px 6px rgba(5, 150, 105, 0.1)',
                      }}
                    >
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--brand-emerald)' }} />
                      92% Match
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div style={{ marginBottom: '0.85rem' }}>
                    <h3
                      style={{
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        color: 'var(--nordic-slate)',
                        letterSpacing: '-0.02em',
                        marginBottom: '0.35rem',
                      }}
                    >
                      Full-Stack Web Developer
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, color: 'var(--baltic-navy)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Building2 size={14} /> DemoTech Latvia
                      </span>
                      <span style={{ color: 'var(--border-medium)' }}>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--neutral-600)' }}>
                        <MapPin size={13} color="var(--neutral-400)" /> Riga · Hybrid
                      </span>
                      <span style={{ color: 'var(--border-medium)' }}>•</span>
                      <span
                        style={{
                          fontWeight: 700,
                          color: '#047857',
                          backgroundColor: '#ECFDF5',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '4px',
                          border: '1px solid #A7F3D0',
                        }}
                      >
                        €1,400 / mo
                      </span>
                    </div>
                  </div>

                  {/* 3 Detailed Match Progress Indicators */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '0.75rem',
                      backgroundColor: 'var(--soft-canvas)',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--nordic-slate)', marginBottom: '0.25rem' }}>
                        <span>Skills Fit</span>
                        <span style={{ color: 'var(--baltic-blue)', fontWeight: 700 }}>96%</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: '96%', height: '100%', backgroundColor: 'var(--baltic-blue)' }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--nordic-slate)', marginBottom: '0.25rem' }}>
                        <span>Education</span>
                        <span style={{ color: 'var(--brand-emerald)', fontWeight: 700 }}>92%</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: '92%', height: '100%', backgroundColor: 'var(--brand-emerald)' }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--nordic-slate)', marginBottom: '0.25rem' }}>
                        <span>Availability</span>
                        <span style={{ color: 'var(--riga-amber)', fontWeight: 700 }}>90%</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: '90%', height: '100%', backgroundColor: 'var(--riga-amber)' }} />
                      </div>
                    </div>
                  </div>

                  {/* Skills Badges */}
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--neutral-400)', letterSpacing: '0.04em', marginBottom: '0.45rem' }}>
                      Required Competencies
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {[
                        { name: 'React', bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' },
                        { name: 'Node.js', bg: '#F0FDF4', color: '#166534', border: '#BBF7D0' },
                        { name: 'PostgreSQL', bg: '#F5F3FF', color: '#5B21B6', border: '#DDD6FE' },
                        { name: 'TypeScript', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
                      ].map((skill) => (
                        <span
                          key={skill.name}
                          style={{
                            backgroundColor: skill.bg,
                            border: `1px solid ${skill.border}`,
                            color: skill.color,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.25rem 0.6rem',
                            borderRadius: '6px',
                          }}
                        >
                          ✓ {skill.name}
                        </span>
                      ))}
                      <span
                        style={{
                          backgroundColor: 'var(--brand-emerald-light)',
                          border: '1px solid var(--brand-emerald-border)',
                          color: 'var(--brand-emerald-dark)',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                        }}
                      >
                        ✓ Verified Skills
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Official Verified Credential Strip */}
                <div className="hero-credential-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={17} color="var(--brand-emerald)" />
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--nordic-slate)' }}>
                        A2 Verified Experience · ID: A2-LV-2026-X89K
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--neutral-500)' }}>
                        DemoTech Latvia Supervised Milestone Evaluated
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/opportunities"
                    style={{
                      color: 'var(--baltic-navy)',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
