import React, { useEffect, useRef, useState } from 'react';
import { submitContact } from '../utils/api';
import CountUp from '../components/ui/CountUp';

interface ContactPageProps {
  onPageChange?: (page: string) => void;
}

interface TicketPrefill {
  subject?: string;
  source?: string;
  people?: number;
  eventName?: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ onPageChange: _onPageChange }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isTicketing, setIsTicketing] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [attendees, setAttendees] = useState<string[]>(['']);
  const [eventName, setEventName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  // Load ticket prefill from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('abha_ticketing_prefill');
      if (raw) {
        const data: TicketPrefill = JSON.parse(raw);
        if (data.subject === 'Ticketing') {
          setIsTicketing(true);
          setSubject('Ticketing');
          if (data.eventName) setEventName(data.eventName);
          else if (data.source) {
            const readable = data.source.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            setEventName(readable);
          }
          setAttendeeCount(data.people && data.people > 0 ? data.people : 1);
          setAttendees(Array.from({ length: data.people && data.people > 0 ? data.people : 1 }, () => ''));
          // Scroll after slight delay
          setTimeout(() => {
            if (formRef.current) {
              const rect = formRef.current.getBoundingClientRect();
              const scrollTop = window.pageYOffset + rect.top - 180; // increased offset for higher placement
              window.scrollTo({ top: scrollTop, behavior: 'smooth' });
            }
          }, 250);
        }
        // Clear so subsequent visits are fresh
        localStorage.removeItem('abha_ticketing_prefill');
      }
    } catch {}
  }, []);

  // Adjust attendees array when attendeeCount changes
  useEffect(() => {
    setAttendees(prev => {
      if (attendeeCount > prev.length) {
        return [...prev, ...Array.from({ length: attendeeCount - prev.length }, () => '')];
      } else if (attendeeCount < prev.length) {
        return prev.slice(0, attendeeCount);
      }
      return prev;
    });
  }, [attendeeCount]);

  const handleAttendeeChange = (index: number, value: string) => {
    setAttendees(prev => prev.map((v, i) => (i === index ? value : v)));
  };

  // Persist partial form state (excluding attendees list for simplicity) to sessionStorage
  useEffect(() => {
    const key = 'abha_contact_draft_v1';
  const data = { fullName, email, phone, subject, message, attendeeCount, attendees, eventName };
    try { sessionStorage.setItem(key, JSON.stringify(data)); } catch {}
  }, [fullName, email, phone, subject, message, attendeeCount, attendees]);

  // Load draft if exists and not ticketing prefill
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('abha_contact_draft_v1');
      if (raw) {
        const d = JSON.parse(raw);
        if (!fullName && d.fullName) setFullName(d.fullName);
        if (!email && d.email) setEmail(d.email);
        if (!phone && d.phone) setPhone(d.phone);
        if (!subject && d.subject) setSubject(d.subject);
        if (!message && d.message) setMessage(d.message);
        if (d.attendeeCount) setAttendeeCount(d.attendeeCount);
        if (Array.isArray(d.attendees)) setAttendees(d.attendees);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // Basic validation
      if (!isTicketing && !fullName.trim()) throw new Error('Name required');
      if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) throw new Error('Valid email required');
      if (isTicketing) {
        if (attendees.some(a => !a.trim())) throw new Error('All attendee names required');
      } else if (!message.trim()) throw new Error('Message required');

      await submitContact({
        fullName: isTicketing ? (attendees[0]?.trim() || '') : fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subject || (isTicketing ? 'Ticketing' : 'General'),
        message: isTicketing ? undefined : message.trim(),
        isTicketing,
        attendees: isTicketing ? attendees.map(n => ({ name: n.trim() })) : undefined,
        submittedAt: new Date().toISOString(),
  source: isTicketing ? 'ticketing-form' : 'contact-form',
  eventName: eventName || undefined,
        honeypot: honeypot.trim()
      });
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setAttendees(attendees.map(() => ''));
  setEventName('');
      setHoneypot('');
      try { sessionStorage.removeItem('abha_contact_draft_v1'); } catch {}
    } catch (err: any) {
      setError(err?.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container hbcu-style">
      {/* Hero Section - HBCU Style */}
      <section className="hbcu-hero-section">
        <div className="container hero-content-hbcu">
          <div className="hero-logo-container-hbcu">
            <img 
              src="/assets/images/abha-logo.png" 
              alt="ABHA Logo" 
              className="hero-logo-hbcu"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h1 className="hero-title-hbcu">Get In Touch</h1>
          <p className="hero-subtitle-hbcu">
            We'd love to hear from you. Whether you have questions about our events, membership, or anything else, our team is ready to help.
          </p>
          <div className="hero-bengali-text">
            আপনি কি হ্যারিসবার্গে নতুন? আপনি কি কিছু বাঙালি বন্ধু খুঁজছেন? অনুগ্রহ করে আমাদের সাথে যোগাযোগ করতে দ্বিধা করবেন না।
          </div>
        </div>
        
        {/* Hero Stats */}
        <div className="hero-stats-hbcu">
          <div className="container">
            <div className="stats-grid-hbcu">
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu"><CountUp end={24} suffix="/7" duration={700} /></div>
                <div className="stat-label-hbcu">Community Support</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu"><CountUp end={15} suffix="+" duration={700} /></div>
                <div className="stat-label-hbcu">Board Members</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu"><CountUp end={100} suffix="%" duration={700} /></div>
                <div className="stat-label-hbcu">Response Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">CONNECT WITH US</h2>
          <p className="hbcu-mission-text">
            Your questions, suggestions, and feedback help us serve our community better. Reach out to us through Facebook or send us a message below.
          </p>
        </div>
      </section>

      {/* Contact Form - HBCU Style */}
      <section className="hbcu-heritage-section" id="contact-form">
        <div className="container">
          <h2 className="hbcu-section-title">Send us a message</h2>
          <p className="hbcu-heritage-description">
            Fill out the form below and we'll get back to you as soon as possible. We value your input and look forward to hearing from you.
          </p>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="hbcu-heritage-card" style={{ padding: '3rem' }}>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: isTicketing ? '1fr' : '1fr 1fr', gap: '1rem', alignItems: 'end' }} className="contact-form-grid">
                  {!isTicketing && (
                    <div>
                      <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required={!isTicketing}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={{ 
                          width: '100%',
                          padding: '12px',
                          border: '2px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '8px',
                          fontSize: '16px',
                          transition: 'border-color 0.3s ease',
                          boxSizing: 'border-box',
                          height: '52px',
                          outline: 'none',
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          MozAppearance: 'textfield',
                          lineHeight: '1.5',
                          fontFamily: 'inherit'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                      />
                    </div>
                  )}
                  <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ 
                        width: '100%',
                        padding: '12px',
                        border: '2px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '8px',
                        fontSize: '16px',
                        transition: 'border-color 0.3s ease',
                        boxSizing: 'border-box',
                        height: '52px',
                        outline: 'none',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield',
                        lineHeight: '1.5',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g. 717-555-1234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s ease',
                      boxSizing: 'border-box',
                      height: '52px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                  />
                </div>
                <div>
                  <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                    Subject
                  </label>
                  <select 
                    id="subject" 
                    name="subject" 
                    required 
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      setIsTicketing(e.target.value === 'Ticketing');
                    }}
                    style={{ 
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      backgroundColor: 'white'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                  >
                    <option value="">Select a topic...</option>
                    <option value="Ticketing">Ticketing</option>
                    <option value="Membership Support">Membership Support</option>
                    <option value="Event Inquiries">Event Inquiries</option>
                    <option value="Volunteer Opportunities">Volunteer Opportunities</option>
                    <option value="Cultural Programs">Cultural Programs</option>
                    <option value="General Questions">General Questions</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {isTicketing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label htmlFor="eventName" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                        Event Name
                      </label>
                      <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        placeholder="e.g. Durga Puja 2025"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '2px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="attendees" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                        Number of People
                      </label>
                      <input
                        type="number"
                        id="attendees"
                        min={1}
                        max={12}
                        value={attendeeCount}
                        onChange={(e) => setAttendeeCount(Math.max(1, Math.min(12, parseInt(e.target.value) || 1)))}
                        style={{
                          width: '140px',
                          padding: '10px 12px',
                          border: '2px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
                      {attendees.map((val, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                          <label style={{ fontSize: '.7rem', letterSpacing: '.15em', marginBottom: '.3rem', color: 'var(--primary-red)', fontWeight: 600 }}>Person {i + 1} Name</label>
                          <input
                            type="text"
                            required
                            value={val}
                            onChange={(e) => handleAttendeeChange(i, e.target.value)}
                            placeholder="Enter full name"
                            style={{
                              width: '100%',
                              padding: '10px 12px',
                              border: '2px solid rgba(212, 175, 55, 0.3)',
                              borderRadius: '8px',
                              fontSize: '15px'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Any dietary needs, preferences, or questions?"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          resize: 'vertical'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                    />
                  </div>
                )}
                {/* Honeypot field (hidden) */}
                <div style={{ position: 'absolute', left: '-5000px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                  <label>
                    Do not fill this field
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      name="_gotcha"
                      style={{ display: 'block' }}
                    />
                  </label>
                </div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="btn-hbcu-primary"
                    style={{ padding: '1rem 2rem', fontSize: '1.1rem', opacity: submitting ? 0.7 : 1 }}
                  >
                    {submitting ? 'Sending…' : submitted ? 'Sent!' : 'Send Message'}
                  </button>
                </div>
                {error && <div style={{ marginTop: '1rem', color: 'crimson', fontSize: '.85rem', textAlign: 'center' }}>{error}</div>}
                {submitted && !error && <div style={{ marginTop: '1rem', color: 'green', fontSize: '.85rem', textAlign: 'center' }}>Thank you! We received your message.</div>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - HBCU Style */}
      <section className="hbcu-cta-section">
        <div className="container">
          <h2 className="hbcu-cta-title">Join Our Community Today</h2>
          <p className="hbcu-cta-description">
            Ready to become part of the ABHA family? Connect with us on Facebook or reach out directly.<br />
            We're excited to welcome you to our vibrant Bengali community.
          </p>
          <div className="hbcu-cta-buttons">
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-primary">
              Join Facebook Group
            </a>
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-secondary">
              Learn More
            </a>
          </div>
          <div className="hbcu-cta-quote">
            <p className="hbcu-quote-text">
              "Every conversation is a step toward building a stronger, more connected community."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
