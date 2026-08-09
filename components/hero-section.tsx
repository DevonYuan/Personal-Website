import { CubeScene } from '@/components/cube-scene'
import { ScrollReveal } from '@/components/scroll-reveal'

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
        <ScrollReveal variant="rise">
          <div>
            <p className="inline-flex rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Hi, I&apos;m Devon
            </p>
            <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Devon Yuan
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
              A full-stack developer who builds practical tools and AI-powered apps — from local
              desktop utilities to cloud-deployed web platforms.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Get in touch
              </a>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-border pt-5">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Focus</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">Useful tools</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Mode</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">Full-stack</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Status</dt>
                <dd className="mt-1 text-sm font-medium text-accent">Building</dd>
              </div>
            </dl>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={140} className="relative">
          <div className="relative">
          <CubeScene />
          <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
            drag to rotate — solved in real life too (speedcuber)
          </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
