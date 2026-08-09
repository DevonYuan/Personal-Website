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
      'A local desktop app that merges Google Drive and Microsoft OneDrive into one seamless storage pool — presenting combined capacity and handling distribution and retrieval across both providers automatically. Fully local and single-user: no login, no accounts, no remote database.',
    image: '/projects/omnidrive.png',
    stack: ['FastAPI', 'Google Drive API', 'Microsoft Graph', 'SQLite', 'SQLAlchemy', 'React', 'Electron'],
    note: 'Currently in closed testing — reach out if you\u2019d like access.',
  },
  {
    name: 'DataLens AI',
    tagline: 'AI-powered data analysis chat',
    description:
      'A full-stack app for chatting with your datasets. Rather than letting a model answer questions directly, it generates and runs Pandas code to analyze the data — hedging against hallucination while still feeling conversational.',
    image: '/projects/datalens.png',
    stack: ['FastAPI', 'Pandas', 'PandasAI', 'Gemini API', 'Supabase', 'React + Vite', 'Docker'],
    note: 'Deployed on Railway (backend) and Render (frontend).',
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal variant="wipe">
          <SectionHeading index="01" title="Projects" />
        </ScrollReveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <ScrollReveal key={project.name} variant="slide" delay={index * 150}>
            <article
              key={project.name}
              className="group flex flex-col overflow-hidden rounded-lg border border-border/80 bg-card shadow-2xl shadow-black/10"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border">
                <img
                  src={project.image || '/placeholder.svg'}
                  alt={`Screenshot mockup of the ${project.name} interface`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.name} tech stack`}>
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Badge variant="secondary" className="font-mono text-[11px] font-normal">
                        {tech}
                      </Badge>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-muted-foreground">{project.note}</p>
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
      <span className="font-mono text-xs font-semibold tracking-widest text-accent">{index}</span>
      <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h2>
    </div>
  )
}
