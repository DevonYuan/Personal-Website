import { SectionHeading } from '@/components/projects-section'
import { ScrollReveal } from '@/components/scroll-reveal'

const SKILL_GROUPS = [
  {
    category: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'Backend & APIs',
    items: ['FastAPI', 'REST APIs', 'JWT Auth', 'SQLAlchemy', 'Alembic', 'Pandas'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'React Three Fiber'],
  },
  {
    category: 'Data & Infra',
    items: ['PostgreSQL', 'SQLite', 'Supabase', 'Docker', 'Railway', 'Render'],
  },
  {
    category: 'Platform & Tooling',
    items: ['Electron', 'Google Drive API', 'Microsoft Graph API', 'Git'],
  },
  {
    category: 'AI',
    items: ['Gemini API', 'PandasAI', 'Prompt design', 'Ollama (local dev)'],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="border-t border-border bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal variant="rise">
          <SectionHeading index="02" title="Technical skills" />
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            The tools I reach for when a project needs a clear path from idea to shipped product.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => (
            <ScrollReveal key={group.category} variant="scale" delay={index * 70}>
            <div className="bg-card p-6">
              <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
