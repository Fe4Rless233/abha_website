import React, { useEffect, useMemo, useRef } from 'react';

export interface StripItem {
  src: string;
  alt?: string;
}

interface HorizontalInfiniteStripProps {
  items: StripItem[];
  height?: number; // px
  gap?: number; // px
}

const HorizontalInfiniteStrip: React.FC<HorizontalInfiniteStripProps> = ({ items, height = 140, gap = 12 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tripled = useMemo(() => [...items, ...items, ...items], [items]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Jump to middle sequence to allow left/right "infinite" scroll
    const mid = el.scrollWidth / 3;
    el.scrollLeft = mid;

    const onScroll = () => {
      const w = el.scrollWidth / 3; // width of one sequence
      if (el.scrollLeft < w * 0.1) {
        el.scrollLeft += w;
      } else if (el.scrollLeft > w * 2.9) {
        el.scrollLeft -= w;
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll as any);
  }, [items.length]);

  return (
    <div
      className="hstrip"
      ref={containerRef}
      style={{
        display: 'flex',
        overflowX: 'auto',
        gap,
        padding: '8px 4px',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
      aria-label="Cultural gallery strip"
    >
      {tripled.map((it, i) => (
        <img
          key={`${it.src}-${i}`}
          src={it.src}
          alt={it.alt || 'Gallery image'}
          loading="lazy"
          style={{ height, width: Math.round(height * 1.5), objectFit: 'cover', borderRadius: 10, display: 'block', flex: '0 0 auto' }}
        />
      ))}
    </div>
  );
};

export default HorizontalInfiniteStrip;
