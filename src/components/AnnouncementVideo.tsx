import React, { useEffect, useMemo, useRef, useState } from 'react';

interface AnnouncementVideoProps {
  // Local or remote URL. If omitted, component will try window.localStorage key 'abha_announcement_video_url',
  // then fallback to '/assets/videos/announcement-vertical.mp4'.
  src?: string;
  // Optional poster image for faster first paint
  poster?: string;
  // Accessible title/label
  title?: string;
  // If true, show controls and don’t autoplay
  controlsOnly?: boolean;
  // Optional iframe embed (e.g., Google Drive preview). When provided, takes precedence over src.
  embedUrl?: string;
}

const AnnouncementVideo: React.FC<AnnouncementVideoProps> = ({
  src,
  poster = '/assets/images/hero-poster.jpg',
  title = 'Announcement video',
  controlsOnly = false,
  embedUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resolve embed first (Drive/YouTube/etc.)
  const resolvedEmbed = useMemo(() => {
    if (embedUrl && embedUrl.trim()) return embedUrl.trim();
    try {
      const envEmbed = (import.meta as any)?.env?.VITE_ANNOUNCEMENT_EMBED_URL as string | undefined;
      if (envEmbed && envEmbed.trim()) return envEmbed.trim();
    } catch {}
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('abha_announcement_embed_url') : null;
      if (stored && stored.trim()) return stored.trim();
    } catch {}
    return '';
  }, [embedUrl]);

  const resolvedSrc = useMemo(() => {
    if (src && src.trim()) return src.trim();
    // Prefer Vite env var if provided
    try {
      const envUrl = (import.meta as any)?.env?.VITE_ANNOUNCEMENT_VIDEO_URL as string | undefined;
      if (envUrl && envUrl.trim()) return envUrl.trim();
    } catch {}
    // Allow runtime override via localStorage for quick tests
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('abha_announcement_video_url') : null;
      if (stored && stored.trim()) return stored.trim();
    } catch {}
    return '/assets/videos/announcement-vertical.mp4';
  }, [src]);

  useEffect(() => {
    if (!controlsOnly) {
      const el = videoRef.current;
      if (el) {
        el.muted = true; // Required for autoplay on most mobile browsers
        const p = el.play();
        if (p && typeof p.then === 'function') {
          p.then(() => setCanPlay(true)).catch(() => {
            // Autoplay blocked – fall back to showing controls
            setCanPlay(false);
          });
        }
      }
    }
  }, [controlsOnly, resolvedSrc]);

  // 9:16 responsive container using aspect-ratio when available
  if (resolvedEmbed) {
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
          {/* Glow frame */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: -10,
              filter: 'blur(22px)',
              borderRadius: 16,
              background: 'conic-gradient(from 210deg at 50% 50%, rgba(255,215,0,0.25), rgba(255,0,128,0.18), rgba(30,144,255,0.22), rgba(255,215,0,0.25))',
              opacity: 0.9,
              pointerEvents: 'none'
            }}
          />
          {/* Container with gradient border */}
          <div
            style={{
              padding: 2,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(255,215,0,0.9), rgba(255,0,128,0.6))',
            }}
          >
            <div
              style={{
                width: 'min(480px, 92vw)',
                aspectRatio: '9 / 16',
                borderRadius: 12,
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.35)',
                boxShadow: '0 12px 36px rgba(0,0,0,0.40)'
              }}
            >
              <iframe
                title={title}
                src={resolvedEmbed}
                style={{ width: '100%', height: '100%', border: 0 }}
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          {/* Animated corner accent (reduced motion aware by CSS media) */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -8,
              right: -8,
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,215,0,0.4) 45%, transparent 60%)',
              animation: 'abhaPulse 3s ease-in-out infinite',
              boxShadow: '0 0 24px rgba(255,215,0,0.5)',
            }}
          />
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              @keyframes abhaPulse { 0%,100% { transform: scale(1); opacity: .75 } 50% { transform: scale(1.15); opacity: 1 } }
            }
          `}</style>
        </div>
        {(import.meta as any)?.env?.DEV && (
          <div style={{ marginTop: 8, color: '#ffe38f', fontSize: 12 }}>embed: {resolvedEmbed}</div>
        )}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'relative' }}>
        {/* Glow frame */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: -10,
            filter: 'blur(22px)',
            borderRadius: 16,
            background: 'conic-gradient(from 210deg at 50% 50%, rgba(255,215,0,0.25), rgba(255,0,128,0.18), rgba(30,144,255,0.22), rgba(255,215,0,0.25))',
            opacity: 0.9,
            pointerEvents: 'none'
          }}
        />
        {/* Container with gradient border */}
        <div style={{ padding: 2, borderRadius: 14, background: 'linear-gradient(135deg, rgba(255,215,0,0.9), rgba(255,0,128,0.6))' }}>
          <div
            style={{
              width: 'min(420px, 92vw)',
              aspectRatio: '9 / 16',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0,0,0,0.40)'
            }}
          >
            <video
              ref={videoRef}
              playsInline
              // Autoplay if not controlsOnly
              autoPlay={!controlsOnly}
              muted
              loop
              controls={controlsOnly || !canPlay}
              poster={poster}
              preload="metadata"
              onCanPlay={() => setCanPlay(true)}
              onError={() => setError('Could not load video')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              aria-label={title}
            >
              <source src={resolvedSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!controlsOnly && !canPlay && !error && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                Loading…
              </div>
            )}
            {error && (
              <div style={{ padding: '0.75rem', color: '#fff', background: 'rgba(0,0,0,0.5)' }}>
                {error}
              </div>
            )}
          </div>
        </div>
        {/* Animated corner accent */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,215,0,0.4) 45%, transparent 60%)',
            animation: 'abhaPulse 3s ease-in-out infinite',
            boxShadow: '0 0 24px rgba(255,215,0,0.5)'
          }}
        />
        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            @keyframes abhaPulse { 0%,100% { transform: scale(1); opacity: .75 } 50% { transform: scale(1.15); opacity: 1 } }
          }
        `}</style>
      </div>
      {(import.meta as any)?.env?.DEV && (
        <div style={{ marginTop: 8, color: '#ffe38f', fontSize: 12 }}>
          src: {resolvedSrc}
        </div>
      )}
    </div>
  );
};

export default AnnouncementVideo;
