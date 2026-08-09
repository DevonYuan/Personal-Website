'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#life', label: 'Life' },
  { href: '#contact', label: 'Contact' },
]

export function SiteNav() {
  const [active, setActive] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
        {/* N6 Masthead: centered wordmark, links stacked below on mobile, inline on desktop */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-center">
          <a
            href="#home"
            className="shrink-0 font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl"
            aria-label="Home"
          >
            devon<span className="text-primary">.</span>yuan
          </a>
          <ul className="flex flex-wrap justify-center gap-1.5 sm:gap-3 text-sm font-medium">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'rounded-md px-3 py-2 transition-colors',
                    active === link.href
                      ? 'text-foreground bg-secondary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}