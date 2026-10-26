import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  accentColor?: string;
}

export default function MetricCard({
  label,
  value,
  subtext,
  accentColor = 'var(--color-navy)',
}: MetricCardProps) {
  return (
    <div
      className="a2-metric-card"
      style={{
        backgroundColor: 'var(--surface-white)',
        border: '1.5px solid var(--border-medium)',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        boxShadow: 'var(--shadow-subtle)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <span
        style={{
          fontSize: '0.71875rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--neutral-500)',
        }}
      >
        {label}
      </span>
      <div
        style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: accentColor,
          lineHeight: 1.15,
          marginTop: '0.35rem',
          marginBottom: subtext ? '0.25rem' : 0,
        }}
      >
        {value}
      </div>
      {subtext && (
        <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
          {subtext}
        </span>
      )}
    </div>
  );
}
