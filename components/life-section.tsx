import { ScrollReveal } from '@/components/scroll-reveal'

const HOBBIES = [
  { name: 'Speedcubing', detail: 'Sub-15 3×3, learning 4×4 and OH. The algorithmic rhythm teaches patience.', icon: '🧊' },
  { name: 'Mechanical keyboards', detail: 'Building custom keebs — switches, stabs, PCB design. Tangible craft.', icon: '⌨️' },
  { name: 'Coffee', detail: 'Light roasts, V60, weighing every gram. Precision as ritual.', icon: '☕' },
  { name: 'Reading', detail: 'Systems, typography, sci-fi, indie web. Always a book nearby.', icon: '📖' },
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
              &ldquo;The best code is the code you don't have to write — because the tool already exists.&rdquo;
            </blockquote>
            <p className="mt-6 text-base leading-8 text-muted-foreground prose-measure">
              Outside the terminal, I'm chasing sub-15 solves, lubricating stabilizers, dialing in a V60 pour-over,
              or rereading <cite className="font-sans italic not-italic">The Design of Everyday Things</cite> for the
              fourth time. These aren't hobbies — they're the same craft: constraints, iteration, and the satisfaction
              of a clean solution.
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