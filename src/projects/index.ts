export interface Project {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  image: string;
  demo_url: string;
  github_url: string;
}

// Vite glob import - loads all project.md files as raw strings at build time
const projectModules = import.meta.glob('./*/project.md', { eager: true, query: '?raw', import: 'default' });

// Simple frontmatter parser - works in browser without Node.js dependencies
function parseFrontmatter(content: string): { data: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatter = match[1];
  const body = match[2];
  const data: Record<string, string> = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  });
  
  return { data, content: body };
}

export function getProjects(): Project[] {
  const projects = Object.entries(projectModules)
    .map(([, module]) => {
      const { data, content } = parseFrontmatter(module as string);
      return {
        id: data.id,
        number: data.number,
        name: data.name,
        subtitle: data.subtitle,
        category: data.category,
        year: data.year,
        description: content.trim(),
        image: data.image,
        demo_url: data.demo_url,
        github_url: data.github_url,
      } as Project;
    })
    .sort((a, b) => a.number.localeCompare(b.number));

  return projects;
}

export function getProjectById(id: string): Project | undefined {
  const projects = getProjects();
  return projects.find(p => p.id === id);
}