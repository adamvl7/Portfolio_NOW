"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface DockItem {
  icon: LucideIcon
  label: string
  onClick?: () => void
  href?: string
}

interface DockProps {
  items: DockItem[]
  className?: string
}

const DockIconButton = ({
  icon: Icon,
  label,
  onClick,
  href,
}: DockItem) => {
  const content = (
    <motion.span
      whileHover={{ scale: 1.15, y: -4 }}
      whileTap={{ scale: 0.92 }}
      className="relative group p-2.5 rounded-xl hover:bg-secondary transition-colors cursor-pointer block"
    >
      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      <span
        className={cn(
          "absolute -top-9 left-1/2 -translate-x-1/2",
          "px-2 py-1 rounded-md text-xs font-medium",
          "bg-popover text-popover-foreground border border-border",
          "opacity-0 group-hover:opacity-100 pointer-events-none",
          "transition-opacity whitespace-nowrap shadow-sm"
        )}
      >
        {label}
      </span>
    </motion.span>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return <button onClick={onClick}>{content}</button>
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(({ items, className }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 }}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-1 px-3 py-2",
        "rounded-2xl border border-border bg-popover/80 backdrop-blur-xl",
        "shadow-2xl",
        className
      )}
    >
      {items.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && i % 4 === 0 && (
            <div className="w-px h-5 bg-border mx-1" />
          )}
          <DockIconButton {...item} />
        </React.Fragment>
      ))}
    </motion.div>
  )
})
Dock.displayName = "Dock"

export { Dock, type DockItem }
