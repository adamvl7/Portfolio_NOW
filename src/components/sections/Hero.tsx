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
      <div className="relative flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full px-6 pt-24 pb-12">

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
          Computer Engineering @ UC Irvine &apos;27. Focusing in software and AI.
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
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              />
              <LiquidMetalButton
                label="Get in Touch"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              />
              <div className="flex items-center gap-2">
                <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer">
                  <LiquidMetalButton viewMode="icon" label="GitHub" />
                </a>
                <a href="https://linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer">
                  <LiquidMetalButton viewMode="icon" label="LinkedIn" />
                </a>
              </div>
            </>
          ) : (
            <>
              <LiquidButton
                size="xl"
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </LiquidButton>
              <LiquidButton
                size="xl"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get in Touch
              </LiquidButton>
              <div className="flex items-center gap-2">
                <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <LiquidButton size="icon">
                    <GitHubIcon className="w-4 h-4" />
                  </LiquidButton>
                </a>
                <a href="https://linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LiquidButton size="icon">
                    <LinkedInIcon className="w-4 h-4" />
                  </LiquidButton>
                </a>
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
              Selected Work
            </p>
          }
        >
          <div className="relative w-full h-full bg-surface-2 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80"
              alt="Project showcase"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 right-4 h-8 bg-surface/80 backdrop-blur-sm rounded-lg border border-border flex items-center gap-2 px-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 h-4 bg-surface-2/60 rounded mx-2" />
            </div>
          </div>
        </ContainerScroll>
      </motion.div>
    </section>
  )
}
