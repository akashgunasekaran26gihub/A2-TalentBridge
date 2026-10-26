import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Academic Registration & Profile Formulation',
      actor: 'Student & University',
      desc: 'Students create their profile with verified Latvian university affiliation (RTU, University of Latvia, RBS, etc.). Skills are declared and baseline profile completeness is evaluated transparently.',
    },
    {
      num: '02',
      title: 'Opportunity Discovery & Explainable Matching',
      actor: 'Student & Company',
      desc: 'Students discover curated internships, live industry projects, and sponsor challenges. A 5-factor transparent matching algorithm ranks compatibility based on skills, interests, and capacity.',
    },
    {
      num: '03',
      title: 'Collaborative Project Execution & Sprints',
      actor: 'Student Team & Industry Mentor',
      desc: 'Selected candidates form multidisciplinary squads. Teams execute milestones, submit deliverables, and communicate directly with assigned company mentors inside the project workspace.',
    },
    {
      num: '04',
      title: 'Rubric Evaluation & Verified Experience Generation',
      actor: 'Company Mentor & Faculty',
      desc: 'Upon milestone completion, mentors grade performance across technical, delivery, and teamwork criteria. Successful outcomes generate immutable Verified Experience credentials.',
    },
    {
      num: '05',
      title: 'Direct Employment & Career Acceleration',
      actor: 'All Stakeholders',
      desc: 'Employers recruit validated high-performing students directly from completed projects. Universities track real outcome analytics for European accreditation.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '3.5rem 0 5rem 0' }}>
      <div className="a2-container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="tag tag-blue" style={{ marginBottom: '0.75rem' }}>
            The A2 TalentBridge Architecture
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-navy)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            How A2 TalentBridge Works
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
            A structured, 5-stage experiential learning lifecycle designed specifically for the Latvian and European labor markets.
          </p>
        </div>

        {/* Step-by-Step Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3.5rem' }}>
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="a2-card"
              style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                padding: '1.75rem',
              }}
            >
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--color-blue)',
                  backgroundColor: 'var(--color-blue-light)',
                  padding: '0.5rem 0.875rem',
                  borderRadius: 'var(--radius-button)',
                  lineHeight: 1,
                  border: '1px solid var(--color-blue-border)',
                }}
              >
                {s.num}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                    {s.title}
                  </h3>
                  <span className="tag tag-neutral">{s.actor}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.875rem' }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="a2-card"
          style={{
            padding: '2.5rem',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
            Ready to Experience the Bridge?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1.75rem' }}>
            Join our growing community of Latvian students, universities, and leading tech employers.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.875rem', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn btn-primary btn-sm">
              Register Now <ArrowRight size={14} />
            </Link>
            <Link href="/opportunities" className="btn btn-secondary btn-sm">
              Explore Live Opportunities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

