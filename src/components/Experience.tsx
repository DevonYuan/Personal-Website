import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  X,
  Building2,
  Calendar,
} from 'lucide-react';
import { getExperiences, type Experience } from '@/experience';

export default function Experience() {
  const [active, setActive] = useState<Experience | null>(null);
  const EXPERIENCES = getExperiences();

  return (
    <section id="experience" data-testid="experience-section" className="mx-auto max-w-[1000px] px-6 py-10 md:px-10 md:py-12">
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        02 — Professional Experience
      </motion.p>
      <motion.h2
        className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Experience{' '}
        <span className="font-serif normal-case italic text-neutral-400">
          2021 — Present
        </span>
      </motion.h2>
      {/* Divider line */}
      <motion.div
        className="mt-8 w-16 h-px bg-neutral-700"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <div className="mt-16 md:mt-24">
        {EXPERIENCES.map((experience, i) => (
          <motion.button
            key={experience.id}
            data-testid={`experience-row-${experience.number}`}
            onClick={() => setActive(experience)}
            className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 border-t border-[#27272A] py-8 text-left transition-colors last:border-b hover:bg-white/[0.03] md:grid-cols-[auto_1fr_auto_auto] md:gap-10 md:px-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <span className="font-mono text-sm text-neutral-600">
              /<span>{experience.number}</span>
            </span>
            <span>
              <span className="block font-display text-xl font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                {experience.role}
              </span>
              <span className="mt-1 block font-serif text-sm italic text-neutral-500">
                {experience.company}
              </span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 md:block">
              {experience.category}<br />{experience.period}
            </span>
            <ArrowUpRight className="h-5 w-5 text-neutral-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            data-testid="experience-modal-backdrop"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              data-testid="experience-modal"
              className="w-full max-w-2xl border border-[#27272A] bg-[#121212]"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 border-b border-[#27272A]">
                <button
                  data-testid="experience-modal-close"
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 border border-neutral-700 bg-black/60 p-2 text-neutral-300 backdrop-blur transition-colors hover:bg-white hover:text-black"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                  /{active.number} — {active.category} — {active.period}
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
                  {active.role}
                </h3>
                <p className="mt-1 font-serif text-sm italic text-neutral-500">
                  {active.company}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    {active.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {active.period}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                  {active.description}
                </p>
                {active.website && (
                  <div className="mt-6">
                    <a
                      data-testid="experience-modal-website-link"
                      href={active.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-neutral-600 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Company Website
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}