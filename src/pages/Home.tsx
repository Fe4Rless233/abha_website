import React, { useState, useEffect, useRef } from 'react';
import CountUp from '../components/ui/CountUp';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Countdown from '../components/ui/Countdown';
import VideoTestimonials from '../components/VideoTestimonials';

interface HomePageProps {
  onPageChange?: (page: string, eventToExpand?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Fallback timeout in case video load stalls
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVideoLoaded(true); // allow content even if video not fully loaded
    }, 4000);

    // Respect reduced motion and detect autoplay support
    const setupPlayback = () => {
      try {
        const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          setVideoLoaded(true);
          return; // let poster show instead of forcing playback
        }
        const el = videoRef.current;
        if (el) {
          // Ensure muted for autoplay policies
          el.muted = true;
          const playPromise = el.play();
          if (playPromise && typeof playPromise.then === 'function') {
            playPromise.then(() => setVideoLoaded(true)).catch(() => {
              // Autoplay blocked or codec issue – use logo fallback
              setVideoError(true);
              setVideoLoaded(true);
            });
          }
        }
      } catch {
        // Non-critical
      }
    };

    // Defer a tick so ref is attached
    const r = requestAnimationFrame(setupPlayback);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(r);
    };
  }, []);

  // Featured Durga Puja details (sync with Events page if updated)
  const durgaPuja = {
    title: 'Durga Puja 2025',
    date: 'September 27-28, 2025',
    time: '10:00 AM - 10:00 PM',
    venue: 'Enola Fire Company, Enola PA',
    description: 'Our grand annual celebration of tradition, devotion, culture, food and unforgettable community spirit.',
    flyerImage: '/assets/images/events/durga-puja.jpg', // Replace with dedicated flyer when available
    ticketLink: 'https://example.com/tickets/durga-puja-2025', // TODO: replace with real link
    artistSegments: [
      'Traditional Puja & Aarti',
      'Cultural Dance Ensembles',
      'Local & Guest Vocal Performances',
      'Kids Talent & Drama',
      'Community Bhog & Food Experience'
    ],
    highlights: [
      'Authentic Rituals',
      'Cultural Performances',
      'Kids Activities',
      'Community Feast',
      'Art & Tradition'
    ]
  };

  const testimonials = [
    {
      title: '10 years have passed so quickly!',
      body: [
        'What started off as a small gathering of friends has now grown into a vibrant community of members, both young & old!',
        'ABHA organizes several get togethers during the year that allow us to stay connected to our Bengali roots.',
        'The Durga Pujo is ofcourse, the biggest draw for all of us. It gives kids the opportunity to experience their Bengali culture & the grandparents a chance to see the traditions being carried on.',
        'Through the years it has also given us the ability to invite our non Bengali friends & introduce them to our festival!',
        'ABHA has been a lifeline to us in more ways than one. With the enthusiasm that I see in the organization, I expect to see it keep growing!'
      ],
      author: 'Dr. Supriyo Ghosh'
    },
    {
      title: 'A Second Home Since 2019',
      body: [
        'We moved from Texas to PA in 2019 and I think since our second week here, ABHA has become (and remained) our “second home”.',
        'To me ABHA is both quintessentially Bengali and yet very global and inclusive in its outlook. We are home for Bengalis who trace their roots across Bengal – from elite localities of south Kolkata and old bungalows of purono Kolkata to the hills of Darjeeling, red sands of Shantiniketan, and everywhere in between.',
        'Many amongst our extended family at ABHA may not count Bengali as their mother tongue, but still call Bengal home – through birth, marriage or work. And then there are those who are not ethnic Indians but have made Bengal and Bengali culture the center of their lives.',
        'Anyone with a love for our rich culture and a willingness to learn about our heritage will always find a home at ABHA. That is what ABHA stands for and that is why it is my home.'
      ],
      author: 'Dhiman Chattopadhyay'
    },
    {
      title: 'Inclusive & Creative Community',
      body: [
        'It has been always a pleasure to have your voice been heard on community forums that is beyond work and family. ABHA as a part of Bengali community in central Pennsylvania that always believed in community based set up has been inclusive.',
        'It has been a great place to choose and nurture friendship without being judged and always gives artistic freedom for all the members, nominating each one’s area of interest.',
        'Looking forward to taking the community based organization to next level celebrating the 10 years of Durga Puja completion in Greater Harrisburg.'
      ],
      author: 'Bhaskar Ganguli'
    }
  ];

  return (
    <div className="page-container hbcu-style">
      {/* Featured Durga Puja Section (Top of Home) */}
      <section id="durga-puja" className="hbcu-mission-section" style={{ paddingTop: '3.75rem', paddingBottom: '2.75rem', background: 'linear-gradient(135deg,#330000 0%,#5b0a0a 55%,#7a1b1b 100%)', color: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '.75rem', marginBottom: '.75rem' }}>
            <img
              src="/assets/images/abha-logo.png"
              alt="ABHA Logo"
              style={{ width: '2m00px', height: '200px', objectFit: 'contain', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.55))' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <h1 className="hbcu-section-title" style={{ color: '#FFD700', margin: 0 }}>{durgaPuja.title}</h1>
            <Countdown target="2025-09-27T10:00:00-04:00" label="Countdown" />
          </div>
          <p className="hbcu-mission-text" style={{ maxWidth: 920, color: '#ffffff' }}>{durgaPuja.description}</p>
          <div style={{ marginTop: '1.75rem', display: 'flex', flexWrap: 'wrap', gap: '2.25rem' }}>
            {/* Flyer & Actions */}
            <div style={{ flex: '1 1 300px', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,215,0,0.3)', boxShadow: '0 4px 18px -4px rgba(0,0,0,0.55)', maxWidth: 360 }}>
                <img src={durgaPuja.flyerImage} alt="Durga Puja Flyer" style={{ width: '100%', display: 'block' }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
                <a href={durgaPuja.flyerImage} target="_blank" rel="noopener noreferrer" className="btn-hbcu-primary" style={{ background: '#FFD700', color: '#5b0a0a' }}>Download Flyer</a>
                <button
                  className="btn-hbcu-primary"
                  onClick={() => {
                    try {
                      localStorage.setItem('abha_ticketing_prefill', JSON.stringify({ subject: 'Ticketing', source: 'durga-puja-2025', people: 1 }));
                    } catch {}
                    onPageChange?.('contact');
                  }}
                  type="button"
                >
                  Tickets / Registration
                </button>
                <button onClick={() => onPageChange?.('events', 'durga-puja-2025')} className="btn-hbcu-secondary">Full Details</button>
              </div>
            </div>
            {/* Info Blocks */}
            <div style={{ flex: '2 1 420px', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '0.85rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '.85rem .9rem', borderRadius: '10px' }}>
                  <strong style={{ color: '#FFD700', display: 'block', fontSize: '.75rem', letterSpacing: '.1em' }}>DATE</strong>
                  <span>{durgaPuja.date}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '.85rem .9rem', borderRadius: '10px' }}>
                  <strong style={{ color: '#FFD700', display: 'block', fontSize: '.75rem', letterSpacing: '.1em' }}>TIME</strong>
                  <span>{durgaPuja.time}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '.85rem .9rem', borderRadius: '10px' }}>
                  <strong style={{ color: '#FFD700', display: 'block', fontSize: '.75rem', letterSpacing: '.1em' }}>VENUE</strong>
                  <span>{durgaPuja.venue}</span>
                </div>
              </div>
              <div>
                <h3 style={{ color: '#FFD700', fontSize: '1rem', letterSpacing: '.05em', marginBottom: '.5rem' }}>Featured Segments</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '.4rem', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))' }}>
                  {durgaPuja.artistSegments.map((s, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.9rem' }}>
                      <span style={{ color: '#FFD700' }}>✦</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{ color: '#FFD700', fontSize: '1rem', letterSpacing: '.05em', marginBottom: '.5rem' }}>Highlights</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.55rem' }}>
                  {durgaPuja.highlights.map((h, i) => (
                    <span key={i} style={{ background: 'rgba(255,255,255,0.08)', padding: '.45rem .7rem', borderRadius: '24px', fontSize: '.7rem', letterSpacing: '.08em' }}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* (Testimonials moved further down to middle area) */}

      {/* Upcoming Events Section - moved above Hero */}
      <section className="hbcu-event-section upcoming-events-section">
        <div className="container">
          <h2 className="hbcu-section-title-dark">Upcoming Events 2025</h2>
          <p className="hbcu-heritage-description">
            Join us for these exciting upcoming celebrations and community gatherings!
          </p>
          <div className="upcoming-events-grid">
            {/* Musical Extravaganza Event */}
            <div className="hbcu-event-container">
              <div className="hbcu-event-image">
                <img 
                  src="/assets/images/events/a-musical-extravaganza-with-rathijit-and-shreya.jpg" 
                  alt="Musical Extravaganza with Rathijit & Shreya" 
                  className="hbcu-event-poster"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="hbcu-event-content">
                <div className="hbcu-event-badge">SEPTEMBER 26</div>
                <h3 className="hbcu-event-title">Musical Extravaganza</h3>
                <h4 className="hbcu-event-subtitle">with Rathijit & Shreya</h4>
                <p className="hbcu-event-description">
                  ABHA's 10th anniversary celebration featuring renowned Bengali artists in an unforgettable musical evening.
                </p>
                <div className="hbcu-event-details">
                  <div className="hbcu-event-detail">
                    <span className="hbcu-detail-label">Time:</span>
                    <span className="hbcu-detail-value">7:00 PM - 11:00 PM</span>
                  </div>
                  <div className="hbcu-event-detail">
                    <span className="hbcu-detail-label">Venue:</span>
                    <span className="hbcu-detail-value">Enola Fire Company, Enola PA</span>
                  </div>
                </div>
                <div className="hbcu-event-actions">
                  <button 
                    onClick={() => {
                      try {
                        localStorage.setItem('abha_ticketing_prefill', JSON.stringify({ subject: 'Ticketing', source: 'musical-extravaganza', people: 1, eventName: 'Musical Extravaganza 2025' }));
                      } catch {}
                      onPageChange?.('contact');
                    }}
                    className="btn-hbcu-primary"
                  >
                    Get Tickets
                  </button>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onPageChange?.('events', 'a-musical-extravaganza-with-rathijit-shreya');
                    }} 
                    className="btn-hbcu-secondary"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Durga Puja Event */}
            <div className="hbcu-event-container">
              <div className="hbcu-event-image">
                <img 
                  src="/assets/images/events/durga-puja.jpg" 
                  alt="Durga Puja 2025" 
                  className="hbcu-event-poster"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="hbcu-event-content">
                <div className="hbcu-event-badge">SEPTEMBER 27-28</div>
                <h3 className="hbcu-event-title">Durga Puja 2025</h3>
                <h4 className="hbcu-event-subtitle">শারদীয় দুর্গোৎসব ২০২৫</h4>
                <p className="hbcu-event-description">
                  Join ABHA for our annual celebration of tradition, culture, and community. Experience authentic Bengali festivities.
                </p>
                <div className="hbcu-event-details">
                  <div className="hbcu-event-detail">
                    <span className="hbcu-detail-label">Time:</span>
                    <span className="hbcu-detail-value">10:00 AM - 10:00 PM</span>
                  </div>
                  <div className="hbcu-event-detail">
                    <span className="hbcu-detail-label">Venue:</span>
                    <span className="hbcu-detail-value">Enola Fire Company, Enola PA</span>
                  </div>
                </div>
                <div className="hbcu-event-actions">
                  <button 
                    onClick={() => {
                      try {
                        localStorage.setItem('abha_ticketing_prefill', JSON.stringify({ subject: 'Ticketing', source: 'durga-puja-2025', people: 1, eventName: 'Durga Puja 2025' }));
                      } catch {}
                      onPageChange?.('contact');
                    }}
                    className="btn-hbcu-primary"
                  >
                    Get Tickets
                  </button>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onPageChange?.('events', 'durga-puja-2025');
                    }} 
                    className="btn-hbcu-secondary"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="section-cta-center">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPageChange?.('events');
              }} 
              className="btn-hbcu-primary"
            >
              View All Events
            </button>
          </div>
        </div>
      </section>

      {/* Hero Section - HBCU Style with Video Background */}
      <section className="hbcu-hero-section">
        {videoError ? (
          <div className="container hero-content-hbcu slide-up">
            <div className="hero-logo-container-hbcu" style={{ padding: '3rem 0' }}>
              <img
                src="/assets/images/abha-logo.png"
                alt="ABHA Logo"
                className="hero-logo-hbcu"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="hero-video-container fade-in">
              {!videoLoaded && (
                <div className="hero-video-loading">
                  <LoadingSpinner color="white" size="lg" />
                  <span className="loading-text">Loading cultural experience…</span>
                </div>
              )}
              <video
                ref={videoRef}
                className={`hero-video ${videoLoaded ? 'visible' : 'hidden'}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/images/hero-poster.jpg"
                onLoadedData={() => setVideoLoaded(true)}
                onError={() => {
                  setVideoError(true);
                  setVideoLoaded(true);
                }}
              >
                <source src="/assets/videos/bengali-culture-hero.mp4" type="video/mp4" />
                {/* Optional WebM fallback when available */}
                <source src="/assets/videos/bengali-culture-hero.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              <div className="hero-video-overlay"></div>
            </div>
            <div className="container hero-content-hbcu slide-up">
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
              <h1 className="hero-title-hbcu">
                Association of Bengalis in Harrisburg Area
              </h1>
              <p className="hero-subtitle-hbcu">
                Bringing the Spirit of Bengal to Central Pennsylvania. We believe that culture is the thread that binds us—not only to our roots but to each other.
              </p>
              <div className="hero-bengali-text">
                সংস্কৃতিতে ঐক্য। সম্প্রদায়ে শক্তি। উদযাপনে আনন্দ
              </div>
              <div className="hero-cta-container">
                <button onClick={() => onPageChange?.('contact')} className="btn-hbcu-primary">
                  Contact Us
                </button>
                <button onClick={() => onPageChange?.('events')} className="btn-hbcu-secondary">
                  View Events
                </button>
              </div>
            </div>
            {/* Hero Stats - HBCU Style */}
            <div className="hero-stats-hbcu fade-in">
              <div className="container">
                <div className="stats-grid-hbcu">
                  <div className="stat-item-hbcu">
                    <div className="stat-number-hbcu"><CountUp end={200} suffix="+" duration={900} /></div>
                    <div className="stat-label-hbcu">Active Members</div>
                  </div>
                  <div className="stat-item-hbcu">
                    <div className="stat-number-hbcu"><CountUp end={10} suffix="+" duration={900} /></div>
                    <div className="stat-label-hbcu">Years Strong</div>
                  </div>
                  <div className="stat-item-hbcu">
                    <div className="stat-number-hbcu"><CountUp end={4} duration={700} /></div>
                    <div className="stat-label-hbcu">Annual Events</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Mission Statement Section */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">UNITY IN CULTURE. STRENGTH IN COMMUNITY. JOY IN CELEBRATION.</h2>
          <p className="hbcu-mission-text">
            Join us in honoring the rich tapestry of Bengali heritage—music, dance, literature, and culinary arts. Together, we embrace our roots and illuminate our future.
          </p>
        </div>
      </section>

  {/* Upcoming Events Section removed here after moving above Hero */}

      {/* Community Investment Section - HBCU Style */}
      <section className="hbcu-investment-section">
        <div className="container">
          <h2 className="hbcu-section-title-dark">Invest in Bengali heritage today</h2>
          <div className="hbcu-investment-grid">
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">For Families</h3>
              <p className="hbcu-card-description">
                Join a thriving community that celebrates Bengali culture and provides support for families settling in Central Pennsylvania.
              </p>
              <button onClick={() => onPageChange?.('contact')} className="hbcu-card-link">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage & Culture Section - HBCU Style */}
      <section className="hbcu-heritage-section">
        <div className="container">
          <h2 className="hbcu-section-title">Harnessing the legacy, community, and culture of Bengal</h2>
          <p className="hbcu-heritage-description">
            Our defining characteristics drive the foundation of our work, derived from decades of experience 
            preserving Bengali heritage in Central Pennsylvania.
          </p>
          <div className="hbcu-heritage-grid">
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🎭</div>
              <h3 className="hbcu-heritage-title">Cultural Celebrations</h3>
              <p className="hbcu-heritage-text">
                Authentic Bengali festivals with traditional rituals, music, dance, and food that connect generations.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">👨‍👩‍👧‍👦</div>
              <h3 className="hbcu-heritage-title">Family Community</h3>
              <p className="hbcu-heritage-text">
                A welcoming space for Bengali families to connect, support each other, and build lasting friendships.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🎭</div>
              <h3 className="hbcu-heritage-title">Natok & Drama</h3>
              <p className="hbcu-heritage-text">
                Engaging drama performances and drawing competitions that showcase creativity and preserve our storytelling traditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Voices (Testimonials) - Middle Placement */}
      <section className="hbcu-investment-section" style={{ paddingTop: '3.25rem', paddingBottom: '3.25rem' }}>
        <div className="container">
          <h2 className="hbcu-section-title-dark" style={{ marginBottom: '.6rem' }}>Community Voices</h2>
          <p className="hbcu-heritage-description" style={{ maxWidth: 840 }}>Reflections from members about ABHA's growth, inclusiveness, and cultural impact.</p>
          <div style={{ display: 'grid', gap: '1.9rem', marginTop: '2.4rem', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
            {testimonials.map((t, i) => (
              <div key={i} className="event-card" style={{ padding: '1.65rem 1.5rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', letterSpacing: '.03em', color: 'var(--primary-red, #7a1b1b)' }}>{t.title}</h3>
                {t.body.map((p, idx) => (
                  <p key={idx} style={{ margin: 0, fontSize: '.9rem', lineHeight: 1.5, color: '#222' }}>{p}</p>
                ))}
                <div style={{ marginTop: '.5rem', fontSize: '.7rem', letterSpacing: '.15em', fontWeight: 600, opacity: 0.85, color: '#444' }}>— {t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About ABHA Overview Section */}
  <VideoTestimonials />

      <section className="hbcu-mission-section" style={{ paddingTop: '3.25rem', paddingBottom: '3.25rem' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <h2 className="hbcu-section-title">ABOUT ABHA</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', fontSize: '1rem', lineHeight: 1.6 }}>
            <p>
              The Association of Bengalis in Harrisburg (ABHA) is a community-driven organization dedicated to preserving and showcasing the Bengali culture and traditions in central Pennsylvania. Rooted in the Bengali heritage, ABHA's spirit and commitment is to foster understanding, inclusion, and pride in cultural identity with the wider community by creating spaces where art and tradition can thrive.
            </p>
            <p>
              ABHA's connection to the broader community goes even beyond celebration. The organization actively engages in philanthropic and social causes, demonstrating its dedication to the well-being of the region. A core part of this commitment involves making significant contributions to the organizations that fights hunger and provides crucial food assistance to neighbors in need. By supporting many such vital causes, ABHA shows that its values are deeply connected to the well-being of the entire community, building bridges and fostering a sense of shared humanity.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section - HBCU Style */}
      <section className="hbcu-timeline-section">
        <div className="container">
          <h2 className="hbcu-section-title-dark">THE FUTURE OF BENGALI HERITAGE IS NOW</h2>
          <p className="hbcu-timeline-description">
            ABHA continues to grow and evolve, preserving Bengali culture while embracing modern community building.
          </p>
          <div className="hbcu-timeline-grid">
            <div className="hbcu-timeline-item">
              <div className="hbcu-timeline-year">2010</div>
              <div className="hbcu-timeline-title">Foundation</div>
              <div className="hbcu-timeline-description">
                Established ABHA with founding Bengali families in Harrisburg area
              </div>
            </div>
            <div className="hbcu-timeline-item">
              <div className="hbcu-timeline-year">2015</div>
              <div className="hbcu-timeline-title">Growth</div>
              <div className="hbcu-timeline-description">
                Expanded to 100+ members with regular cultural events
              </div>
            </div>
            <div className="hbcu-timeline-item">
              <div className="hbcu-timeline-year">2025</div>
              <div className="hbcu-timeline-title">Future</div>
              <div className="hbcu-timeline-description">
                Building digital community and reaching Bengali families across Central Pennsylvania
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - HBCU Style */}
      <section className="hbcu-cta-section">
        <div className="container">
          <h2 className="hbcu-cta-title">Join the ABHA Movement</h2>
          <p className="hbcu-cta-description">
            Cultural preservation begins with each of us—and we can't do it without your help.<br />
            Become a champion for Bengali heritage.
          </p>
          <div className="hbcu-cta-buttons">
            <button onClick={() => onPageChange?.('contact')} className="btn-hbcu-primary">
              Contact Us
            </button>
            <button onClick={() => onPageChange?.('events')} className="btn-hbcu-secondary">
              View Events
            </button>
          </div>
          <div className="hbcu-cta-quote">
            <p className="hbcu-quote-text">
              "We believe that culture is the thread that binds us—not only to our roots but to each other."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
