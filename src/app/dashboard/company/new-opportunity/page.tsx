'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewOpportunityPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [opportunityType, setOpportunityType] = useState('Internship');
  const [description, setDescription] = useState('');
  const [locationCity, setLocationCity] = useState('Riga');
  const [remoteType, setRemoteType] = useState('Hybrid');
  const [durationWeeks, setDurationWeeks] = useState(12);
  const [stipendEur, setStipendEur] = useState(900);
  const [applicationDeadline, setApplicationDeadline] = useState('2026-11-30');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['TypeScript', 'React']);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const availableSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'FastAPI',
    'PostgreSQL', 'Data Analysis', 'UI/UX Design', 'Project Management',
    'Sustainability', 'Communication', 'Leadership', 'Problem Solving',
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedSkills.length === 0) {
      setError('Please select at least one required skill.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          opportunityType,
          description,
          locationCity,
          remoteType,
          durationWeeks: Number(durationWeeks),
          stipendEur: Number(stipendEur),
          applicationDeadline: new Date(applicationDeadline).toISOString(),
          skills: selectedSkills,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to post opportunity');
      }

      router.push('/dashboard/company');
    } catch (err: any) {
      setError(err.message || 'Error publishing opportunity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '3rem 0 5rem 0' }}>
      <div className="a2-container" style={{ maxWidth: '720px' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <Link
            href="/dashboard/company"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={14} /> Back to Company Dashboard
          </Link>
        </div>

        <div className="a2-card" style={{ padding: '2.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.35rem' }}>
            Publish New Opportunity
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1.75rem' }}>
            Reach pre-screened university candidates in Latvia for internships, live projects, or sponsored challenges.
          </p>

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
              <label className="form-label" htmlFor="title">Opportunity Title</label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                placeholder="e.g. Junior Frontend Developer Internship"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="type">Opportunity Type</label>
                <select id="type" value={opportunityType} onChange={(e) => setOpportunityType(e.target.value)} className="form-select">
                  <option value="Internship">Internship</option>
                  <option value="Live Project">Live Project</option>
                  <option value="Challenge">Challenge</option>
                  <option value="Job">Job (Graduate Placement)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="remote">Format</label>
                <select id="remote" value={remoteType} onChange={(e) => setRemoteType(e.target.value)} className="form-select">
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote (Everywhere in Latvia/EU)</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="desc">Detailed Description (min 20 characters)</label>
              <textarea
                id="desc"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                placeholder="Describe project responsibilities, learning mentorship, and expectations..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="city">Latvia City</label>
                <select id="city" value={locationCity} onChange={(e) => setLocationCity(e.target.value)} className="form-select">
                  <option value="Riga">Riga</option>
                  <option value="Liepāja">Liepāja</option>
                  <option value="Jelgava">Jelgava</option>
                  <option value="Daugavpils">Daugavpils</option>
                  <option value="Valmiera">Valmiera</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="stipend">Monthly Stipend (€)</label>
                <input
                  type="number"
                  id="stipend"
                  min={0}
                  step={50}
                  value={stipendEur}
                  onChange={(e) => setStipendEur(Number(e.target.value))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="duration">Duration (Weeks)</label>
                <input
                  type="number"
                  id="duration"
                  min={1}
                  max={52}
                  value={durationWeeks}
                  onChange={(e) => setDurationWeeks(Number(e.target.value))}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" htmlFor="deadline">Application Deadline (Europe/Riga Timezone)</label>
              <input
                type="date"
                id="deadline"
                required
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Skills selection */}
            <div style={{ marginBottom: '2rem' }}>
              <label className="form-label">
                Required Competencies & Skills
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                {availableSkills.map((s) => {
                  const isSelected = selectedSkills.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSkill(s)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-button)',
                        border: `1px solid ${isSelected ? 'var(--color-blue)' : 'var(--border-subtle)'}`,
                        backgroundColor: isSelected ? 'var(--color-blue-light)' : 'white',
                        color: isSelected ? 'var(--color-blue)' : 'var(--neutral-700)',
                        fontWeight: 600,
                        fontSize: '0.8125rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        cursor: 'pointer',
                      }}
                    >
                      {isSelected && <CheckCircle2 size={12} color="var(--color-blue)" />}
                      <span>{s}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }} id="submit-publish-btn">
              {loading ? 'Publishing Opportunity...' : 'Publish to Latvia Ecosystem'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

