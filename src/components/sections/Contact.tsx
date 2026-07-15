"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, FileText } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { SlideButton } from "@/components/ui/slide-button"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 },
  }),
}

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/yourname",
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourname",
    icon: LinkedInIcon,
  },
  {
    label: "Email",
    href: "mailto:your@email.com",
    icon: Mail,
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    icon: FileText,
  },
]

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleMailto = () => {
    const subject = encodeURIComponent(`Hello from ${form.name}`)
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`)
    window.open(`mailto:your@email.com?subject=${subject}&body=${body}`, "_blank")
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-6 pb-40">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4"
          >
            Contact
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.1}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            Let&apos;s work together
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.2}
            viewport={{ once: true }}
            className="text-muted-foreground mb-12 leading-relaxed"
          >
            Whether it&apos;s a job opportunity, a collaboration, or just a conversation —
            I&apos;m always happy to connect with interesting people working on interesting things.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.3}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="p-8 rounded-2xl border border-border bg-surface space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full h-10 px-4 rounded-xl border border-border bg-surface-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full h-10 px-4 rounded-xl border border-border bg-surface-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2 font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me what's on your mind..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
              />
            </div>

            <div className="flex justify-center pt-2">
              <SlideButton onClick={handleMailto} />
            </div>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.4}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mt-12"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface hover:bg-surface-2 transition-colors text-sm text-muted-foreground hover:text-foreground"
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
