import { Metadata } from "next"
import { SplashScreen } from "@/features/home/components/splash-screen"
import { Navbar } from "@/features/home/components/navbar"
import { HeroSection } from "@/features/home/components/hero-section"
import { AboutSection } from "@/features/home/components/about-section"
import { HowItWorksSection } from "@/features/home/components/how-it-works-section"
import { CultureListSection } from "@/features/home/components/culture-list-section"
import { CtaSection } from "@/features/home/components/cta-section"
import { FooterSection } from "@/features/home/components/footer-section"

export const metadata: Metadata = {
  title: "Voxlore - Panduan Audio Warisan Budaya Nusantara",
  description:
    "Jelajahi panduan audio sinematik dwibahasa untuk Candi Borobudur, Prambanan, dan destinasi warisan budaya Nusantara lainnya.",
  alternates: {
    canonical: "/",
  },
}

function getStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://voxlore.id"

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Voxlore",
    url: siteUrl,
    description: "Panduan audio sinematik dwibahasa untuk situs budaya dan warisan sejarah Nusantara.",
    inLanguage: "id-ID",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/#culture-list-section`,
      "query-input": "required name=search_term_string",
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Voxlore",
    url: siteUrl,
    logo: `${siteUrl}/logo-dark.svg`,
    description: "Platform panduan audio sinematik warisan budaya Nusantara.",
  }

  return [websiteSchema, organizationSchema]
}

export default function Page() {
  const schemas = getStructuredData()

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="min-h-svh bg-vox-cream text-foreground">
        <SplashScreen />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <CultureListSection />
        <CtaSection />
        <FooterSection />
      </main>
    </>
  )
}
