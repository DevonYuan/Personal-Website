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
  const [active, setActive] = useState<string>('home')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.3)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2 sm:gap-3"
    >
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={cn(
            'group flex items-center gap-2 px-2 py-1.5 transition-all duration-200',
            active === section.id
              ? 'opacity-100'
              : 'opacity-0 sm:opacity-60 group-hover:opacity-100',
          )}
        >
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full transition-all duration-200',
              active === section.id
                ? 'bg-primary scale-150'
                : 'bg-border hover:bg-primary/50',
            )}
          />
          <span className="font-mono text-xs font-medium text-foreground whitespace-nowrap">
            {section.label}
          </span>
        </a>
      ))}
    </nav>
  )
}