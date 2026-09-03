import { motion } from 'framer-motion';

interface SkillCategory {
  title: string;
  items: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Databases',
    items: [],
  },
  {
    title: 'Languages',
    items: [],
  },
  {
    title: 'Frameworks',
    items: [],
  },
  {
    title: 'Developer Tools & OS',
    items: [],
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
      <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-2 lg:grid-cols-4">
        {SKILL_CATEGORIES.map((category, i) => (
          <motion.div
            key={category.title}
            data-testid={`about-skill-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
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
    </section>
  );
}