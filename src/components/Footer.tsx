import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, MessageCircle, Download, X } from 'lucide-react';
import { toast } from 'sonner';

const SOCIALS = [
  { label: 'GitHub', icon: Github, href: 'https://github.com/DevonYuan', testid: 'social-github' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/devon-yuan-361575340/', testid: 'social-linkedin' },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [showDiscord, setShowDiscord] = useState(false);
  const [discordCopied, setDiscordCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('devon.yuan@outlook.com');
      toast.success('Email copied to clipboard');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy email');
    }
  };

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText('devon7021o_o');
      toast.success('Discord tag copied to clipboard');
      setDiscordCopied(true);
      setTimeout(() => setDiscordCopied(false), 2000);
    } catch {
      toast.error('Could not copy Discord tag');
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
          Let's connect
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
            {copied ? 'Copied!' : 'devon.yuan@outlook.com'}
          </button>
          <a
            href="/resume.pdf"
            download="Devon_Yuan_Resume.pdf"
            className="flex items-center gap-3 border border-neutral-600 px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] transition-colors hover:bg-white hover:text-black"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
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
          <button
            data-testid="footer-discord-btn"
            onClick={() => setShowDiscord(true)}
            className="border border-neutral-700 p-3 text-neutral-400 transition-colors hover:border-white hover:text-white"
            aria-label="Discord"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
        <AnimatePresence>
          {showDiscord && (
            <motion.div
              data-testid="discord-modal-backdrop"
              className="fixed inset-0 z-[80] flex items-end justify-end bg-black/50 p-6 md:items-center md:justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowDiscord(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="discord-modal-title"
            >
              <motion.div
                data-testid="discord-modal"
                className="w-full max-w-sm border border-[#27272A] bg-[#121212] shadow-xl md:max-w-md"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-[#27272A] px-4 py-3">
                  <h3 id="discord-modal-title" className="font-display text-lg font-bold uppercase tracking-tight">
                    Discord
                  </h3>
                  <button
                    onClick={() => setShowDiscord(false)}
                    className="border border-neutral-700 p-1.5 text-neutral-400 transition-colors hover:bg-white hover:text-black"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
                    Tag
                  </p>
                  <button
                    onClick={copyDiscord}
                    className="font-mono text-sm text-neutral-200 break-all hover:text-[#2A9D8F] transition-colors flex items-center gap-2"
                    aria-label={discordCopied ? 'Copied!' : 'Copy Discord tag'}
                  >
                    devon7021o_o
                    {discordCopied && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#2A9D8F]">
                        Copied!
                      </span>
                    )}
                  </button>
                  <p className="mt-3 text-xs text-neutral-500">
                    Click to copy
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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