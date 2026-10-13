"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, GitBranch } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { projects, type Project } from "@/data/projects"

function ProjectCard({ project, isActive, onHover }: {
  project: Project
  isActive: boolean
  onHover: (id: string | null) => void
}) {
  return (
    <motion.div
      layout
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      animate={{
        width: isActive ? 360 : 80,
        opacity: isActive ? 1 : 0.6,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative h-[480px] rounded-2xl border border-border bg-surface overflow-hidden cursor-pointer shrink-0"
      style={{ minWidth: isActive ? 360 : 80 }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700"
            style={{ objectPosition: project.imagePosition, transform: isActive ? "scale(1.02)" : "scale(1.08)" }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(120,120,140,0.35), transparent 55%), linear-gradient(135deg, #1b1b22 0%, #0f0f13 100%)",
            }}
          />
        )}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: isActive
              ? "linear-gradient(to top, rgba(10,10,10,0.95) 40%, rgba(10,10,10,0.4) 100%)"
              : "linear-gradient(to top, rgba(10,10,10,0.97) 60%, rgba(10,10,10,0.8) 100%)",
          }}
        />
      </div>

      {/* Collapsed label (rotated) */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-end justify-center pb-6"
          >
            <p
              className="text-xs font-semibold text-foreground/70 tracking-widest uppercase whitespace-nowrap"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
            >
              {project.title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className="absolute bottom-0 left-0 right-0 p-6"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-medium flex items-center gap-2">
              {project.year}
              {project.status === "in-progress" && (
                <span className="px-2 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-500 normal-case tracking-normal">
                  In progress
                </span>
              )}
            </p>
            <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-xs rounded-full border border-border bg-surface/60 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-2">
              {project.detail ? (
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <GitBranch className="w-3.5 h-3.5" />
                Code
              </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 },
  }),
}

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(projects[0].id)

  return (
    <section id="projects" className="py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4"
        >
          Projects
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.1}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12"
        >
          Things I&apos;ve built
        </motion.h2>

        {/* Carousel — hover to expand */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.2}
          viewport={{ once: true }}
          className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={activeId === project.id}
              onHover={setActiveId}
            />
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.3}
          viewport={{ once: true }}
          className="mt-4 text-xs text-muted-foreground hidden md:block"
        >
          Hover cards to explore
        </motion.p>
      </div>
    </section>
  )
}
