import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export interface MetricCardProps {
  title?: string;
  label?: string;
  value: string | number;
  subtitle?: string;
  subtext?: string;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  icon?: LucideIcon | React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  accentColor?: string;
}

export default function MetricCard({
  title,
  label,
  value,
  subtitle,
  subtext,
  trend,
  icon: Icon,
  accentColor = 'var(--nordic-slate)',
}: MetricCardProps) {
  const displayTitle = title || label || '';
  const displaySubtitle = subtitle || subtext || '';

  return (
    <div
      className="a2-metric-card a2-card"
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span
          style={{
            fontSize: '0.71875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--neutral-500)',
          }}
        >
          {displayTitle}
        </span>
        {Icon && (
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--soft-canvas)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--neutral-500)',
            }}
          >
            <Icon size={16} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginTop: '0.2rem', marginBottom: displaySubtitle ? '0.25rem' : 0 }}>
        <span
          style={{
            fontSize: '1.85rem',
            fontWeight: 800,
            color: accentColor,
            lineHeight: 1.15,
          }}
        >
          {value}
        </span>

        {trend && (
          <span
            style={{
              fontSize: '0.71875rem',
              fontWeight: 700,
              color: trend.isPositive ? 'var(--color-emerald)' : 'var(--color-red)',
              backgroundColor: trend.isPositive ? 'var(--color-emerald-light)' : 'var(--color-red-light)',
              padding: '0.15rem 0.45rem',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem',
            }}
          >
            {trend.isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {trend.isPositive ? `+${trend.value}%` : `-${trend.value}%`}
          </span>
        )}
      </div>

      {displaySubtitle && (
        <span style={{ fontSize: '0.78125rem', color: 'var(--neutral-500)' }}>
          {displaySubtitle}
        </span>
      )}
    </div>
  );
}
