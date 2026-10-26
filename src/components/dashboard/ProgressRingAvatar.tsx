'use client';

import React from 'react';
import { Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';

interface ProgressRingAvatarProps {
  name?: string;
  initials?: string;
  role?: string;
  organization?: string;
  percentage?: number;
  greeting?: string;
  subtext?: string;
  email?: string;
  accentColor?: string;
  // Aliases for compatibility
  userName?: string;
  userRole?: string;
  completionPercentage?: number;
}

export default function ProgressRingAvatar({
  name,
  initials,
  role,
  organization = 'TalentBridge Latvia',
  percentage,
  greeting = 'Good Morning',
  subtext = 'Continue your project milestones to reach your target!',
  email,
  accentColor = 'var(--color-blue)',
  userName,
  userRole,
  completionPercentage,
}: ProgressRingAvatarProps) {
  const safeName = name || userName || 'User';
  const safeInitials =
    initials ||
    (safeName
      ? safeName
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : 'TB');
  const safePercentage = Math.min(100, Math.max(0, percentage ?? completionPercentage ?? 85));
  const firstName = safeName.split(' ')[0] || safeName;

  const radius = 54;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (safePercentage / 100) * circumference;

  return (
    <div
      className="interactive-card a2-card anim-fade-in"
      style={{
        backgroundColor: 'var(--surface-white)',
        border: '1.5px solid var(--border-medium)',
        borderRadius: '16px',
        padding: '1.75rem',
        textAlign: 'center',
        boxShadow: 'var(--shadow-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Circular Progress Ring */}
      <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 1.25rem auto' }}>
        <svg height="130" width="130" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background track */}
          <circle
            stroke="var(--border-medium)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="65"
            cy="65"
          />
          {/* Animated active stroke */}
          <circle
            stroke={accentColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            className="progress-ring-circle"
            r={normalizedRadius}
            cx="65"
            cy="65"
          />
        </svg>

        {/* Center Avatar */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: accentColor,
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 800,
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
          }}
        >
          {safeInitials}
        </div>

        {/* Percentage badge floating on ring */}
        <div
          style={{
            position: 'absolute',
            bottom: '4px',
            right: '4px',
            backgroundColor: accentColor,
            color: '#FFFFFF',
            fontSize: '0.71875rem',
            fontWeight: 800,
            padding: '0.2rem 0.5rem',
            borderRadius: '999px',
            border: '2px solid var(--surface-white)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
          }}
        >
          {safePercentage}%
        </div>
      </div>

      {/* Greeting and Identity */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: '0 0 0.35rem 0' }}>
        {greeting}, {firstName} 🔥
      </h3>
      <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', margin: '0 0 0.85rem 0', lineHeight: 1.5 }}>
        {subtext}
      </p>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--color-emerald)',
          backgroundColor: 'var(--color-emerald-light)',
          border: '1px solid var(--color-emerald-border)',
          padding: '0.2rem 0.65rem',
          borderRadius: '999px',
          marginBottom: '1rem',
        }}
      >
        <ShieldCheck size={13} /> {organization}
      </div>

      {email && (
        <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', borderTop: '1px solid var(--border-hairline)', paddingTop: '0.75rem' }}>
          {email}
        </div>
      )}
    </div>
  );
}
