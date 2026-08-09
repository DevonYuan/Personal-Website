import { SectionHeading } from '@/components/projects-section'
import { ScrollReveal } from '@/components/scroll-reveal'

const HOBBIES = [
  {
    name: 'Running',
    blurb: 'Logging miles on trails and city streets — it clears my head between debugging sessions.',
    image: '/life/running.png',
  },
  {
    name: 'Hiking',
    blurb: 'Chasing ridgelines and viewpoints on weekends. Always looking for the next trail.',
    image: '/life/hiking.png',
  },
  {
    name: 'Speedcubing',
    blurb: 'Solving Rubik\u2019s cubes fast is basically pattern recognition — same muscle as coding.',
    image: '/life/speedcubing.png',
  },
  {
    name: 'Video gaming',
    blurb: 'Co-op and strategy games mostly. Good way to unwind after shipping a feature.',
    image: '/life/gaming.png',
  },
]

export function LifeSection() {
  return (
    <section id="life" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal variant="wipe">
          <SectionHeading index="03" title="Off the keyboard" />
          <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
            A few things I spend time on outside of writing code.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOBBIES.map((hobby, index) => (
            <ScrollReveal key={hobby.name} variant="rise" delay={index * 90}>
            <div className="group overflow-hidden rounded-lg border border-border/80 bg-card shadow-2xl shadow-black/10">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={hobby.image || '/placeholder.svg'}
                  alt={`Photo representing ${hobby.name.toLowerCase()}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground">{hobby.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{hobby.blurb}</p>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
