import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/scroll-reveal'

type Project = {
  name: string
  tagline: string
  description: string
  image: string
  stack: string[]
  note: string
}

const PROJECTS: Project[] = [
  {
    name: 'OmniDrive',
    tagline: 'Unified cloud storage pool',
    description:
      'A desktop app that merges Google Drive and Microsoft OneDrive into one seamless storage pool. It is fully local and single-user: no login, no accounts, no remote database. Due to the constraints of Google Cloud, you must contact me to be able to use the effectively.',
    image: '/projects/omnidrive.png',
    stack: ['FastAPI', 'Google Drive API', 'Microsoft Graph', 'SQLite', 'SQLAlchemy', 'React', 'Electron'],
    note: 'GitHub: https://github.com/DevonYuan/Unified-Storage-Pooler',
  },
  {
    name: 'DataLens AI',
    tagline: 'AI-powered data analysis chat',
    description:
      'My first full-stack app, where I learned about prompt engineering. Rather than letting a model answer questions directly, it generates and runs Pandas code to analyze the data to hedge againt hallucination and manually calculating values.',
    image: '/projects/datalens.png',
    stack: ['FastAPI', 'Pandas', 'PandasAI', 'Gemini API', 'Supabase', 'React + Vite', 'Ollama'],
    note: 'GitHub: https://github.com/DevonYuan/Unified-Storage-Pooler',
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-3xl">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal variant="wipe">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary">01</span>
            <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">Projects</h2>
          </div>
        </ScrollReveal>

        <div className="mt-14 space-y-10">
          {PROJECTS.map((project, index) => (
            <ScrollReveal key={project.name} variant="slide" delay={index * 150}>
              <article
                className="group grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12 items-start"
              >
                {/* Asymmetric: content leads, image follows */}
                <div className="prose-measure">
                  <h3 className="font-display text-3xl font-medium tracking-tight text-foreground">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-base font-medium text-primary">{project.tagline}</p>
                  <p className="mt-5 text-base leading-8 text-muted-foreground">
                    {project.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`${project.name} tech stack`}>
                    {project.stack.map((tech) => (
                      <li key={tech}>
                        <Badge variant="secondary" className="font-mono text-[11px] font-normal">
                          {tech}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-muted-foreground">{project.note}</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/40">
                  <img
                    src={project.image || '/placeholder.svg'}
                    alt={`Screenshot of the ${project.name} interface`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-xs font-semibold tracking-widest text-primary">{index}</span>
      <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">{title}</h2>
    </div>
  )
}