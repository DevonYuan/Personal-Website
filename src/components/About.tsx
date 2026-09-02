import { motion } from 'framer-motion';

interface Chapter {
  number: string;
  title: string;
  description: string;
}

const CHAPTERS: Chapter[] = [
  {
    number: '01',
    title: 'Engineering Philosophy',
    description:
      'Building at the intersection of high performance and tactile aesthetics. Code is written like architecture — structured to endure, detailed to delight.',
  },
  {
    number: '02',
    title: 'Stack & Craft',
    description:
      'React, WebGL / Three.js, Node.js, Python FastAPI and bespoke design systems. Minimal dependencies, maximum fidelity.',
  },
  {
    number: '03',
    title: 'Execution Standard',
    description:
      'Obsessed with 60fps micro-interactions, crisp typographic systems, sub-second loads and pixel-precise layout engines.',
  },
];

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        01 — Manifesto
      </motion.p>
      <motion.h2
        className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        About <span className="font-serif normal-case italic text-neutral-400">the craft</span>
      </motion.h2>
      <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-[1fr_1.5fr] md:gap-12">
        <motion.div
          className="relative overflow-hidden border border-[#27272A]"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
        >
          <img
            data-testid="about-workspace-image"
            src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHxfHxtaW5pbWFsaXN0JTIwZGFyayUyMGFyY2hpdGVjdHVyZSUyMHdvcmtzcGFjZSUyMGNvZGV8ZW58MHx8fHwxNzg4MzY5Nzk1fDA&ixlib=rb-4.1.0&q=85"
            alt="Developer workspace"
            className="h-full max-h-[560px] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
          />
          <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-300">
            FIG.01 — The Studio
          </span>
        </motion.div>
        <div>
          {CHAPTERS.map((chapter, i) => (
            <motion.div
              key={chapter.number}
              data-testid={`about-chapter-${chapter.number}`}
              className="grid grid-cols-[auto_1fr] gap-6 border-t border-[#27272A] py-10 md:gap-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <span className="font-mono text-sm text-neutral-600">
                /<span>{chapter.number}</span>
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
                  {chapter.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
                  {chapter.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}