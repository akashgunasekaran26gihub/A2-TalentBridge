import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

export default function CompaniesPage() {
  const benefits = [
    {
      title: 'Evaluate Talent in Live Action',
      desc: 'Observe how candidates collaborate, solve problems, and deliver under realistic milestone constraints before making full-time hiring offers.',
    },
    {
      title: 'Sponsored Innovation Challenges',
      desc: 'Launch 4-to-8 week challenges to crowdsource solutions for green transformation, software engineering, and business optimization.',
    },
    {
      title: 'Eliminate Recruitment Friction',
      desc: 'Bypass generic job boards and agency headhunter fees by engaging directly with pre-screened students from top universities.',
    },
    {
      title: 'Structured Rubric Evaluations',
      desc: 'Provide standardized milestone feedback that generates immutable credentials and builds your company employer brand.',
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
              color: 'var(--riga-amber)',
              backgroundColor: 'var(--riga-amber-light)',
              padding: '0.25rem 0.85rem',
              borderRadius: '999px',
              border: '1px solid var(--riga-amber-border)',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            For Industry & Employers · Riga & Baltics
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
            Build Your Emerging Talent Pipeline in Latvia
          </h1>
          <p style={{ color: 'var(--neutral-500)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Connect with vetted university talent through live sprint challenges, accredited internships, and mentor-evaluated deliverables. Evaluate demonstrable capability before making hire offers.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/register?role=COMPANY"
              className="btn btn-primary"
              style={{
                backgroundColor: 'var(--riga-amber)',
                boxShadow: '0 4px 16px rgba(217, 119, 6, 0.25)',
                fontWeight: 700,
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
              }}
            >
              Register Employer Account <ArrowRight size={15} />
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
              Sign In to Company Workspace
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
                    backgroundColor: 'var(--riga-amber-light)',
                    border: '1px solid var(--riga-amber-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Building2 size={20} color="var(--riga-amber)" />
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

        {/* Employer CTA */}
        <div
          className="a2-card"
          style={{
            padding: '2.5rem',
            textAlign: 'center',
            backgroundColor: 'var(--surface-white)',
            border: '1.5px solid var(--border-medium)',
            borderTop: '4px solid var(--riga-amber)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-elevation)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--nordic-slate)', marginBottom: '0.65rem' }}>
            Ready to post your first project challenge or internship?
          </h2>
          <p style={{ color: 'var(--neutral-500)', maxWidth: '600px', margin: '0 auto 1.75rem auto', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            Join leading tech employers across Riga, Liepāja, and the Baltic region sourcing premier technical and business talent evaluated on real work.
          </p>
          <Link
            href="/register?role=COMPANY"
            className="btn btn-primary"
            style={{
              backgroundColor: 'var(--riga-amber)',
              fontWeight: 700,
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
            }}
          >
            Get Started as an Employer <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

