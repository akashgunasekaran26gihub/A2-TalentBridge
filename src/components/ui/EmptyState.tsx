'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
}: EmptyStateProps) {
  return (
    <div
      className="a2-empty-state"
      style={{
        backgroundColor: 'var(--surface-white)',
        border: '1.5px solid var(--border-medium)',
        borderRadius: '12px',
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}
    >
      {Icon && (
        <div style={{ margin: '0 auto 1rem auto', color: 'var(--neutral-400)', display: 'flex', justifyContent: 'center' }}>
          <Icon size={38} strokeWidth={1.5} />
        </div>
      )}
      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--nordic-slate)',
          marginBottom: '0.35rem',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: 'var(--neutral-500)',
          fontSize: '0.875rem',
          maxWidth: '420px',
          margin: '0 auto 1.25rem auto',
          lineHeight: 1.55,
        }}
      >
        {description}
      </p>

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="btn btn-primary btn-sm"
          style={{
            backgroundColor: 'var(--color-blue)',
            fontWeight: 700,
            borderRadius: '8px',
            padding: '0.55rem 1.15rem',
          }}
        >
          {actionText}
        </Link>
      )}

      {actionText && !actionHref && onActionClick && (
        <button
          type="button"
          onClick={onActionClick}
          className="btn btn-primary btn-sm"
          style={{
            backgroundColor: 'var(--color-blue)',
            fontWeight: 700,
            borderRadius: '8px',
            padding: '0.55rem 1.15rem',
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
