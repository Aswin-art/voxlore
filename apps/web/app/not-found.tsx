import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] bg-vox-cream px-6 py-8 text-[#1E2229] sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl flex-col justify-between">
        <header className="flex items-center justify-between border-b border-[#1E2229]/15 pb-5">
          <Link href="/" className="text-lg font-extrabold tracking-tight">
            Voxlore
          </Link>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[#1E2229]/55">
            Error 404
          </span>
        </header>

        <section className="grid gap-10 py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(14rem,0.6fr)] md:items-end lg:py-24">
          <div>
            <p className="mb-5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#1E2229]/55">
              Halaman tidak ditemukan
            </p>
            <h1 className="max-w-3xl text-[clamp(3.5rem,12vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.07em]">
              Arah cerita berubah.
            </h1>
          </div>

          <div className="max-w-sm border-t border-[#1E2229]/15 pt-5 md:mb-2">
            <p className="text-base leading-[1.618] text-[#1E2229]/70">
              URL ini tidak tersedia atau sudah dipindahkan. Kembali ke halaman utama untuk melanjutkan eksplorasi.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex rounded-md bg-[#1E2229] px-4 py-2.5 text-sm font-bold text-white transition-colors duration-150 hover:bg-[#1E2229]/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E2229]"
            >
              Kembali ke beranda
            </Link>
          </div>
        </section>

        <footer className="flex items-end justify-between border-t border-[#1E2229]/15 pt-4 text-[0.6875rem] text-[#1E2229]/55">
          <span>Voxlore</span>
          <span className="font-mono">/404</span>
        </footer>
      </div>
    </main>
  )
}
