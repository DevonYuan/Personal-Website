import { useState } from 'react';
import { motion } from 'framer-motion';
import SkillGraph from './SkillGraph';

interface SkillCategory {
  title: string;
  items: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Databases',
    items: ['PostgreSQL', 'Redis', 'MongoDB', 'SQLite'],
  },
  {
    title: 'Languages',
    items: ['TypeScript', 'Python', 'Go', 'Rust', 'C++'],
  },
  {
    title: 'Frameworks',
    items: ['React', 'Next.js', 'FastAPI', 'Tailwind', 'Three.js'],
  },
  {
    title: 'Developer Tools & OS',
    items: ['Linux', 'Docker', 'Git', 'Vim/Neovim', 'VS Code'],
  },
];

export default function About() {
  const [viewMode, setViewMode] = useState<'graph' | 'table'>('graph');

  const handleCategoryClick = (category: string) => {
    setViewMode('table');
    // Scroll to the category in table view
    setTimeout(() => {
      const element = document.querySelector(`[data-table-category="${category.toLowerCase().replace(/\s+/g, '-')}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <section id="about" data-testid="about-section" className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        01 — Technical
      </motion.p>
      <motion.h2
        className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        TECHNICAL <span className="font-serif normal-case italic text-neutral-400">skills</span>
      </motion.h2>
      {/* Divider line */}
      <motion.div
        className="mt-8 w-16 h-px bg-neutral-700"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* View Toggle */}
      <motion.div
        className="mt-8 flex items-center justify-end gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span className={`font-mono text-[10px] uppercase tracking-[0.25em] ${viewMode === 'graph' ? 'text-white' : 'text-neutral-500'}`}>
          Graph
        </span>
        <button
          onClick={() => setViewMode(v => v === 'graph' ? 'table' : 'graph')}
          className="relative w-10 h-6 rounded-full border-2 transition-colors"
          style={{
            borderColor: viewMode === 'graph' ? '#333' : '#2A9D8F',
            background: viewMode === 'graph' ? 'transparent' : '#2A9D8F',
          }}
          aria-label={`Switch to ${viewMode === 'graph' ? 'table' : 'graph'} view`}
        >
          <motion.div
            className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
            style={{
              left: viewMode === 'graph' ? '0.5px' : 'calc(100% - 5.5px)',
            }}
            transition={{ x: { duration: 0.2 } }}
          />
        </button>
        <span className={`font-mono text-[10px] uppercase tracking-[0.25em] ${viewMode === 'table' ? 'text-white' : 'text-neutral-500'}`}>
          Table
        </span>
      </motion.div>

      {/* Graph View */}
      {viewMode === 'graph' && (
        <motion.div
          className="mt-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ height: '60vh', minHeight: 400 }}
        >
          <SkillGraph
            categories={SKILL_CATEGORIES}
            onCategoryClick={handleCategoryClick}
            width={window.innerWidth > 1024 ? 1200 : window.innerWidth - 48}
            height={Math.min(600, window.innerHeight * 0.6)}
          />
        </motion.div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SKILL_CATEGORIES.map((category, i) => (
              <motion.div
                key={category.title}
                data-testid={`about-skill-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                data-table-category={category.title.toLowerCase().replace(/\s+/g, '-')}
                className="border border-[#27272A] p-4 md:p-6"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] font-medium text-neutral-500 mb-3">
                  /{category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.length > 0 ? (
                    category.items.map((item) => (
                      <li key={item} className="font-mono text-sm text-neutral-400">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="font-mono text-sm text-neutral-600 italic">
                      —
                    </li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}