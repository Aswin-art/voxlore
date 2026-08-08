import Image from "next/image"

export function FooterSection() {
  return (
    <footer id="footer-section" data-nav-theme="light" className="p-2 sm:p-3 lg:p-3 bg-vox-cream text-[#1E2229]">
      <div className="w-full rounded-2xl sm:rounded-3xl border border-border/40 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 bg-white/40 backdrop-blur-sm shadow-md">
        {/* Left: Rotated Logo & Brand Name (Enlarged 1.5x) */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          <Image
            src="/logo-dark.svg"
            alt="Voxlore Logo"
            width={42}
            height={30}
            className="h-9 sm:h-10 w-auto rotate-180"
          />
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#1E2229]">
            Voxlore
          </span>
        </div>

        {/* Right: Copyright */}
        <p className="text-xs sm:text-sm text-[#1E2229]/60 font-medium text-center sm:text-right">
          © {new Date().getFullYear()} Voxlore. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
