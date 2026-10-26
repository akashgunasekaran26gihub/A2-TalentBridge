'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Landmark,
  ShieldCheck,
  Building2,
  FolderGit2,
  Award,
  Search,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { formatRigaDate } from '@/lib/timezone';

interface UniversityDataProps {
  students: any[];
  activeOpportunitiesCount: number;
  liveProjectsCount: number;
  verifiedExperiences: any[];
  partnerCompaniesCount: number;
  partnerCompanies: any[];
}

export default function UniversityDashboardContent({
  students: initialStudents,
  activeOpportunitiesCount,
  liveProjectsCount,
  verifiedExperiences,
  partnerCompaniesCount,
  partnerCompanies,
}: UniversityDataProps) {
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'In Practicum' | 'Accredited'>('All');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filteredStudents = students.filter((s) => {
    if (activeTab === 'In Practicum' && s.applications?.length === 0) return false;
    if (activeTab === 'Accredited' && s.verifiedExperiences?.length === 0) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const name = `${s.user?.firstName || ''} ${s.user?.lastName || ''}`.toLowerCase();
    const field = (s.fieldOfStudy || '').toLowerCase();
    return name.includes(q) || field.includes(q);
  });

  const handleApprove = (studentName: string) => {
    setActionNotice(`Academic practicum credits verified for ${studentName}`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* 1. UNIVERSITY FACULTY HEADER BANNER */}
      <div
        className="a2-card"
        style={{
          backgroundColor: 'var(--surface-white)',
          border: '1.5px solid var(--border-medium)',
          borderRadius: '14px',
          padding: '1.75rem 2rem',
          boxShadow: 'var(--shadow-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--color-emerald) 0%, #10B981 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
              flexShrink: 0,
            }}
          >
            <Landmark size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0, letterSpacing: '-0.02em' }}>
                Riga Technical University
              </h1>
              <span
                style={{
                  fontSize: '0.71875rem',
                  fontWeight: 700,
                  color: 'var(--color-emerald)',
                  backgroundColor: 'var(--color-emerald-light)',
                  border: '1px solid var(--color-emerald-border)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <ShieldCheck size={13} /> Accredited Faculty
              </span>
            </div>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.875rem', margin: 0 }}>
              Faculty of Computer Science &amp; Information Technology · Academic Practicum Oversight
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link
            href="/impact"
            className="btn btn-secondary btn-sm"
            style={{
              backgroundColor: 'var(--surface-white)',
              borderColor: 'var(--border-medium)',
              color: 'var(--nordic-slate)',
              fontWeight: 700,
              padding: '0.6rem 1.15rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.84375rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <TrendingUp size={14} /> Ecosystem Impact
          </Link>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div
          style={{
            padding: '0.75rem 1.25rem',
            backgroundColor: 'var(--color-emerald-light)',
            border: '1px solid var(--color-emerald-border)',
            borderRadius: '8px',
            color: 'var(--color-emerald)',
            fontSize: '0.84375rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <CheckCircle2 size={16} /> {actionNotice}
        </div>
      )}

      {/* 2. FOUR CLEAN METRIC CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}
      >
        <div
          className="a2-card"
          style={{
            backgroundColor: 'var(--surface-white)',
            border: '1.5px solid var(--border-medium)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Enrolled Students
            </span>
            <GraduationCap size={16} color="var(--color-emerald)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
            {students.length}
          </div>
          <p style={{ fontSize: '0.78125rem', color: 'var(--neutral-500)', margin: '0.2rem 0 0 0' }}>
            Registered RTU Computer Science cohort
          </p>
        </div>

        <div
          className="a2-card"
          style={{
            backgroundColor: 'var(--surface-white)',
            border: '1.5px solid var(--border-medium)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Practicums
            </span>
            <FolderGit2 size={16} color="var(--color-blue)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-blue)' }}>
            {liveProjectsCount}
          </div>
          <p style={{ fontSize: '0.78125rem', color: 'var(--neutral-500)', margin: '0.2rem 0 0 0' }}>
            Supervised industry projects
          </p>
        </div>

        <div
          className="a2-card"
          style={{
            backgroundColor: 'var(--surface-white)',
            border: '1.5px solid var(--border-medium)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Credentials Issued
            </span>
            <Award size={16} color="var(--color-emerald)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-emerald)' }}>
            {verifiedExperiences.length}
          </div>
          <p style={{ fontSize: '0.78125rem', color: 'var(--neutral-500)', margin: '0.2rem 0 0 0' }}>
            ECTS academic credits validated
          </p>
        </div>

        <div
          className="a2-card"
          style={{
            backgroundColor: 'var(--surface-white)',
            border: '1.5px solid var(--border-medium)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Corporate Partners
            </span>
            <Building2 size={16} color="var(--color-amber)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
            {partnerCompaniesCount}
          </div>
          <p style={{ fontSize: '0.78125rem', color: 'var(--neutral-500)', margin: '0.2rem 0 0 0' }}>
            Vetted employer partners
          </p>
        </div>
      </div>

      {/* 3. STUDENT PRACTICUM TRACKING TABLE (#students) */}
      <div
        className="a2-card"
        id="students"
        style={{
          backgroundColor: 'var(--surface-white)',
          border: '1.5px solid var(--border-medium)',
          borderRadius: '14px',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0 }}>
              Student Practicum Roster
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', margin: '0.25rem 0 0 0' }}>
              Monitor student experiential learning, industry evaluations, and ECTS credit transfer
            </p>
          </div>

          <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
            <Search size={15} color="var(--neutral-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search student or field..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 1rem 0.45rem 2.25rem',
                fontSize: '0.8125rem',
                borderRadius: '8px',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--soft-canvas)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.75rem' }}>
          {(['All', 'In Practicum', 'Accredited'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                fontSize: '0.8125rem',
                fontWeight: activeTab === tab ? 800 : 600,
                color: activeTab === tab ? 'var(--color-emerald)' : 'var(--neutral-500)',
                backgroundColor: activeTab === tab ? 'var(--color-emerald-light)' : 'transparent',
                border: `1px solid ${activeTab === tab ? 'var(--color-emerald-border)' : 'transparent'}`,
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="a2-table-wrapper" style={{ border: 'none' }}>
          <table className="a2-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Degree &amp; Year</th>
                <th>Practicum Placement</th>
                <th>Accreditation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((st) => {
                const name = `${st.user?.firstName || ''} ${st.user?.lastName || ''}`;
                const hasCred = st.verifiedExperiences?.length > 0;

                return (
                  <tr key={st.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--nordic-slate)', fontSize: '0.875rem' }}>
                        {name}
                      </div>
                      <span style={{ fontSize: '0.71875rem', color: 'var(--neutral-500)' }}>
                        {st.user?.email}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--nordic-slate)', fontSize: '0.8125rem' }}>
                        {st.fieldOfStudy}
                      </div>
                      <span style={{ fontSize: '0.71875rem', color: 'var(--neutral-500)' }}>
                        {st.degree} · Year {st.studyYear}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--nordic-slate)', fontSize: '0.8125rem' }}>
                        DemoTech Latvia
                      </div>
                      <span style={{ fontSize: '0.71875rem', color: 'var(--color-blue)', fontWeight: 600 }}>
                        Active Practicum Sprint
                      </span>
                    </td>

                    <td>
                      <span
                        style={{
                          fontSize: '0.71875rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '999px',
                          backgroundColor: hasCred ? 'var(--color-emerald-light)' : 'var(--color-amber-light)',
                          color: hasCred ? 'var(--color-emerald)' : 'var(--color-amber)',
                          border: `1px solid ${hasCred ? 'var(--color-emerald-border)' : 'var(--color-amber-border)'}`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        {hasCred ? '✓ Verified (12 ECTS)' : 'Pending Review'}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() => handleApprove(name)}
                        style={{
                          fontSize: '0.71875rem',
                          fontWeight: 700,
                          padding: '0.3rem 0.65rem',
                          borderRadius: '6px',
                          backgroundColor: 'var(--soft-canvas)',
                          border: '1px solid var(--border-medium)',
                          color: 'var(--nordic-slate)',
                          cursor: 'pointer',
                        }}
                      >
                        Accredit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. PARTNER COMPANIES */}
      <div
        className="a2-card"
        style={{
          backgroundColor: 'var(--surface-white)',
          border: '1.5px solid var(--border-medium)',
          borderRadius: '14px',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0 }}>
              Industry Partner Network
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', margin: '0.2rem 0 0 0' }}>
              Vetted organizations sponsoring accredited practicums for RTU students
            </p>
          </div>
          <Link
            href="/companies"
            style={{
              fontSize: '0.78125rem',
              fontWeight: 700,
              color: 'var(--color-emerald)',
              textDecoration: 'none',
            }}
          >
            View all ({partnerCompaniesCount}) →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {partnerCompanies.map((comp: any) => (
            <div
              key={comp.id}
              style={{
                padding: '1rem',
                borderRadius: '10px',
                backgroundColor: 'var(--soft-canvas)',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--nordic-slate)', marginBottom: '0.2rem' }}>
                  {comp.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                  {comp._count?.opportunities || 0} active roles · {comp._count?.projectsSponsored || 0} sprints
                </div>
              </div>
              <span style={{ fontSize: '0.71875rem', fontWeight: 700, color: 'var(--color-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={13} /> Active
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
