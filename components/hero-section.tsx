import { CubeScene } from '@/components/cube-scene'
import { ScrollReveal } from '@/components/scroll-reveal'

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-5xl px-6">
        {/* Long Document hero: asymmetric, typographic lead, 3D artwork framed */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-8 items-start">
          <ScrollReveal variant="rise">
            <div className="prose-measure">
              {/* Eyebrow — editorial, not numbered */}
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                Full-stack developer · AI tools · Speedcuber
              </p>
              <h1 className="mt-4 font-display text-5xl font-medium tracking-tight text-foreground leading-[1.05]">
                Building practical tools<br />
                <span className="font-sans font-normal text-primary">that people actually use</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground prose-measure">
                I write code for local desktop utilities, cloud-deployed web platforms, and AI-powered
                apps that hedge against hallucination. Currently merging cloud storage, chatting with
                datasets, and solving cubes in under 15 seconds.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                  View projects
                </a>
                <a
                  href="#contact"
                  className="rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Get in touch
                </a>
              </div>
              {/* Spec strip — editorial, not metric-cards */}
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-6">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Focus</dt>
                  <dd className="mt-2 font-medium text-foreground">Useful tools</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Mode</dt>
                  <dd className="mt-2 font-medium text-foreground">Full-stack</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Status</dt>
                  <dd className="mt-2 font-medium text-primary">Building</dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={140} className="relative">
            {/* E1 Clipped-Edge: CSS mask framing the 3D canvas */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="relative aspect-square">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="absolute inset-1 rounded-[2rem] bg-background" />
                </div>
                <div className="relative z-10 aspect-square overflow-hidden rounded-[2rem] border border-border/40">
                  <CubeScene />
                </div>
              </div>
              <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
                drag to rotate — solved in real life too (speedcuber)
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}