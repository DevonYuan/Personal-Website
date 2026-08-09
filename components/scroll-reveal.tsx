'use client'

import type { HTMLAttributes, ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'

type RevealVariant = 'rise' | 'slide' | 'scale' | 'wipe'

type ScrollRevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
}

export function ScrollReveal({
  children,
  variant = 'rise',
  delay = 0,
  className,
  style,
  ...props
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn('scroll-reveal', `scroll-reveal-${variant}`, isVisible && 'is-visible', className)}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  )
}
