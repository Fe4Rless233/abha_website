import React, { useState, useEffect, useRef } from 'react';
import Countdown from '../components/ui/Countdown';
import VideoTestimonials from '../components/VideoTestimonials';
import { buildGoogleCalendarUrl } from '../utils/calendar';
import ShareButton from '../components/ui/ShareButton';
// Gallery moved to Culture page per request

interface HomePageProps {
  onPageChange?: (page: string, eventToExpand?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [heroStage, setHeroStage] = useState<0 | 1 | 2>(0); // 0=HTML5,1=YouTube,2=Drive preview
  const mediaWrapperRef = useRef<HTMLDivElement | null>(null);
  const youTubeId = (() => {
    try {
      const explicit = 'TeCOSAF5Hss'; // provided ID
      const envId = (import.meta as any)?.env?.VITE_HERO_YT_ID;
      const ls = typeof window !== 'undefined' ? localStorage.getItem('hero_youtube_id') : null;
      return (ls || envId || explicit || '').trim();
    } catch { return 'TeCOSAF5Hss'; }
  })();

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxSrc) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxSrc(null); };
      window.addEventListener('keydown', onKey);
      return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
    }
  }, [lightboxSrc]);

  // Removed old local-video autoplay logic; Drive iframe handles playback now
  // Stage 0 playback attempt with stall detection
  useEffect(() => {
    if (heroStage !== 0) return;
    const vid = heroVideoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.play().catch(() => {/* user gesture may be required */});
    const section = document.getElementById('home-hero');
    const io = section ? new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        vid.play().catch(() => {});
      }
    }, { threshold: [0, 0.25] }) : null;
    if (io && section) io.observe(section);

    let progressed = false;
    const onTime = () => {
      if (vid.currentTime > 0.2) {
  progressed = true;
        vid.removeEventListener('timeupdate', onTime);
      }
    };
    vid.addEventListener('timeupdate', onTime);
    const stall = setTimeout(() => {
      if (!progressed) setHeroStage(youTubeId ? 1 : 2);
    }, 3000);
    const onError = () => {
      setHeroStage(youTubeId ? 1 : 2);
    };
    vid.addEventListener('error', onError);
    return () => {
      vid.removeEventListener('timeupdate', onTime);
      vid.removeEventListener('error', onError);
      clearTimeout(stall);
      if (io && section) io.disconnect();
    };
  }, [heroStage, youTubeId]);

  // Dynamic scale for vertical video/iframe to ensure cover fit
  useEffect(() => {
    const el = mediaWrapperRef.current;
    if (!el) return;
    const resize = () => {
      const parent = el.parentElement as HTMLElement | null;
      if (!parent) return;
      const pw = parent.clientWidth;
      const ph = parent.clientHeight || window.innerHeight * 0.72;
      const targetAspect = heroStage === 0 ? 16 / 9 : 9 / 16;
      const needWidth = ph * targetAspect;
      const needHeight = pw / targetAspect;
      let finalWidth: number; let finalHeight: number;
      if (needWidth < pw) {
        finalWidth = pw; finalHeight = needHeight;
      } else {
        finalWidth = needWidth; finalHeight = ph;
      }
      // Apply styles in a grouped manner
      el.style.cssText = [
        `width:${finalWidth}px`,
        `height:${finalHeight}px`,
        'position:absolute',
        'top:50%',
        'left:50%',
        'transform:translate(-50%, -50%)',
        'pointer-events:none'
      ].join(';');
      if (heroStage === 0 && el.firstElementChild) {
        const child = el.firstElementChild as HTMLElement;
        child.style.pointerEvents = 'auto';
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [heroStage]);

  // Featured Event (Boishakhi 2026)
  const featuredEvent = {
    title: 'Boishakhi 2026 (Bengali New Year 1433)',
    date: 'May 9, 2026',
    time: '4:00 PM - 10:00 PM',
    venue: 'Lemoyne Community Hall, 510 Herman Avenue, Lemoyne, PA 17043',
    description: 'Save the date. Let\'s sing, dance, eat, and enjoy as we welcome the Bengali New Year with delicious traditional cuisine, live music and cultural performances, community gathering and festive spirit. Cash only for Kolkata Street Food.',
    flyerImage: '/assets/images/events/Boishakhi26.jpeg',
    ticketLink: 'mailto:associationbengalisharrisburg@hotmail.com?subject=Boishakhi%202026%20-%20Save%20the%20Date&body=Hello%20ABHA%20Team%2C%0D%0A%0D%0AI%E2%80%99m%20interested%20in%20Boishakhi%202026%20on%20May%209%2C%202026%20(4%E2%80%9310pm)%20at%20Lemoyne%20Community%20Hall.%20Please%20share%20registration%20and%20event%20details%20when%20available.%0D%0A%0D%0AThanks%2C%0D%0A',
    artistSegments: [
      'Haasi aar Adda (4:00–4:45pm)',
      'Kolkata Street Food (4:45–5:45pm) — Cash Only',
      'Cultural Program (6:00–8:00pm)',
      'Dinner (8:00–10:00pm)'
    ],
    highlights: [
      'Save the Date',
      'Live Music & Cultural Performances',
      'Kolkata Street Food (Cash Only)',
      'Dinner',
      'Lemoyne Community Hall'
    ],
    extraPosters: [] as string[]
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
  author: 'Dr. Supriyo Ghosh',
  credit: 'Dr. Supriyo Ghosh, MD, Internal Medicine'
    },
    {
      title: 'A Second Home Since 2019',
      body: [
        'We moved from Texas to PA in 2019 and I think since our second week here, ABHA has become (and remained) our “second home”.',
        'To me ABHA is both quintessentially Bengali and yet very global and inclusive in its outlook. We are home for Bengalis who trace their roots across Bengal – from elite localities of south Kolkata and old bungalows of purono Kolkata to the hills of Darjeeling, red sands of Shantiniketan, and everywhere in between.',
        'Many amongst our extended family at ABHA may not count Bengali as their mother tongue, but still call Bengal home – through birth, marriage or work. And then there are those who are not ethnic Indians but have made Bengal and Bengali culture the center of their lives.',
        'Anyone with a love for our rich culture and a willingness to learn about our heritage will always find a home at ABHA. That is what ABHA stands for and that is why it is my home.'
      ],
  author: 'Dhiman Chattopadhyay',
  credit: 'Dr. Dhiman Chattopadhyay, Associate Professor, Shippensburg University'
    },
    {
      title: 'Inclusive & Creative Community',
      body: [
        'It has been always a pleasure to have your voice been heard on community forums that is beyond work and family. ABHA as a part of Bengali community in central Pennsylvania that always believed in community based set up has been inclusive.',
        'It has been a great place to choose and nurture friendship without being judged and always gives artistic freedom for all the members, nominating each one’s area of interest.',
        'Looking forward to taking the community based organization to next level celebrating the 10 years of Durga Puja completion in Greater Harrisburg.'
      ],
  author: 'Bhaskar Ganguli',
  credit: 'Bhaskar Ganguly, Chartered Accountant and Vocalist'
    },
    {
      title: 'ABHA Testimonial',
      body: [
        'ABHA is just not a Bengali community celebrating several festivals of bengal, but a community where I find the very essence of bengal itself. In ABHA I got an opportunity to enjoy and sing to the tunes of classic Tagore’s songs and modern / contemporary songs as well. Just like a Bengali, ABHA loves to be involved in the bigger picture of things, and I see various volunteering efforts conducted here.Every meeting we have is an opportunity to connect at a personal level with the members and also to contest and argue on big picture ideas. In ABHA I get an opportunity to create, and also be part of a loving and thriving community. I am lucky to be a part of ABHA. In here I give my kids a chance to see and feel being in a part of bengal and an opportunity to build lifelong friendship and connections.'
      ],
      author: 'Pratiti Dutta',
      credit: 'Financial professional and entrepreneur'
    }
  ];

  return (
    <div className="page-container hbcu-style">
      {/* Bengali Culture Hero - moved below Featured Celebrations per request */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: featuredEvent.title,
            description: featuredEvent.description,
            startDate: '2026-05-09T16:00:00-04:00',
            endDate: '2026-05-09T22:00:00-04:00',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: {
              '@type': 'Place',
              name: featuredEvent.venue,
              address: featuredEvent.venue,
            },
            image: [featuredEvent.flyerImage],
            organizer: { '@type': 'Organization', name: 'ABHA' },
          }
        ]) }}
      />
      {/* Featured Durga Puja Section (Top of Home) */}
      <section id="featured-events" className="featured-section-2026">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          <div className="featured-header">
            <img
              src="/assets/images/abha-logo.png"
              alt="ABHA Logo"
              className="featured-logo"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <h1 className="hbcu-section-title featured-title">Featured Celebration 2026</h1>
          </div>
          <p className="featured-description">{featuredEvent.description}</p>

          {/* Saraswati Puja Card */}
          <div className="event-card-container">
            <div style={{ textAlign: 'center' }}>
              <h2 className="event-card-title">{featuredEvent.title}</h2>
            </div>
              
            <div
              className="event-card-image-wrapper"
              role="button"
              aria-label="View full Flyer"
              onClick={() => setLightboxSrc(featuredEvent.flyerImage)}
            >
                <img
                  src={featuredEvent.flyerImage}
                  alt="Event Flyer"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/assets/images/events/Boishakhi.jpg'; }}
                />
                <div className="event-card-zoom-indicator">
                  <span aria-hidden>🔎</span>
                  <span>Zoom</span>
                </div>
            </div>

            <div className="event-actions">
              <a
                className="btn-hbcu-primary"
                href={featuredEvent.ticketLink}
                style={{ textDecoration: 'none', display: 'inline-block', lineHeight: '1.5', padding: '0.75rem 1.5rem', fontSize: '1rem' }}
              >
                Contact / Register
              </a>
      
              <ShareButton title={featuredEvent.title} text={featuredEvent.description} label="Share" />
              <a
                className="btn-hbcu-secondary"
                href={buildGoogleCalendarUrl({
                  title: featuredEvent.title,
                  date: featuredEvent.date,
                  time: featuredEvent.time,
                  location: featuredEvent.venue,
                  details: featuredEvent.description,
                }) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'inline-block', lineHeight: '1.5', padding: '0.75rem 1.5rem', fontSize: '1rem' }}
              >Add to Calendar</a>
            </div>
              
              <div className="event-info-grid">
                <div className="event-info-item">
                  <strong className="event-info-label">DATE</strong>
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="event-info-item">
                  <strong className="event-info-label">TIME</strong>
                  <span>{featuredEvent.time}</span>
                </div>
                <div className="event-info-item">
                  <strong className="event-info-label">VENUE</strong>
                  <span>{featuredEvent.venue}</span>
                </div>
                <div className="event-info-item">
                  <strong className="event-info-label">COUNTDOWN</strong>
                  <div style={{ marginTop: '.35rem', display: 'flex', justifyContent: 'center' }}>
                    <Countdown
                      target="2026-05-09T16:00:00-04:00"
                      label=""
                      compact
                      style={{ background: 'transparent', border: 'none', padding: 0, borderRadius: 0 }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Segments and Highlights */}
              <div className="event-segments-grid">
                <div>
                  <h3 className="segment-header">Featured Segments</h3>
                  <ul className="event-segment-list">
                    {featuredEvent.artistSegments.map((s, i) => (
                      <li key={i} className="event-segment-item">
                        <span className="segment-bullet">✦</span>
                        <span style={{ flex: '1 1 auto', minWidth: 0 }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="segment-header">Highlights</h3>
                  <div className="highlight-container">
                    {featuredEvent.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="event-highlight-tag"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Bengali Culture Hero - VIDEO BACKGROUND */}
      <section id="home-hero" className="home-hero-container">
        <div className="home-hero-background-image" />
        
        {/* Restored Video Background with robust cover scaling */}
        <div className="home-hero-video-wrapper">
          <iframe
            className="iframe-cover-landscape"
            src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youTubeId}&playsinline=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}&widgetid=1`}
            title="Hero Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        <div className="home-hero-overlay" />
        
        <div className="home-hero-content">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <img
              src="/assets/images/abha-logo.png"
              alt="ABHA Logo"
              className="mobile-logo-adjust"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <h1 className="home-hero-title">
              Bengali Culture & Community in Harrisburg
            </h1>
            <p className="home-hero-subtitle">
              Celebrating our heritage through festivals, music, arts, and community service — all year round.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <button 
                className="btn-hbcu-primary" 
                onClick={() => onPageChange?.('events')} 
                type="button"
                style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
              >
                Explore Events
              </button>
              <button 
                className="btn-hbcu-secondary" 
                onClick={() => onPageChange?.('about')} 
                type="button"
                style={{ fontSize: '1.1rem', padding: '1rem 2rem', borderColor: '#fff', color: '#fff' }}
              >
                About ABHA
              </button>
              <button 
                className="btn-hbcu-secondary" 
                onClick={() => onPageChange?.('contact')} 
                type="button"
                style={{ fontSize: '1.1rem', padding: '1rem 2rem', borderColor: '#fff', color: '#fff' }}
              >
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Lightbox for Posters */}
      {lightboxSrc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded poster"
          onClick={() => setLightboxSrc(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxSrc(null); }}
            aria-label="Close"
            style={{
              position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.4)', color: '#fff',
              fontSize: 20, cursor: 'pointer'
            }}
          >×</button>
          <img
            src={lightboxSrc}
            alt="Poster"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
          />
        </div>
      )}

      {/* 2026 Committee Announcement Section */}
      <section className="announcement-section">
        <div className="container">
          <div className="announcement-card">
            <div className="announcement-header">
              <h2>Welcome 2026 Operational Committee</h2>
            </div>
            
            <div className="announcement-body">
              <p className="announcement-greeting">Dear Friends,</p>
              
              <p className="announcement-text">
                As we step into 2026, we are delighted to welcome our 2026 Operational Committee members.
              </p>
              
              <div className="committee-container">
                <h3 className="committee-title">2026 Operational Committee Members</h3>
                <ul className="committee-list">
                  {[
                    'Shatarupa Podder',
                    'Mahua Bhattacharya',
                    'Sriya Chattopadhyay',
                    'Somosree Dutta Gupta',
                    'Ishana Bandyopadhyay',
                    'Rahul Roy',
                    'Soumya (Kanti) Das',
                    'Kausik Bandyopadhyay'
                  ].map(name => (
                    <li key={name} className="committee-member">
                      <span className="committee-bullet">•</span> {name}
                    </li>
                  ))}
                </ul>
                <div className="webmaster-note">
                  <strong>Web Master:</strong> Aklavya Kumar
                </div>
              </div>

              <p className="announcement-text" style={{ fontSize: '1.05rem', color: '#555' }}>
                Collective experience, dedication, and insights of the Operational Committee members will be invaluable as we work together to drive our initiatives forward and achieve our goals this year. This committee is not just about planning and execution - it's about collaboration, innovation, and making a positive impact on our community.
              </p>
              
              <div className="announcement-event-alert">
                <span style={{ fontSize: '1.5rem' }}>🗓️</span>
                <p>We will soon publish our event list for the year.</p>
              </div>

              <div className="announcement-footer">
                <p className="announcement-signature">Sincerely,</p>
                <p className="announcement-sign-name">ABHA Operational Committee</p>
              </div>
            </div>
            
            <div className="announcement-links">
               Visit <a href="http://abhaweb.org" className="link-abha">abhaweb.org</a> and ABHA on <a href="https://www.facebook.com/ABHAweb" className="link-fb">Facebook</a> for all community events
            </div>
          </div>
        </div>
      </section>

  {/* (Testimonials moved further down to middle area) */}

      

      {/* Removed duplicate legacy hero section that used local video; Drive-based hero above is now the single source of truth */}

      {/* Mission Statement Section */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">UNITY IN CULTURE. STRENGTH IN COMMUNITY. JOY IN CELEBRATION.</h2>
          <p className="hbcu-mission-text">
            Join us in honoring the rich tapestry of Bengali heritage—music, dance, literature, and culinary arts. Together, we embrace our roots and illuminate our future.
          </p>
        </div>
      </section>

      {/* Community Events Section - Disabled for now */}
      {/* Future: Will show upcoming community events here */}

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
                <button onClick={() => onPageChange?.('contact')} className="btn-hbcu-primary">
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
          <p className="hbcu-heritage-description" style={{ maxWidth: 840, color: '#ffffff' }}>Reflections from members about ABHA's growth, inclusiveness, and cultural impact.</p>
          <div className="testimonials-grid" style={{ display: 'grid', gap: '1.9rem', marginTop: '2.4rem', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card" style={{ padding: '1.65rem 1.5rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', letterSpacing: '.03em', color: 'var(--primary-red, #7a1b1b)' }}>{t.title}</h3>
                {t.body.map((p, idx) => (
                  <p key={idx} style={{ margin: 0, fontSize: '.9rem', lineHeight: 1.5, color: '#222' }}>{p}</p>
                ))}
                <div style={{ marginTop: '.5rem', fontSize: '.7rem', letterSpacing: '.15em', fontWeight: 600, opacity: 0.85, color: '#444' }}>— {t.author}</div>
                {t.credit && (
                  <div style={{ fontSize: '.8rem', color: '#555', marginTop: '.25rem' }}>{t.credit}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About ABHA Overview Section */}
  <VideoTestimonials />

  {/* Gallery moved to Culture page */}

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
