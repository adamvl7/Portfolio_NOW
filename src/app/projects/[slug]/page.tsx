import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Download, ExternalLink, GitBranch } from "lucide-react"
import { projects } from "@/data/projects"

const detailed = projects.filter((p) => p.detail)

export function generateStaticParams() {
  return detailed.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = detailed.find((p) => p.id === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Adam Le`,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = detailed.find((p) => p.id === slug)
  if (!project || !project.detail) notFound()
  const { detail } = project

  return (
    <main className="px-6 pt-28 pb-24">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
          {project.year} · {detail.event}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
          {project.title}
          {project.status === "in-progress" && (
            <span className="ml-4 align-middle px-3 py-1 text-sm font-medium rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-500">
              In progress
            </span>
          )}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-2">{detail.tagline}</p>
        <p className="text-sm text-muted-foreground mb-8">{detail.role}</p>

        <div className="flex flex-wrap gap-3 mb-12">
          {detail.liveUrl && (
            <a
              href={detail.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live demo
            </a>
          )}
          {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={
              detail.liveUrl
                ? "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                : "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            }
          >
            <GitBranch className="w-4 h-4" />
            View code
          </a>
          )}
          {detail.devpost && (
            <a
              href={detail.devpost}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View on Devpost
            </a>
          )}
          {detail.apk && (
            <a
              href={detail.apk}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <Download className="w-4 h-4" />
              Download APK
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {detail.stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                {s.label}
              </p>
              <p className="text-lg font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {detail.screenshots.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 mb-16">
          {detail.screenshots.map((shot) => (
            <figure
              key={shot.src}
              className={`shrink-0 ${shot.width && shot.width > (shot.height ?? 0) ? "w-[min(80vw,520px)]" : "w-[220px]"}`}
            >
              <div className="rounded-2xl border border-border overflow-hidden bg-surface">
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  width={shot.width ?? 264}
                  height={shot.height ?? 573}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="mt-2 text-xs text-muted-foreground leading-snug">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        )}

        <div className="space-y-10 mb-16">
          {detail.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Tech stack</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {detail.stack.map((group) => (
              <div key={group.group} className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  {group.group}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-0.5 text-xs rounded-full border border-border text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
