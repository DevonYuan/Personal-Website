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

export default function Hero() {
  return (
    <section id="hero" data-testid="hero-section" className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <RubiksCubeCanvas />
      </div>
      <div data-testid="hero-wordmark" className="pointer-events-none absolute inset-0 z-10 select-none mix-blend-difference">
        <div className="absolute left-6 top-[15%] md:left-14 md:top-[17%]">
          <div className="relative">
            <span aria-hidden="true" className="text-stroke absolute left-2 top-2 font-display text-[17vw] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] md:text-[11vw]">
              Your
            </span>
            <h1 className="relative font-display text-[17vw] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] text-[#F5F5F7] md:text-[11vw]">
              <Line delay={0.15}>Your</Line>
            </h1>
          </div>
        </div>
        <div className="absolute bottom-[15%] right-6 text-right md:bottom-[17%] md:right-14">
          <div className="relative">
            <span aria-hidden="true" className="text-stroke absolute left-2 top-2 font-display text-[17vw] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] md:text-[11vw]">
              Name
            </span>
            <span className="relative block font-display text-[17vw] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] text-[#F5F5F7] md:text-[11vw]">
              <Line delay={0.32}>Name</Line>
            </span>
          </div>
          <motion.p
            data-testid="hero-tagline"
            className="mt-4 font-serif text-base italic text-neutral-300 md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
          >
            developer — building precise, tactile systems for the web
          </motion.p>
        </div>
      </div>
      <Annot testid="hero-annot-year" className="left-6 top-24 md:left-10 md:top-28" delay={0.9}>
        Portfolio / V.2026
      </Annot>
      <Annot testid="hero-annot-coords" className="right-6 top-24 text-right md:right-10 md:top-28" delay={1}>
        37.7749°N — 122.4194°W
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