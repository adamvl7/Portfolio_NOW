"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 },
  }),
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Text */}
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.1}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 leading-tight"
            >
              About Me
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.2}
              viewport={{ once: true }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                Hi, I&apos;m Adam Le, a student at UC Irvine, Class of 2027. I enjoy solving
                problems through software, from designing full-stack web apps to experimenting
                with artificial intelligence and automation. Outside of my professional life,
                I would describe myself as someone who likes to stay active, try new things,
                and keep growing.
              </p>
              <p>
                I enjoy playing sports whether it&apos;s tennis, pickleball, basketball, or
                football; I like staying busy and pushing myself physically. It helps me clear
                my mind and reset after long days. One of my favorite hobbies is cooking.
                I&apos;ve been cooking since I was about ten years old and I enjoy trying new
                dishes, testing different flavors, and seeing how small changes can make
                something taste better. Cooking feels natural to me, and it is something I
                genuinely enjoy doing for the people around me.
              </p>
              <p>
                I also like learning new skills when something catches my interest. If I get
                curious about something, I will usually spend time figuring it out on my own.
                I don&apos;t mind starting from scratch. I like the process of improving
                little by little.
              </p>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.3}
            viewport={{ once: true }}
            className="relative w-3/4 mx-auto aspect-[3/4] rounded-2xl overflow-hidden border border-border"
          >
            <Image
              src="/Me%20(1).png"
              alt="Adam Le"
              fill
              className="object-cover object-top"
              draggable={false}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
