'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StudentOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [universityName, setUniversityName] = useState('Riga Technical University');
  const [degree, setDegree] = useState('Bachelor');
  const [fieldOfStudy, setFieldOfStudy] = useState('Computer Science');
  const [studyYear, setStudyYear] = useState(3);
  const [city, setCity] = useState('Riga');

  const [selectedSkills, setSelectedSkills] = useState<string[]>(['TypeScript', 'React', 'Node.js']);
  const [availabilityStatus, setAvailabilityStatus] = useState<'AVAILABLE' | 'INTERNSHIP_ONLY' | 'BUSY'>('AVAILABLE');
  const [weeklyHours, setWeeklyHours] = useState(20);
  const [preferredType, setPreferredType] = useState<'REMOTE' | 'HYBRID' | 'ON_SITE' | 'ANY'>('HYBRID');

  const [headline, setHeadline] = useState('Full-Stack Software Engineering Student');
  const [bio, setBio] = useState('Passionate about developing scalable modern web applications and contributing to real-world Baltic enterprise projects.');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');

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

  const handleNext = () => {
    setError('');
    if (currentStep === 1) {
      if (!fieldOfStudy.trim()) {
        setError('Please enter your field of study.');
        return;
      }
    } else if (currentStep === 2) {
      if (selectedSkills.length === 0) {
        setError('Please select at least one core skill.');
        return;
      }
    } else if (currentStep === 3) {
      if (!headline.trim()) {
        setError('Please enter a short professional headline.');
        return;
      }
      if (bio.trim().length < 20) {
        setError('Please enter a bio of at least 20 characters.');
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/onboarding/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          universityName,
          degree,
          fieldOfStudy,
          studyYear: Number(studyYear),
          city,
          headline,
          bio,
          availabilityStatus,
          weeklyHours: Number(weeklyHours),
          preferredType,
          skills: selectedSkills,
          githubUrl: githubUrl || undefined,
          portfolioUrl: portfolioUrl || undefined,
          linkedinUrl: linkedinUrl || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save student profile');
      }

      router.push('/dashboard/student');
    } catch (err: any) {
      setError(err.message || 'Error saving student profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '3.5rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* Step Progress Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Step {currentStep} of 4: {currentStep === 1 ? 'Education' : currentStep === 2 ? 'Skills & Availability' : currentStep === 3 ? 'Summary & Links' : 'Review & Launch'}
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)' }}>
              {Math.round((currentStep / 4) * 100)}% Complete
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }} />
          </div>
        </div>

        <div className="a2-card" style={{ padding: '2rem' }}>
          {error && (
            <div
              style={{
                backgroundColor: 'var(--color-red-light)',
                color: 'var(--color-red)',
                padding: '0.625rem 0.875rem',
                borderRadius: 'var(--radius-input)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                marginBottom: '1.25rem',
                border: '1px solid var(--color-red-border)',
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: EDUCATION & LOCATION */}
          {currentStep === 1 && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                Academic Information
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Tell us about your studies in Latvia.
              </p>

              <div className="form-group">
                <label className="form-label" htmlFor="uni">University / Higher Education Institution</label>
                <select id="uni" value={universityName} onChange={(e) => setUniversityName(e.target.value)} className="form-select">
                  <option value="Riga Technical University">Riga Technical University (RTU)</option>
                  <option value="University of Latvia">University of Latvia (LU)</option>
                  <option value="Riga Business School">Riga Business School (RBS)</option>
                  <option value="Turiba University">Turība University</option>
                  <option value="Liepaja University">Liepāja University</option>
                  <option value="Other Institution">Other Accredited Institution</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="degree">Degree Level</label>
                  <select id="degree" value={degree} onChange={(e) => setDegree(e.target.value)} className="form-select">
                    <option value="Bachelor">Bachelor Degree</option>
                    <option value="Master">Master Degree</option>
                    <option value="PhD">Doctoral / PhD</option>
                    <option value="Vocational">Vocational</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="year">Current Year</label>
                  <select id="year" value={studyYear} onChange={(e) => setStudyYear(Number(e.target.value))} className="form-select">
                    <option value={1}>Year 1</option>
                    <option value={2}>Year 2</option>
                    <option value={3}>Year 3</option>
                    <option value={4}>Year 4</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="field">Field of Study</label>
                <input
                  type="text"
                  id="field"
                  required
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Computer Science, Economics, UI/UX"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="city">City in Latvia</label>
                <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className="form-select">
                  <option value="Riga">Riga</option>
                  <option value="Liepāja">Liepāja</option>
                  <option value="Jelgava">Jelgava</option>
                  <option value="Daugavpils">Daugavpils</option>
                  <option value="Valmiera">Valmiera</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: SKILLS & AVAILABILITY */}
          {currentStep === 2 && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                Skills & Availability
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                Select skills you want included in your matching profile.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {availableSkills.map((s) => {
                  const isSelected = selectedSkills.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSkill(s)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-pill)',
                        border: `1px solid ${isSelected ? 'var(--color-blue)' : 'var(--border-subtle)'}`,
                        backgroundColor: isSelected ? 'var(--color-blue-light)' : '#FFFFFF',
                        color: isSelected ? 'var(--color-blue)' : 'var(--neutral-700)',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      {isSelected && <CheckCircle2 size={12} />}
                      <span>{s}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="avail">Availability Status</label>
                  <select
                    id="avail"
                    value={availabilityStatus}
                    onChange={(e) => setAvailabilityStatus(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="AVAILABLE">Available for Projects</option>
                    <option value="INTERNSHIP_ONLY">Internship Only</option>
                    <option value="BUSY">Busy with Coursework</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="hours">Weekly Hours</label>
                  <select id="hours" value={weeklyHours} onChange={(e) => setWeeklyHours(Number(e.target.value))} className="form-select">
                    <option value={10}>10 hrs / week</option>
                    <option value={20}>20 hrs / week</option>
                    <option value={30}>30 hrs / week</option>
                    <option value={40}>40 hrs / week</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SUMMARY & LINKS */}
          {currentStep === 3 && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                Profile Summary & Links
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Describe your goals and link online portfolios.
              </p>

              <div className="form-group">
                <label className="form-label" htmlFor="headline">Headline</label>
                <input
                  type="text"
                  id="headline"
                  required
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Full-Stack Developer passionate about Cloud Systems"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="bio">About You (min 20 characters)</label>
                <textarea
                  id="bio"
                  rows={3}
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="form-textarea"
                  placeholder="Describe your technical interests, project experiences, and career ambitions..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="gh">GitHub Profile (Optional)</label>
                  <input
                    type="url"
                    id="gh"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="form-input"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="li">LinkedIn (Optional)</label>
                  <input
                    type="url"
                    id="li"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="form-input"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & LAUNCH */}
          {currentStep === 4 && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                Review Your Profile
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Verify your details before launching your student dashboard.
              </p>

              <div style={{ backgroundColor: 'var(--neutral-50)', padding: '1rem', borderRadius: 'var(--radius-input)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Institution:</strong> {universityName} ({degree}, Year {studyYear})
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Field of Study:</strong> {fieldOfStudy} in {city}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Headline:</strong> {headline}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Skills:</strong> {selectedSkills.join(', ')}
                </div>
                <div>
                  <strong>Availability:</strong> {availabilityStatus} ({weeklyHours} hrs/week)
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-emerald-light)', padding: '0.875rem', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-emerald-border)', fontSize: '0.8125rem', color: 'var(--color-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={16} />
                <span>Profile completeness will be computed and verified skills will be matched automatically.</span>
              </div>
            </div>
          )}

          {/* Action Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            {currentStep > 1 ? (
              <button type="button" onClick={handleBack} className="btn btn-secondary btn-sm">
                <ArrowLeft size={14} /> Back
              </button>
            ) : <div />}

            {currentStep < 4 ? (
              <button type="button" onClick={handleNext} className="btn btn-primary btn-sm">
                Next Step <ArrowRight size={14} />
              </button>
            ) : (
              <button type="button" disabled={loading} onClick={handleSubmit} className="btn btn-primary btn-sm" id="complete-onboarding-btn">
                {loading ? 'Finalizing Profile...' : 'Complete Profile & Open Dashboard'} <CheckCircle2 size={14} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
