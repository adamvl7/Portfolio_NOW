"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { ContainerScroll } from "@/components/ui/container-scroll"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button"
import { GooeyText } from "@/components/ui/gooey-text-morphing"
import { useTheme } from "next-themes"
import Image from "next/image"
import { links } from "@/data/links"

const hellos = [
  "Hello",       // English
  "Xin chào",   // Vietnamese
  "Kumusta",     // Tagalog
  "Hola",        // Spanish
  "你好",         // Mandarin
  "Bonjour",     // French
  "नमस्ते",       // Hindi
  "こんにちは",   // Japanese
  "안녕하세요",   // Korean
  "Olá",         // Portuguese
  "Привет",      // Russian
  "Ciao",        // Italian
  "Hallo",       // German
  "مرحبا",       // Arabic
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
}

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

const openLink = (url: string) => window.open(url, "_blank", "noopener,noreferrer")

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = !mounted || resolvedTheme === "dark"

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid dot-grid-fade pointer-events-none" />

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-foreground/[0.025] rounded-full blur-3xl pointer-events-none" />

      {/* Hero content — centered single column */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full px-6 pt-24 pb-12">

        {/* Status badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs text-muted-foreground"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available for new opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-4 leading-none"
        >
          Adam Le
        </motion.h1>

        {/* Gooey hello morphing */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mb-6"
        >
          <GooeyText
            texts={hellos}
            morphTime={1.2}
            cooldownTime={2}
            className="h-10 w-64"
            textClassName="text-2xl md:text-3xl font-medium text-muted-foreground"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
        >
          Computer Science @ UC Irvine &apos;27. Focusing in software and AI.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {isDark ? (
            <>
              <LiquidMetalButton
                label="View Projects"
                onClick={() => scrollTo("projects")}
              />
              <LiquidMetalButton
                label="Get in Touch"
                onClick={() => scrollTo("contact")}
              />
              <div className="flex items-center gap-2">
                <LiquidMetalButton
                  viewMode="icon"
                  label="GitHub"
                  icon={<GitHubIcon className="w-4 h-4" />}
                  onClick={() => openLink(links.github)}
                />
                <LiquidMetalButton
                  viewMode="icon"
                  label="LinkedIn"
                  icon={<LinkedInIcon className="w-4 h-4" />}
                  onClick={() => openLink(links.linkedin)}
                />
              </div>
            </>
          ) : (
            <>
              <LiquidButton
                size="xl"
                onClick={() => scrollTo("projects")}
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </LiquidButton>
              <LiquidButton
                size="xl"
                onClick={() => scrollTo("contact")}
              >
                Get in Touch
              </LiquidButton>
              <div className="flex items-center gap-2">
                <LiquidButton size="icon" aria-label="GitHub" onClick={() => openLink(links.github)}>
                  <GitHubIcon className="w-4 h-4" />
                </LiquidButton>
                <LiquidButton size="icon" aria-label="LinkedIn" onClick={() => openLink(links.linkedin)}>
                  <LinkedInIcon className="w-4 h-4" />
                </LiquidButton>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* ContainerScroll showcase */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative -mt-20"
      >
        <ContainerScroll
          titleComponent={
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
              Resume
            </p>
          }
        >
          <div className="relative w-full h-full bg-surface-2 rounded-2xl overflow-hidden flex justify-center">
            <Image
              src="/projects/resume.png"
              alt="Adam Le's resume"
              width={1854}
              height={2400}
              sizes="(max-width: 768px) 90vw, 520px"
              className="h-full w-auto max-w-none object-contain"
              priority
            />
          </div>
        </ContainerScroll>
      </motion.div>
    </section>
  )
}
