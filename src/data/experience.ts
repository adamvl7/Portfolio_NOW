import { Briefcase, Code, Users } from "lucide-react"
import type { TimelineItem } from "@/components/ui/radial-orbital-timeline"
import { workExperience } from "@/data/work"

const icons: Record<string, TimelineItem["icon"]> = {
  "walmart-connect": Briefcase,
  "archv-ai": Code,
  "ai-uci": Users,
}

export const experienceData: TimelineItem[] = workExperience.map((job, i) => ({
  id: i + 1,
  title: job.company,
  subtitle: `${job.role} · ${job.location}`,
  date: job.dates,
  content: `${job.role} at ${job.company}`,
  bullets: job.bullets,
  tags: job.tags,
  category: "Work",
  icon: icons[job.id] ?? Briefcase,
  relatedIds: [],
  status: job.current ? "in-progress" : "completed",
  energy: 85,
}))
