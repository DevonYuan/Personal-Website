import { Mail, Phone } from 'lucide-react'
import { SectionHeading } from '@/components/projects-section'

const CONTACTS = [
  {
    label: 'Email',
    value: 'devon.yuan@outlook.com',
    href: 'mailto:devon.yuan@outlook.com',
    icon: 'mail' as const,
  },
  {
    label: 'Phone',
    value: '236-458-2221',
    href: 'tel:+12364582221',
    icon: 'phone' as const,
  },
  {
    label: 'LinkedIn',
    value: 'devon-yuan-361575340',
    href: 'https://www.linkedin.com/in/devon-yuan-361575340/',
    icon: 'linkedin' as const,
  },
  {
    label: 'Discord',
    value: 'devon7021o_o',
    href: undefined,
    icon: 'discord' as const,
  },
]

function ContactIcon({ icon }: { icon: (typeof CONTACTS)[number]['icon'] }) {
  if (icon === 'mail') return <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
  if (icon === 'phone') return <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
  const src = icon === 'linkedin' ? '/icons/linkedin.svg' : '/icons/discord.svg'
  return (
    <span className="relative block h-5 w-5">
      <img src={src} alt="" className="h-full w-full object-contain" aria-hidden="true" />
    </span>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading index="04" title="Contact" />
        <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
          Have a project in mind, or want to test OmniDrive? Reach out through any of these.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {CONTACTS.map((contact) => (
            <li key={contact.label}>
              {contact.href ? (
                <a
                  href={contact.href}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/50 hover:bg-secondary"
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <ContactIcon icon={contact.icon} />
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {contact.label}
                    </span>
                    <span className="block text-sm font-medium text-foreground">{contact.value}</span>
                  </span>
                </a>
              ) : (
                <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-5">
                  <ContactIcon icon={contact.icon} />
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {contact.label}
                    </span>
                    <span className="block text-sm font-medium text-foreground">{contact.value}</span>
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center font-mono text-xs text-muted-foreground">
          Built with React, Vite, Tailwind CSS &amp; React Three Fiber.
        </p>
      </div>
    </section>
  )
}
