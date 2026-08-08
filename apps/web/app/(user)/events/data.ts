export interface FestivalEvent {
  id: string
  title: string
  category: string
  location: string
  province: string
  date: string
  startDateStr: string // YYYY-MM-DD for date-range filter logic
  endDateStr: string
  monthBadge: string
  dayBadge: string
  image: string
  description: string
  isFeatured?: boolean
  audioGuideAvailable?: boolean
  organizer?: string
}

export interface RecentPlanItem {
  id: string
  title: string
  province: string
  dateRangeStr: string
  eventsCount: number
  createdDate: string
  events: FestivalEvent[]
}

export const CATEGORIES = [
  "Semua",
  "Upacara Adat",
  "Ritual Keagamaan",
  "Pentas Seni",
  "Ritual Tahunan",
  "Festival Musik Etnik",
  "Pameran Budaya",
]

export const PROVINCES = [
  "Semua",
  "D.I. Yogyakarta",
  "Jawa Tengah",
  "Jawa Timur",
  "Jawa Barat",
  "DKI Jakarta",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Sulawesi Selatan",
  "Sumatera Utara",
  "Sumatera Barat",
  "Aceh",
  "Papua",
]

export const EVENTS_CATALOG: FestivalEvent[] = [
  {
    id: "rambu-solo",
    title: "Upacara Adat Rambu Solo'",
    category: "Upacara Adat",
    location: "Tana Toraja",
    province: "Sulawesi Selatan",
    date: "15 - 20 Agustus 2026",
    startDateStr: "2026-08-15",
    endDateStr: "2026-08-20",
    monthBadge: "AGU",
    dayBadge: "15",
    image: "/images/prambanan-hero.png",
    description:
      "Ritual pemakaman megah suku Toraja yang menyimbolkan penghormatan terakhir bagi leluhur dengan tarian kerbau sakral & tarian Ma'badong.",
    isFeatured: true,
    audioGuideAvailable: true,
    organizer: "Dinas Pariwisata Tana Toraja",
  },
  {
    id: "grebeg-maulud",
    title: "Festival Grebeg Maulud Kraton",
    category: "Ritual Keagamaan",
    location: "Kraton Yogyakarta",
    province: "D.I. Yogyakarta",
    date: "28 Agustus 2026",
    startDateStr: "2026-08-28",
    endDateStr: "2026-08-28",
    monthBadge: "AGU",
    dayBadge: "28",
    image: "/images/about-culture.png",
    description:
      "Pesta budaya perayaan Kraton ditandai iring-iringan gunungan hasil bumi dari istana menuju Masjid Gede Kauman dipandu narator adat.",
    isFeatured: true,
    audioGuideAvailable: true,
    organizer: "Kraton Ngayogyakarta Hadiningrat",
  },
  {
    id: "dieng-culture",
    title: "Dieng Culture Festival 2026",
    category: "Pentas Seni",
    location: "Dataran Tinggi Dieng",
    province: "Jawa Tengah",
    date: "05 - 07 September 2026",
    startDateStr: "2026-09-05",
    endDateStr: "2026-09-07",
    monthBadge: "SEP",
    dayBadge: "05",
    image: "/images/balinese-dance.png",
    description:
      "Puncak pemotongan rambut gimbal anak-anak Dieng yang diramaikan pelepasan ribuan lampion dan musik Jazz di atas awan.",
    isFeatured: false,
    audioGuideAvailable: true,
    organizer: "Pokdarwis Dieng Pandawa",
  },
  {
    id: "sekaten-surakarta",
    title: "Upacara Sakral Perayaan Sekaten",
    category: "Ritual Tahunan",
    location: "Kraton Surakarta Hadiningrat",
    province: "Jawa Tengah",
    date: "12 - 18 September 2026",
    startDateStr: "2026-09-12",
    endDateStr: "2026-09-18",
    monthBadge: "SEP",
    dayBadge: "12",
    image: "/images/prambanan-hero.png",
    description:
      "Tradisi tabuhan Gamelan Kyai Guntur Madu yang bergema sepekan penuh menyambut hari kelahiran Rasulullah di Alun-Alun Surakarta.",
    isFeatured: false,
    audioGuideAvailable: true,
    organizer: "Kraton Kasunanan Surakarta",
  },
  {
    id: "bali-arts-fest",
    title: "Pesta Kesenian Bali (PKB)",
    category: "Pentas Seni",
    location: "Taman Budaya Denpasar",
    province: "Bali",
    date: "10 - 25 Agustus 2026",
    startDateStr: "2026-08-10",
    endDateStr: "2026-08-25",
    monthBadge: "AGU",
    dayBadge: "10",
    image: "/images/balinese-dance.png",
    description:
      "Wadah apresiasi seni budaya terbesar di Bali menampilkan pawai adat, tari Kecak kolosal, dan pameran kerajinan tradisional.",
    isFeatured: true,
    audioGuideAvailable: true,
    organizer: "Dinas Kebudayaan Provinsi Bali",
  },
]

export const INITIAL_RECENT_PLANS: RecentPlanItem[] = [
  {
    id: "plan-toraja-aug",
    title: "Eksplorasi Budaya Toraja",
    province: "Sulawesi Selatan",
    dateRangeStr: "15 - 20 Agustus 2026",
    eventsCount: 1,
    createdDate: "Hari ini",
    events: [EVENTS_CATALOG[0]!],
  },
  {
    id: "plan-jogja-grebeg",
    title: "Liburan Adat Yogyakarta",
    province: "D.I. Yogyakarta",
    dateRangeStr: "25 - 30 Agustus 2026",
    eventsCount: 1,
    createdDate: "2 hari yang lalu",
    events: [EVENTS_CATALOG[1]!],
  },
]
