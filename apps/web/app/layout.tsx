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

