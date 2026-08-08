import Image from "next/image"
import Link from "next/link"

export function FooterSection() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer-section" data-nav-theme="light" className="p-2 sm:p-3 lg:p-3 bg-vox-cream text-[#1E2229]">
      <div className="w-full rounded-2xl sm:rounded-3xl border border-border/40 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 bg-white/40 backdrop-blur-sm shadow-md">
        {/* Left: Brand Logo & Title Link */}
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group">
          <Image
            src="/logo-dark.svg"
            alt="Voxlore Logo"
            width={42}
            height={30}
            className="h-9 sm:h-10 w-auto rotate-180 transition-transform group-hover:scale-105"
          />
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#1E2229]">
            Voxlore
          </span>
        </Link>

        {/* Right: Copyright */}
        <p className="text-xs sm:text-sm text-[#1E2229]/60 font-medium text-center sm:text-right">
          © {currentYear} Voxlore. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
