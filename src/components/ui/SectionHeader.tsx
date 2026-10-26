import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  maxWidth?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  maxWidth = '720px',
}: SectionHeaderProps) {
  return (
    <div
      style={{
        textAlign: centered ? 'center' : 'left',
        maxWidth: centered ? maxWidth : '100%',
        margin: centered ? `0 auto 2.5rem auto` : `0 0 1.75rem 0`,
      }}
    >
      {eyebrow && (
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-blue)',
            display: 'inline-block',
            marginBottom: '0.5rem',
          }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
          fontWeight: 800,
          color: 'var(--nordic-slate)',
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          marginBottom: description ? '0.65rem' : 0,
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            color: 'var(--neutral-500)',
            fontSize: '1rem',
            lineHeight: 1.6,
            maxWidth: centered ? '640px' : '720px',
            margin: centered ? '0 auto' : undefined,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
