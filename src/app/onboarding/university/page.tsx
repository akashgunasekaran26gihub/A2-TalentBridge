'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, ArrowRight, AlertCircle } from 'lucide-react';

export default function UniversityOnboardingPage() {
  const router = useRouter();

  const [universityName, setUniversityName] = useState('Riga Technical University');
  const [institutionType, setInstitutionType] = useState('Public University');
  const [city, setCity] = useState('Riga');
  const [rectorOrDean, setRectorOrDean] = useState('Prof. Tālis Juhna');
  const [contactEmail, setContactEmail] = useState('coordinator@rtu.lv');
  const [academicPrograms, setAcademicPrograms] = useState('Computer Science, Robotics, Telecommunications, Civil Engineering');
  const [website, setWebsite] = useState('https://www.rtu.lv');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/onboarding/university', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          universityName,
          institutionType,
          city,
          rectorOrDean,
          contactEmail,
          academicPrograms,
          website: website || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete university registration');
      }

      router.push('/dashboard/university');
    } catch (err: any) {
      setError(err.message || 'Error saving institution details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '3.5rem 0 5rem 0' }}>
      <div className="a2-container" style={{ maxWidth: '680px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="tag tag-emerald" style={{ marginBottom: '0.75rem' }}>
            Academic Profile
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Institutional Registration
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            Configure your institutional hub to monitor student experiential projects, verify student credentials, and review employability outcomes.
          </p>
        </div>

        <div className="a2-card" style={{ padding: '2.5rem' }}>
          {error && (
            <div
              style={{
                backgroundColor: 'var(--color-red-light)',
                color: 'var(--color-red)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-input)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--color-red-border)',
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Institution Name</label>
              <input
                type="text"
                id="name"
                required
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
                className="form-input"
                placeholder="e.g. Riga Technical University"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="type">Institution Classification</label>
                <select id="type" value={institutionType} onChange={(e) => setInstitutionType(e.target.value)} className="form-select">
                  <option value="Public University">Public University</option>
                  <option value="Technical University">Technical University</option>
                  <option value="Business College">Business College</option>
                  <option value="Vocational College">Vocational College</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="city">Main Campus City in Latvia</label>
                <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className="form-select">
                  <option value="Riga">Riga</option>
                  <option value="Liepāja">Liepāja</option>
                  <option value="Jelgava">Jelgava</option>
                  <option value="Daugavpils">Daugavpils</option>
                  <option value="Valmiera">Valmiera</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="rector">Rector / Dean / Authorized Officer</label>
                <input
                  type="text"
                  id="rector"
                  required
                  value={rectorOrDean}
                  onChange={(e) => setRectorOrDean(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Prof. Gundars Bērziņš"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Coordinator Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="form-input"
                  placeholder="coordinator@university.lv"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="programs">Participating Academic Programs</label>
              <input
                type="text"
                id="programs"
                required
                value={academicPrograms}
                onChange={(e) => setAcademicPrograms(e.target.value)}
                className="form-input"
                placeholder="e.g. Computer Science, Data Science, Mechanical Engineering, Business"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label" htmlFor="website">Official Institutional Website</label>
              <input
                type="url"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="form-input"
                placeholder="https://www.university.lv"
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }} id="uni-onboarding-submit-btn">
              {loading ? 'Registering Institution...' : 'Complete Institutional Registration'} <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

