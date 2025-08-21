import React, { useState } from 'react';

interface VideoTestimonial {
  id: string;            // unique key
  title: string;         // short heading
  person: string;        // name / role
  src: string;           // video source (mp4 path or YouTube ID)
  poster?: string;       // optional poster image
  description?: string;  // short context
  youtube?: boolean;     // flag if src is a YouTube video id
}

interface VideoTestimonialsProps {
  videos?: VideoTestimonial[];
}

// Using local MP4 assets placed under public/videos/ as per user naming.
// If later switching to YouTube, set youtube:true and src to the video ID.
const defaultVideos: VideoTestimonial[] = [
  {
    id: 'vt1',
    title: 'Community Impact',
  person: 'Thank you Tanmoy and Sushmita',
  src: '/assets/videos/videoTestimonial1.mp4',
    description: 'How ABHA helped them connect with culture.'
  },
  {
    id: 'vt2',
    title: 'Family Experience',
  person: 'Thank you Susmit and Saswati',
  src: '/assets/videos/videoTestimonial2.mp4',
    description: 'A family sharing their festival experience.'
  },
  {
    id: 'vt3',
    title: 'Youth Perspective',
  person: 'Thank you Dipankar and Barnali',
  src: '/assets/videos/videoTestimonial3.mp4',
    description: 'Youth involvement and cultural learning.'
  }
];

const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({ videos = defaultVideos }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="hbcu-investment-section" style={{ paddingTop: '3.25rem', paddingBottom: '3.25rem' }}>
      <div className="container">
        <h2 className="hbcu-section-title-dark" style={{ marginBottom: '.6rem' }}>Video Testimonials</h2>
        <p className="hbcu-heritage-description" style={{ maxWidth: 840 }}>
          Voices from our community sharing real experiences with ABHA.
        </p>
        <div style={{ display: 'grid', gap: '1.75rem', marginTop: '2.2rem', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
          {videos.map(v => {
            const isExpanded = active === v.id;
            return (
              <div key={v.id} className="event-card" style={{ padding: '1.1rem 1.1rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', letterSpacing: '.03em', color: 'var(--primary-red,#7a1b1b)' }}>{v.title}</h3>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#111', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 12px -4px rgba(0,0,0,.4)' }}>
                  {v.youtube ? (
                    <iframe
                      title={v.title}
                      src={isExpanded ? `https://www.youtube.com/embed/${v.src}?autoplay=1&rel=0` : `https://www.youtube.com/embed/${v.src}?rel=0`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', border: '0' }}
                      loading="lazy"
                    />
                  ) : (
                    <video
                      controls
                      preload="metadata"
                      poster={v.poster}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    >
                      <source src={v.src} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {v.youtube && (
                    <button
                      type="button"
                      onClick={() => setActive(prev => prev === v.id ? null : v.id)}
                      style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.55)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '.4rem .65rem', fontSize: '.7rem', borderRadius: 6, cursor: 'pointer' }}
                    >
                      {isExpanded ? 'Pause' : 'Play'}
                    </button>
                  )}
                </div>
                <div style={{ fontSize: '.8rem', opacity: .85, fontWeight: 600 }}>{v.person}</div>
                {v.description && <p style={{ margin: 0, fontSize: '.8rem', lineHeight: 1.4 }}>{v.description}</p>}
                <div style={{ marginTop: 'auto', fontSize: '.65rem', letterSpacing: '.14em', opacity: .6 }}>TESTIMONIAL</div>
              </div>
            );
          })}
        </div>
  {/* Footer note removed per request */}
      </div>
    </section>
  );
};

export default VideoTestimonials;
