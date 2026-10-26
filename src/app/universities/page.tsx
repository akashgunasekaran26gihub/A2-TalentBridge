import React from 'react';
import Link from 'next/link';
import { ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export default function UniversitiesPage() {
  const benefits = [
    {
      title: 'Real-Time Experiential Learning Monitoring',
      desc: 'Track internship placements, live project milestones, and student deliverables across faculty departments with automated oversight.',
    },
    {
      title: 'Auditable Graduate Employability Metrics',
      desc: 'Generate data-backed employment outcome reports directly from verified employer records to support European accreditation.',
    },
    {
      title: 'Direct Corporate Partnership Management',
      desc: 'Foster deep industry collaboration with Latvian tech firms and European research consortiums on a single transparent platform.',
    },
    {
      title: 'Institutional Verification Authority',
      desc: 'Certify official student enrollments and academic credentials, ensuring only authenticated degree candidates access premier roles.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '3.5rem 0 5rem 0' }}>
      <div className="a2-container" style={{ maxWidth: '960px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--brand-emerald)',
              backgroundColor: 'var(--brand-emerald-light)',
              padding: '0.25rem 0.85rem',
              borderRadius: '999px',
              border: '1px solid var(--brand-emerald-border)',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            For Higher Education & Faculty · European Standards
          </span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--nordic-slate)',
              letterSpacing: '-0.025em',
              marginBottom: '0.85rem',
              lineHeight: 1.2,
            }}
          >
            Connect Academic Curricula with Auditable Industry Outcomes
          </h1>
          <p style={{ color: 'var(--neutral-500)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Empower faculty coordinators to monitor student placements in real-time, validate ECTS credits for industry coursework, and track transparent employability analytics for institutional accreditation.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/register?role=UNIVERSITY"
              className="btn btn-primary"
              style={{
                backgroundColor: 'var(--brand-emerald)',
                boxShadow: '0 4px 16px rgba(5, 150, 105, 0.25)',
                fontWeight: 700,
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
              }}
            >
              Institutional Registration <ArrowRight size={15} />
            </Link>
            <Link
              href="/login"
              className="btn btn-secondary"
              style={{
                backgroundColor: 'var(--surface-white)',
                borderColor: 'var(--border-medium)',
                color: 'var(--nordic-slate)',
                fontWeight: 700,
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
              }}
            >
              Faculty Portal Sign In
            </Link>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid-cols-2" style={{ gap: '1.25rem', marginBottom: '3.5rem' }}>
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="a2-card"
              style={{
                padding: '1.75rem',
                backgroundColor: 'var(--surface-white)',
                border: '1.5px solid var(--border-medium)',
                borderRadius: '14px',
                boxShadow: 'var(--shadow-elevation)',
                transition: 'transform 200ms ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--brand-emerald-light)',
                    border: '1px solid var(--brand-emerald-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Award size={20} color="var(--brand-emerald)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nordic-slate)', marginBottom: '0.4rem', lineHeight: 1.35 }}>
                    {b.title}
                  </h3>
                  <p style={{ color: 'var(--neutral-500)', lineHeight: 1.6, fontSize: '0.875rem' }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accredited Institutions */}
        <div
          className="a2-card"
          style={{
            padding: '2.5rem',
            textAlign: 'center',
            backgroundColor: 'var(--surface-white)',
            border: '1.5px solid var(--border-medium)',
            borderTop: '4px solid var(--brand-emerald)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-elevation)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--nordic-slate)', marginBottom: '0.65rem' }}>
            Institutional Network in Latvia
          </h2>
          <p style={{ color: 'var(--neutral-500)', maxWidth: '600px', margin: '0 auto 1.75rem auto', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            Join University of Latvia (LU), Riga Technical University (RTU), and Riga Business School (RBS) in advancing student career readiness and verifiable experiential learning.
          </p>
          <Link
            href="/contact"
            className="btn btn-secondary"
            style={{
              backgroundColor: 'var(--soft-canvas)',
              borderColor: 'var(--border-medium)',
              color: 'var(--nordic-slate)',
              fontWeight: 700,
              padding: '0.65rem 1.35rem',
              borderRadius: '9px',
            }}
          >
            Request Institutional Partnership Briefing →
          </Link>
        </div>
      </div>
    </div>
  );
}

