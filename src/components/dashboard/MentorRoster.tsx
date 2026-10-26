'use client';

import React, { useState } from 'react';
import { UserCheck, MessageSquare, Building2, ExternalLink } from 'lucide-react';

interface MentorItem {
  id: string;
  name: string;
  role: string;
  org: string;
  initials: string;
  connected?: boolean;
}

interface MentorRosterProps {
  title?: string;
  mentors?: MentorItem[];
}

export default function MentorRoster({
  title = 'Your Mentors & Supervisors',
  mentors = [
    { id: '1', name: 'Jānis Bērziņš', role: 'Staff Architect', org: 'DemoTech Latvia', initials: 'JB', connected: true },
    { id: '2', name: 'Dr. Ilze Ozola', role: 'Faculty Coordinator', org: 'RTU Computer Science', initials: 'IO', connected: true },
    { id: '3', name: 'Māris Kalniņš', role: 'Lead Engineer', org: 'Baltic Green Labs', initials: 'MK', connected: false },
  ],
}: MentorRosterProps) {
  const [list, setList] = useState(mentors);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const toggleConnect = (id: string) => {
    setList(
      list.map((m) =>
        m.id === id ? { ...m, connected: !m.connected } : m
      )
    );
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0 }}>
          {title}
        </h3>
        <span style={{ fontSize: '0.71875rem', fontWeight: 700, color: 'var(--neutral-500)' }}>
          {list.length} contacts
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {list.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 0.75rem',
              backgroundColor: 'var(--soft-canvas)',
              borderRadius: '10px',
              border: '1px solid var(--border-medium)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-blue)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.8125rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {m.initials}
              </div>
              <div>
                <div style={{ fontSize: '0.84375rem', fontWeight: 700, color: 'var(--nordic-slate)', lineHeight: 1.2 }}>
                  {m.name}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--neutral-500)', marginTop: '0.15rem' }}>
                  {m.role} · {m.org}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleConnect(m.id)}
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                backgroundColor: m.connected ? 'var(--color-emerald-light)' : 'var(--surface-white)',
                color: m.connected ? 'var(--color-emerald)' : 'var(--nordic-slate)',
                borderColor: m.connected ? 'var(--color-emerald-border)' : 'var(--border-medium)',
              }}
            >
              {m.connected ? 'Connected' : '+ Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
