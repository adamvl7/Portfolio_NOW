export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  github: string
  live: string
  image: string
  featured: boolean
  year: string
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Horizon Dashboard",
    description: "A real-time analytics platform for monitoring distributed systems with sub-second latency.",
    longDescription:
      "Built a full-stack observability platform featuring live metric streaming, customizable dashboards, and automated alerting. Reduced on-call response time by 40% through intelligent anomaly detection.",
    tech: ["Next.js", "TypeScript", "WebSockets", "Postgres", "Tailwind"],
    github: "https://github.com/yourname/horizon",
    live: "https://horizon-demo.vercel.app",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    featured: true,
    year: "2024",
  },
  {
    id: "project-2",
    title: "Flo Design System",
    description: "A component library and design tokens system used across 3 internal products.",
    longDescription:
      "Designed and engineered a cohesive design system with 60+ accessible components, dark/light theming, and Figma-to-code parity. Improved designer-developer handoff efficiency by 60%.",
    tech: ["React", "TypeScript", "Storybook", "Radix UI", "CSS Variables"],
    github: "https://github.com/yourname/flo-ui",
    live: "https://flo-ui.vercel.app",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    featured: true,
    year: "2024",
  },
  {
    id: "project-3",
    title: "Capsule Notes",
    description: "A minimal note-taking app with end-to-end encryption and offline-first sync.",
    longDescription:
      "Engineered a privacy-first notes app using CRDTs for conflict-free offline sync, AES-256 encryption, and a distraction-free writing experience. 2k+ active users.",
    tech: ["React Native", "SQLite", "Node.js", "CRDTs", "Expo"],
    github: "https://github.com/yourname/capsule",
    live: "https://capsule-notes.app",
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80",
    featured: true,
    year: "2023",
  },
  {
    id: "project-4",
    title: "Pulse API",
    description: "A lightweight API gateway with rate limiting, caching, and request tracing built in Rust.",
    longDescription:
      "Implemented a high-performance API gateway handling 10k+ req/s with sub-1ms overhead. Features distributed rate limiting, transparent caching, and OpenTelemetry-compatible tracing.",
    tech: ["Rust", "Tokio", "Redis", "Docker", "OpenTelemetry"],
    github: "https://github.com/yourname/pulse-api",
    live: "https://pulse-api.dev",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    featured: false,
    year: "2023",
  },
]
