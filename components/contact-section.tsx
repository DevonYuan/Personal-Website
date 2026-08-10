'use client'

import { ScrollReveal } from '@/components/scroll-reveal'
import { Mail, MessageSquare, Link2, Phone } from 'lucide-react'

type ContactItem = {
  label: string
  value: string
  href: string
  icon: React.ReactNode
}

export function ContactSection() {
  const contacts: ContactItem[] = [
    {
      label: 'Email',
      value: 'devon.yuan@outlook.com',
      href: 'mailto:devon.yuan@outlook.com',
      icon: <Mail className="w-5 h-5" />,
    },
    {
      label: 'Discord',
      value: 'devon7021o_o',
      href: 'https://discord.com/users/devon7021o_o',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      label: 'LinkedIn',
      value: 'devon-yuan-361575340',
      href: 'https://linkedin.com/in/devon-yuan-361575340',
      icon: <Link2 className="w-5 h-5" />,
    },
    {
      label: 'Phone',
      value: '+1 (236)-458-2221',
      href: 'tel:+2364582221',
      icon: <Phone className="w-5 h-5" />,
    },
  ]

  return (
    <section id="contact" className="py-2xl">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal variant="wipe">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary">04</span>
            <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">Contact</h2>
          </div>
        </ScrollReveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-12 items-start">
          {/* Editorial lead */}
          <ScrollReveal variant="rise">
            <div className="prose-measure">
              <p className="text-lg leading-8 text-muted-foreground">
                I'm available through several platforms, and I check all of these regularily. Please, feel free to reach out!
              </p>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                I'm currently seeking internships for the Summer Session of 2026 to 2027 school year, or Term 2 of the Winter Session. (Internships beginning any time through January 2027 through April 2027)
              </p>
            </div>
          </ScrollReveal>

          {/* Contact info cards — clean, editorial layout */}
          <ScrollReveal variant="slide" delay={150}>
            <dl className="space-y-3">
              {contacts.map((contact, index) => (
                <div key={contact.label} className="group flex items-center gap-4 rounded-lg border border-border/40 bg-card/50 p-4 transition-colors hover:border-border/80 hover:bg-card">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary" aria-hidden="true">
                    {contact.icon}
                  </div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-primary min-w-[80px]">
                    {contact.label}
                  </dt>
                  <dd className="flex-1 min-w-0">
                    <a
                      href={contact.href}
                      className="text-base font-medium text-foreground transition-colors hover:text-primary group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-ring rounded"
                    >
                      {contact.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}