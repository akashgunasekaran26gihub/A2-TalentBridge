import React from 'react';
import { Check } from 'lucide-react';

interface ApplicationTimelineProps {
  currentStatus: 'Submitted' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected' | string;
}

const STEPS = ['Applied', 'Under Review', 'Interview', 'Selected'];

export default function ApplicationTimeline({ currentStatus }: ApplicationTimelineProps) {
  // Normalize currentStatus to step index
  let activeIndex = 0;
  if (currentStatus === 'Under Review') activeIndex = 1;
  else if (currentStatus === 'Shortlisted' || currentStatus === 'Interview') activeIndex = 2;
  else if (currentStatus === 'Selected') activeIndex = 3;

  const isRejected = currentStatus === 'Rejected';

  return (
    <div className="a2-application-timeline" style={{ width: '100%', margin: '0.75rem 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Background track line */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '14px',
            right: '14px',
            height: '2px',
            backgroundColor: 'var(--border-medium)',
            zIndex: 0,
          }}
        />

        {/* Progress fill line */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '14px',
            width: `${(activeIndex / (STEPS.length - 1)) * 90}%`,
            height: '2px',
            backgroundColor: isRejected ? 'var(--color-red)' : 'var(--color-blue)',
            zIndex: 1,
            transition: 'width 300ms ease',
          }}
        />

        {STEPS.map((step, idx) => {
          const isCompleted = idx < activeIndex;
          const isCurrent = idx === activeIndex;

          let circleBg = 'var(--surface-white)';
          let circleBorder = 'var(--border-medium)';
          let circleColor = 'var(--neutral-400)';

          if (isCompleted) {
            circleBg = 'var(--color-blue)';
            circleBorder = 'var(--color-blue)';
            circleColor = '#FFFFFF';
          } else if (isCurrent) {
            circleBg = isRejected ? 'var(--color-red)' : 'var(--color-blue)';
            circleBorder = isRejected ? 'var(--color-red)' : 'var(--color-blue)';
            circleColor = '#FFFFFF';
          }

          return (
            <div
              key={step}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: circleBg,
                  border: `2px solid ${circleBorder}`,
                  color: circleColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  transition: 'all 200ms ease',
                }}
              >
                {isCompleted ? <Check size={12} strokeWidth={3} /> : idx + 1}
              </div>

              <span
                style={{
                  marginTop: '0.35rem',
                  fontSize: '0.71875rem',
                  fontWeight: isCurrent ? 800 : 600,
                  color: isCurrent
                    ? 'var(--nordic-slate)'
                    : isCompleted
                    ? 'var(--neutral-600)'
                    : 'var(--neutral-400)',
                  whiteSpace: 'nowrap',
                }}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
