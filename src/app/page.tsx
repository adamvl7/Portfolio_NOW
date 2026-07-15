"use client"

import { Home, Briefcase, Code, Mail, GitBranch, FileText } from "lucide-react"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { Experience } from "@/components/sections/Experience"
import { Contact } from "@/components/sections/Contact"
import { Dock } from "@/components/ui/dock"

const dockItems = [
  {
    icon: Home,
    label: "Home",
    onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: Briefcase,
    label: "Projects",
    onClick: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: Code,
    label: "Skills",
    onClick: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: Mail,
    label: "Contact",
    onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: GitBranch,
    label: "GitHub",
    href: "https://github.com/yourname",
  },
  {
    icon: FileText,
    label: "Resume",
    href: "/resume.pdf",
  },
]

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Dock items={dockItems} />
    </main>
  )
}
