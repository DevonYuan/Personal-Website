'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'life', label: 'Life' },
  { id: 'contact', label: 'Contact' },
]

export function ScrollRail() {
  const [active, setActive] = useState('home')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.35, 0.7] },
    )

    SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block" aria-label="Page sections">
      <div className="flex items-center gap-3">
        <div className="relative h-56 w-px bg-border/70">
          <div
            className="absolute left-0 top-0 w-px bg-accent transition-[height] duration-200"
            style={{ height: `${Math.max(6, progress)}%` }}
          />
          <div
            className="absolute -left-1.5 h-3 w-3 rounded-full border-2 border-background bg-accent shadow-[0_0_0_3px_oklch(0.65_0.18_265/0.18)] transition-[top] duration-200"
            style={{ top: `calc(${Math.min(100, progress)}% - 6px)` }}
            aria-hidden="true"
          />
        </div>
        <nav className="flex flex-col gap-4">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={`Go to ${section.label}`}
              className={cn(
                'font-mono text-[10px] uppercase tracking-[0.18em] transition-colors',
                active === section.id ? 'text-foreground' : 'text-muted-foreground/55 hover:text-muted-foreground',
              )}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
