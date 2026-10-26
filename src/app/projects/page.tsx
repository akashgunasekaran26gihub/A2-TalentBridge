'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatRigaDate } from '@/lib/timezone';
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

export default function ProjectsCatalogPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Verified'>('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live projects
    fetch('/api/opportunities')
      .then(() => {
        // Mock sample projects or read from state
        setProjects([
          {
            id: 'proj-1',
            title: 'Sustainability Analytics Dashboard',
            organization: 'DemoTech Latvia',
            status: 'Verified',
            teamSize: 3,
            startDate: new Date('2026-06-01'),
            endDate: new Date('2026-07-26'),
            problemStatement: 'SMEs in the Baltic region lack transparent visibility into their Scope 1 & 2 carbon footprint.',
            milestones: [
              { title: 'Architecture & UI Mockups', completed: true },
              { title: 'Data Ingestion Pipelines', completed: true },
              { title: 'Final Delivery & EU CSRD Export', completed: true },
            ],
          },
          {
            id: 'proj-2',
            title: 'Packaging Waste Reduction Live Project',
            organization: 'Baltic Green Labs',
            status: 'Active',
            teamSize: 4,
            startDate: new Date('2026-10-01'),
            endDate: new Date('2026-11-26'),
            problemStatement: 'Analyzing supply chain packaging materials for Latvian food manufacturing exporters.',
            milestones: [
              { title: 'Supply Chain Audit', completed: true },
              { title: 'Alternative Materials Assessment', completed: false },
              { title: 'Executive Presentation', completed: false },
            ],
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'All') return true;
    return p.status === activeTab;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '3rem 0 5rem 0' }}>
      <div className="a2-container">
        
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
            Live Industry Projects
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            Multidisciplinary student squads executing real project milestones sponsored by Latvian employers.
          </p>
        </div>

        {/* Clean Tabs (Section 28 Rule) */}
        <div className="a2-tabs">
          <button
            type="button"
            className={`a2-tab ${activeTab === 'All' ? 'active' : ''}`}
            onClick={() => setActiveTab('All')}
          >
            All Projects ({projects.length})
          </button>
          <button
            type="button"
            className={`a2-tab ${activeTab === 'Active' ? 'active' : ''}`}
            onClick={() => setActiveTab('Active')}
          >
            Active Sprints
          </button>
          <button
            type="button"
            className={`a2-tab ${activeTab === 'Verified' ? 'active' : ''}`}
            onClick={() => setActiveTab('Verified')}
          >
            Completed & Verified
          </button>
        </div>

        {/* Compact Cards Grid */}
        <div className="grid-cols-2">
          {filteredProjects.map((proj) => {
            const isVerified = proj.status === 'Verified';
            return (
              <div
                key={proj.id}
                className="a2-card"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className={`tag ${isVerified ? 'tag-emerald' : 'tag-amber'}`}>
                      {proj.status}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                      <Users size={12} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> Team: {proj.teamSize} students
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {proj.title}
                  </h3>

                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-blue)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    Sponsor: {proj.organization}
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {proj.problemStatement}
                  </p>

                  {/* Compact Milestones checklist */}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.875rem', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--neutral-500)', marginBottom: '0.4rem' }}>
                      Milestones
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {proj.milestones.map((m: any, idx: number) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: m.completed ? 'var(--color-emerald)' : 'var(--neutral-600)' }}>
                          <CheckCircle2 size={13} color={m.completed ? 'var(--color-emerald)' : 'var(--neutral-400)'} />
                          <span>{m.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                    Started: {formatRigaDate(proj.startDate)}
                  </span>
                  <Link href={`/opportunities`} className="btn btn-secondary btn-sm">
                    View Brief
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
