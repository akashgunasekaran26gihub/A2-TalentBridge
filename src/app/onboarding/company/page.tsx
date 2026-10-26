'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, ArrowRight, AlertCircle } from 'lucide-react';

export default function CompanyOnboardingPage() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState('Baltic Cloud Solutions');
  const [industry, setIndustry] = useState('Information Technology');
  const [companySize, setCompanySize] = useState('11-50');
  const [city, setCity] = useState('Riga');
  const [description, setDescription] = useState('Software engineering consultancy providing cloud architecture and digital transformation services across the Baltic states.');
  const [website, setWebsite] = useState('https://balticcloud.lv');
  const [contactPerson, setContactPerson] = useState('Kaspars Eglītis');
  const [contactEmail, setContactEmail] = useState('talent@balticcloud.lv');
  const [hiringInterests, setHiringInterests] = useState('Software Engineering, Cloud, UI/UX Design');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/onboarding/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          industry,
          companySize,
          city,
          description,
          website: website || undefined,
          contactPerson,
          contactEmail,
          hiringInterests,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete company setup');
      }

      router.push('/dashboard/company');
    } catch (err: any) {
      setError(err.message || 'Error saving company profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '3.5rem 0 5rem 0' }}>
      <div className="a2-container" style={{ maxWidth: '680px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="tag tag-amber" style={{ marginBottom: '0.75rem' }}>
            Employer Profile
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Register Your Organization
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            Set up your company profile to sponsor challenges, post internships, and discover vetted Latvian university talent.
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
              <label className="form-label" htmlFor="name">Legal Company / Brand Name</label>
              <input
                type="text"
                id="name"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="form-input"
                placeholder="e.g. DemoTech Latvia SIA"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="industry">Industry Sector</label>
                <select id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className="form-select">
                  <option value="Information Technology">Information Technology</option>
                  <option value="FinTech & Banking">FinTech & Banking</option>
                  <option value="CleanTech & Energy">CleanTech & Energy</option>
                  <option value="Industrial Manufacturing">Industrial Manufacturing</option>
                  <option value="Consulting & Strategy">Consulting & Strategy</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="size">Organization Size</label>
                <select id="size" value={companySize} onChange={(e) => setCompanySize(e.target.value)} className="form-select">
                  <option value="1-10">1-10 Employees (Startup / SME)</option>
                  <option value="11-50">11-50 Employees</option>
                  <option value="51-200">51-200 Employees</option>
                  <option value="201-500">201-500 Employees</option>
                  <option value="500+">500+ Employees (Enterprise)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="city">Headquarters / Office City in Latvia</label>
                <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className="form-select">
                  <option value="Riga">Riga</option>
                  <option value="Liepāja">Liepāja</option>
                  <option value="Jelgava">Jelgava</option>
                  <option value="Daugavpils">Daugavpils</option>
                  <option value="Valmiera">Valmiera</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="website">Website URL</label>
                <input
                  type="url"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="form-input"
                  placeholder="https://company.lv"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="desc">About the Company (min 20 characters)</label>
              <textarea
                id="desc"
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                placeholder="Describe your company's core mission, products, and culture..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact">Primary Contact Person</label>
                <input
                  type="text"
                  id="contact"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Dace Kļaviņa"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactEmail">Contact Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="form-input"
                  placeholder="hr@company.lv"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" htmlFor="interests">Target Talent Hiring Interests</label>
              <input
                type="text"
                id="interests"
                value={hiringInterests}
                onChange={(e) => setHiringInterests(e.target.value)}
                className="form-input"
                placeholder="e.g. Software Engineering, React, Data Analysis, Sustainability"
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }} id="company-onboarding-submit-btn">
              {loading ? 'Setting Up Organization...' : 'Complete Setup & Open Employer Dashboard'} <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

