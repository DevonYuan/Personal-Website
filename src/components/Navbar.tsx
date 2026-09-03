import { useCallback } from 'react';

interface NavLink {
  label: string;
  id: string;
  testid: string;
}

const LINKS: NavLink[] = [
  { label: 'Home', id: '#hero', testid: 'nav-link-home' },
  { label: 'Skills', id: '#about', testid: 'nav-link-skills' },
  { label: 'Projects', id: '#projects', testid: 'nav-link-projects' },
];

export const scrollToSection = (id: string) => {
  if ((window as any).__lenis) {
    (window as any).__lenis.scrollTo(id, { duration: 1.4 });
  } else {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Navbar() {
  const handleScroll = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#27272A]/60 bg-[#080808]/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
        <button
          data-testid="nav-brand"
          onClick={() => handleScroll('#hero')}
          className="font-mono text-xs tracking-[0.3em] text-neutral-300 transition-colors hover:text-white"
        >
          DY — DEVON7021
        </button>
        <div className="flex items-center gap-6 md:gap-10">
          {LINKS.map((link) => (
            <button
              key={link.id}
              data-testid={link.testid}
              onClick={() => handleScroll(link.id)}
              className="group relative font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400 transition-colors hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-[width] duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            data-testid="nav-cta-connect"
            onClick={() => handleScroll('#footer')}
            className="hidden border border-neutral-700 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-200 transition-colors hover:border-white hover:bg-white hover:text-black md:block"
          >
            Connect
          </button>
        </div>
      </nav>
    </header>
  );
}