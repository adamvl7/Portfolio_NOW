export interface WorkRole {
  id: string
  company: string
  role: string
  location: string
  dates: string
  current: boolean
  bullets: string[]
  tags: string[]
}

export const workExperience: WorkRole[] = [
  {
    id: "walmart-connect",
    company: "Walmart Connect",
    role: "Break Through Tech AI Studio Fellow",
    location: "Remote",
    dates: "Aug 2026 – Present",
    current: true,
    bullets: [
      "Engineered a causal ML pipeline in Python that processes 1M records.",
      "Eliminated post-selection bias across 46,939 campaign outcomes by implementing Scikit-Learn regression models.",
      "Optimized the targeting algorithm by benchmarking 4 strategies, reaching a 95% confidence uplift on 150,000 records.",
      "Formulated privacy-conscious targeting rules with statistically significant uplift, using Qini curves for executive reporting.",
    ],
    tags: ["Python", "Scikit-Learn", "Causal ML", "Qini curves"],
  },
  {
    id: "archv-ai",
    company: "Archv AI",
    role: "Software Engineering Intern",
    location: "Irvine, CA",
    dates: "Dec 2025 – Jun 2026",
    current: false,
    bullets: [
      "Cut compliance retrieval latency by 18% by engineering RAG pipelines with dynamic chunking.",
      "Raised data extraction throughput by 35% by building full-stack features and async APIs.",
      "Hardened tenant data security with RBAC and tamper-evident logging, achieving 100% compliance tracking.",
      "Reduced frontend load time by 15% by refactoring React components.",
    ],
    tags: ["RAG", "React", "Async APIs", "RBAC"],
  },
  {
    id: "ai-uci",
    company: "AI @ UCI",
    role: "Projects Chair",
    location: "Irvine, CA",
    dates: "Jan 2026 – Present",
    current: true,
    bullets: [
      "Secured $5,000+ in funding, a 40% year-over-year budget increase, by pitching AI @ UCI's value to 20+ tech firms.",
      "Directed a campus-wide AI hackathon with 300+ participants and 45 project submissions, managing logistics and industry judges with a 5-person committee.",
      "Led technical development for 10 student teams, reaching a 90% project completion rate through a 10-week pipeline and industry mentorship.",
    ],
    tags: ["Leadership", "Fundraising", "Hackathon", "Mentorship"],
  },
]
