import { SplashScreen } from "@/features/home/components/splash-screen"
import { Navbar } from "@/features/home/components/navbar"
import { HeroSection } from "@/features/home/components/hero-section"
import { AboutSection } from "@/features/home/components/about-section"
import { HowItWorksSection } from "@/features/home/components/how-it-works-section"
import { CultureListSection } from "@/features/home/components/culture-list-section"
import { CtaSection } from "@/features/home/components/cta-section"
import { FooterSection } from "@/features/home/components/footer-section"

export default function Page() {
  return (
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
  )
}
