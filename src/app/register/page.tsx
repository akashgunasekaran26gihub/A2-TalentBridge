'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Building2, Award, ArrowRight, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'STUDENT' | 'COMPANY' | 'UNIVERSITY'>('STUDENT');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Seamlessly route to role onboarding
      if (role === 'STUDENT') {
        router.push('/onboarding/student');
      } else if (role === 'COMPANY') {
        router.push('/onboarding/company');
      } else {
        router.push('/onboarding/university');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
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
      <div style={{ width: '100%', maxWidth: '520px' }}>
        
        {/* Header */}
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
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--baltic-navy)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
              display: 'inline-block',
              backgroundColor: 'var(--baltic-navy-light)',
              padding: '0.2rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid var(--border-medium)',
            }}
          >
            Step 1 of 2: Create Account
          </div>
          <h1
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: 'var(--nordic-slate)',
              letterSpacing: '-0.02em',
              marginBottom: '0.35rem',
            }}
          >
            Join A2 TalentBridge
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--neutral-500)' }}>
            Connect with verified internships, projects, and talent in Latvia
          </p>
        </div>

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

          {/* Role Selection Cards */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              className="form-label"
              style={{
                marginBottom: '0.5rem',
                display: 'block',
                color: 'var(--neutral-700)',
                fontWeight: 700,
                fontSize: '0.84375rem',
              }}
            >
              I am joining as:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <button
                type="button"
                id="register-role-student"
                onClick={() => setRole('STUDENT')}
                style={{
                  padding: '0.85rem 0.5rem',
                  borderRadius: '10px',
                  border: `1.5px solid ${role === 'STUDENT' ? 'var(--baltic-navy)' : 'var(--border-medium)'}`,
                  backgroundColor: role === 'STUDENT' ? 'var(--baltic-navy-light)' : 'var(--soft-canvas)',
                  color: role === 'STUDENT' ? 'var(--baltic-navy)' : 'var(--neutral-600)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  boxShadow: role === 'STUDENT' ? '0 2px 8px rgba(30, 58, 138, 0.15)' : 'none',
                }}
              >
                <GraduationCap size={22} color={role === 'STUDENT' ? 'var(--baltic-navy)' : 'currentColor'} />
                <span style={{ fontWeight: 700, fontSize: '0.8125rem' }}>Student</span>
              </button>

              <button
                type="button"
                id="register-role-company"
                onClick={() => setRole('COMPANY')}
                style={{
                  padding: '0.85rem 0.5rem',
                  borderRadius: '10px',
                  border: `1.5px solid ${role === 'COMPANY' ? 'var(--riga-amber)' : 'var(--border-medium)'}`,
                  backgroundColor: role === 'COMPANY' ? 'var(--riga-amber-light)' : 'var(--soft-canvas)',
                  color: role === 'COMPANY' ? 'var(--riga-amber)' : 'var(--neutral-600)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  boxShadow: role === 'COMPANY' ? '0 2px 8px rgba(217, 119, 6, 0.15)' : 'none',
                }}
              >
                <Building2 size={22} color={role === 'COMPANY' ? 'var(--riga-amber)' : 'currentColor'} />
                <span style={{ fontWeight: 700, fontSize: '0.8125rem' }}>Company</span>
              </button>

              <button
                type="button"
                id="register-role-university"
                onClick={() => setRole('UNIVERSITY')}
                style={{
                  padding: '0.85rem 0.5rem',
                  borderRadius: '10px',
                  border: `1.5px solid ${role === 'UNIVERSITY' ? 'var(--brand-emerald)' : 'var(--border-medium)'}`,
                  backgroundColor: role === 'UNIVERSITY' ? 'var(--brand-emerald-light)' : 'var(--soft-canvas)',
                  color: role === 'UNIVERSITY' ? 'var(--brand-emerald)' : 'var(--neutral-600)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  boxShadow: role === 'UNIVERSITY' ? '0 2px 8px rgba(5, 150, 105, 0.15)' : 'none',
                }}
              >
                <Award size={22} color={role === 'UNIVERSITY' ? 'var(--brand-emerald)' : 'currentColor'} />
                <span style={{ fontWeight: 700, fontSize: '0.8125rem' }}>University</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleRegister}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.15rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label
                  className="form-label"
                  htmlFor="firstName"
                  style={{ color: 'var(--neutral-700)', fontWeight: 700, fontSize: '0.84375rem' }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-input"
                  placeholder="Artūrs"
                  style={{
                    backgroundColor: 'var(--soft-canvas)',
                    border: '1.5px solid var(--border-medium)',
                    color: 'var(--nordic-slate)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label
                  className="form-label"
                  htmlFor="lastName"
                  style={{ color: 'var(--neutral-700)', fontWeight: 700, fontSize: '0.84375rem' }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-input"
                  placeholder="Bērziņš"
                  style={{
                    backgroundColor: 'var(--soft-canvas)',
                    border: '1.5px solid var(--border-medium)',
                    color: 'var(--nordic-slate)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                  }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.15rem' }}>
              <label
                className="form-label"
                htmlFor="email"
                style={{ color: 'var(--neutral-700)', fontWeight: 700, fontSize: '0.84375rem' }}
              >
                {role === 'STUDENT' ? 'University / Academic Email' : 'Work Email'}
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder={role === 'STUDENT' ? 'name@edu.rtu.lv' : 'name@company.lv'}
                style={{
                  backgroundColor: 'var(--soft-canvas)',
                  border: '1.5px solid var(--border-medium)',
                  color: 'var(--nordic-slate)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label
                className="form-label"
                htmlFor="password"
                style={{ color: 'var(--neutral-700)', fontWeight: 700, fontSize: '0.84375rem' }}
              >
                Password (min 8 characters)
              </label>
              <input
                type="password"
                id="password"
                required
                minLength={8}
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
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', margin: '1.25rem 0' }}>
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ marginTop: '3px', cursor: 'pointer' }}
              />
              <label htmlFor="agreeTerms" style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', lineHeight: 1.45, cursor: 'pointer' }}>
                I agree to the <Link href="/terms" target="_blank" style={{ color: 'var(--baltic-blue)', fontWeight: 600 }}>Terms of Service</Link> and <Link href="/privacy" target="_blank" style={{ color: 'var(--baltic-blue)', fontWeight: 600 }}>Privacy Policy</Link>.
              </label>
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
              id="register-submit-btn"
            >
              {loading ? 'Creating Account...' : 'Continue to Setup'} {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              fontSize: '0.875rem',
              color: 'var(--neutral-500)',
            }}
          >
            Already have an account?{' '}
            <Link
              href="/login"
              id="register-login-link"
              style={{
                color: 'var(--baltic-blue)',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Sign in
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
