'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  LogIn,
  GraduationCap,
  Building2,
  Landmark,
  Shield,
  ChevronDown,
  Check,
  FlaskConical,
} from 'lucide-react';

export const DEMO_ROLES = [
  {
    key: 'STUDENT',
    label: 'Student',
    name: 'Artūrs Bērziņš',
    path: '/dashboard/student',
    email: 'arturs.berzins@edu.rtu.lv',
    password: 'A2Bridge2026!',
    color: '#1E3A8A',
    icon: GraduationCap,
  },
  {
    key: 'COMPANY',
    label: 'Company',
    name: 'DemoTech Latvia',
    path: '/dashboard/company',
    email: 'talent@demotech.lv',
    password: 'A2Bridge2026!',
    color: '#D97706',
    icon: Building2,
  },
  {
    key: 'UNIVERSITY',
    label: 'University',
    name: 'RTU Coordinator',
    path: '/dashboard/university',
    email: 'coordinator@rtu.lv',
    password: 'A2Bridge2026!',
    color: '#059669',
    icon: Landmark,
  },
  {
    key: 'ADMIN',
    label: 'Admin',
    name: 'Platform Admin',
    path: '/dashboard/admin',
    email: 'admin@a2talentbridge.lv',
    password: 'AdminRiga2026!',
    color: '#4338CA',
    icon: Shield,
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Close demo dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDemoMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Opportunities', href: '/opportunities' },
    { label: 'Live Projects', href: '/projects' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Universities', href: '/universities' },
    { label: 'Impact', href: '/impact' },
  ];

  const handleSwitchDemoRole = async (targetRole: typeof DEMO_ROLES[0]) => {
    setDemoMenuOpen(false);
    setMobileMenuOpen(false);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetRole.email, password: targetRole.password }),
      });
      if (res.ok) {
        const data = await res.json();
        login(data.user);
        router.push(targetRole.path);
        router.refresh();
      }
    } catch (err) {
      console.error('Demo switch failed:', err);
    }
  };

  // Dedicated modern workspace layout is used for /dashboard routes
  if (pathname && pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header
      className="a2-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--surface-white)',
        borderBottom: '1px solid var(--border-medium)',
      }}
    >
      <div
        className="a2-container a2-nav-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem',
        }}
      >
        {/* Brand Logo (Section 4 & 14) */}
        <Link href="/" className="a2-logo" id="nav-brand-logo" style={{ textDecoration: 'none' }}>
          <span
            style={{
              backgroundColor: 'var(--color-blue)',
              color: '#FFFFFF',
              padding: '0.2rem 0.5rem',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            A2
          </span>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
            TalentBridge
          </span>
        </Link>

        {/* Center: Clean role-aware navigation */}
        <nav className="a2-nav-links" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`a2-nav-link ${isActive ? 'active' : ''}`}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-blue)' : 'var(--neutral-600)',
                  borderBottom: isActive ? '2px solid var(--color-blue)' : '2px solid transparent',
                  padding: '0.35rem 0.15rem',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle, Controlled Demo Switcher, Auth State */}
        <div className="a2-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          
          {/* Subtle Controlled Demo Switcher (Section 16: Not primary product feature) */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              type="button"
              id="nav-role-switcher-btn"
              onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              title="Demo Evaluation: Switch Test Roles"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--neutral-500)',
                backgroundColor: 'var(--soft-canvas)',
                border: '1px solid var(--border-medium)',
                borderRadius: '6px',
                padding: '0.3rem 0.55rem',
                cursor: 'pointer',
              }}
            >
              <FlaskConical size={12} color="var(--neutral-400)" />
              <span>Demo</span>
              <ChevronDown size={11} color="var(--neutral-400)" />
            </button>

            {demoMenuOpen && (
              <div
                id="nav-role-dropdown-menu"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  width: '230px',
                  backgroundColor: 'var(--surface-white)',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: '10px',
                  boxShadow: 'var(--shadow-dropdown)',
                  padding: '0.4rem',
                  zIndex: 100,
                }}
              >
                <div style={{ padding: '0.3rem 0.5rem', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Test Role Accounts
                </div>
                {DEMO_ROLES.map((r) => {
                  const isCurrent = user?.primaryRole === r.key;
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      id={`switch-to-${r.key.toLowerCase()}-btn`}
                      onClick={() => handleSwitchDemoRole(r)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '0.45rem 0.6rem',
                        borderRadius: '6px',
                        backgroundColor: isCurrent ? 'var(--soft-canvas)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.8125rem',
                        fontWeight: isCurrent ? 700 : 500,
                        color: 'var(--nordic-slate)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Icon size={14} color={r.color} />
                        {r.label}
                      </span>
                      {isCurrent && <Check size={13} color="var(--color-emerald)" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            id="theme-toggle-btn"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle dark/light theme"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: 'var(--soft-canvas)',
              border: '1px solid var(--border-medium)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? (
              <Sun size={15} style={{ color: '#FBBF24' }} />
            ) : (
              <Moon size={15} style={{ color: 'var(--neutral-600)' }} />
            )}
          </button>

          {/* User Auth: Authenticated profile vs Public Log in / Join A2 */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Link
                href={
                  user.primaryRole === 'COMPANY'
                    ? '/dashboard/company'
                    : user.primaryRole === 'UNIVERSITY'
                    ? '/dashboard/university'
                    : user.primaryRole === 'ADMIN'
                    ? '/dashboard/admin'
                    : '/dashboard/student'
                }
                className="btn btn-primary btn-sm"
                id="nav-dashboard-btn"
                style={{
                  fontWeight: 700,
                  padding: '0.45rem 0.95rem',
                  fontSize: '0.8125rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-blue)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                Dashboard
              </Link>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--nordic-slate)', lineHeight: 1.1 }}>
                  {user.firstName} {user.lastName}
                </span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--neutral-500)', fontWeight: 600 }}>
                  {DEMO_ROLES.find((r) => r.key === user.primaryRole)?.label || user.primaryRole}
                </span>
              </div>

              <button
                type="button"
                onClick={() => logout()}
                className="btn btn-secondary btn-sm"
                title="Log out"
                id="nav-logout-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  backgroundColor: 'var(--soft-canvas)',
                  borderColor: 'var(--border-medium)',
                  color: 'var(--neutral-600)',
                }}
              >
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link
                href="/login"
                className="btn btn-secondary btn-sm"
                id="nav-login-btn"
                style={{
                  fontWeight: 600,
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.8125rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--soft-canvas)',
                  borderColor: 'var(--border-medium)',
                  color: 'var(--nordic-slate)',
                  textDecoration: 'none',
                }}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="btn btn-primary btn-sm"
                id="nav-register-btn"
                style={{
                  fontWeight: 700,
                  padding: '0.45rem 0.95rem',
                  fontSize: '0.8125rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-blue)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                }}
              >
                Join A2
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            id="mobile-nav-toggle"
            style={{
              padding: '0.4rem',
              borderRadius: '6px',
              backgroundColor: 'var(--soft-canvas)',
              border: '1px solid var(--border-medium)',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            backgroundColor: 'var(--surface-white)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '1.25rem 1.5rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: pathname === link.href ? 700 : 500,
                  color: pathname === link.href ? 'var(--color-blue)' : 'var(--nordic-slate)',
                  padding: '0.25rem 0',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-hairline)' }}>
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, textAlign: 'center' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, textAlign: 'center', backgroundColor: 'var(--color-blue)' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join A2
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
