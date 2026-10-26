'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, AlertCircle, GraduationCap, Building2, Award, Shield } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid email or password');
      }

      // Update client session
      login(data.user);

      if (redirectUrl) {
        router.push(redirectUrl);
        return;
      }

      // Route by role
      const primaryRole = data.user.primaryRole;
      if (primaryRole === 'ADMIN') {
        router.push('/dashboard/admin');
      } else if (primaryRole === 'COMPANY') {
        router.push('/dashboard/company');
      } else if (primaryRole === 'UNIVERSITY') {
        router.push('/dashboard/university');
      } else {
        router.push('/dashboard/student');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-app)',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem',
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(30, 58, 138, 0.05) 0%, transparent 60%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              textDecoration: 'none',
            }}
          >
            <span className="a2-logo-badge">A2</span>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--nordic-slate)' }}>
              TalentBridge
            </span>
          </Link>
          <h1
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: 'var(--nordic-slate)',
              letterSpacing: '-0.02em',
              marginBottom: '0.35rem',
            }}
          >
            Sign in to your workspace
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--neutral-500)' }}>
            Welcome back to the Latvian ecosystem network
          </p>
        </div>

        {/* Focused Card */}
        <div
          className="a2-card"
          style={{
            padding: '2.25rem',
            backgroundColor: 'var(--surface-white)',
            border: '1.5px solid var(--border-medium)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-elevation)',
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: 'var(--color-red-light)',
                color: 'var(--color-red)',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                marginBottom: '1.25rem',
                border: '1px solid var(--color-red-border)',
                fontWeight: 600,
              }}
            >
              <AlertCircle size={17} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '1.15rem' }}>
              <label
                className="form-label"
                htmlFor="email"
                style={{ color: 'var(--neutral-700)', fontWeight: 700, fontSize: '0.84375rem' }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="name@organization.lv"
                style={{
                  backgroundColor: 'var(--soft-canvas)',
                  border: '1.5px solid var(--border-medium)',
                  color: 'var(--nordic-slate)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.9375rem',
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label
                  className="form-label"
                  htmlFor="password"
                  style={{ color: 'var(--neutral-700)', fontWeight: 700, fontSize: '0.84375rem' }}
                >
                  Password
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--baltic-blue)',
                    fontWeight: 600,
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••••••"
                style={{
                  backgroundColor: 'var(--soft-canvas)',
                  border: '1.5px solid var(--border-medium)',
                  color: 'var(--nordic-slate)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.9375rem',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: 'var(--baltic-navy)',
                fontWeight: 700,
                borderRadius: '10px',
                fontSize: '0.9375rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: 'var(--shadow-glow-blue)',
              }}
              id="submit-login-btn"
            >
              {loading ? 'Signing in...' : 'Sign in to Platform'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Quick Demo Accounts Fill */}
          <div
            style={{
              margin: '1.75rem 0 1rem 0',
              textAlign: 'center',
              borderTop: '1px solid var(--border-hairline)',
              paddingTop: '1.25rem',
            }}
          >
            <span
              style={{
                fontSize: '0.71875rem',
                color: 'var(--neutral-500)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              One-Click Demo Roles
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                id="demo-student-btn"
                onClick={() => fillDemoAccount('arturs.berzins@edu.rtu.lv', 'A2Bridge2026!')}
                className="btn btn-secondary btn-sm"
                style={{
                  fontSize: '0.78125rem',
                  fontWeight: 600,
                  justifyContent: 'flex-start',
                  gap: '0.45rem',
                  padding: '0.5rem 0.65rem',
                  backgroundColor: 'var(--soft-canvas)',
                  borderColor: 'var(--border-medium)',
                  color: 'var(--nordic-slate)',
                  borderRadius: '8px',
                }}
              >
                <GraduationCap size={15} color="var(--baltic-navy)" /> Student
              </button>
              <button
                type="button"
                id="demo-company-btn"
                onClick={() => fillDemoAccount('talent@demotech.lv', 'A2Bridge2026!')}
                className="btn btn-secondary btn-sm"
                style={{
                  fontSize: '0.78125rem',
                  fontWeight: 600,
                  justifyContent: 'flex-start',
                  gap: '0.45rem',
                  padding: '0.5rem 0.65rem',
                  backgroundColor: 'var(--soft-canvas)',
                  borderColor: 'var(--border-medium)',
                  color: 'var(--nordic-slate)',
                  borderRadius: '8px',
                }}
              >
                <Building2 size={15} color="var(--riga-amber)" /> Company
              </button>
              <button
                type="button"
                id="demo-university-btn"
                onClick={() => fillDemoAccount('coordinator@rtu.lv', 'A2Bridge2026!')}
                className="btn btn-secondary btn-sm"
                style={{
                  fontSize: '0.78125rem',
                  fontWeight: 600,
                  justifyContent: 'flex-start',
                  gap: '0.45rem',
                  padding: '0.5rem 0.65rem',
                  backgroundColor: 'var(--soft-canvas)',
                  borderColor: 'var(--border-medium)',
                  color: 'var(--nordic-slate)',
                  borderRadius: '8px',
                }}
              >
                <Award size={15} color="var(--brand-emerald)" /> University
              </button>
              <button
                type="button"
                id="demo-admin-btn"
                onClick={() => fillDemoAccount('admin@a2talentbridge.lv', 'AdminRiga2026!')}
                className="btn btn-secondary btn-sm"
                style={{
                  fontSize: '0.78125rem',
                  fontWeight: 600,
                  justifyContent: 'flex-start',
                  gap: '0.45rem',
                  padding: '0.5rem 0.65rem',
                  backgroundColor: 'var(--soft-canvas)',
                  borderColor: 'var(--border-medium)',
                  color: 'var(--nordic-slate)',
                  borderRadius: '8px',
                }}
              >
                <Shield size={15} color="var(--baltic-blue)" /> Admin
              </button>
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              fontSize: '0.875rem',
              color: 'var(--neutral-500)',
            }}
          >
            New to A2 TalentBridge?{' '}
            <Link
              href="/register"
              id="login-create-account-link"
              style={{
                color: 'var(--baltic-blue)',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Create an account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: '5rem 0', textAlign: 'center' }}>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
