import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  className?: string;
  startOnVisible?: boolean;
  decimals?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1000,
  prefix = '',
  suffix = '',
  className = '',
  startOnVisible = true,
  decimals = 0
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [started, setStarted] = useState(!startOnVisible);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (startOnVisible) {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setStarted(true);
            obs.disconnect();
          }
        });
      }, { threshold: 0.3 });
      obs.observe(el);
      return () => obs.disconnect();
    }
  }, [startOnVisible]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(end * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [started, duration, end]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  );
};

export default CountUp;
