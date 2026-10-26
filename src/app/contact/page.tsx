'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '85vh', padding: '3.5rem 0 5rem 0' }}>
      <div className="a2-container" style={{ maxWidth: '880px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="tag tag-blue" style={{ marginBottom: '0.75rem' }}>
            Support & Ecosystem Inquiries
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-navy)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Contact A2 TalentBridge
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto' }}>
            Inquire about university partnerships, enterprise challenge sponsorships, or platform support.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Contact Details Card */}
          <div className="a2-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-navy)' }}>
              Riga Ecosystem Office
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.875rem', color: 'var(--neutral-700)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} color="var(--color-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--color-navy)' }}>A2 TalentBridge Headquarters</strong>
                  <br />
                  Brīvības bulvāris 32, Rīga, LV-1050, Latvia
                  <br />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Timezone: Europe/Riga</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} color="var(--color-blue)" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--color-navy)' }}>Email:</strong> contact@a2talentbridge.lv
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} color="var(--color-blue)" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--color-navy)' }}>Phone:</strong> +371 67 000 000
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginTop: '1.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-navy)' }}>
                Target Market Operation
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Currently supporting students and corporate partners across Riga, Liepāja, Jelgava, Daugavpils, and Valmiera.
              </p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="a2-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-navy)' }}>
              Send an Inquiry
            </h2>

            {submitted ? (
              <div style={{ backgroundColor: 'var(--color-emerald-light)', padding: '1.75rem', borderRadius: 'var(--radius-input)', textAlign: 'center', border: '1px solid var(--color-emerald-border)' }}>
                <CheckCircle2 size={32} color="var(--color-emerald)" style={{ margin: '0 auto 0.5rem auto' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-emerald)', marginBottom: '0.35rem' }}>
                  Inquiry Received
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--neutral-700)', lineHeight: 1.5 }}>
                  Thank you! An ecosystem coordinator in Riga will review your message and reply within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input type="text" id="name" required className="form-input" placeholder="e.g. Kaspars Bērziņš" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input type="email" id="email" required className="form-input" placeholder="name@domain.lv" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="stakeholder">Stakeholder Type</label>
                  <select id="stakeholder" className="form-select">
                    <option value="student">Student / Graduate</option>
                    <option value="company">Company / Employer</option>
                    <option value="university">University / Faculty Coordinator</option>
                    <option value="ngo">Community / NGO</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea id="message" rows={3} required className="form-textarea" placeholder="How can we assist you with A2 TalentBridge?"></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '0.5rem' }} id="contact-submit-btn">
                  Send Inquiry <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

