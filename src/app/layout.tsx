import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/Providers"
import { Navbar } from "@/components/Navbar"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Adam Le — Software Engineer",
  description:
    "Software Engineer focused on frontend engineering, design systems, and building products people love.",
  keywords: ["Software Engineer", "Frontend", "React", "Next.js", "TypeScript", "UI/UX"],
  openGraph: {
    title: "Adam Le — Software Engineer",
    description: "Software Engineer focused on frontend engineering and design systems.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
