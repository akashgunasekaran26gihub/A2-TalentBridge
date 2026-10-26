'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  FolderGit2,
  FileCheck,
  Sparkles,
  CheckCircle2,
  Circle,
  MapPin,
  Building2,
  Calendar,
  ExternalLink,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  User,
  Clock,
} from 'lucide-react';
import { formatRigaDate, formatEur } from '@/lib/timezone';

interface StudentDataProps {
  student: any;
  recommendations: any[];
  matchScores: number[];
}

export default function StudentDashboardContent({
  student,
  recommendations,
  matchScores,
}: StudentDataProps) {
  // Interactive Tasks for the student's active project sprint
  const initialTasks = [
    {
      id: 'task-1',
      title: 'Submit Sprint #2 REST API Documentation & OpenAPI Spec',
      project: 'Sustainability Analytics Dashboard',
      dueDate: 'Due Friday',
      completed: true,
      priority: 'High',
    },
    {
      id: 'task-2',
      title: 'Complete peer code review for Authentication module',
      project: 'Sustainability Analytics Dashboard',
      dueDate: 'Due Tomorrow',
      completed: true,
      priority: 'Medium',
    },
    {
      id: 'task-3',
      title: 'Submit Midterm Academic Practicum Reflection',
      project: 'RTU Practicum',
      dueDate: '20 Nov 2026',
      completed: false,
      priority: 'High',
    },
    {
      id: 'task-4',
      title: 'Upload Docker Compose configuration and telemetry service test',
      project: 'Sustainability Analytics Dashboard',
      dueDate: '22 Nov 2026',
      completed: false,
      priority: 'Medium',
    },
    {
      id: 'task-5',
      title: 'DemoTech Latvia technical interview preparation',
      project: 'Internship Pipeline',
      dueDate: '25 Nov 2026',
      completed: false,
      priority: 'Low',
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [taskFilter, setTaskFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [copiedCode, setCopiedCode] = useState(false);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'active') return !t.completed;
    if (taskFilter === 'completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  const handleCopyCode = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const activeProject = student.projectMemberships?.[0]?.project;
  const verifiedExp = student.verifiedExperiences?.[0];
  const credentialCode = verifiedExp?.credential?.credentialCode || 'A2-LV-2026-X89K';

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* 1. CLEAN WELCOME HERO */}
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
              background: 'linear-gradient(135deg, var(--color-blue) 0%, #3B82F6 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
              flexShrink: 0,
            }}
          >
            {student.user.firstName?.[0]}
            {student.user.lastName?.[0]}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0, letterSpacing: '-0.02em' }}>
                Welcome back, {student.user.firstName}
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
                <ShieldCheck size={13} /> Verified Student
              </span>
            </div>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.875rem', margin: 0 }}>
              {student.universityName} · {student.fieldOfStudy} (Year {student.studyYear})
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            href="/onboarding/student"
            className="btn btn-secondary btn-sm"
            style={{
              backgroundColor: 'var(--surface-white)',
              borderColor: 'var(--border-medium)',
              color: 'var(--nordic-slate)',
              fontWeight: 700,
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <User size={14} /> Profile
          </Link>
          <Link
            href="/opportunities"
            className="btn btn-primary btn-sm"
            style={{
              backgroundColor: 'var(--color-blue)',
              color: '#FFFFFF',
              fontWeight: 700,
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 8px rgba(30, 58, 138, 0.2)',
            }}
          >
            <Sparkles size={14} /> Browse Opportunities
          </Link>
        </div>
      </div>

      {/* 2. THREE CLEAN METRIC CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
              Active Applications
            </span>
            <Briefcase size={16} color="var(--color-amber)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--nordic-slate)', marginBottom: '0.2rem' }}>
            {student.applications?.length || 1}
          </div>
          <p style={{ fontSize: '0.78125rem', color: 'var(--color-amber)', margin: 0, fontWeight: 600 }}>
            DemoTech Latvia · In Interview Stage
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
              Ongoing Live Projects
            </span>
            <FolderGit2 size={16} color="var(--color-blue)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--nordic-slate)', marginBottom: '0.2rem' }}>
            {student.projectMemberships?.length || 1}
          </div>
          <p style={{ fontSize: '0.78125rem', color: 'var(--color-blue)', margin: 0, fontWeight: 600 }}>
            Sustainability Analytics Dashboard
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
              Verified Credentials
            </span>
            <FileCheck size={16} color="var(--color-emerald)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
              {student.verifiedExperiences?.length || 1}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-emerald)' }}>
              (12 ECTS Credits)
            </span>
          </div>
          <p style={{ fontSize: '0.78125rem', color: 'var(--color-emerald)', margin: 0, fontWeight: 600 }}>
            Publicly verifiable across the EU
          </p>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE GRID: Left (Main Content) & Right (Sidebar Details) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.75rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Project Workspace & Tasks + Applications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Active Sprint & Deliverables Checklist */}
          <div
            className="a2-card"
            style={{
              backgroundColor: 'var(--surface-white)',
              border: '1.5px solid var(--border-medium)',
              borderRadius: '14px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--color-blue)',
                    backgroundColor: 'var(--color-blue-light)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '999px',
                    display: 'inline-block',
                    marginBottom: '0.35rem',
                  }}
                >
                  Live Enterprise Sprint
                </span>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: '0 0 0.2rem 0' }}>
                  {activeProject?.title || 'Sustainability Analytics Dashboard'}
                </h2>
                <div style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Partner: <strong>{activeProject?.organization?.name || 'DemoTech Latvia'}</strong></span>
                  <span>·</span>
                  <span>Role: <strong>Team Lead</strong></span>
                </div>
              </div>

              <Link
                href="/projects"
                style={{
                  fontSize: '0.78125rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                Sprint Workspace <ArrowRight size={13} />
              </Link>
            </div>

            {/* Task Controls & Progress */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.65rem 0.85rem',
                backgroundColor: 'var(--soft-canvas)',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.8125rem',
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--nordic-slate)' }}>
                Milestone Tasks: <span style={{ color: 'var(--color-blue)', fontWeight: 800 }}>{completedCount}</span> of {tasks.length} completed
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {(['all', 'active', 'completed'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setTaskFilter(filter)}
                    style={{
                      fontSize: '0.71875rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      backgroundColor: taskFilter === filter ? 'var(--color-blue)' : 'transparent',
                      color: taskFilter === filter ? '#FFFFFF' : 'var(--neutral-500)',
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Tasks List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: task.completed ? 'var(--soft-canvas)' : 'var(--surface-white)',
                    border: '1px solid var(--border-medium)',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {task.completed ? (
                      <CheckCircle2 size={18} color="var(--color-emerald)" />
                    ) : (
                      <Circle size={18} color="var(--neutral-400)" />
                    )}
                    <span
                      style={{
                        fontSize: '0.84375rem',
                        fontWeight: task.completed ? 500 : 700,
                        color: task.completed ? 'var(--neutral-400)' : 'var(--nordic-slate)',
                        textDecoration: task.completed ? 'line-through' : 'none',
                      }}
                    >
                      {task.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.71875rem',
                      fontWeight: 600,
                      color: task.dueDate.includes('Due') ? 'var(--color-amber)' : 'var(--neutral-400)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {task.dueDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Applications Status */}
          <div
            className="a2-card"
            style={{
              backgroundColor: 'var(--surface-white)',
              border: '1.5px solid var(--border-medium)',
              borderRadius: '14px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0 }}>
                  Active Applications
                </h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', margin: '0.2rem 0 0 0' }}>
                  Track employer review progress and upcoming interviews
                </p>
              </div>
              <Link
                href="/opportunities"
                style={{
                  fontSize: '0.78125rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  textDecoration: 'none',
                }}
              >
                Find more roles →
              </Link>
            </div>

            {student.applications?.map((app: any) => {
              const currentStep = app.status === 'Interview' ? 3 : app.status === 'Shortlisted' ? 2 : 1;
              const steps = ['Applied', 'Review', 'Interview', 'Selected'];

              return (
                <div
                  key={app.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '10px',
                    backgroundColor: 'var(--soft-canvas)',
                    border: '1px solid var(--border-medium)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--color-blue)',
                          backgroundColor: 'var(--color-blue-light)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                        }}
                      >
                        {app.opportunity?.opportunityType || 'Internship'}
                      </span>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: '0.35rem 0 0.15rem 0' }}>
                        {app.opportunity?.title || 'Junior Cloud Software Engineer'}
                      </h3>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Building2 size={13} /> {app.opportunity?.organization?.name || 'DemoTech Latvia'} · Riga
                      </div>
                    </div>

                    <Link
                      href={`/opportunities/${app.opportunity?.id || ''}`}
                      className="btn btn-secondary btn-sm"
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.35rem 0.75rem',
                        backgroundColor: 'var(--surface-white)',
                        borderColor: 'var(--border-medium)',
                        color: 'var(--nordic-slate)',
                        borderRadius: '6px',
                        textDecoration: 'none',
                      }}
                    >
                      View Role
                    </Link>
                  </div>

                  {/* 4-Step Progress Stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '20px',
                        right: '20px',
                        height: '2px',
                        backgroundColor: 'var(--border-medium)',
                        zIndex: 0,
                      }}
                    />
                    {steps.map((label, idx) => {
                      const stepNum = idx + 1;
                      const isDone = stepNum < currentStep;
                      const isCurrent = stepNum === currentStep;

                      return (
                        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, position: 'relative' }}>
                          <div
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              backgroundColor: isDone || isCurrent ? 'var(--color-blue)' : 'var(--surface-white)',
                              border: `2px solid ${isDone || isCurrent ? 'var(--color-blue)' : 'var(--border-medium)'}`,
                              color: isDone || isCurrent ? '#FFFFFF' : 'var(--neutral-400)',
                              fontSize: '0.71875rem',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '0.3rem',
                            }}
                          >
                            {isDone ? '✓' : stepNum}
                          </div>
                          <span
                            style={{
                              fontSize: '0.71875rem',
                              fontWeight: isCurrent ? 800 : 600,
                              color: isCurrent ? 'var(--color-blue)' : isDone ? 'var(--nordic-slate)' : 'var(--neutral-400)',
                            }}
                          >
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommended Opportunities for You */}
          <div
            className="a2-card"
            style={{
              backgroundColor: 'var(--surface-white)',
              border: '1.5px solid var(--border-medium)',
              borderRadius: '14px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0 }}>
                  Recommended For You
                </h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', margin: '0.2rem 0 0 0' }}>
                  Roles matching your Computer Science curriculum and verified skills
                </p>
              </div>
              <Link
                href="/opportunities"
                style={{
                  fontSize: '0.78125rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  textDecoration: 'none',
                }}
              >
                View all ({recommendations.length}) →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {recommendations.slice(0, 3).map((opp, idx) => (
                <div
                  key={opp.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: 'var(--surface-white)',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          color: 'var(--color-blue)',
                          backgroundColor: 'var(--color-blue-light)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                        }}
                      >
                        {opp.opportunityType}
                      </span>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          color: 'var(--color-emerald)',
                          backgroundColor: 'var(--color-emerald-light)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                        }}
                      >
                        {matchScores[idx] || 85}% Match
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: '0 0 0.2rem 0' }}>
                      {opp.title}
                    </h4>

                    <div style={{ fontSize: '0.78125rem', color: 'var(--neutral-500)', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span>{opp.organization?.name}</span>
                      <span>·</span>
                      <span>{opp.locationCity}</span>
                      <span>·</span>
                      <strong style={{ color: 'var(--nordic-slate)' }}>{formatEur(opp.stipendEur)}</strong>
                    </div>
                  </div>

                  <Link
                    href={`/opportunities/${opp.id}`}
                    className="btn btn-primary btn-sm"
                    style={{
                      fontSize: '0.78125rem',
                      fontWeight: 700,
                      padding: '0.45rem 0.95rem',
                      backgroundColor: 'var(--color-blue)',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      textDecoration: 'none',
                    }}
                  >
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Profile, Official Credential & Skills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Verified Credentials Vault Card */}
          <div
            className="a2-card"
            id="credentials"
            style={{
              backgroundColor: 'var(--surface-white)',
              border: '1.5px solid var(--border-medium)',
              borderRadius: '14px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={18} color="var(--color-emerald)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: 0 }}>
                  Verified Credential
                </h3>
              </div>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: 'var(--color-emerald)',
                  backgroundColor: 'var(--color-emerald-light)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '999px',
                  border: '1px solid var(--color-emerald-border)',
                }}
              >
                1 Validated
              </span>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', lineHeight: 1.5, marginBottom: '1rem' }}>
              Supervisor-signed academic practicum credential valid across European institutions.
            </p>

            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--soft-canvas)',
                border: '1px solid var(--border-medium)',
                borderRadius: '10px',
                marginBottom: '1rem',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--nordic-slate)', marginBottom: '0.2rem' }}>
                Sustainability Analytics Dashboard
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginBottom: '0.75rem' }}>
                Verified by DemoTech Latvia · 12 ECTS Credits
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface-white)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '0.35rem 0.6rem' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.75rem', fontWeight: 700, color: 'var(--nordic-slate)' }}>
                  {credentialCode}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(credentialCode)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: copiedCode ? 'var(--color-emerald)' : 'var(--neutral-500)',
                    fontSize: '0.71875rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <Link
              href={`/verify/${credentialCode}`}
              target="_blank"
              className="btn btn-secondary btn-sm"
              style={{
                width: '100%',
                justifyContent: 'center',
                fontWeight: 700,
                padding: '0.55rem',
                borderRadius: '8px',
                backgroundColor: 'var(--surface-white)',
                borderColor: 'var(--border-medium)',
                color: 'var(--color-emerald)',
                textDecoration: 'none',
                fontSize: '0.8125rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              Verify Credential Online <ExternalLink size={13} />
            </Link>
          </div>

          {/* Verified Skills */}
          <div
            className="a2-card"
            style={{
              backgroundColor: 'var(--surface-white)',
              border: '1.5px solid var(--border-medium)',
              borderRadius: '14px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: '0 0 0.85rem 0' }}>
              Demonstrated Skills
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Git', 'Agile Sprints'].map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--nordic-slate)',
                    backgroundColor: 'var(--soft-canvas)',
                    border: '1px solid var(--border-medium)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <CheckCircle2 size={12} color="var(--color-emerald)" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Upcoming Schedule / Deadlines */}
          <div
            className="a2-card"
            style={{
              backgroundColor: 'var(--surface-white)',
              border: '1.5px solid var(--border-medium)',
              borderRadius: '14px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nordic-slate)', margin: '0 0 1rem 0' }}>
              Upcoming Milestones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { title: 'Sprint Week #2 Deliverable Due', date: 'Friday, 18:00', type: 'Sprint' },
                { title: 'DemoTech Interview Session', date: '25 Nov 2026, 14:30', type: 'Interview' },
                { title: 'RTU ECTS Validation Review', date: '15 Jan 2027', type: 'Academic' },
              ].map((ev, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--soft-canvas)',
                    fontSize: '0.8125rem',
                  }}
                >
                  <Clock size={15} color="var(--neutral-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--nordic-slate)' }}>{ev.title}</div>
                    <div style={{ fontSize: '0.71875rem', color: 'var(--neutral-500)', marginTop: '0.1rem' }}>
                      {ev.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
