"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Search01Icon,
  CustomerSupportIcon,
  Mail01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Chat01Icon,
} from "@hugeicons/core-free-icons"

export interface FaqItem {
  id: string
  category: "audio" | "account" | "payment" | "offline"
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    category: "offline",
    question: "Bagaimana cara mendengarkan audio guide tanpa koneksi internet?",
    answer:
      "Kamu dapat mengunduh trek audio pilihan terlebih dahulu saat terhubung ke Wi-Fi atau data seluler. Setelah diunduh, audio akan tersimpan otomatis di halaman 'Unduhan Luring' dan dapat diputar kapan saja tanpa sinyal.",
  },
  {
    id: "faq-2",
    category: "payment",
    question: "Apakah langganan Heritage Pass bisa dibatalkan sewaktu-waktu?",
    answer:
      "Ya, kamu bisa membatalkan perpanjangan otomatis langganan kapan saja melalui menu Paket Berlangganan di profil. Akses kamu akan tetap aktif hingga akhir periode penagihan berjalan.",
  },
  {
    id: "faq-3",
    category: "audio",
    question: "Bagaimana cara mengubah bahasa narasi suara cerita rakyat?",
    answer:
      "Buka menu Profil, lalu pilih 'Bahasa Narasi Audio'. Kamu bisa memilih antara Bahasa Indonesia, English, Basa Jawa, Basa Bali, Bahasa Sunda, atau 日本語 sesuai preferensi kamu.",
  },
  {
    id: "faq-4",
    category: "audio",
    question: "Mengapa suara audio guide tidak berputar secara otomatis di situs lokasi?",
    answer:
      "Pastikan fitur Izin Lokasi (GPS) pada perangkat kamu telah diaktifkan untuk aplikasi Voxlore. Audio spot berbasis titik koordinat akan otomatis terpicu saat kamu berjalan mendekati candi atau objek sejarah.",
  },
  {
    id: "faq-5",
    category: "account",
    question: "Bagaimana jika saya lupa kata sandi akun Voxlore?",
    answer:
      "Masuk ke halaman Keamanan di menu Profil, lalu pilih 'Ubah Kata Sandi'. Jika kamu tidak bisa masuk ke akun sama sekali, gunakan fitur 'Lupa Kata Sandi' pada layar utama login.",
  },
  {
    id: "faq-6",
    category: "payment",
    question: "Metode pembayaran apa saja yang didukung oleh Voxlore?",
    answer:
      "Voxlore mendukung berbagai metode pembayaran instan meliputi GoPay, OVO, ShopeePay, QRIS seluruh bank, Transfer Bank (Virtual Account BCA, Mandiri, BRI, BNI), serta Kartu Kredit/Debit.",
  },
]

export default function HelpCenterPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [toast, setToast] = useState<string | null>(null)

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  const handleContactCS = (channel: string) => {
    setToast(`Membuka saluran bantuan via ${channel}... 💬`)
    setTimeout(() => setToast(null), 2500)
  }

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = activeCategory === "all" || item.category === activeCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="flex flex-col pb-28 relative w-full min-w-0">
      {/* Toast Banner */}
      {toast && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="opacity-70 hover:opacity-100 ml-2 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-30 bg-card p-4 sm:p-5 border-b border-border/60 shadow-xs flex items-center gap-3 w-full min-w-0">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-9 h-9 rounded-2xl border border-border bg-background flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer shrink-0"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg font-extrabold text-foreground tracking-tight truncate">
            Pusat Bantuan &amp; FAQ
          </h1>
          <span className="text-xs text-muted-foreground truncate">
            Temukan jawaban pertanyaan atau hubungi tim Voxlore
          </span>
        </div>
      </header>

      {/* Main Page Content Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-5 w-full">
        {/* Search Bar */}
        <div className="relative flex items-center w-full">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kendala (cth: unduh offline, pembayaran)..."
            className="w-full pl-10 pr-8 py-3 text-xs bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 text-xs text-muted-foreground hover:text-foreground cursor-pointer p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Contact Support Direct Options */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-black text-foreground uppercase tracking-wider px-1">
            Hubungi Layanan Pelanggan
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleContactCS("WhatsApp Live Chat")}
              className="p-3.5 rounded-2xl bg-card border border-border hover:border-primary/40 flex flex-col gap-2 transition-all cursor-pointer text-left shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                <HugeiconsIcon icon={Chat01Icon} className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-extrabold text-foreground truncate">WhatsApp Chat</span>
                <span className="text-[10px] text-muted-foreground truncate">Respon cepat 08:00 - 20:00</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleContactCS("Email Support")}
              className="p-3.5 rounded-2xl bg-card border border-border hover:border-primary/40 flex flex-col gap-2 transition-all cursor-pointer text-left shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                <HugeiconsIcon icon={Mail01Icon} className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-extrabold text-foreground truncate">Email Support</span>
                <span className="text-[10px] text-muted-foreground truncate">support@voxlore.id</span>
              </div>
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs font-black text-foreground uppercase tracking-wider px-1">
            Pertanyaan Umum (FAQ)
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 w-full min-w-0">
            {[
              { id: "all", label: "Semua FAQ" },
              { id: "audio", label: "Audio Guide" },
              { id: "offline", label: "Unduhan Offline" },
              { id: "payment", label: "Pembayaran" },
              { id: "account", label: "Akun & Akses" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-card rounded-3xl border border-border flex flex-col items-center justify-center gap-1">
            <HugeiconsIcon icon={CustomerSupportIcon} className="w-8 h-8 text-muted-foreground/30" />
            <span className="text-xs font-extrabold text-foreground">Pertanyaan Tidak Ditemukan</span>
            <span className="text-[11px] text-muted-foreground">
              Coba gunakan kata kunci pencarian yang lain atau hubungi tim bantuan.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? "bg-card border-primary/40 shadow-2xs" : "bg-card border-border hover:border-border/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span className="text-xs font-extrabold text-foreground leading-snug">
                      {faq.question}
                    </span>
                    <HugeiconsIcon
                      icon={isOpen ? ArrowUp01Icon : ArrowDown01Icon}
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isOpen ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/40 font-medium">
                      <p className="pt-2">{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
