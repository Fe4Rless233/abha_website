import React, { useEffect, useRef, useState } from 'react';
import { submitContact } from '../utils/api';
import CountUp from '../components/ui/CountUp';

interface ContactPageProps {
  onPageChange?: (page: string) => void;
  scrollToId?: string; // optional anchor to scroll to on mount
}

interface TicketPrefill {
  subject?: string;
  source?: string;
  people?: number;
  eventName?: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ onPageChange: _onPageChange, scrollToId }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isTicketing, setIsTicketing] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [attendeeCountField, setAttendeeCountField] = useState('1');
  const [attendees, setAttendees] = useState<string[]>(['']);
  const [eventName, setEventName] = useState('');
  // Ticketing details
  type AttendeeCategory = 'adult' | 'student' | 'youngAdult' | 'child';
  type DayPackage = 'fri' | 'sat' | 'sun' | 'satSun' | 'friSatSun';
  interface AttendeeDetail { name: string; category: AttendeeCategory; member: boolean; wantsMembership: boolean; pkg: DayPackage; }
  const [attendeeDetails, setAttendeeDetails] = useState<AttendeeDetail[]>([{ name: '', category: 'adult', member: false, wantsMembership: false, pkg: 'friSatSun' }]);
  const [showPrices] = useState(true);
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
          const n = data.people && data.people > 0 ? data.people : 1;
          setAttendeeCount(n);
          setAttendeeCountField(String(n));
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

  // Scroll into contact form if requested via prop or hash (for QR deep links)
  useEffect(() => {
    const wantsScroll = scrollToId === 'contact-form' || (typeof window !== 'undefined' && /contact\/contact-form$/.test((window.location.hash || '').replace(/^#/, '')));
    if (wantsScroll && formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rect.top - 180;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }, [scrollToId]);

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
    setAttendeeDetails(prev => {
      if (attendeeCount > prev.length) {
        return [...prev, ...Array.from({ length: attendeeCount - prev.length }, () => ({ name: '', category: 'adult' as AttendeeCategory, member: false, wantsMembership: false, pkg: 'friSatSun' as DayPackage }))];
      } else if (attendeeCount < prev.length) {
        return prev.slice(0, attendeeCount);
      }
      return prev;
    });
  }, [attendeeCount]);

  // Keep text field in sync when attendeeCount changes externally
  useEffect(() => {
    setAttendeeCountField(String(attendeeCount));
  }, [attendeeCount]);

  const handleAttendeeChange = (index: number, value: string) => {
    setAttendees(prev => prev.map((v, i) => (i === index ? value : v)));
    setAttendeeDetails(prev => prev.map((v, i) => (i === index ? { ...v, name: value } : v)));
  };

  // Pricing model from Home (Adults, Students, Young Adult, Children)
  const priceFor = (cat: AttendeeCategory, pkg: DayPackage, isMember: boolean) => {
    // Base prices
    const base: Record<AttendeeCategory, Record<DayPackage, number>> = {
      adult: { friSatSun: 160, satSun: 100, fri: 65, sat: 65, sun: 40 },
      student: { friSatSun: 140, satSun: 75, fri: 65, sat: 50, sun: 30 },
      youngAdult: { friSatSun: 70, satSun: 40, fri: 30, sat: 30, sun: 20 },
      child: { friSatSun: 0, satSun: 0, fri: 0, sat: 0, sun: 0 }
    };
    let p = base[cat][pkg];
    // Membership discounts
    if (isMember) {
      if (cat === 'adult' || cat === 'student') p = Math.max(0, p - 10);
      if (cat === 'youngAdult') p = Math.max(0, p - 5);
    }
    return p;
  };

  const totalPrice = attendeeDetails.reduce((sum, a) => sum + priceFor(a.category, a.pkg, a.member), 0);

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
    // Helper to build pricing summary text (used by both normal submit and mailto fallback)
    const buildPricingSummary = (): string | undefined => {
      if (!isTicketing) return undefined;
      const lines: string[] = [];
      lines.push(`Event: ${eventName || 'N/A'}`);
      lines.push('Attendees:');
      attendeeDetails.forEach((a, idx) => {
        const price = priceFor(a.category, a.pkg, a.member);
        lines.push(`  ${idx + 1}. ${attendees[idx] || a.name || 'Name'} — ${a.category} — ${a.pkg} — ${a.member ? 'Member' : 'Non-member'}${a.wantsMembership ? ' (wants membership)' : ''} — $${price}`);
      });
      lines.push(`Total: $${totalPrice}`);
      if (message.trim()) {
        lines.push('Notes:');
        lines.push(message.trim());
      }
      return lines.join('\n');
    };
    try {
      // Basic validation
      if (!isTicketing && !fullName.trim()) throw new Error('Name required');
      if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) throw new Error('Valid email required');
      if (isTicketing) {
        if (attendees.some(a => !a.trim())) throw new Error('All attendee names required');
      } else if (!message.trim()) throw new Error('Message required');

  const pricingSummary = buildPricingSummary();

      await submitContact({
        fullName: isTicketing ? (attendees[0]?.trim() || '') : fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subject || (isTicketing ? 'Ticketing' : 'General'),
        message: isTicketing ? pricingSummary : message.trim(),
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
      // Fallback: open user's email client once remote quota is reached or any remote failure occurs
      const to = 'associationbengalisharrisburg@hotmail.com';
      const subj = `ABHA ${isTicketing ? 'Ticketing' : 'Contact'}: ${subject || (isTicketing ? 'Ticketing' : 'General')}`;
      const bodyLines: string[] = [];
      bodyLines.push(`Name: ${isTicketing ? (attendees[0]?.trim() || '') : fullName.trim()}`);
      bodyLines.push(`Email: ${email.trim()}`);
      if (phone.trim()) bodyLines.push(`Phone: ${phone.trim()}`);
      if (isTicketing) {
        bodyLines.push('');
        bodyLines.push('Ticket Request');
        if (eventName) bodyLines.push(`Event: ${eventName}`);
        bodyLines.push('');
        const mailSummary = buildPricingSummary();
        if (mailSummary) bodyLines.push(mailSummary);
      } else {
        bodyLines.push('');
        bodyLines.push(message.trim() || '(no message)');
      }
  const body = encodeURIComponent(bodyLines.join('\n'));
  const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subj)}&body=${body}`;
  try { window.location.href = mailtoUrl; } catch {}
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
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        id="attendees"
                        value={attendeeCountField}
                        onChange={(e) => {
                          const digits = (e.target.value || '').replace(/\D/g, '').slice(0, 2);
                          setAttendeeCountField(digits);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const n = Math.max(1, Math.min(12, Number(attendeeCountField) || 1));
                            setAttendeeCount(n);
                            setAttendeeCountField(String(n));
                            (e.currentTarget as HTMLInputElement).blur();
                          }
                        }}
                        onBlur={() => {
                          const n = Math.max(1, Math.min(12, Number(attendeeCountField) || 1));
                          setAttendeeCount(n);
                          setAttendeeCountField(String(n));
                        }}
                        style={{
                          width: '140px',
                          padding: '10px 12px',
                          border: '2px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                        onBlurCapture={(e) => (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
                      {attendees.map((val, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '.6rem', alignItems: 'end' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontSize: '.7rem', letterSpacing: '.15em', marginBottom: '.3rem', color: 'var(--primary-red)', fontWeight: 600 }}>Person {i + 1} Name</label>
                            <input
                              type="text"
                              required
                              value={val}
                              onChange={(e) => handleAttendeeChange(i, e.target.value)}
                              placeholder="Full name"
                              style={{ width: '100%', padding: '10px 12px', border: '2px solid rgba(212, 175, 55, 0.3)', borderRadius: '8px', fontSize: '15px' }}
                              onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                              onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '.3rem', color: 'var(--primary-red)', fontWeight: 600, fontSize: '.75rem' }}>Category</label>
                            <select value={attendeeDetails[i]?.category || 'adult'} onChange={(e) => setAttendeeDetails(prev => prev.map((v, idx) => idx === i ? { ...v, category: e.target.value as AttendeeCategory } : v))} style={{ width: '100%', padding: '.6rem', border: '2px solid rgba(212,175,55,.3)', borderRadius: 8 }}>
                              <option value="adult">Adult (18+)</option>
                              <option value="student">Student (18+)</option>
                              <option value="youngAdult">Young Adult (7–17)</option>
                              <option value="child">Child (&lt;7)</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '.3rem', color: 'var(--primary-red)', fontWeight: 600, fontSize: '.75rem' }}>Package</label>
                            <select value={attendeeDetails[i]?.pkg || 'friSatSun'} onChange={(e) => setAttendeeDetails(prev => prev.map((v, idx) => idx === i ? { ...v, pkg: e.target.value as DayPackage } : v))} style={{ width: '100%', padding: '.6rem', border: '2px solid rgba(212,175,55,.3)', borderRadius: 8 }}>
                              <option value="friSatSun">Fri–Sat–Sun</option>
                              <option value="satSun">Sat–Sun</option>
                              <option value="fri">Friday</option>
                              <option value="sat">Saturday</option>
                              <option value="sun">Sunday</option>
                            </select>
                          </div>
                          <div style={{ display: 'grid', gap: '.35rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.8rem' }}>
                              <input type="checkbox" checked={attendeeDetails[i]?.member || false} onChange={(e) => setAttendeeDetails(prev => prev.map((v, idx) => idx === i ? { ...v, member: e.target.checked } : v))} />
                              Member</label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.8rem' }}>
                              <input type="checkbox" checked={attendeeDetails[i]?.wantsMembership || false} onChange={(e) => setAttendeeDetails(prev => prev.map((v, idx) => idx === i ? { ...v, wantsMembership: e.target.checked } : v))} />
                              Interested in Membership</label>
                          </div>
                          <div style={{ gridColumn: '1 / -1', fontSize: '.85rem', color: '#333' }}>
                            Estimated Price: <strong>${priceFor(attendeeDetails[i]?.category || 'adult', attendeeDetails[i]?.pkg || 'friSatSun', attendeeDetails[i]?.member || false)}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                    {showPrices && (
                      <div style={{ marginTop: '.5rem', padding: '.9rem', border: '1px dashed rgba(212,175,55,.5)', borderRadius: 8, background: 'rgba(212,175,55,.06)' }}>
                        <div style={{ fontWeight: 700, marginBottom: '.4rem', color: 'var(--primary-red)' }}>Estimated Total</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>${totalPrice}</div>
                        <div style={{ marginTop: '.35rem', fontSize: '.8rem', color: '#333' }}>Final pricing will be confirmed by the organizers.</div>
                      </div>
                    )}
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
