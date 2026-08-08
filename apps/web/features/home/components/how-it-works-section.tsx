import { HugeiconsIcon } from "@hugeicons/react"
import { QrCode01Icon, HeadphonesIcon, SparklesIcon } from "@hugeicons/core-free-icons"

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Pindai Kode QR",
      description:
        "Cukup arahkan kamera ponselmu ke QR Code di situs warisan sejarah untuk membuka panduan audio secara instan tanpa mengunduh aplikasi.",
      icon: QrCode01Icon,
      isDark: true,
    },
    {
      number: "02",
      title: "Pilih Bahasa & Narator",
      description:
        "Pilih opsi bahasa favoritmu (Indonesia / English) dan nikmati narasi autentik yang disampaikan langsung oleh penutur asli daerah setempat.",
      icon: HeadphonesIcon,
      isDark: false,
    },
    {
      number: "03",
      title: "Resapi Cerita & Musik",
      description:
        "Dengarkan sejarah, mitos lokal, dan alunan musik etnik sinematik yang membawa pengalaman menjelajah situs menjadi sangat mendalam.",
      icon: SparklesIcon,
      isDark: true,
    },
  ]

  return (
    <section
      id="how-it-works-section"
      data-nav-theme="light"
      className="p-2 sm:p-3 lg:p-3 bg-vox-cream text-[#1E2229] min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between"
    >
      <div className="w-full h-full min-h-[500px] sm:min-h-[600px] lg:min-h-0 rounded-2xl sm:rounded-3xl border border-border/40 p-6 sm:p-10 lg:p-14 flex flex-col justify-between relative bg-white/40 backdrop-blur-sm shadow-xl">
        <div className="w-full flex items-center justify-between shrink-0 mb-6 sm:mb-8 lg:mb-0">
          <span className="text-xs sm:text-sm uppercase tracking-widest font-bold text-[#1E2229]/50">
            [ CARA KERJA ]
          </span>
        </div>

        <div className="flex flex-col gap-6 lg:gap-8 my-auto w-full py-4">
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-[#1E2229] leading-[1.05] tracking-tight">
              3 Langkah Mudah Menikmati Voxlore
            </h2>
            <p className="text-xs sm:text-base lg:text-lg text-[#1E2229]/75 max-w-2xl leading-relaxed">
              Jelajahi keindahan narasi sejarah di setiap destinasi tanpa kerumitan aplikasi tambahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[200px] sm:min-h-[260px] lg:min-h-[340px] border shadow-lg ${
                  step.isDark
                    ? "bg-[#1E2229] text-white border-white/10"
                    : "bg-white/90 text-[#1E2229] border-border/40"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-lg sm:text-2xl font-extrabold tracking-wider ${
                      step.isDark ? "text-white/40" : "text-[#1E2229]/30"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
                      step.isDark ? "bg-white/10 text-white" : "bg-[#1E2229]/5 text-[#1E2229]"
                    }`}
                  >
                    <HugeiconsIcon icon={step.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2 pt-4 sm:pt-6">
                  <h3 className="text-lg sm:text-2xl font-bold leading-tight">
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm lg:text-base leading-relaxed ${
                      step.isDark ? "text-white/75" : "text-[#1E2229]/75"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
