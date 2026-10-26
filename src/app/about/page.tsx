import React from 'react';
import Link from 'next/link';
import { Target, Compass, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '3.5rem 0 5rem 0' }}>
      <div className="a2-container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="tag tag-blue" style={{ marginBottom: '0.75rem' }}>
            Mission & Identity
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-navy)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            About A2 TalentBridge
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto' }}>
            Bridging Talent, Education & Opportunity. From Education to Experience to Employment.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="a2-card" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.875rem', color: 'var(--color-navy)' }}>
            What is A2 TalentBridge?
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.9375rem' }}>
            <strong>A2</strong> stands for <strong>Academia to Industry</strong>. <strong>TalentBridge</strong> represents the robust institutional bridge connecting students, universities, and commercial enterprises.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
            A2 TalentBridge is neither a generic job board nor a superficial social network. It is an experiential learning ecosystem architected specifically for Latvia and the European Union, ensuring that emerging professionals graduate not only with diplomas, but with verifiable project achievements.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ borderLeft: '3px solid var(--color-blue)', paddingLeft: '1rem' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--color-navy)', fontSize: '0.9375rem' }}>Target Market</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Latvia (Riga, Liepāja, Jelgava, Daugavpils, Valmiera) with Baltic and European Union expansion capability.
              </p>
            </div>
            <div style={{ borderLeft: '3px solid var(--color-emerald)', paddingLeft: '1rem' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--color-navy)', fontSize: '0.9375rem' }}>Core Philosophy</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Skills must be demonstrated and evaluated in action before verification.
              </p>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid-cols-3" style={{ marginBottom: '2.5rem' }}>
          <div className="a2-card" style={{ padding: '1.5rem' }}>
            <Target size={24} color="var(--color-blue)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-navy)' }}>Verified Skills</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Eliminate resume embellishment through mentor-certified project rubrics.
            </p>
          </div>
          <div className="a2-card" style={{ padding: '1.5rem' }}>
            <Compass size={24} color="var(--color-amber)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-navy)' }}>Transparent Fit</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Explainable 5-factor matching algorithm keeping candidates informed.
            </p>
          </div>
          <div className="a2-card" style={{ padding: '1.5rem' }}>
            <ShieldCheck size={24} color="var(--color-emerald)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-navy)' }}>European Standards</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Built with GDPR data minimization, strict RBAC, and timezone awareness (Europe/Riga).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

