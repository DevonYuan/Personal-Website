import React from 'react';
import { motion } from 'framer-motion';

interface BeyondCodeEntry {
  number: string;
  title: string;
  meta: string;
  body: string;
}

const BEYOND_CODE: BeyondCodeEntry[] = [
  {
    number: '01',
    title: 'Speedcubing',
    meta: 'Puzzle / Sub-10',
    body:
      "I've been speedcubing since I was a child, and currently average sub-10. I did it casually, up until the last year of high school, when I decided that I seriously wanted to improve. That pushed me to finally memorize full OLL and PLL, which I had been putting off until then. I also worked on my look-ahead, allowing me to achieve more fluid transitions between my F2L pairs. Now, I'm working on my execution and fingertricks to achieve higher TPS.",
  },
  {
    number: '02',
    title: 'Video Gaming',
    meta: 'Fighting / Master',
    body:
      "I have been gaming for as long as I can remember. A couple of my favourite games and series include MarioKart Wii, Need for Speed, Assassin's Creed, Sonic the Hedgehog, Batman Arkham, and Dying Light. After finishing IB exams in high school, I also picked up fighting games. I played my father's copy of Street Fighter 4 and 5, and later began playing Street Fighter 6, where I am a master ranked Ken main. I have mained Ken in every Street Fighter game that I play, because I like the flaming visual effects and aggressive playstyle. In Street Fighter 3: Third Strike, I also dabble with Ryu and Akuma as my off-mains.",
  },
  {
    number: '03',
    title: 'Running',
    meta: '5K / 19:15',
    body:
      "I began running solely for the exercise, but I fell in love with it because I liked the idea of pushing myself to become as fast as possible. Just like speedcubing, and in some of the games I play, I like the thrill of pushing myself to achieve high speeds, whether it's turning a cube faster than the eye can process, or completing a Sonic level in the shortest time possible. Naturally, running followed. I was a co-captain for the cross country team in high school, and I still run for the love of it. Current 5k time is just under 20 minutes, record is 19:15.",
  },
  {
    number: '04',
    title: 'Cars',
    meta: 'RX7 / FD3S',
    body:
      "I'm a huge car enthusiast, and my favourite car of all time is the Mazda RX7 FD3S. My first exposure to cars was the Cars movie, then playing Need for Speed, and later the Fast and Furious franchise. That's the RX7 up there! It was captured in photo mode from a drifting game called FR Legends, where I built my dream car in game, an RX7 with an RE Amemiya body kit. I included aspects of my father's 2001 Honda Prelude in real life, namely the white exterior, gold painted rims, and carbon fiber hood.",
  },
];

interface AboutSectionProps {
  onClose?: () => void;
}

