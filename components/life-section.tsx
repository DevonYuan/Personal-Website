import { ScrollReveal } from '@/components/scroll-reveal'

const HOBBIES = [
  { name: 'Speedcubing', detail: 'Currently sub-10 seconds on 3x3.', icon: '🧊' },
  { name: 'Running', detail: '5K average time: Just under 20 minutes. Personal record is 19:10.', icon: '⌨️' },
  { name: 'Gaming', detail: 'Currently playing: Street Fighter 6, Dying Light: The Beast, and Ghost of Yotei.', icon: '☕' },
  { name: 'Hiking', detail: 'I am extremely grateful to live in a neighborhood that is next to a forest trail, which goes along the Coquitlam river', icon: '📖' },
]

export function LifeSection() {
  return (
    <section id="life" className="py-3xl">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal variant="wipe">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary">03</span>
            <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">Life</h2>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          {/* Editorial column — T3 Single Huge Quote as lead */}
          <ScrollReveal variant="rise">
            <blockquote className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-foreground leading-[1.15] prose-measure">
              Things I do outside of building projects.
            </blockquote>
            <p className="mt-6 text-base leading-8 text-muted-foreground prose-measure">
              My hobbies include speedcubing, running, gaming, and hiking. I enjoy the adrenaline rush that come with challenging myself to run a 5K or solve a cube as fast as possible, but hiking and gaming help me unwind. 
            </p>
          </ScrollReveal>

          {/* Hobby cards — editorial, not feature-grid */}
          <ScrollReveal variant="slide" delay={150}>
            <div className="space-y-6">
              {HOBBIES.map((hobby, index) => (
                <article
                  key={hobby.name}
                  className="group flex gap-4 rounded-lg border border-border/40 bg-card/50 p-5 transition-colors hover:border-primary/40"
                >
                  <span className="shrink-0 text-3xl" aria-hidden="true">{hobby.icon}</span>
                  <div>
                    <h3 className="font-medium text-foreground">{hobby.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{hobby.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}