'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  FolderGit2,
  FileCheck,
  User,
  Users,
  Building2,
  Landmark,
  Shield,
  Search,
  ExternalLink,
  LogOut,
  TrendingUp,
  Award,
} from 'lucide-react';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const currentRole =
    user?.primaryRole ||
    user?.roles?.[0] ||
    (pathname?.includes('/company')
      ? 'COMPANY'
      : pathname?.includes('/university')
      ? 'UNIVERSITY'
      : pathname?.includes('/admin')
      ? 'ADMIN'
      : 'STUDENT');

  const getLinks = () => {
    if (currentRole === 'STUDENT') {
      return [
        { section: 'WORKSPACE' },
        { label: 'Overview', href: '/dashboard/student', icon: LayoutDashboard },
        { label: 'Opportunities', href: '/opportunities', icon: Briefcase },
        { label: 'Live Projects', href: '/projects', icon: FolderGit2 },
        { label: 'Credentials', href: '/dashboard/student#credentials', icon: FileCheck },
        { section: 'ACCOUNT' },
        { label: 'Profile Settings', href: '/onboarding/student', icon: User },
      ];
    }

    if (currentRole === 'COMPANY') {
      return [
        { section: 'RECRUITMENT' },
        { label: 'Overview', href: '/dashboard/company', icon: LayoutDashboard },
        { label: 'Candidate Pipeline', href: '/dashboard/company#pipeline', icon: Users },
        { label: 'Post Opportunity', href: '/dashboard/company/new-opportunity', icon: Briefcase },
        { label: 'Live Projects', href: '/projects', icon: FolderGit2 },
        { section: 'TALENT' },
        { label: 'Find Students', href: '/students', icon: Search },
      ];
    }

    if (currentRole === 'UNIVERSITY') {
      return [
        { section: 'ACADEMIC PORTAL' },
        { label: 'Overview', href: '/dashboard/university', icon: LayoutDashboard },
        { label: 'Student Cohort', href: '/dashboard/university#students', icon: Users },
        { label: 'Active Projects', href: '/projects', icon: FolderGit2 },
        { label: 'Partner Companies', href: '/companies', icon: Building2 },
        { section: 'OUTCOMES' },
        { label: 'Impact & Reports', href: '/impact', icon: TrendingUp },
      ];
    }

    // ADMIN
    return [
      { section: 'OPERATIONS' },
      { label: 'Console Overview', href: '/dashboard/admin', icon: LayoutDashboard },
      { label: 'Opportunities', href: '/opportunities', icon: Briefcase },
      { label: 'Companies', href: '/companies', icon: Building2 },
      { label: 'Universities', href: '/universities', icon: Landmark },
      { section: 'GOVERNANCE' },
      { label: 'Security & Audit Logs', href: '/dashboard/admin', icon: Shield },
      { label: 'Impact Metrics', href: '/impact', icon: TrendingUp },
    ];
  };

  const navLinks = getLinks();

  return (
    <aside
      style={{
        width: '240px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--surface-white)',
        borderRight: '1px solid var(--border-medium)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem 1rem',
        zIndex: 45,
        flexShrink: 0,
      }}
    >
      <div>
        {/* Brand Logo Lockup */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.4rem 0.5rem',
            marginBottom: '1.75rem',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              backgroundColor: 'var(--color-blue)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.8125rem',
              padding: '0.25rem 0.55rem',
              borderRadius: '7px',
              letterSpacing: '-0.02em',
            }}
          >
            A2
          </span>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
            TalentBridge
          </span>
        </Link>

        {/* Navigation Section */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navLinks.map((item, idx) => {
            if ((item as any).section) {
              return (
                <div
                  key={idx}
                  style={{
                    fontSize: '0.65625rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--neutral-400)',
                    padding: '0.75rem 0.65rem 0.25rem 0.65rem',
                  }}
                >
                  {(item as any).section}
                </div>
              );
            }

            const Icon = (item as any).icon;
            const isActive = pathname === (item as any).href;

            return (
              <Link
                key={idx}
                href={(item as any).href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '9px',
                  fontSize: '0.84375rem',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? 'var(--color-blue)' : 'var(--neutral-600)',
                  backgroundColor: isActive ? 'var(--color-blue-light)' : 'transparent',
                  border: isActive ? '1px solid #BFDBFE' : '1px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 150ms ease',
                }}
              >
                <Icon size={16} color={isActive ? 'var(--color-blue)' : 'var(--neutral-500)'} />
                <span>{(item as any).label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions: Back to Website & Logout */}
      <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            fontSize: '0.78125rem',
            color: 'var(--neutral-500)',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 150ms ease',
          }}
        >
          <span>Public Website</span>
          <ExternalLink size={12} />
        </Link>

        {user && (
          <button
            type="button"
            onClick={() => logout()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.55rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              color: 'var(--color-red)',
              backgroundColor: 'transparent',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background-color 150ms ease',
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </aside>
  );
}