export default function AboutSection({ onClose }: AboutSectionProps) {
  return (
    <motion.section
      id="about-section-full"
      data-lenis-prevent=""
      className="fixed inset-0 z-40 overflow-y-auto overflow-x-hidden bg-[#080808]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Blueprint grid background - matching Hero */}
      <BlueprintGrid />

      {/* ---------- About Me hero ---------- */}
      <div className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden">

      {/* RX7 Image - circular cutout, centered, behind the wordmark */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative h-[52vmin] w-[52vmin] overflow-hidden rounded-full border border-neutral-700/70 bg-[#0B0B0B] drop-shadow-[0_0_70px_rgba(42,157,143,0.25)]">
          <img
            src={`${import.meta.env.BASE_URL}RX7.png`}
            alt="Mazda RX-7"
            width={1024}
            height={977}
            className="h-full w-full object-cover"
            onError={() => console.error(`Failed to load: ${import.meta.env.BASE_URL}RX7.png`)}
          />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-30 select-none">
        {/* "About Me" wordmark - similar to Hero's name layout */}
        <div className="absolute left-6 top-[15%] md:left-14 md:top-[17%]">
          <div className="relative">
            {/* Echo layers - multiple strokes with increasing offset */}
            <span aria-hidden="true" className="text-stroke absolute left-10 top-10 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.15 }}>
              About
            </span>
            <span aria-hidden="true" className="text-stroke absolute left-7 top-7 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.25 }}>
              About
            </span>
            <span aria-hidden="true" className="text-stroke absolute left-4 top-4 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.35 }}>
              About
            </span>
            <h1 className="relative font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] text-[#F5F5F7] md:text-[11vw]">
              <motion.span
                className="block"
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                About
              </motion.span>
            </h1>
          </div>
        </div>
        <div className="absolute bottom-[15%] right-6 text-right md:bottom-[17%] md:right-14">
          <div className="relative">
            {/* Echo layers - multiple strokes with increasing offset */}
            <span aria-hidden="true" className="text-stroke absolute left-10 top-10 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.15 }}>
              Me
            </span>
            <span aria-hidden="true" className="text-stroke absolute left-7 top-7 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.25 }}>
              Me
            </span>
            <span aria-hidden="true" className="text-stroke absolute left-4 top-4 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] md:text-[11vw]" style={{ opacity: 0.35 }}>
              Me
            </span>
            <span className="relative block font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[0.08em] text-[#F5F5F7] md:text-[11vw]">
              <motion.span
                className="block"
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                Me
              </motion.span>
            </span>
          </div>
        </div>
      </div>

      {/* Annotations - matching Hero style, offset below the fixed navbar */}
      <div className="absolute left-6 top-20 md:left-10 md:top-24 z-20">
        <motion.span
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Portfolio / V.{new Date().getFullYear()}
        </motion.span>
      </div>
      <div className="absolute right-6 top-20 md:right-10 md:top-24 text-right z-20">
        <motion.span
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
        >
          49.2748°N — 122.7987°W
        </motion.span>
      </div>
      <div className="absolute bottom-8 left-6 flex items-center gap-2 md:left-10 z-20">
        <motion.div
          className="animate-blink inline-block h-1.5 w-1.5 rounded-full bg-[#2A9D8F]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        />
        <motion.span
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          About Me
        </motion.span>
      </div>
      <div className="absolute bottom-8 right-6 md:right-10 z-20">
        <motion.span
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Scroll to explore ↓
        </motion.span>
      </div>

      {/* Cross marks - matching Hero */}
      <div className="absolute left-6 top-1/2 md:left-10 z-20" style={{ opacity: 0.3 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>+</motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}>+</motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>+</motion.div>
      </div>
      <div className="absolute right-6 top-1/2 text-right md:right-10 z-20" style={{ opacity: 0.3 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25 }}>+</motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>+</motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }}>+</motion.div>
      </div>

      {/* Sparkles */}
      <motion.div className="absolute left-[46%] top-[10%] z-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
        ✦
      </motion.div>
      <motion.div className="absolute bottom-[38%] right-[8%] z-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        ✦
      </motion.div>
      </div>

      {/* ---------- 01 - Profile ---------- */}
      <div className="relative z-10 border-t border-[#27272A] bg-[#080808]/60">
        <div className="mx-auto max-w-[1000px] px-6 py-14 md:px-10 md:py-20">
          <motion.p
            data-testid="about-profile-callout"
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            01 — Profile
          </motion.p>
          <motion.h2
            className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Computer Science Student{' '}
            <span className="font-serif normal-case italic text-neutral-400">@ UBC</span>
          </motion.h2>
          {/* Divider line */}
          <motion.div
            className="mt-8 h-px w-16 bg-neutral-700"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="mt-10 max-w-[68ch] text-base leading-relaxed text-neutral-400 md:text-lg"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            I&apos;m a Computer Science student at the{' '}
            <span className="text-neutral-200">University of British Columbia</span>, currently
            seeking an internship for winter or summer 2027. I don&apos;t build projects solely for
            the purpose of learning. While learning is important, the bigger reason is that I want
            to create tools that are actually useful, for myself or for others. I&apos;m currently
            using a MacBook M5 Pro, which I bought after saving up from my summer job as a tutor!
          </motion.p>
        </div>
      </div>

      {/* ---------- 03 - Beyond Code ---------- */}
      <div className="relative z-10 border-t border-[#27272A] bg-[#080808]/60">
        <div className="mx-auto max-w-[1000px] px-6 py-16 md:px-10 md:py-24">
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            03 — Beyond Code
          </motion.p>
          <motion.h2
            className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Beyond <span className="font-serif normal-case italic text-neutral-400">code</span>
          </motion.h2>
          {/* Divider line */}
          <motion.div
            className="mt-8 h-px w-16 bg-neutral-700"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <div className="mt-16 md:mt-24">
            {BEYOND_CODE.map((entry, i) => (
              <motion.article
                key={entry.number}
                data-testid={`beyond-code-${entry.number}`}
                className="grid gap-4 border-t border-[#27272A] py-8 last:border-b md:grid-cols-[auto_1fr_auto] md:gap-10 md:px-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <span className="font-mono text-sm text-neutral-600">/{entry.number}</span>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight md:text-3xl">
                    {entry.title}
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-neutral-400">
                    {entry.body}
                  </p>
                </div>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 md:block">
                  {entry.meta}
                </span>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="border-t border-[#27272A]">
          <div className="mx-auto flex max-w-[1000px] flex-col items-start justify-between gap-4 px-6 py-8 md:flex-row md:items-center md:px-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
              End of about
            </span>
            {onClose && (
              <button
                data-testid="about-footer-return"
                onClick={onClose}
                className="border border-neutral-700 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-200 transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                Return to Home
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// Blueprint grid background - copied from Hero
function BlueprintGrid() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationRef = React.useRef<number>();
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const timeRef = React.useRef(0);

  React.useEffect(() => {
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

          const pulse = Math.sin(timeRef.current * 2 + i * 0.5 + j * 0.3) * 0.3 + 0.7;
          ctx.globalAlpha = 0.04 * pulse;

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();

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