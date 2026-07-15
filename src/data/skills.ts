export interface SkillGroup {
  category: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Rust", "SQL", "HTML/CSS"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Framer Motion", "Tailwind CSS", "Radix UI", "React Native"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "PostgreSQL", "Redis", "REST APIs", "GraphQL", "Docker"],
  },
  {
    category: "Design",
    skills: ["Figma", "Design Systems", "Accessibility", "Typography", "Motion Design"],
  },
  {
    category: "Tooling",
    skills: ["Git", "Vite", "Webpack", "Storybook", "Vercel", "CI/CD"],
  },
]
