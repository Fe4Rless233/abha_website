import React, { useEffect, useState } from 'react';

interface CountdownProps {
  target: string; // ISO date string
  label?: string;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const pad = (n: number) => n.toString().padStart(2, '0');

const Countdown: React.FC<CountdownProps> = ({ target, label = 'Countdown', compact = false, className, style }) => {
  const targetTime = new Date(target).getTime();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = targetTime - now;

  if (isNaN(targetTime)) {
    return <div className={className} style={style}>Invalid date</div>;
  }

  if (diff <= 0) {
    return (
      <div className={className} style={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.35rem' }}>
        <div style={{ fontSize: '.6rem', letterSpacing: '.18em', color: '#FFD700' }}>{label.toUpperCase()}</div>
        <div style={{ fontWeight: 600, fontSize: compact ? '0.9rem' : '1.15rem', color: '#fff' }}>Happening Now</div>
      </div>
    );
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const boxStyle: React.CSSProperties = compact
    ? { fontSize: '1rem', fontWeight: 600, lineHeight: 1, color: '#fff', minWidth: '2.1ch', textAlign: 'center' }
    : { fontSize: '1.35rem', fontWeight: 600, lineHeight: 1, color: '#fff', minWidth: '2.3ch', textAlign: 'center' };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: compact ? '.45rem' : '.6rem',
        background: 'rgba(255,255,255,0.07)',
        padding: compact ? '.65rem .85rem .75rem' : '.9rem 1.1rem 1rem',
        borderRadius: '14px',
        border: '1px solid rgba(255,215,0,0.28)',
        backdropFilter: 'blur(4px)',
        ...style
      }}
      aria-label={`Time remaining until event starts: ${days} days ${hours} hours ${mins} minutes ${secs} seconds`}
    >
      <div style={{ fontSize: compact ? '.5rem' : '.55rem', letterSpacing: '.25em', color: '#FFD700', fontWeight: 600 }}>
        {label.toUpperCase()}
      </div>
      <div style={{ display: 'flex', gap: compact ? '.45rem' : '.55rem' }}>
        {[['D', days], ['H', hours], ['M', mins], ['S', secs]].map(([t, v]) => (
          <div key={t} style={{ textAlign: 'center' }}>
            <div style={boxStyle}>{pad(v as number)}</div>
            <div style={{ fontSize: '.55rem', marginTop: '.15rem', letterSpacing: '.25em', color: '#FFD700' }}>{t}</div>
          </div>
        ))}
      </div>
      {!compact && (
        <div style={{ fontSize: '.6rem', color: '#f8f3e0', opacity: 0.9 }}>
          Starts Sep 27, 10:00 AM ET
        </div>
      )}
    </div>
  );
};

export default Countdown;
