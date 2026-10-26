import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function StudentsPage() {
  const benefits = [
    {
      title: 'Real Projects, Not Just Mock Exercises',
      desc: 'Collaborate directly with Latvian tech companies like DemoTech Latvia and Baltic Green Labs on live problems.',
    },
    {
      title: 'Cryptographic Skill Verification',
      desc: 'Convert academic coursework into verified industry credentials that substantiate your practical mastery.',
    },
    {
      title: 'Explainable Transparent Matching',
      desc: 'Know exactly why an opportunity fits you with a transparent percentage breakdown across skills, interests, and location.',
    },
    {
      title: 'Stipends & Fair Compensation',
      desc: 'Access paid internships and sponsored innovation challenges funded in Euros (€) across Riga and the Baltic region.',
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
              color: 'var(--baltic-navy)',
              backgroundColor: 'var(--baltic-navy-light)',
              padding: '0.25rem 0.85rem',
              borderRadius: '999px',
              border: '1px solid #BFDBFE',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            For Students & Graduates · Latvia & Baltics
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
            Turn Academic Potential Into Verified Career Experience
          </h1>
          <p style={{ color: 'var(--neutral-500)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Gain real-world experience through live sprint projects, earn tamper-proof verified skill credentials, and connect directly with top tech employers in Latvia and Europe.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/register?role=STUDENT"
              className="btn btn-primary"
              style={{
                backgroundColor: 'var(--baltic-navy)',
                boxShadow: 'var(--shadow-glow-blue)',
                fontWeight: 700,
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
              }}
            >
              Create Free Student Account <ArrowRight size={15} />
            </Link>
            <Link
              href="/opportunities"
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
              Browse Opportunities
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
                    backgroundColor: 'var(--baltic-navy-light)',
                    border: '1px solid #BFDBFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={20} color="var(--baltic-navy)" />
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

        {/* University Partners Callout */}
        <div
          className="a2-card"
          style={{
            padding: '2.5rem',
            textAlign: 'center',
            backgroundColor: 'var(--surface-white)',
            border: '1.5px solid var(--border-medium)',
            borderTop: '4px solid var(--baltic-navy)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-elevation)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--nordic-slate)', marginBottom: '0.65rem' }}>
            Supported Across Latvian Institutions
          </h2>
          <p style={{ color: 'var(--neutral-500)', maxWidth: '600px', margin: '0 auto 1.75rem auto', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            Designed for students of Riga Technical University (RTU), University of Latvia (LU), Riga Business School (RBS), and accredited colleges across the Baltic region.
          </p>
          <Link
            href="/opportunities"
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
            Explore Active Opportunities →
          </Link>
        </div>
      </div>
    </div>
  );
}

