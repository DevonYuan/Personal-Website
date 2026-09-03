import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import RubiksCubeCanvas from './RubiksCubeCanvas';

interface LineProps {
  children: React.ReactNode;
  delay: number;
}

const Line = ({ children, delay }: LineProps) => (
  <div className="overflow-hidden py-[0.5vw]">
    <motion.span
      className="block"
      initial={{ y: '115%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </div>
);

interface AnnotProps {
  className: string;
  children: React.ReactNode;
  delay?: number;
  testid: string;
}

const Annot = ({ className, children, delay = 1, testid }: AnnotProps) => (
  <motion.div
    data-testid={testid}
    className={`pointer-events-none absolute z-10 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay }}
  >
    {children}
  </motion.div>
);

// Blueprint grid background - subtle animated dot grid
function BlueprintGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const gridSize = 40;
    const dotRadius = 1.2;

    const draw = (timestamp: number) => {
      timeRef.current = timestamp * 0.001;
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(245, 245, 247, 0.04)';

      const offsetX = Math.sin(timeRef.current * 0.15) * 8 + (mouseRef.current.x - canvas.width / 2) * 0.008;
      const offsetY = Math.cos(timeRef.current * 0.12) * 6 + (mouseRef.current.y - canvas.height / 2) * 0.008;

      const cols = Math.ceil(canvas.width / gridSize) + 2;
      const rows = Math.ceil(canvas.height / gridSize) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize + offsetX;
          const y = j * gridSize + offsetY;

          // Subtle pulse on some dots
          const pulse = Math.sin(timeRef.current * 2 + i * 0.5 + j * 0.3) * 0.3 + 0.7;
          ctx.globalAlpha = 0.04 * pulse;

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();

          // Draw subtle connecting lines (blueprint style)
          if (i < cols - 1) {
            ctx.globalAlpha = 0.015;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + gridSize, y);
            ctx.strokeStyle = 'rgba(245, 245, 247, 0.02)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
          if (j < rows - 1) {
            ctx.globalAlpha = 0.015;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + gridSize);
            ctx.strokeStyle = 'rgba(245, 245, 247, 0.02)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}

// Live clock component
function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
      {time.toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' })} UTC
    </span>
  );
}

// Scroll position indicator
function ScrollPosition() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
      SCROLL {scrollPercent.toFixed(1)}%
    </span>
  );
}

// System status component
function SystemStatus() {
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight latency variation
      setLatency(prev => Math.max(8, Math.min(45, prev + (Math.random() - 0.5) * 4)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 flex items-center gap-2">
      <span className="relative">
        SYSTEM STATUS:
        <span className="ml-1 text-[#2A9D8F]">ONLINE</span>
      </span>
      <span className="text-neutral-400">|</span>
      <span>LATENCY {Math.round(latency)}ms</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" data-testid="hero-section" className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
      {/* Blueprint grid background */}
      <BlueprintGrid />
      
      {/* Rubik's Cube - centered behind text */}
      <div className="pointer-events-none absolute z-[0] inset-0">
        <RubiksCubeCanvas />
      </div>
      
      <div data-testid="hero-wordmark" className="pointer-events-none absolute inset-0 z-10 select-none">
        <div className="absolute left-6 top-[15%] md:left-14 md:top-[17%]">
          <div className="relative">
            {/* Echo layers - multiple strokes with increasing offset */}
            <span aria-hidden="true" className="text-stroke absolute left-10 top-10 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.15 }}>
              Devon
            </span>
            <span aria-hidden="true" className="text-stroke absolute left-7 top-7 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.25 }}>
              Devon
            </span>
            <span aria-hidden="true" className="text-stroke absolute left-4 top-4 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.35 }}>
              Devon
            </span>
            <h1 className="relative font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] text-[#F5F5F7] md:text-[11vw]">
              <Line delay={0.15}>Devon</Line>
            </h1>
          </div>
        </div>
        <div className="absolute bottom-[15%] right-6 text-right md:bottom-[17%] md:right-14">
          <div className="relative">
            {/* Echo layers - multiple strokes with increasing offset */}
            <span aria-hidden="true" className="text-stroke absolute left-10 top-10 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.15 }}>
              Yuan
            </span>
            <span aria-hidden="true" className="text-stroke absolute left-7 top-7 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.25 }}>
              Yuan
            </span>
            <span aria-hidden="true" className="text-stroke absolute left-4 top-4 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.35 }}>
              Yuan
            </span>
            <span className="relative block font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] text-[#F5F5F7] md:text-[11vw]">
              <Line delay={0.32}>Yuan</Line>
            </span>
          </div>
          <motion.p
            data-testid="hero-tagline"
            className="mt-4 font-serif text-base italic text-neutral-300 md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
          >
            BSc. Major in Computer Science @ UBC
          </motion.p>
        </div>
      </div>
      {/* Live micro-data in margins */}
      <Annot testid="hero-annot-clock" className="left-6 top-10 md:left-10 md:top-12" delay={0.8}>
        <LiveClock />
      </Annot>
      <Annot testid="hero-annot-year" className="left-6 top-24 md:left-10 md:top-28" delay={0.9}>
        Portfolio / V.{new Date().getFullYear()}
      </Annot>
      <Annot testid="hero-annot-coords" className="right-6 top-24 text-right md:right-10 md:top-28" delay={1}>
        49.2748°N — 122.7987°W
      </Annot>
      <Annot testid="hero-annot-system" className="right-6 top-10 md:right-10 md:top-12 text-right" delay={0.85}>
        <SystemStatus />
      </Annot>
      <Annot testid="hero-annot-scrollpos" className="left-6 bottom-20 md:left-10 md:bottom-24" delay={1.6}>
        <ScrollPosition />
      </Annot>
      <Annot testid="hero-annot-cross-left" className="left-6 top-1/2 md:left-10" delay={1.1}>
        +<br />+<br />+
      </Annot>
      <Annot testid="hero-annot-cross-right" className="right-6 top-1/2 text-right md:right-10" delay={1.2}>
        +<br />+<br />+
      </Annot>
      <Annot testid="hero-annot-spark-1" className="left-[46%] top-[10%]" delay={1.3}>
        ✦
      </Annot>
      <Annot testid="hero-annot-spark-2" className="bottom-[38%] right-[8%]" delay={1.4}>
        ✦
      </Annot>
      <Annot testid="hero-annot-status" className="bottom-8 left-6 flex items-center gap-2 md:left-10" delay={1.4}>
        <span className="animate-blink inline-block h-1.5 w-1.5 rounded-full bg-[#2A9D8F]" />
        Available for projects
      </Annot>
      <Annot testid="hero-annot-scroll" className="bottom-8 right-6 md:right-10" delay={1.5}>
        Scroll to explore ↓
      </Annot>
      <motion.div
        data-testid="hero-rotating-badge"
        className="absolute bottom-8 left-1/2 z-10 hidden h-24 w-24 -translate-x-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <div className="animate-spin-slow h-full w-full">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <path id="badge-circle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
            </defs>
            <text className="fill-neutral-500 font-mono" fontSize="8" letterSpacing="2.6">
              <textPath href="#badge-circle">CREATIVE DEVELOPER • SYSTEM THINKER •</textPath>
            </text>
          </svg>
        </div>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-neutral-400">✧</span>
      </motion.div>
    </section>
  );
}