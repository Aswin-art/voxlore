import Image from "next/image"

export function AboutSection() {
  return (
    <section
      id="about-section"
      data-nav-theme="light"
      className="p-2 sm:p-3 lg:p-3 bg-vox-cream text-[#1E2229] min-h-screen lg:h-screen lg:max-h-screen flex flex-col"
    >
      <div className="w-full h-full min-h-[500px] sm:min-h-[600px] lg:min-h-0 rounded-2xl sm:rounded-3xl border border-border/40 p-6 sm:p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden bg-white/40 backdrop-blur-sm shadow-xl">
        {/* Section Header Badge */}
        <div className="w-full flex items-center justify-between shrink-0">
          <span className="text-xs sm:text-sm uppercase tracking-widest font-bold text-[#1E2229]/50">
            [ TENTANG VOXLORE ]
          </span>
        </div>

        {/* Main Section Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 w-full flex-1 items-end mt-4 min-h-0">
          {/* Left Column: Visual Culture Image & Main Heading */}
          <div className="lg:col-span-5 flex flex-col justify-end h-full items-start gap-4 min-h-0">
            <div className="relative w-full flex-1 min-h-[200px] sm:min-h-[280px] lg:min-h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-border/30">
              <Image
                src="/images/about-culture.png"
                alt="Warisan Budaya & Wayang Nusantara"
                fill
                className="object-cover brightness-90 contrast-[1.05]"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E2229] leading-[1.05] tracking-tight shrink-0">
              Tentang Voxlore
            </h2>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-7 flex flex-col gap-3 lg:gap-6 pb-1">
            <p className="text-lg sm:text-2xl lg:text-3xl text-[#1E2229]/90 leading-relaxed font-semibold tracking-tight">
              Voxlore hadir sebagai platform panduan audio imersif yang menghubungkan wisatawan dengan sejarah, mitos, dan kearifan lokal di setiap situs sejarah Nusantara.
            </p>

            <p className="text-sm sm:text-base text-[#1E2229]/70 leading-relaxed font-normal max-w-2xl">
              Melalui kombinasi narasi autentik dari penutur asli daerah dan aransemen musik etnik sinematik, kami mengubah setiap perjalanan menjadi petualangan berbudaya yang mendalam—mudah diakses secara instan via QR Code tanpa perlu mengunduh aplikasi.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
