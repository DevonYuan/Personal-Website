import { ScrollReveal } from '@/components/scroll-reveal'

const SKILLS = [
  { category: 'Languages', items: ['Java', 'Python', 'JavaScript', 'C++ (Elementary)', 'SQL', 'R'] },
  { category: 'Frontend', items: ['React', 'CSS', '3 Fiber', 'Vite'] },
  { category: 'Backend', items: ['FastAPI', 'Node.js'] },
  { category: 'AI / Data', items: ['Pandas', 'Gemini API', 'PandasAI', 'PostgreSQL', 'SQLite', 'Ollama', 'Tidyverse (R)'] },
  { category: 'Desktop', items: ['Electron', 'Tauri', 'SQLite', 'Docker'] },
  { category: 'DevOps', items: ['Railway', 'Render', 'GitHub Actions', 'Supabase', 'Vercel'] },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-3xl">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal variant="wipe">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary">02</span>
            <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">Skills</h2>
          </div>
        </ScrollReveal>

        <div className="mt-14">
          <ScrollReveal variant="rise" delay={100}>
            {/* F3 Tabular Spec Sheet — editorial, dense, scannable */}
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SKILLS.map((skill, index) => (
                <div key={skill.category} className="col-span-1 rounded-lg border border-border/40 bg-card/50 p-6 transition-colors hover:border-primary/40">
                  <dt className="font-mono text-xs uppercase tracking-widest text-primary">{skill.category}</dt>
                  <dd className="mt-3 flex flex-wrap gap-1.5">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-secondary px-2.5 py-1 text-sm font-medium text-foreground"
                      >
                        {item}
                      </span>
                    ))}
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