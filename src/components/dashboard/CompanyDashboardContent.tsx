'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  ShieldCheck,
  PlusCircle,
  Building2,
  FolderGit2,
  Search,
  ExternalLink,
  CheckCircle2,
  Check,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { formatRigaDate, formatEur } from '@/lib/timezone';

interface CompanyDataProps {
  org: any;
  applications: any[];
  emergingTalent: any[];
}

export default function CompanyDashboardContent({
  org,
  applications: initialApplications,
  emergingTalent,
}: CompanyDataProps) {
  const [applications, setApplications] = useState(initialApplications);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const underReviewCount = applications.filter(
    (a) => a.status === 'Under Review' || a.status === 'Submitted'
  ).length;
  const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted').length;
  const interviewCount = applications.filter((a) => a.status === 'Interview').length;

  const tabs = [
    { label: 'All', count: applications.length },
    { label: 'Under Review', count: underReviewCount },
    { label: 'Shortlisted', count: shortlistedCount },
    { label: 'Interview', count: interviewCount },
  ];

  const filteredApps = applications.filter((app) => {
    if (activeTab === 'Under Review' && app.status !== 'Under Review' && app.status !== 'Submitted') return false;
    if (activeTab === 'Shortlisted' && app.status !== 'Shortlisted') return false;
    if (activeTab === 'Interview' && app.status !== 'Interview') return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const name = `${app.studentProfile?.user?.firstName || ''} ${app.studentProfile?.user?.lastName || ''}`.toLowerCase();
    const uni = (app.studentProfile?.universityName || '').toLowerCase();
    const opp = (app.opportunity?.title || '').toLowerCase();
    return name.includes(q) || uni.includes(q) || opp.includes(q);
  });

  const updateCandidateStatus = (appId: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
    setActionNotice(`Candidate status updated to "${newStatus}"`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* 1. COMPANY HEADER BANNER */}
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
              background: 'linear-gradient(135deg, var(--color-amber) 0%, #F59E0B 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.25)',
              flexShrink: 0,
            }}
          >
            <Building2 size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0, letterSpacing: '-0.02em' }}>
                {org.name}
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
                <ShieldCheck size={13} /> Verified Employer
              </span>
            </div>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.875rem', margin: 0 }}>
              {org.city || 'Riga, Latvia'} · {org.industry || 'Technology & Engineering'}
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/company/new-opportunity"
          className="btn btn-primary btn-sm"
          style={{
            backgroundColor: 'var(--color-amber)',
            color: '#FFFFFF',
            fontWeight: 700,
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.84375rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 2px 8px rgba(217, 119, 6, 0.25)',
          }}
        >
          <PlusCircle size={15} /> Post New Opportunity
        </Link>
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
              Total Applicants
            </span>
            <Users size={16} color="var(--color-amber)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
            {applications.length}
          </div>
          <p style={{ fontSize: '0.78125rem', color: 'var(--neutral-500)', margin: '0.2rem 0 0 0' }}>
            Across all posted roles
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
              Pending Review
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-amber)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-amber)' }}>
            {underReviewCount}
          </div>
          <p style={{ fontSize: '0.78125rem', color: 'var(--neutral-500)', margin: '0.2rem 0 0 0' }}>
            Candidates awaiting decision
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
              Active Opportunities
            </span>
            <Briefcase size={16} color="var(--color-blue)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
            {org.opportunities?.length || 0}
          </div>
          <p style={{ fontSize: '0.78125rem', color: 'var(--neutral-500)', margin: '0.2rem 0 0 0' }}>
            Internships &amp; Challenges
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
              Sponsored Sprints
            </span>
            <FolderGit2 size={16} color="var(--color-emerald)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
            {org.projectsSponsored?.length || 1}
          </div>
          <p style={{ fontSize: '0.78125rem', color: 'var(--color-emerald)', margin: '0.2rem 0 0 0', fontWeight: 600 }}>
            Real deliverables in progress
          </p>
        </div>
      </div>

      {/* 3. CANDIDATE PIPELINE TABLE (#pipeline) */}
      <div
        className="a2-card"
        id="pipeline"
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
              Candidate Review Pipeline
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', margin: '0.25rem 0 0 0' }}>
              Review applicants, inspect verified credentials, and advance hiring stages
            </p>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
            <Search size={15} color="var(--neutral-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search candidate or role..."
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

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.75rem' }}>
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              style={{
                fontSize: '0.8125rem',
                fontWeight: activeTab === tab.label ? 800 : 600,
                color: activeTab === tab.label ? 'var(--color-amber)' : 'var(--neutral-500)',
                backgroundColor: activeTab === tab.label ? 'var(--color-amber-light)' : 'transparent',
                border: `1px solid ${activeTab === tab.label ? 'var(--color-amber-border)' : 'transparent'}`,
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span>{tab.label}</span>
              <span style={{ fontSize: '0.6875rem', opacity: 0.8 }}>({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Applications Table */}
        <div className="a2-table-wrapper" style={{ border: 'none' }}>
          <table className="a2-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Role Applied</th>
                <th>University</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--neutral-500)' }}>
                    No candidates found for this filter.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => {
                  const student = app.studentProfile;
                  const name = student?.user ? `${student.user.firstName} ${student.user.lastName}` : 'Candidate';

                  return (
                    <tr key={app.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--nordic-slate)', fontSize: '0.875rem' }}>
                          {name}
                        </div>
                        <span style={{ fontSize: '0.71875rem', color: 'var(--neutral-500)' }}>
                          Score: {student?.profileScore || 85}% · {student?.verifiedExperiences?.length || 1} verified credential
                        </span>
                      </td>

                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--nordic-slate)', fontSize: '0.84375rem' }}>
                          {app.opportunity?.title}
                        </div>
                        <span style={{ fontSize: '0.71875rem', color: 'var(--neutral-500)' }}>
                          Applied {formatRigaDate(app.createdAt)}
                        </span>
                      </td>

                      <td style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)' }}>
                        {student?.universityName || 'RTU'}
                      </td>

                      <td>
                        <span
                          style={{
                            fontSize: '0.71875rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.55rem',
                            borderRadius: '999px',
                            backgroundColor:
                              app.status === 'Interview'
                                ? 'var(--color-blue-light)'
                                : app.status === 'Shortlisted'
                                ? 'var(--color-emerald-light)'
                                : 'var(--color-amber-light)',
                            color:
                              app.status === 'Interview'
                                ? 'var(--color-blue)'
                                : app.status === 'Shortlisted'
                                ? 'var(--color-emerald)'
                                : 'var(--color-amber)',
                            border: `1px solid ${
                              app.status === 'Interview'
                                ? '#BFDBFE'
                                : app.status === 'Shortlisted'
                                ? 'var(--color-emerald-border)'
                                : 'var(--color-amber-border)'
                            }`,
                          }}
                        >
                          {app.status}
                        </span>
                      </td>

                      <td>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          {app.status !== 'Shortlisted' && (
                            <button
                              type="button"
                              onClick={() => updateCandidateStatus(app.id, 'Shortlisted')}
                              style={{
                                fontSize: '0.71875rem',
                                fontWeight: 700,
                                padding: '0.25rem 0.55rem',
                                borderRadius: '6px',
                                backgroundColor: 'var(--color-emerald-light)',
                                border: '1px solid var(--color-emerald-border)',
                                color: 'var(--color-emerald)',
                                cursor: 'pointer',
                              }}
                            >
                              Shortlist
                            </button>
                          )}
                          {app.status !== 'Interview' && (
                            <button
                              type="button"
                              onClick={() => updateCandidateStatus(app.id, 'Interview')}
                              style={{
                                fontSize: '0.71875rem',
                                fontWeight: 700,
                                padding: '0.25rem 0.55rem',
                                borderRadius: '6px',
                                backgroundColor: 'var(--color-blue-light)',
                                border: '1px solid #BFDBFE',
                                color: 'var(--color-blue)',
                                cursor: 'pointer',
                              }}
                            >
                              Interview
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. POSTED OPPORTUNITIES & EMERGING TALENT GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.75rem', alignItems: 'start' }}>
        
        {/* Company Active Opportunities */}
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
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0 }}>
              Posted Listings
            </h2>
            <Link
              href="/dashboard/company/new-opportunity"
              style={{
                fontSize: '0.78125rem',
                fontWeight: 700,
                color: 'var(--color-amber)',
                textDecoration: 'none',
              }}
            >
              + Create Listing
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {org.opportunities?.map((opp: any) => (
              <div
                key={opp.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--soft-canvas)',
                  border: '1px solid var(--border-medium)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        color: 'var(--color-amber)',
                        backgroundColor: 'var(--color-amber-light)',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                      }}
                    >
                      {opp.opportunityType}
                    </span>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0 }}>
                      {opp.title}
                    </h4>
                  </div>
                  <div style={{ fontSize: '0.78125rem', color: 'var(--neutral-500)' }}>
                    {opp.remoteType} · {formatEur(opp.stipendEur)} · {opp._count?.applications || 0} applicants
                  </div>
                </div>

                <Link
                  href={`/opportunities/${opp.id}`}
                  className="btn btn-secondary btn-sm"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.4rem 0.75rem',
                    backgroundColor: 'var(--surface-white)',
                    borderColor: 'var(--border-medium)',
                    color: 'var(--nordic-slate)',
                    borderRadius: '6px',
                    textDecoration: 'none',
                  }}
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Emerging Talent Spotlight */}
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
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0 }}>
              Talent Discovery
            </h2>
            <Link
              href="/students"
              style={{
                fontSize: '0.78125rem',
                fontWeight: 700,
                color: 'var(--color-amber)',
                textDecoration: 'none',
              }}
            >
              Explore all →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {emergingTalent?.slice(0, 3).map((talent: any) => (
              <div
                key={talent.id}
                style={{
                  padding: '0.85rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-medium)',
                  backgroundColor: 'var(--soft-canvas)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--nordic-slate)' }}>
                    {talent.user?.firstName} {talent.user?.lastName}
                  </div>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: 'var(--color-emerald)',
                      backgroundColor: 'var(--color-emerald-light)',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '4px',
                    }}
                  >
                    {talent.profileScore}% Match
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginBottom: '0.5rem' }}>
                  {talent.universityName} · {talent.fieldOfStudy}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {talent.skills?.slice(0, 3).map((s: any) => (
                    <span
                      key={s.id}
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--surface-white)',
                        color: 'var(--neutral-600)',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '4px',
                        border: '1px solid var(--border-medium)',
                      }}
                    >
                      {s.skill?.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
