import { ActionButton } from "@workspace/ui/components/action-button"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

export function CtaSection() {
  return (
    <section
      id="cta-section"
      data-nav-theme="dark"
      className="p-2 sm:p-3 lg:p-3 bg-vox-cream text-white min-h-[450px] sm:min-h-[550px] lg:min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between"
    >
      <div className="w-full h-full min-h-[420px] sm:min-h-[500px] lg:min-h-0 rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-10 lg:p-14 flex flex-col justify-between items-center relative overflow-hidden bg-[#1E2229] shadow-2xl">
        <div className="w-full flex items-center justify-center shrink-0">
          <span className="text-xs sm:text-sm uppercase tracking-widest font-bold text-white/50 text-center">
            [ SIAP MENJELAJAH ]
          </span>
        </div>

        <div className="flex flex-col items-center justify-center text-center gap-6 sm:gap-8 lg:gap-10 my-auto py-8 sm:py-12 max-w-4xl px-2 sm:px-4">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] sm:leading-[1.05] tracking-tight">
            Siap Menyelami Cerita &amp; Warisan Budaya Nusantara?
          </h2>

          <ActionButton variant="white" icon={ArrowUpRight01Icon}>
            Mulai Jelajahi Sekarang
          </ActionButton>
        </div>

        <div className="w-full shrink-0 h-4 sm:h-6" />
      </div>
    </section>
  )
}
