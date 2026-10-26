'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, Sparkles } from 'lucide-react';

interface MatchBreakdownItem {
  label: string;
  rating: string;
  score?: number;
}

interface MatchScoreProps {
  score?: number;
  breakdown?: MatchBreakdownItem[];
  showDetailsButton?: boolean;
}

export default function MatchScore({
  score = 92,
  breakdown = [
    { label: 'Skills', rating: 'Strong', score: 95 },
    { label: 'Education', rating: 'Good', score: 90 },
    { label: 'Interests', rating: 'Strong', score: 92 },
    { label: 'Location', rating: 'Compatible', score: 100 },
    { label: 'Availability', rating: 'Compatible', score: 85 },
  ],
  showDetailsButton = true,
}: MatchScoreProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="a2-match-score-card"
      style={{
        backgroundColor: 'var(--surface-white)',
        border: '1.5px solid var(--border-medium)',
        borderRadius: '12px',
        padding: '1.25rem',
      }}
    >
      {/* Top Header: Score & Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
          <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-emerald)', lineHeight: 1 }}>
            {score}%
          </span>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Match
          </span>
        </div>

        <span
          style={{
            fontSize: '0.71875rem',
            fontWeight: 800,
            color: 'var(--color-blue)',
            backgroundColor: 'var(--color-blue-light)',
            padding: '0.2rem 0.55rem',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <Sparkles size={11} /> Explainable Fit
        </span>
      </div>

      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--nordic-slate)', marginBottom: '0.65rem' }}>
        Why this fits
      </div>

      {/* Structured transparent criteria */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {breakdown.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.8125rem',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--neutral-600)' }}>
              <span
                style={{
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-emerald-light)',
                  color: 'var(--color-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                <Check size={10} strokeWidth={3} />
              </span>
              {item.label}
            </span>
            <span style={{ fontWeight: 700, color: 'var(--nordic-slate)', fontSize: '0.75rem' }}>
              {item.rating}
            </span>
          </div>
        ))}
      </div>

      {/* Expandable details */}
      {showDetailsButton && (
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-hairline)' }}>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-blue)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: 0,
            }}
          >
            {expanded ? 'Hide weighting formula' : 'View match details'}
            <ChevronDown size={13} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 150ms ease' }} />
          </button>

          {expanded && (
            <div
              style={{
                marginTop: '0.65rem',
                padding: '0.65rem',
                backgroundColor: 'var(--soft-canvas)',
                borderRadius: '8px',
                fontSize: '0.71875rem',
                color: 'var(--neutral-600)',
                lineHeight: 1.5,
              }}
            >
              Skills (40%) + Education (20%) + Interests (15%) + Location (15%) + Availability (10%). All calculations auditable under EU AI transparency guidelines.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
