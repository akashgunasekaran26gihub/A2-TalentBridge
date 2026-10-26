import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function FinalCtaSection() {
  return (
    <section className="final-cta-block">
      <div className="final-cta-pattern" aria-hidden="true" />
      <div className="a2-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '999px',
              padding: '0.35rem 0.9rem',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Sparkles size={14} color="#FDE68A" /> European Talent Ecosystem
          </div>

          {/* Headline */}
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.6vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              marginBottom: '0.85rem',
            }}
          >
            Your next opportunity starts with experience.
          </h2>

          {/* Supporting Copy */}
          <p
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '1.75rem',
            }}
          >
            Whether you&apos;re building your career, developing talent or connecting education with industry, A2 TalentBridge brings the ecosystem together.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1.75rem',
            }}
          >
            <Link
              href="/register"
              className="btn btn-lg"
              id="final-cta-register"
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--baltic-navy)',
                fontWeight: 800,
                padding: '0.95rem 2.25rem',
                borderRadius: '10px',
                boxShadow: '0 10px 28px -4px rgba(0, 0, 0, 0.35)',
                fontSize: '1rem',
              }}
            >
              Join A2 TalentBridge <ArrowRight size={17} />
            </Link>
            <Link
              href="/opportunities"
              className="btn btn-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                fontWeight: 700,
                padding: '0.95rem 2.25rem',
                borderRadius: '10px',
                fontSize: '1rem',
              }}
            >
              Explore Opportunities
            </Link>
          </div>

          {/* Trust Footnote */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              fontSize: '0.84375rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
            }}
          >
            <ShieldCheck size={16} color="#34D399" />
            <span>GDPR-Aware · ECTS Academic Alignment · Riga, Latvia &amp; European Union</span>
          </div>
        </div>
      </div>
    </section>
  );
}
