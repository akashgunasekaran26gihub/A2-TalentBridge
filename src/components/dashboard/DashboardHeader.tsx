'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Check,
  FlaskConical,
  GraduationCap,
  Building2,
  Landmark,
  Shield,
  X,
  ExternalLink,
} from 'lucide-react';
import { DEMO_ROLES } from '@/components/Navbar';

export default function DashboardHeader() {
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([
    { id: '1', title: 'Opportunity Application Shortlisted', desc: 'DemoTech Latvia moved your application to Interview stage', time: '10m ago', unread: true },
    { id: '2', title: 'New Live Sprint Challenge', desc: 'IoT Green Energy Sensor Challenge launched in Riga', time: '1h ago', unread: true },
    { id: '3', title: 'ECTS Accreditation Milestone Signed', desc: 'Supervisor verified Sprint Week 2 deliverables', time: '1d ago', unread: false },
  ]);

  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const handleRoleSwitch = async (role: typeof DEMO_ROLES[0]) => {
    setRoleMenuOpen(false);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: role.email, password: role.password }),
      });
      if (res.ok) {
        const data = await res.json();
        login(data.user);
        router.push(role.path);
        router.refresh();
      }
    } catch (e) {
      console.error('Role switch failed:', e);
    }
  };

  const pathname = usePathname();

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

  const roleMeta = DEMO_ROLES.find((r) => r.key === currentRole);
  const roleLabel = roleMeta?.label || 'Perspective';

  const getRoleColor = () => {
    if (currentRole === 'COMPANY') return 'var(--color-amber)';
    if (currentRole === 'UNIVERSITY') return 'var(--color-emerald)';
    if (currentRole === 'ADMIN') return 'var(--color-navy)';
    return 'var(--color-blue)';
  };

  return (
    <header
      style={{
        height: '4.25rem',
        backgroundColor: 'var(--surface-white)',
        borderBottom: '1px solid var(--border-medium)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Search Input Bar with Keyboard Shortcut */}
      <div style={{ position: 'relative', width: '360px', maxWidth: '40%' }}>
        <Search
          size={16}
          color="var(--neutral-400)"
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder="Search opportunities, projects, competencies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: 'var(--soft-canvas)',
            border: '1.5px solid var(--border-medium)',
            borderRadius: '10px',
            padding: '0.55rem 3rem 0.55rem 2.25rem',
            fontSize: '0.8125rem',
            color: 'var(--nordic-slate)',
            outline: 'none',
            transition: 'border-color 150ms ease, box-shadow 150ms ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-blue)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30, 58, 138, 0.08)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-medium)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <span
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: 'var(--neutral-400)',
            backgroundColor: 'var(--surface-white)',
            border: '1px solid var(--border-medium)',
            borderRadius: '4px',
            padding: '0.1rem 0.35rem',
            pointerEvents: 'none',
          }}
        >
          ⌘K
        </span>
      </div>

      {/* Right Controls: Notifications, Role Switcher, Theme, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        
        {/* 1. Fast Role Perspective Switcher */}
        <div ref={roleRef} style={{ position: 'relative' }}>
          <button
            type="button"
            id="dash-role-switcher-btn"
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.4rem 0.65rem',
              borderRadius: '8px',
              backgroundColor: 'var(--soft-canvas)',
              border: '1px solid var(--border-medium)',
              color: 'var(--nordic-slate)',
              cursor: 'pointer',
            }}
            title="Switch Demo Role Perspective"
          >
            <FlaskConical size={13} color={getRoleColor()} />
            <span>{roleLabel}</span>
            <ChevronDown size={12} color="var(--neutral-400)" />
          </button>

          {roleMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '240px',
                backgroundColor: 'var(--surface-white)',
                border: '1.5px solid var(--border-medium)',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-dropdown)',
                padding: '0.5rem',
                zIndex: 100,
              }}
            >
              <div style={{ padding: '0.35rem 0.65rem', fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--neutral-400)', letterSpacing: '0.04em' }}>
                Quick Perspective Switch
              </div>
              {DEMO_ROLES.map((r) => {
                const isCurrent = user?.primaryRole === r.key;
                const Icon = r.icon;
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => handleRoleSwitch(r)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      backgroundColor: isCurrent ? 'var(--soft-canvas)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      fontWeight: isCurrent ? 800 : 500,
                      color: 'var(--nordic-slate)',
                      textAlign: 'left',
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

        {/* 2. Interactive Notifications Popover */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            style={{
              position: 'relative',
              width: '36px',
              height: '36px',
              borderRadius: '9px',
              backgroundColor: 'var(--soft-canvas)',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--nordic-slate)',
            }}
            title="Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  backgroundColor: 'var(--color-red)',
                  color: '#FFFFFF',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  fontSize: '0.625rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--surface-white)',
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '320px',
                backgroundColor: 'var(--surface-white)',
                border: '1.5px solid var(--border-medium)',
                borderRadius: '14px',
                boxShadow: 'var(--shadow-dropdown)',
                padding: '0.75rem',
                zIndex: 100,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.5rem', borderBottom: '1px solid var(--border-hairline)', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    style={{ background: 'none', border: 'none', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-blue)', cursor: 'pointer' }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '0.6rem 0.65rem',
                      borderRadius: '8px',
                      backgroundColor: n.unread ? 'var(--color-blue-light)' : 'var(--soft-canvas)',
                      border: '1px solid var(--border-medium)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '0.78125rem', fontWeight: 700, color: 'var(--nordic-slate)' }}>
                        {n.title}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--neutral-400)' }}>
                        {n.time}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.71875rem', color: 'var(--neutral-500)', marginTop: '0.2rem' }}>
                      {n.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '9px',
            backgroundColor: 'var(--soft-canvas)',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={16} color="#FBBF24" /> : <Moon size={16} color="var(--neutral-600)" />}
        </button>

        {/* 4. User Profile Header Pill */}
        {user && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.35rem 0.75rem 0.35rem 0.4rem',
              backgroundColor: 'var(--soft-canvas)',
              border: '1px solid var(--border-medium)',
              borderRadius: '999px',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: getRoleColor(),
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {user.firstName[0]}
            </div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--nordic-slate)', lineHeight: 1.1 }}>
              {user.firstName}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
