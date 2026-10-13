"use client"
import { useState, useEffect, useRef } from "react"
import { ArrowRight, Link } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface TimelineItem {
  id: number
  title: string
  date: string
  subtitle?: string
  content: string
  bullets?: string[]
  tags?: string[]
  category: string
  icon: React.ElementType
  relatedIds: number[]
  status: "completed" | "in-progress" | "pending"
  energy: number
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null)
  const [inView, setInView] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev }
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false
      })
      newState[id] = !prev[id]

      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)
        const relatedItems = getRelatedItems(id)
        const newPulse: Record<number, boolean> = {}
        relatedItems.forEach((relId) => (newPulse[relId] = true))
        setPulseEffect(newPulse)
        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }
      return newState
    })
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!autoRotate || !inView) return
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)))
    }, 50)
    return () => clearInterval(timer)
  }, [autoRotate, inView])

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId)
    const totalNodes = timelineData.length
    const targetAngle = (nodeIndex / totalNodes) * 360
    setRotationAngle(270 - targetAngle)
  }

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radius = 190
    const radian = (angle * Math.PI) / 180
    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))
    return { x, y, angle, zIndex, opacity }
  }

  const getRelatedItems = (itemId: number): number[] => {
    const current = timelineData.find((item) => item.id === itemId)
    return current ? current.relatedIds : []
  }

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false
    return getRelatedItems(activeNodeId).includes(itemId)
  }

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "text-primary-foreground bg-primary border-primary"
      case "in-progress": return "text-foreground bg-secondary border-border"
      case "pending": return "text-muted-foreground bg-muted border-border"
      default: return "text-muted-foreground bg-muted border-border"
    }
  }

  return (
    <div
      className="w-full h-[680px] flex flex-col items-center justify-center relative overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* Center node */}
          <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-foreground/20 via-foreground/10 to-transparent flex items-center justify-center z-10 border border-border">
            <div className="absolute w-18 h-18 rounded-full border border-border/30 animate-ping opacity-50" />
            <div className="w-6 h-6 rounded-full bg-primary/80 backdrop-blur-md" />
          </div>

          {/* Orbit ring */}
          <div className="absolute w-[380px] h-[380px] rounded-full border border-border/30" />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length)
            const isExpanded = expandedItems[item.id]
            const isRelated = isRelatedToActive(item.id)
            const isPulsing = pulseEffect[item.id]
            const Icon = item.icon

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id) }}
              >
                {/* Energy glow */}
                <div
                  className={`absolute rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                    width: `${item.energy * 0.4 + 36}px`,
                    height: `${item.energy * 0.4 + 36}px`,
                    left: `-${(item.energy * 0.4 + 36 - 36) / 2}px`,
                    top: `-${(item.energy * 0.4 + 36 - 36) / 2}px`,
                  }}
                />

                {/* Node icon */}
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isExpanded
                      ? "bg-primary text-primary-foreground border-primary scale-150 shadow-lg"
                      : isRelated
                      ? "bg-secondary text-secondary-foreground border-primary/50 animate-pulse"
                      : "bg-surface text-foreground border-border"
                  )}
                >
                  <Icon size={14} />
                </div>

                {/* Label */}
                <div
                  className={cn(
                    "absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium tracking-wide transition-all duration-300",
                    isExpanded ? "text-foreground scale-125" : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-80 border-border bg-popover/95 backdrop-blur-lg shadow-xl overflow-visible z-50">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-border" />
                    <CardHeader className="pb-2 p-4">
                      <div className="flex justify-between items-center gap-2">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "DONE" : item.status === "in-progress" ? "CURRENT" : "UPCOMING"}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-foreground">{item.title}</CardTitle>
                      {item.subtitle && (
                        <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
                      )}
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground p-4 pt-0">
                      {item.bullets ? (
                        <ul className="space-y-1.5 list-disc pl-4 marker:text-muted-foreground leading-relaxed">
                          {item.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{item.content}</p>
                      )}

                      {item.tags && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-[10px] rounded-full border border-border text-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex items-center mb-2 gap-1">
                            <Link size={10} className="text-muted-foreground" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                              Related
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId)
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2 py-0 text-xs rounded-full"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relatedId) }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1" />
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
