import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { toast } from 'sonner';

const SOCIALS = [
  { label: 'GitHub', icon: Github, href: 'https://github.com', testid: 'social-github' },
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com', testid: 'social-twitter' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', testid: 'social-linkedin' },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@yourname.dev');
      toast.success('Email copied to clipboard');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy email');
    }
  };

  return (
    <footer id="footer" data-testid="footer-section" className="border-t border-[#27272A] px-6 pb-10 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          03 — Contact
        </motion.p>
        <motion.h2
          className="mt-6 font-display text-[10vw] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] md:text-[7vw]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Let's build{' '}
          <br />
          something{' '}
          <span className="font-serif normal-case italic text-neutral-400">iconic.</span>
        </motion.h2>
        {/* Divider line */}
        <motion.div
          className="mt-8 w-16 h-px bg-neutral-700"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <button
            data-testid="footer-copy-email-btn"
            onClick={copyEmail}
            className="flex items-center gap-3 border border-neutral-600 px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] transition-colors hover:bg-white hover:text-black"
          >
            <Mail className="h-4 w-4" />
            {copied ? 'Copied!' : 'hello@yourname.dev'}
          </button>
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              data-testid={social.testid}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="border border-neutral-700 p-3 text-neutral-400 transition-colors hover:border-white hover:text-white"
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-[#27272A] pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-600">
          <span data-testid="footer-copyright">© 2026 Your Name — All rights reserved</span>
          <span data-testid="footer-status" className="flex items-center gap-2">
            <span className="animate-blink inline-block h-1.5 w-1.5 rounded-full bg-[#2A9D8F]" />
            SYS.STATUS — All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}