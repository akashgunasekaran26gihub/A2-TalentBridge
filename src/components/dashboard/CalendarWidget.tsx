'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  category: string;
  color: string;
}

interface CalendarWidgetProps {
  events?: EventItem[];
  title?: string;
}

export default function CalendarWidget({
  events = [
    { id: '1', title: 'Live Sprint Deliverable #2', date: '28 Oct', time: '14:00', category: 'Project Sprint', color: 'var(--color-blue)' },
    { id: '2', title: 'DemoTech Interview Window', date: '04 Nov', time: '10:30', category: 'Recruitment', color: 'var(--color-amber)' },
    { id: '3', title: 'ECTS Accreditation Review', date: '15 Nov', time: '16:00', category: 'Academic', color: 'var(--color-emerald)' },
  ],
  title = 'Event Calendar',
}: CalendarWidgetProps) {
  const [selectedDay, setSelectedDay] = useState<number>(26);
  const daysInMonth = 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

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
      {/* Calendar Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <CalendarIcon size={16} color="var(--color-blue)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0 }}>
            {title}
          </h3>
        </div>

        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--nordic-slate)',
            backgroundColor: 'var(--soft-canvas)',
            border: '1px solid var(--border-medium)',
            padding: '0.2rem 0.6rem',
            borderRadius: '6px',
          }}
        >
          October 2026
        </span>
      </div>

      {/* Weekday headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '0.5rem', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--neutral-400)' }}>
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '1.25rem' }}>
        {/* Leading empty days for month alignment */}
        <div /><div />
        {days.slice(0, 29).map((day) => {
          const isSelected = selectedDay === day;
          const isEventDay = day === 26 || day === 28 || day === 4 || day === 15;

          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isSelected
                  ? 'var(--color-blue)'
                  : isEventDay
                  ? 'var(--color-blue-light)'
                  : 'transparent',
                color: isSelected
                  ? '#FFFFFF'
                  : isEventDay
                  ? 'var(--color-blue)'
                  : 'var(--nordic-slate)',
                fontWeight: isSelected || isEventDay ? 800 : 500,
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 120ms ease',
              }}
            >
              {day}
              {isEventDay && !isSelected && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '3px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-blue)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Today's Timeline / Events (as seen in Image 2) */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--neutral-500)', marginBottom: '0.75rem' }}>
          Upcoming Timeline
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {events.map((ev) => (
            <div
              key={ev.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                padding: '0.6rem 0.75rem',
                backgroundColor: 'var(--soft-canvas)',
                borderRadius: '8px',
                border: '1px solid var(--border-medium)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: ev.color,
                  marginTop: '5px',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--nordic-slate)', lineHeight: 1.25 }}>
                  {ev.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem', fontSize: '0.6875rem', color: 'var(--neutral-500)' }}>
                  <Clock size={11} /> {ev.date} · {ev.time}
                  <span>•</span>
                  <span style={{ color: ev.color, fontWeight: 700 }}>{ev.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
