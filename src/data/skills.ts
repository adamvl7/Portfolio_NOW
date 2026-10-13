export interface SkillGroup {
  category: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "Go", "C/C++", "Java", "JavaScript", "TypeScript", "Kotlin", "Verilog", "SQL", "HTML", "CSS", "Shell scripting"],
  },
  {
    category: "AI & Data",
    skills: ["AI/ML", "LLM", "PostgreSQL", "Supabase"],
  },
  {
    category: "Web",
    skills: ["React", "Next.js", "Tailwind CSS", "FastAPI", "REST APIs"],
  },
  {
    category: "Cloud & Infrastructure",
    skills: ["AWS", "Docker", "Kubernetes", "Kubernetes Operators (CRDs)", "Kubebuilder", "controller-runtime"],
  },
  {
    category: "Developer Tools",
    skills: ["Git", "GitHub", "VS Code", "IntelliJ", "Arduino IDE", "Figma", "Uvicorn", "Swagger UI"],
  },
  {
    category: "Other",
    skills: ["Fluent in Vietnamese"],
  },
]
