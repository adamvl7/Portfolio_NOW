"use client"

import { motion } from "framer-motion"
import { skillGroups } from "@/data/skills"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.06 },
  }),
}

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4"
        >
          Skills
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.1}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12"
        >
          Tools of the trade
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.15 + gi * 0.08}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-border bg-surface"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    custom={0.2 + gi * 0.08 + si * 0.03}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.04 }}
                    className="px-3 py-1.5 text-sm rounded-full border border-border bg-surface-2 text-foreground font-medium hover:border-foreground/20 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
