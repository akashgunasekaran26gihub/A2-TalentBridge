'use client';

import React, { useState } from 'react';

interface ActivityBarItem {
  label: string;
  value: number;
}

interface ActivitySparklineProps {
  title?: string;
  subtitle?: string;
  data?: ActivityBarItem[];
  accentColor?: string;
  metricLabel?: string;
}

export default function ActivitySparkline({
  title = 'Weekly Sprint Activity',
  subtitle = 'Milestone deliverables & contributions',
  data = [
    { label: 'Mon', value: 35 },
    { label: 'Tue', value: 65 },
    { label: 'Wed', value: 45 },
    { label: 'Thu', value: 90 },
    { label: 'Fri', value: 75 },
    { label: 'Sat', value: 30 },
    { label: 'Sun', value: 50 },
  ],
  accentColor = 'var(--color-blue)',
  metricLabel = 'tasks completed',
}: ActivitySparklineProps) {
  const [activeItem, setActiveItem] = useState<ActivityBarItem | null>(null);
  const maxValue = Math.max(...data.map((d) => d.value), 100);

  return (
    <div
      className="interactive-card a2-card anim-fade-in"
      style={{
        backgroundColor: 'var(--surface-white)',
        border: '1.5px solid var(--border-medium)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-subtle)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: '0 0 0.2rem 0' }}>
            {title}
          </h3>
          <p style={{ fontSize: '0.78125rem', color: 'var(--neutral-500)', margin: 0 }}>
            {subtitle}
          </p>
        </div>

        {activeItem ? (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: accentColor,
              backgroundColor: 'var(--soft-canvas)',
              border: '1px solid var(--border-medium)',
              padding: '0.2rem 0.55rem',
              borderRadius: '6px',
            }}
          >
            {activeItem.label}: {activeItem.value}% {metricLabel}
          </span>
        ) : (
          <span style={{ fontSize: '0.71875rem', color: 'var(--neutral-400)', fontWeight: 600 }}>
            Hover bars for data
          </span>
        )}
      </div>

      {/* SVG Bar Chart with subtle baseline */}
      <div style={{ height: '95px', display: 'flex', alignItems: 'flex-end', gap: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-medium)' }}>
        {data.map((item, idx) => {
          const heightPercent = Math.round((item.value / maxValue) * 100);
          const isSelected = activeItem?.label === item.label;

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-end',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setActiveItem(item)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <div
                className="sparkline-bar"
                style={{
                  width: '100%',
                  maxWidth: '28px',
                  height: `${heightPercent}%`,
                  backgroundColor: isSelected ? 'var(--nordic-slate)' : accentColor,
                  borderRadius: '6px 6px 2px 2px',
                  opacity: isSelected ? 1 : 0.85,
                  boxShadow: isSelected ? `0 4px 12px ${accentColor}44` : 'none',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Bar Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginTop: '0.45rem', fontSize: '0.6875rem', color: 'var(--neutral-500)', fontWeight: 600, textAlign: 'center' }}>
        {data.map((item, idx) => (
          <div key={idx} style={{ flex: 1 }}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
