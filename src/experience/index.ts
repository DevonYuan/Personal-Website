export interface Experience {
  id: string;
  number: string;
  role: string;
  company: string;
  category: string;
  period: string;
  description: string;
  logo: string;
  website: string;
  location: string;
}

// Vite glob import - loads all experience.md files as raw strings at build time
const experienceModules = import.meta.glob('./*/experience.md', { eager: true, query: '?raw', import: 'default' });

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

export function getExperiences(): Experience[] {
  const experiences = Object.entries(experienceModules)
    .map(([, module]) => {
      const { data, content } = parseFrontmatter(module as string);
      return {
        id: data.id,
        number: data.number,
        role: data.role,
        company: data.company,
        category: data.category,
        period: data.period,
        description: content.trim(),
        logo: data.logo,
        website: data.website,
        location: data.location,
      } as Experience;
    })
    .sort((a, b) => a.number.localeCompare(b.number));

  return experiences;
}

export function getExperienceById(id: string): Experience | undefined {
  const experiences = getExperiences();
  return experiences.find(e => e.id === id);
}