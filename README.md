# Personal Website / Portfolio

Hello! My name is Devon, and I am a computer science student at UBC.

---

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, Lenis (smooth scroll)
- **3D Graphics**: Three.js with React Three Fiber
- **Icons**: Lucide React
- **Data Fetching**: TanStack Query (React Query)
- **Notifications**: Sonner
- **Linting**: ESLint

---

## 📁 Folder Structure

```
Personal Website/
├── index.html              # Entry HTML file
├── package.json            # Project dependencies & scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript config for Node/Vite
├── vite.config.ts          # Vite configuration
├── public/                 # Static assets
├── src/
│   ├── main.tsx            # Application entry point
│   ├── App.tsx             # Root component
│   ├── index.css           # Global styles & Tailwind imports
│   ├── vite-env.d.ts       # Vite type declarations
│   ├── components/         # Reusable UI components
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Marquee.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── RubiksCubeCanvas.tsx
│   │   ├── ScrollProgressBar.tsx
│   │   ├── SkillGraph.tsx
│   │   └── icons/
│   │       └── DiscordIcon.tsx
│   ├── experience/         # Experience content & data
│   │   ├── index.ts
│   │   └── exp-01/
│   │       └── experience.md
│   └── projects/           # Projects content & data
│       ├── index.ts
│       ├── proj-01/
│       │   └── project.md
│       ├── proj-02/
│       │   └── project.md
│       └── proj-03/
│           └── project.md
└── projects/               # Project assets (images, etc.)
    ├── proj-01/
    ├── proj-02/
    └── proj-03/
```

---

## 🛠 Development Setup

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd "Personal Website"

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:5173` (configured to open automatically).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (runs TypeScript check + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on the codebase |

### TypeScript Configuration

The project uses strict TypeScript settings with:
- Path aliases (`@/` maps to `./src/`)
- Strict mode enabled
- ESNext target

### Tailwind CSS

Custom theme configuration in `tailwind.config.js` includes:
- Custom color palette using CSS variables
- Custom font families (Syne, JetBrains Mono, Instrument Serif)
- Custom keyframe animations (marquee, spin, blink)

---

## 📦 Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

---

## 🧪 Linting

```bash
npm run lint
```

---

## 📄 License

This project is open source and available under the MIT License.