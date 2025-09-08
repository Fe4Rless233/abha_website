import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { galleryThumbnails } from '../data/galleryThumbnails';

type GalleryItem =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; alt?: string };

interface GalleryProps {
  items: GalleryItem[];
  pageSize?: number;
  triggerLabel?: string;
  hideList?: boolean; // when true, only render the trigger + modal (no inline list)
  triggerClassName?: string;
  triggerStyle?: React.CSSProperties;
}

const Gallery: React.FC<GalleryProps> = ({ items, pageSize = 12, triggerLabel = 'Open Gallery', hideList = false, triggerClassName, triggerStyle }) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [isOpen, setIsOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);

  // Infinite scroll: observe sentinel when gallery is not open (list mode)
  useEffect(() => {
    if (hideList) return; // skip in modal-only mode
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleCount((c) => Math.min(c + pageSize, items.length));
        }
      });
    }, { rootMargin: '200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [items.length, pageSize, hideList]);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
      window.addEventListener('keydown', onKey);
      return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
    }
  }, [isOpen]);

  // Preload images and videos for caching
  useEffect(() => {
    // Only preload a reasonable number to avoid memory issues
    const preloadCount = Math.min(items.length, 50);
    for (let i = 0; i < preloadCount; i++) {
      const it = items[i];
      if (it.type === 'image') {
        const img = new window.Image();
        img.src = it.src;
      } else if (it.type === 'video') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = it.src;
        document.head.appendChild(link);
      }
    }
    // Clean up preloads for videos
    return () => {
      const links = document.querySelectorAll('link[rel="preload"][as="video"]');
      links.forEach((l) => l.parentNode?.removeChild(l));
    };
  }, [items]);

  return (
    <div className="abha-gallery">
      {!hideList && (
        <>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))' }}>
            {visibleItems.map((it, i) => (
              <figure key={i} style={{ margin: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
                {it.type === 'image' ? (
                  <img
                    src={it.src}
                    alt={it.alt || `Gallery item ${i + 1}`}
                    loading="lazy"
                    style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
                    onError={e => {
                      console.error('Failed to load image:', it.src);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <video
                    src={it.src}
                    controls
                    style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block', background: '#000' }}
                  >
                    Sorry, your browser does not support embedded videos.
                  </video>
                )}
              </figure>
            ))}
          </div>
          {visibleCount < items.length && (
            <div ref={sentinelRef} style={{ height: 1 }} />
          )}
        </>
      )}
      <div style={{ marginTop: '1rem', display: 'flex', gap: '.75rem', justifyContent: 'center' }}>
        <button type="button" className={['btn-hbcu-secondary', triggerClassName].filter(Boolean).join(' ')} onClick={() => setIsOpen(true)} style={triggerStyle}>
          {triggerLabel}
        </button>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal
          className="gallery-modal"
          onClick={() => setIsOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            aria-label="Close"
            className="gallery-close"
            style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: 20, cursor: 'pointer' }}
          >×</button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 1200, maxHeight: '90vh', overflowY: 'auto', background: 'none' }}
          >
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
              {items.map((it, i) => (
                <figure key={i} style={{ margin: 0, borderRadius: 8, overflow: 'hidden', background: '#111' }}>
                  {it.type === 'image' ? (
                    <img
                      src={it.src}
                      alt={it.alt || `Gallery item ${i + 1}`}
                      loading="lazy"
                      style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <video
                      src={it.src}
                      controls
                      style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', background: '#000' }}
                    >
                      Sorry, your browser does not support embedded videos.
                    </video>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
export type { GalleryItem };
