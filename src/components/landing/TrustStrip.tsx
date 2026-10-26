import React from 'react';
import { Landmark, Building2, ShieldCheck, Award } from 'lucide-react';

export default function TrustStrip() {
  const partners = [
    { name: 'Riga Technical University', type: 'Academic Partner', icon: Landmark },
    { name: 'University of Latvia', type: 'Academic Partner', icon: Landmark },
    { name: 'DemoTech Latvia', type: 'Enterprise Sponsor', icon: Building2 },
    { name: 'Baltic Green Labs', type: 'Innovation Lab', icon: Building2 },
    { name: 'TechHub Riga', type: 'Community Partner', icon: Award },
  ];

  return (
    <section
      style={{
        padding: '2.5rem 0',
        backgroundColor: 'var(--surface-white)',
        borderBottom: '1px solid var(--border-medium)',
      }}
    >
      <div className="a2-container">
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--neutral-400)',
            marginBottom: '1.5rem',
          }}
        >
          Connecting Academic Excellence with Industry Leaders Across Latvia &amp; the Baltics
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem 2.5rem',
          }}
        >
          {partners.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--soft-canvas)',
                  border: '1px solid var(--border-medium)',
                  opacity: 0.9,
                  transition: 'opacity 150ms ease, transform 150ms ease',
                }}
              >
                <Icon size={16} color="var(--color-blue)" />
                <div>
                  <div style={{ fontSize: '0.84375rem', fontWeight: 700, color: 'var(--nordic-slate)' }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--neutral-400)', fontWeight: 500 }}>
                    {p.type}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
