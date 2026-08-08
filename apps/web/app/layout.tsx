import type { Metadata, Viewport } from "next"
import { Geist_Mono, Figtree } from "next/font/google"
import { ReactLenis } from "lenis/react"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { cn } from "@workspace/ui/lib/utils"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://voxlore.id"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Voxlore - Panduan Audio Warisan Budaya Nusantara",
    template: "%s | Voxlore",
  },
  description:
    "Voxlore menyajikan panduan audio sinematik dwibahasa berbasis narasi pengisi suara lokal dan lanskap musik etnik tradisional untuk situs budaya Nusantara.",
  keywords: [
    "Voxlore",
    "audio guide budaya",
    "panduan audio wisata",
    "wisata budaya indonesia",
    "sejarah nusantara",
    "candi borobudur audio",
    "candi prambanan audio",
    "cerita rakyat indonesia",
    "budaya nusantara",
  ],
  authors: [{ name: "Voxlore Team", url: baseUrl }],
  creator: "Voxlore",
  publisher: "Voxlore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Voxlore - Panduan Audio Warisan Budaya Nusantara",
    description:
      "Dengar cerita sinematik di balik keagungan candi, legenda kuno, dan kearifan lokal Nusantara langsung melalui panduan audio dwibahasa.",
    url: baseUrl,
    siteName: "Voxlore",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/hero-background.png",
        width: 1200,
        height: 630,
        alt: "Voxlore Cultural Audio Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voxlore - Panduan Audio Warisan Budaya Nusantara",
    description:
      "Dengar cerita sinematik di balik keagungan candi, legenda kuno, dan kearifan lokal Nusantara langsung melalui panduan audio dwibahasa.",
    images: ["/images/hero-background.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: "#1E2229",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", figtree.variable)}
    >
      <body>
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
          <Providers>{children}</Providers>
        </ReactLenis>
      </body>
    </html>
  )
}
