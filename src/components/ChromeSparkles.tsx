"use client"

import { motion } from "framer-motion"

function SparkleShape({
  size,
  id,
}: {
  size: number
  id: string
}) {
  const path =
    "M100 2 C100 2 102.5 97.5 198 100 C198 100 102.5 102.5 100 198 C100 198 97.5 102.5 2 100 C2 100 97.5 97.5 100 2 Z"

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Base chrome gradient — dark with diagonal sheen */}
        <linearGradient id={`${id}-base`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#383838" />
          <stop offset="25%" stopColor="#111" />
          <stop offset="50%" stopColor="#0a0a0a" />
          <stop offset="75%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#303030" />
        </linearGradient>

        {/* Secondary sheen — opposite diagonal */}
        <linearGradient id={`${id}-sheen`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#555" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#111" stopOpacity="0.1" />
          <stop offset="60%" stopColor="#111" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#444" stopOpacity="0.5" />
        </linearGradient>

        {/* Top tip radial highlight */}
        <radialGradient id={`${id}-top`} cx="50%" cy="2%" r="55%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="18%" stopColor="rgba(200,200,200,0.5)" />
          <stop offset="45%" stopColor="rgba(100,100,100,0.1)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Bottom tip radial highlight */}
        <radialGradient id={`${id}-bottom`} cx="50%" cy="98%" r="55%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="rgba(230,230,230,0.85)" />
          <stop offset="18%" stopColor="rgba(170,170,170,0.4)" />
          <stop offset="45%" stopColor="rgba(80,80,80,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Left tip radial highlight */}
        <radialGradient id={`${id}-left`} cx="2%" cy="50%" r="55%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="rgba(215,215,215,0.9)" />
          <stop offset="18%" stopColor="rgba(155,155,155,0.4)" />
          <stop offset="45%" stopColor="rgba(70,70,70,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Right tip radial highlight */}
        <radialGradient id={`${id}-right`} cx="98%" cy="50%" r="55%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="rgba(240,240,240,0.9)" />
          <stop offset="18%" stopColor="rgba(180,180,180,0.4)" />
          <stop offset="45%" stopColor="rgba(90,90,90,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Center shadow (keeps the middle very dark) */}
        <radialGradient id={`${id}-center`} cx="50%" cy="50%" r="35%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.7)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Soft drop shadow filter */}
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="rgba(0,0,0,0.6)" />
        </filter>
      </defs>

      {/* Base fill */}
      <path d={path} fill={`url(#${id}-base)`} filter={`url(#${id}-shadow)`} />
      {/* Secondary sheen overlay */}
      <path d={path} fill={`url(#${id}-sheen)`} />
      {/* Tip highlights — each point gets a glow */}
      <path d={path} fill={`url(#${id}-top)`} />
      <path d={path} fill={`url(#${id}-bottom)`} />
      <path d={path} fill={`url(#${id}-left)`} />
      <path d={path} fill={`url(#${id}-right)`} />
      {/* Center darkening */}
      <path d={path} fill={`url(#${id}-center)`} />
    </svg>
  )
}

export function ChromeSparkles() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* Large primary sparkle */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute"
        style={{ top: "10%", left: "10%" }}
      >
        <SparkleShape size={300} id="spark-lg" />
      </motion.div>

      {/* Small accent sparkle */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="absolute"
        style={{ bottom: "20%", right: "8%" }}
      >
        <SparkleShape size={110} id="spark-sm" />
      </motion.div>
    </div>
  )
}
