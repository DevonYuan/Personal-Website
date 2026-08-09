# Graph Report - .  (2026-08-08)

## Corpus Check
- 40 files · ~291,843 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 157 nodes · 201 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI Sections & Pages
- External Dependencies
- TypeScript Config
- UI Components & Utilities
- Dev Dependencies
- Components Config & Aliases
- Package Config
- 3D Hero & Cube Scene
- PostCSS Config

## God Nodes (most connected - your core abstractions)
1. `cn()` - 21 edges
2. `compilerOptions` - 14 edges
3. `ScrollReveal()` - 7 edges
4. `tailwind` - 6 edges
5. `aliases` - 6 edges
6. `scripts` - 5 edges
7. `SectionHeading()` - 4 edges
8. `Badge()` - 4 edges
9. `lib` - 4 edges
10. `ScrollRail()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `ScrollReveal()` --calls--> `cn()`  [EXTRACTED]
  components/scroll-reveal.tsx → lib/utils.ts
- `Badge()` --calls--> `cn()`  [EXTRACTED]
  components/ui/badge.tsx → lib/utils.ts
- `Card()` --calls--> `cn()`  [EXTRACTED]
  components/ui/card.tsx → lib/utils.ts
- `CardHeader()` --calls--> `cn()`  [EXTRACTED]
  components/ui/card.tsx → lib/utils.ts
- `CardTitle()` --calls--> `cn()`  [EXTRACTED]
  components/ui/card.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (10 total, 1 thin omitted)

### Community 0 - "UI Sections & Pages"
Cohesion: 0.13
Nodes (17): CONTACTS, ContactSection(), HOBBIES, LifeSection(), Project, PROJECTS, ProjectsSection(), SectionHeading() (+9 more)

### Community 1 - "External Dependencies"
Cohesion: 0.08
Nodes (25): @base-ui/react, class-variance-authority, clsx, lucide-react, dependencies, @base-ui/react, class-variance-authority, clsx (+17 more)

### Community 2 - "TypeScript Config"
Cohesion: 0.09
Nodes (22): dom, dom.iterable, esnext, node_modules, **/*.ts, **/*.tsx, compilerOptions, allowJs (+14 more)

### Community 3 - "UI Components & Utilities"
Cohesion: 0.18
Nodes (15): ScrollRail(), SECTIONS, LINKS, SiteNav(), Button(), buttonVariants, Card(), CardAction() (+7 more)

### Community 4 - "Dev Dependencies"
Cohesion: 0.10
Nodes (21): devDependencies, postcss, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, @types/three (+13 more)

### Community 5 - "Components Config & Aliases"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 6 - "Package Config"
Cohesion: 0.17
Nodes (11): name, hono, pnpm, overrides, private, scripts, build, dev (+3 more)

### Community 7 - "3D Hero & Cube Scene"
Cohesion: 0.33
Nodes (3): CubeScene(), FACE_COLORS, HeroSection()

## Knowledge Gaps
- **74 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+69 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `External Dependencies` to `Package Config`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Config`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `cn()` connect `UI Components & Utilities` to `UI Sections & Pages`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _74 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Sections & Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.13105413105413105 - nodes in this community are weakly interconnected._
- **Should `External Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._