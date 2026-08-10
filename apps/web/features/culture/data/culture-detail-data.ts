export interface AudioSpot {
  id: string
  spotNumber: number
  title: string
  duration: string
  description: string
  audioUrl?: string
}

export interface UserReview {
  id: string
  userName: string
  userInitials: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

export interface RatingBreakdown {
  5: number
  4: number
  3: number
  2: number
  1: number
}

export interface CultureDetail {
  id: string
  title: string
  subtitle: string
  location: string
  rating: number
  reviewsCount: number
  duration: string
  image: string
  description: string
  audioSpots: AudioSpot[]
  reviews: UserReview[]
  ratingBreakdown: RatingBreakdown
}

export const QUICK_TAGS = [
  "Audio Jernih",
  "Narasi Imersif",
  "Alur Edukatif",
  "Musik Etnik Pas",
  "Sangat Direkomendasikan",
]

export const DETAIL_DATA: Record<string, CultureDetail> = {
  prambanan: {
    id: "prambanan",
    title: "Candi Prambanan",
    subtitle: "Kemegahan Arsitektur Trimurti & Legenda Roro Jonggrang",
    location: "Sleman, D.I. Yogyakarta",
    rating: 4.9,
    reviewsCount: 1280,
    duration: "45-60 min",
    image: "/images/prambanan-hero.png",
    description:
      "Candi Prambanan merupakan kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9 Masehi. Didedikasikan untuk Trimurti: Brahma (Pencipta), Shiva (Pemerelihara), dan Vishnu (Penyelamat). Nikmati kisah epik Ramayana yang terpahat indah pada relief candi.",
    audioSpots: [
      {
        id: "spot-1",
        spotNumber: 1,
        title: "Pelataran & Gapura Utama",
        duration: "07:30",
        description: "Pengenalan sejarah pendirian dan tata letak kompleks candi.",
      },
      {
        id: "spot-2",
        spotNumber: 2,
        title: "Candi Shiva & Relief Ramayana",
        duration: "12:15",
        description: "Penjelasan kisah epik Ramayana pada dinding galeri pertama.",
      },
      {
        id: "spot-3",
        spotNumber: 3,
        title: "Arca Durga Mahisasuramardini",
        duration: "08:45",
        description: "Mitos Roro Jonggrang dan makna spiritual arca Dewi Durga.",
      },
      {
        id: "spot-4",
        spotNumber: 4,
        title: "Pelataran Candi Brahma & Vishnu",
        duration: "10:00",
        description: "Filosfi pelestarian dan kehancuran dalam ajaran Trimurti.",
      },
    ],
    ratingBreakdown: {
      5: 88,
      4: 9,
      3: 2,
      2: 1,
      1: 0,
    },
    reviews: [
      {
        id: "r1",
        userName: "Budi Santoso",
        userInitials: "BS",
        rating: 5,
        date: "2 hari lalu",
        comment:
          "Suara narator sangat jernih dan penjelasan legenda Roro Jonggrang di Spot 3 bikin merinding. Terasa membawa pemandu wisata pribadi!",
        verified: true,
      },
      {
        id: "r2",
        userName: "Dian Pratama",
        userInitials: "DP",
        rating: 5,
        date: "1 minggu lalu",
        comment:
          "Sangat membantu saat keliling Candi Prambanan. Penjelasan relief Ramayana detail dan mudah dipahami anak-anak.",
        verified: true,
      },
      {
        id: "r3",
        userName: "Maya Rosalia",
        userInitials: "MR",
        rating: 4,
        date: "2 minggu lalu",
        comment:
          "Audio pasnya oke banget, koneksinya instan tanpa perlu unduh aplikasi tambahan.",
        verified: true,
      },
      {
        id: "r4",
        userName: "Rian Hidayat",
        userInitials: "RH",
        rating: 5,
        date: "3 minggu lalu",
        comment:
          "Pengalaman wisata sejarah terbaik! Sangat disarankan pakai earphone agar narasi lebih imersif.",
        verified: true,
      },
      {
        id: "r5",
        userName: "Siti Rahmawati",
        userInitials: "SR",
        rating: 5,
        date: "1 bulan lalu",
        comment:
          "Relief candi jadi jauh lebih hidup saat mendengarkan penjelasan audio guide ini.",
        verified: true,
      },
    ],
  },
}
