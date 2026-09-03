import { useEffect, useState, useRef } from 'react';

export default function ScrollProgressBar() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
        setScrollPercent(percent);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none select-none"
      data-testid="scroll-progress-bar"
    >
      {/* Percentage text - right side up */}
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 whitespace-nowrap">
        {scrollPercent.toFixed(1)}%
      </span>
      
      {/* Vertical progress bar track */}
      <div className="relative w-px h-64 bg-neutral-800">
        {/* Progress fill - grows from top down */}
        <div
          className="absolute top-0 left-0 w-full bg-neutral-300 transition-all duration-100 ease-out"
          style={{
            height: `${scrollPercent}%`,
          }}
        />
      </div>
    </div>
  );
}