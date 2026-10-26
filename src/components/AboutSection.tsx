import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <motion.section
      id="about-section-full"
      className="fixed inset-0 z-40 bg-[#080808] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center px-6">
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-9xl font-extrabold uppercase tracking-tight"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          ABOUT
        </motion.h1>
        <motion.p
          className="mt-6 font-mono text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          This is the About section. Add your about content here.
        </motion.p>
      </div>
    </motion.section>
  );
}