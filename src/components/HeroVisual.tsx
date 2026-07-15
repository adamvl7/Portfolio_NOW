"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center pt-24" aria-hidden="true">
      {/* SVG filter: makes white pixels transparent based on brightness */}
      <svg width="0" height="0" className="absolute overflow-hidden">
        <defs>
          <filter id="remove-white" colorInterpolationFilters="sRGB">
            {/* Alpha = (3 - R - G - B): white→0, dark→opaque */}
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                     -1 -1 -1 3 0"
            />
            {/* Boost alpha curve so mid-silver stays solid, only near-white fades */}
            <feComponentTransfer>
              <feFuncA type="gamma" amplitude="1.5" exponent="0.65" offset="0" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.35 }}
      >
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/Star.png"
            alt="Chrome sparkle stars"
            width={480}
            height={480}
            className="object-contain w-full max-w-[420px] lg:max-w-[480px]"
            style={{ filter: "url(#remove-white)" }}
            priority
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
