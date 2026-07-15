"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const star = (cx: number, cy: number, r: number, w: number) =>
  `M${cx} ${cy - r} C${cx + w} ${cy - r} ${cx + r} ${cy - w} ${cx + r} ${cy} ` +
  `C${cx + r} ${cy + w} ${cx + w} ${cy + r} ${cx} ${cy + r} ` +
  `C${cx - w} ${cy + r} ${cx - r} ${cy + w} ${cx - r} ${cy} ` +
  `C${cx - r} ${cy - w} ${cx - w} ${cy - r} ${cx} ${cy - r}Z`

export function ChromeStars() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  const L = { cx: 162, cy: 268, r: 148 }
  const Lw = (r: number) => r * 0.075
  const S = { cx: 408, cy: 118, r: 68 }
  const Sw = (r: number) => r * 0.075

  const wrapperTransform = isPressed
    ? "translateY(2.5px) scale(0.99)"
    : isHovered && !isTouchDevice
    ? "translateY(-3px) scale(1.02)"
    : "translateY(0) scale(1)"

  const wrapperFilter = isPressed
    ? "drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
    : isHovered && !isTouchDevice
    ? "drop-shadow(0 12px 28px rgba(0,0,0,0.30)) brightness(1.06)"
    : "drop-shadow(0 6px 18px rgba(0,0,0,0.50))"

  return (
    <div
      className="w-full h-full cursor-pointer select-none"
      style={{
        transform: wrapperTransform,
        filter: wrapperFilter,
        transition: "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)",
        transformOrigin: "center center",
      }}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
        className="w-full h-full"
      >
        {/* Float animation */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <svg
            viewBox="0 0 490 440"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              {/* ══════════════════════════════
                  LARGE STAR — MetalButton default color stack
              ══════════════════════════════ */}

              {/* Bevel: outer edge — black top → #A0A0A0 bottom */}
              <linearGradient id="l-bevel" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%"   stopColor="#000000" />
                <stop offset="100%" stopColor="#A0A0A0" />
              </linearGradient>

              {/* Chrome ring: inner bright-dark-bright tube highlight */}
              <linearGradient id="l-chrome" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%"   stopColor="#FAFAFA" />
                <stop offset="48%"  stopColor="#3E3E3E" />
                <stop offset="100%" stopColor="#E5E5E5" />
              </linearGradient>

              {/* Main surface: #B9B9B9 → #969696 */}
              <linearGradient id="l-surface" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%"   stopColor="#C4C4C4" />
                <stop offset="100%" stopColor="#8E8E8E" />
              </linearGradient>

              {/* Key light sheen — upper-left studio highlight */}
              <radialGradient id="l-sheen" cx="28%" cy="22%" r="62%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.50" />
                <stop offset="45%"  stopColor="#eceef1" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* Horizontal press shine (MetalButton via-neutral-100) */}
              <linearGradient id="l-shine" x1="0" y1="0.5" x2="1" y2="0.5">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%"  stopColor="#F5F5F5" stopOpacity={isPressed ? 0.22 : 0} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              {/* Hover glow aura */}
              <radialGradient id="l-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#cccccc" stopOpacity={isHovered && !isPressed && !isTouchDevice ? 0.18 : 0} />
                <stop offset="100%" stopColor="#cccccc" stopOpacity="0" />
              </radialGradient>

              {/* Tip specular hotspot */}
              <radialGradient id="l-tip" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
                <stop offset="35%"  stopColor="#f0f2f5" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* ══════════════════════════════
                  SMALL STAR
              ══════════════════════════════ */}

              <linearGradient id="s-bevel" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%"   stopColor="#000000" />
                <stop offset="100%" stopColor="#A0A0A0" />
              </linearGradient>

              <linearGradient id="s-chrome" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%"   stopColor="#FAFAFA" />
                <stop offset="48%"  stopColor="#3E3E3E" />
                <stop offset="100%" stopColor="#E5E5E5" />
              </linearGradient>

              <linearGradient id="s-surface" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%"   stopColor="#C4C4C4" />
                <stop offset="100%" stopColor="#8E8E8E" />
              </linearGradient>

              <radialGradient id="s-sheen" cx="28%" cy="22%" r="60%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.48" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="s-tip" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ══ LARGE STAR ══ */}

            {/* Hover glow aura behind star */}
            <ellipse
              cx={L.cx} cy={L.cy}
              rx={L.r + 70} ry={L.r + 70}
              fill="url(#l-glow)"
            />

            {/* Layer 1 — outer bevel (black-to-silver edge) */}
            <path d={star(L.cx, L.cy, L.r + 15, Lw(L.r + 15))} fill="url(#l-bevel)" />

            {/* Layer 2 — inner chrome ring (bright-dark-bright tube) */}
            <path d={star(L.cx, L.cy, L.r + 7,  Lw(L.r + 7))}  fill="url(#l-chrome)" />

            {/* Layer 3 — main metal surface */}
            <path d={star(L.cx, L.cy, L.r + 1,  Lw(L.r + 1))}  fill="url(#l-surface)" />

            {/* Layer 4 — key light sheen (upper-left) */}
            <path d={star(L.cx, L.cy, L.r - 10, Lw(L.r - 10))} fill="url(#l-sheen)" />

            {/* Layer 5 — horizontal press shine */}
            <path d={star(L.cx, L.cy, L.r - 10, Lw(L.r - 10))} fill="url(#l-shine)" />

            {/* Tip specular hotspots */}
            <circle cx={L.cx}        cy={L.cy - L.r} r="11" fill="url(#l-tip)" />
            <circle cx={L.cx + L.r}  cy={L.cy}       r="9"  fill="url(#l-tip)" />
            <circle cx={L.cx}        cy={L.cy + L.r} r="10" fill="url(#l-tip)" />
            <circle cx={L.cx - L.r}  cy={L.cy}       r="9"  fill="url(#l-tip)" />

            {/* ══ SMALL STAR ══ */}

            <path d={star(S.cx, S.cy, S.r + 7, Sw(S.r + 7))} fill="url(#s-bevel)" />
            <path d={star(S.cx, S.cy, S.r + 3, Sw(S.r + 3))} fill="url(#s-chrome)" />
            <path d={star(S.cx, S.cy, S.r - 1, Sw(S.r - 1))} fill="url(#s-surface)" />
            <path d={star(S.cx, S.cy, S.r - 8, Sw(S.r - 8))} fill="url(#s-sheen)" />

            <circle cx={S.cx}        cy={S.cy - S.r} r="5" fill="url(#s-tip)" />
            <circle cx={S.cx + S.r}  cy={S.cy}       r="4" fill="url(#s-tip)" />
            <circle cx={S.cx}        cy={S.cy + S.r} r="5" fill="url(#s-tip)" />
            <circle cx={S.cx - S.r}  cy={S.cy}       r="4" fill="url(#s-tip)" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
