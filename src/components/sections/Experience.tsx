"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { experienceData } from "@/data/experience"

const RadialOrbitalTimeline = dynamic(
  () => import("@/components/ui/radial-orbital-timeline"),
  { ssr: false }
)

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 },
  }),
}

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4"
        >
          Experience
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.1}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4"
        >
          Where I&apos;ve worked
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.2}
          viewport={{ once: true }}
          className="text-muted-foreground mb-2 hidden md:block"
        >
          Click any node to see the role and details. Click elsewhere to resume rotation.
        </motion.p>

        {/* Desktop: orbital */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.3}
          viewport={{ once: true }}
          className="hidden md:block"
        >
          <RadialOrbitalTimeline timelineData={experienceData} />
        </motion.div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden mt-8 space-y-0">
          {experienceData.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={0.2 + i * 0.08}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                {/* Timeline line + dot */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full border-2 border-border bg-surface flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-muted-foreground" />
                  </div>
                  {i < experienceData.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[2rem]" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8 pt-1">
                  <p className="text-xs font-mono text-muted-foreground mb-1">{item.date}</p>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  {item.subtitle && (
                    <p className="text-xs text-muted-foreground mb-2">{item.subtitle}</p>
                  )}
                  {item.bullets ? (
                    <ul className="space-y-1.5 list-disc pl-4 marker:text-muted-foreground">
                      {item.bullets.map((b) => (
                        <li key={b} className="text-sm text-muted-foreground leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
