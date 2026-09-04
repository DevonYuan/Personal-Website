import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  X,
} from 'lucide-react';
import { getProjects, type Project } from '@/projects';

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const PROJECTS = getProjects();

  return (
    <section id="projects" data-testid="projects-section" className="mx-auto max-w-[1000px] px-6 py-10 md:px-10 md:py-12">
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        02 — Selected Work
      </motion.p>
      <motion.h2
        className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Projects{' '}
        <span className="font-serif normal-case italic text-neutral-400">
          2025 — 2026
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
        {PROJECTS.map((project, i) => (
          <motion.button
            key={project.id}
            data-testid={`project-row-${project.number}`}
            onClick={() => setActive(project)}
            className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 border-t border-[#27272A] py-8 text-left transition-colors last:border-b hover:bg-white/[0.03] md:grid-cols-[auto_auto_1fr_auto_auto] md:gap-10 md:px-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <span className="font-mono text-sm text-neutral-600">
              /<span>{project.number}</span>
            </span>
            <span className="hidden h-16 w-24 overflow-hidden border border-[#27272A] md:block">
              <img
                src={project.image}
                alt={project.name}
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
            </span>
            <span>
              <span className="block font-display text-xl font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                {project.name}
              </span>
              <span className="mt-1 block font-serif text-sm italic text-neutral-500">
                {project.subtitle}
              </span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 md:block">
              {project.category}<br />{project.year}
            </span>
            <ArrowUpRight className="h-5 w-5 text-neutral-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            data-testid="project-modal-backdrop"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              data-testid="project-modal"
              className="w-full max-w-2xl border border-[#27272A] bg-[#121212]"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden border-b border-[#27272A]">
                <img
                  src={active.image}
                  alt={active.name}
                  className="h-full w-full object-cover"
                />
                <button
                  data-testid="project-modal-close"
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 border border-neutral-700 bg-black/60 p-2 text-neutral-300 backdrop-blur transition-colors hover:bg-white hover:text-black"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                  /{active.number} — {active.category} — {active.year}
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
                  {active.name}
                </h3>
                <p className="mt-1 font-serif text-sm italic text-neutral-500">
                  {active.subtitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                  {active.description}
                </p>
                <div className="mt-6 flex gap-3">
                  <a
                    data-testid="project-modal-demo-link"
                    href={active.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-neutral-600 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </a>
                  <a
                    data-testid="project-modal-github-link"
                    href={active.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-neutral-600 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Source
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}