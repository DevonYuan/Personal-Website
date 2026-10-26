import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <motion.section
      id="about-section-full"
      className="fixed inset-0 z-40 bg-[#080808] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Blueprint grid background - matching Hero */}
      <BlueprintGrid />

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
          Close to return ↓
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