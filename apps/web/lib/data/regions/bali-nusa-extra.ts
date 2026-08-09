import type { Destination } from "../types"

const img = (id: string) => `assets/destinations/${id}.jpg`
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export const baliNusaExtraDestinations: Destination[] = [
  {
    id: slug("Pura Tirta Empul"), title: "Pura Tirta Empul", city: "Gianyar", province: "Bali", region: "Bali & Nusa Tenggara", category: "religi",
    description: "Situs suci peninggalan Kerajaan Warmadewa abad ke-10 yang terkenal dengan mata air suci Tampaksiring. Panduan audio menuntun pengunjung memahami tata cara ritual Melukat serta legenda pahlawan Mayadenawa dan Dewa Indra.",
    image: img(slug("Pura Tirta Empul")), price: "Rp 50.000", rating: 4.8, duration: "1.5-2 Jam", listeners: "4.2k", isPopular: true,
  },
  {
    id: slug("Museum Puri Lukisan"), title: "Museum Puri Lukisan", city: "Gianyar", province: "Bali", region: "Bali & Nusa Tenggara", category: "museum",
    description: "Museum seni tertua di Bali yang digagas oleh Rudolf Bonnet dan Cokorda Gde Agung Sukawati untuk melestarikan seni rupa Bali. Audio guide menceritakan evolusi seni lukis Bali dari gaya wayang Klasik Kamasan hingga gaya Ubud modern.",
    image: img(slug("Museum Puri Lukisan")), price: "Rp 75.000", rating: 4.7, duration: "1-2 Jam", listeners: "2.1k",
  },
  {
    id: slug("Desa Tenganan Pegringsingan"), title: "Desa Adat Tenganan Pegringsingan", city: "Karangasem", province: "Bali", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Permukiman suku Bali Aga yang memegang teguh adat purba, terkenal akan ritual perang pandan dan kain tenun ikat ganda Gringsing. Audio mengupas sosiologi desa serta filosofi tata ruang permukiman berdasarkan hukum adat kuno.",
    image: img(slug("Desa Tenganan Pegringsingan")), price: "Rp 20.000", rating: 4.7, duration: "2-3 Jam", listeners: "3.5k", isPopular: true,
  },
  {
    id: slug("Candi Gunung Kawi"), title: "Situs Candi Gunung Kawi", city: "Gianyar", province: "Bali", region: "Bali & Nusa Tenggara", category: "candi",
    description: "Kompleks candi megah abad ke-11 yang dipahat langsung di tebing batu cadas tepi Sungai Pakerisan. Narasi audio memandu menelusuri kisah Dinasti Udayana dan fungsi monumen peringatan raja-raja Bali kuno.",
    image: img(slug("Candi Gunung Kawi")), price: "Rp 50.000", rating: 4.8, duration: "2 Jam", listeners: "3.1k", isPopular: true,
  },
  {
    id: slug("Desa Trunyan"), title: "Desa Adat Trunyan", city: "Bangli", province: "Bali", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Desa Bali Aga di tepi Danau Batur dengan tradisi pemakaman Mepasah di mana jenazah diletakkan di atas tanah di bawah pohon Taru Menyan. Panduan audio memberikan wawasan mendalam mengenai pandangan hidup dan penghormatan leluhur.",
    image: img(slug("Desa Trunyan")), price: "Rp 100.000", rating: 4.4, duration: "2-3 Jam", listeners: "2.8k", isPopular: true,
  },
  {
    id: slug("Puri Agung Ubud"), title: "Puri Agung Ubud", city: "Gianyar", province: "Bali", region: "Bali & Nusa Tenggara", category: "sejarah",
    description: "Kediaman resmi keluarga bangsawan Ubud yang berdiri sejak abad ke-19 dan menjadi pusat diplomasi budaya Bali. Audio guide membawa wisatawan melintasi sejarah diplomasi seni, arsitektur ukiran tradisional, dan pementasan tari Bali.",
    image: img(slug("Puri Agung Ubud")), price: "Gratis", rating: 4.6, duration: "1 Jam", listeners: "5.6k", isPopular: true,
  },
  {
    id: slug("Taman Ujung Sukasada"), title: "Taman Ujung Sukasada", city: "Karangasem", province: "Bali", region: "Bali & Nusa Tenggara", category: "sejarah",
    description: "Istana air peninggalan Raja Karangasem I Gusti Bagus Jelantik yang memadukan arsitektur tradisional Bali, Eropa, dan Tionghoa. Audio menceritakan sejarah peristirahatan kerajaan, teknik tata air antik, dan masa kejayaan Kesultanan Karangasem.",
    image: img(slug("Taman Ujung Sukasada")), price: "Rp 50.000", rating: 4.7, duration: "1.5-2 Jam", listeners: "2.9k",
  },
  {
    id: slug("Museum Le Mayeur"), title: "Museum Le Mayeur", city: "Denpasar", province: "Bali", region: "Bali & Nusa Tenggara", category: "museum",
    description: "Kediaman bersejarah pelukis asal Belgia Adrien-Jean Le Mayeur dan istrinya, penari legendaris Ni Pollok di Pantai Sanur. Audio menguraikan romantisme sejarah seni kolonial Bali dan pelestarian lukisan impressionis di atas kanvas dan pelepah pisang.",
    image: img(slug("Museum Le Mayeur")), price: "Rp 20.000", rating: 4.5, duration: "1 Jam", listeners: "1.4k",
  },
  {
    id: slug("Pura Luhur Batukaru"), title: "Pura Luhur Batukaru", city: "Tabanan", province: "Bali", region: "Bali & Nusa Tenggara", category: "religi",
    description: "Salah satu Pura Sad Kahyangan di lereng Gunung Batukaru yang diselimuti hutan hujan lebat dan suasana mistis penenangan jiwa. Panduan audio menjelaskan filosofi kosmologi Hindu Bali, perlindungan alam bawah gunung, serta arsitektur Meru bertingkat.",
    image: img(slug("Pura Luhur Batukaru")), price: "Rp 40.000", rating: 4.8, duration: "1.5 Jam", listeners: "1.9k",
  },
  {
    id: slug("Pura Goa Gajah"), title: "Pura Goa Gajah", city: "Gianyar", province: "Bali", region: "Bali & Nusa Tenggara", category: "candi",
    description: "Situs arkeologi abad ke-11 berupa gua pertapaan dengan ukiran wajah Boma menyeramkan di mulut gua. Panduan audio menjelaskan akulturasi budaya Hindu-Buddha kuno serta pertapaan rahib di bantaran sungai Petanu.",
    image: img(slug("Pura Goa Gajah")), price: "Rp 50.000", rating: 4.6, duration: "1-1.5 Jam", listeners: "3.8k", isPopular: true,
  },
  {
    id: slug("Museum Rudana"), title: "Museum Rudana", city: "Gianyar", province: "Bali", region: "Bali & Nusa Tenggara", category: "museum",
    description: "Museum seni rupa modern dan klasik yang dirancang berlandaskan filosofi Tri Hita Karana dalam tata ruang bangunannya. Audio membawa pengunjung menyelami ribuan karya seni lukis maestro Bali serta perupa ternama Indonesia.",
    image: img(slug("Museum Rudana")), price: "Rp 50.000", rating: 4.6, duration: "1-2 Jam", listeners: "1.2k",
  },
  {
    id: slug("Penglipuran Ekstra"), title: "Desa Wisata Penglipuran", city: "Bangli", province: "Bali", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Desa adat terbersih di dunia yang mempertahankan arsitektur bambu seragam dan tata letak berlandaskan kosmologi Konsep Sanga Mandala. Audio mengarahkan pengunjung memahami keteraturan sosial dan kearifan lingkungan Bali Tradisional.",
    image: img(slug("Penglipuran Ekstra")), price: "Rp 25.000", rating: 4.9, duration: "2 Jam", listeners: "6.2k", isPopular: true,
  },
  {
    id: slug("Pura Kehen"), title: "Pura Kehen", city: "Bangli", province: "Bali", region: "Bali & Nusa Tenggara", category: "religi",
    description: "Pura kuno kerajaan Bangli dengan pelinggih tumpang sebelas yang dibangun bertingkat di lereng bukit dengan beringin tua raksasa. Audio menceritakan manuskrip prasasti tembaga abad ke-9 dan ritual keagamaan suci Bangli.",
    image: img(slug("Pura Kehen")), price: "Rp 30.000", rating: 4.7, duration: "1-1.5 Jam", listeners: "1.6k",
  },
  {
    id: slug("Museum Gedong Kirtya"), title: "Museum Gedong Kirtya", city: "Buleleng", province: "Bali", region: "Bali & Nusa Tenggara", category: "museum",
    description: "Museum manuskrip lontar satu-satunya di dunia yang menyimpan ribuan dokumen sejarah, babad, mantra, dan sastra Jawa Kuno-Bali. Audio menguraikan tradisi naskah lontar, proses pembuatan daun lontar, dan warisan literasi Nusantara.",
    image: img(slug("Museum Gedong Kirtya")), price: "Rp 15.000", rating: 4.6, duration: "1-1.5 Jam", listeners: "1.1k",
  },
  {
    id: slug("Taman Kertha Gosa"), title: "Taman Kertha Gosa", city: "Klungkung", province: "Bali", region: "Bali & Nusa Tenggara", category: "sejarah",
    description: "Bale Pengadilan Kerajaan Klungkung dengan ceiling khas lukisan wayang Kamasan yang menggambarkan hukum karma dan alam akhirat. Panduan audio membedah kisah-kisah moral epik Sutasoma dan Bhima Swarga pada langit-langit bangunan.",
    image: img(slug("Taman Kertha Gosa")), price: "Rp 50.000", rating: 4.7, duration: "1-1.5 Jam", listeners: "2.4k",
  },
  {
    id: slug("Kaldera Batur UNESCO"), title: "Kawasan Kaldera Batur UNESCO Geopark", city: "Bangli", province: "Bali", region: "Bali & Nusa Tenggara", category: "alam",
    description: "Kawasan bentang alam vulkanik purba yang memadukan keindahan Danau Batur dengan sistem kebudayaan air Subak Bali Aga. Audio mengulas pembentukan geologis kaldera raksasa, legenda Gunung Batur, dan mitos Dewi Danu.",
    image: img(slug("Kaldera Batur UNESCO")), price: "Rp 30.000", rating: 4.8, duration: "3-4 Jam", listeners: "4.5k", isPopular: true,
  },
  {
    id: slug("Istana Dalam Loka"), title: "Istana Dalam Loka", city: "Sumbawa", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "sejarah",
    description: "Istana kayu panggung terbesar di dunia peninggalan Kesultanan Sumbawa yang dibangun bertumpang 99 tiang tanpa paku besi. Panduan audio mengupas nilai filosofi Islam Asmaul Husna, arsitektur kayu anti-gempa, dan sejarah Dinasti Dewa Dalam Bawa.",
    image: img(slug("Istana Dalam Loka")), price: "Rp 15.000", rating: 4.7, duration: "1-2 Jam", listeners: "1.5k",
  },
  {
    id: slug("Desa Adat Sade"), title: "Desa Adat Sade", city: "Lombok Tengah", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Permukiman suku Sasak Asli yang mempertahankan bale tani berbahan bambu dan kotoran kerbau sebagai pembersih lantai. Audio memandu pengunjung memahami kearifan lokal, tradisi kawin lari (Merarik), dan seni tenun ikat Sasak.",
    image: img(slug("Desa Adat Sade")), price: "Rp 20.000", rating: 4.7, duration: "1.5-2 Jam", listeners: "5.1k", isPopular: true,
  },
  {
    id: slug("Museum NTB Mataram"), title: "Museum Negeri Nusa Tenggara Barat", city: "Mataram", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "museum",
    description: "Pusat penyimpanan benda bersejarah suku Sasak, Samawa, dan Mbojo yang mengoleksi ribuan naskah lontar dan mahkota kerajaan. Audio menuntun analisis etnografi, perhiasan emas Sultan Sumbawa, dan naskah kuno Monyeh.",
    image: img(slug("Museum NTB Mataram")), price: "Rp 10.000", rating: 4.6, duration: "1.5 Jam", listeners: "1.3k",
  },
  {
    id: slug("Pura Lingsar"), title: "Pura Lingsar", city: "Lombok Barat", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "religi",
    description: "Simbol keharmonisan dan kerukunan agama Hindu Bali dan penganut Sasak Waktu Telu di Lombok yang dibangun abad ke-18. Audio memandu sejarah Ritual Perang Topat serta penghormatan pada kemunculan belut suci Kemaliq.",
    image: img(slug("Pura Lingsar")), price: "Rp 15.000", rating: 4.6, duration: "1-1.5 Jam", listeners: "2.2k",
  },
  {
    id: slug("Taman Mayura"), title: "Taman Mayura", city: "Mataram", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "sejarah",
    description: "Kompleks istana dan taman air peninggalan Kerajaan Singasari Karangasem Lombok tahun 1744. Panduan audio menerangkan bale mengapung Bale Kambang yang dahulu menjadi balai peradilan istana dan pertemuan rahasia raja.",
    image: img(slug("Taman Mayura")), price: "Rp 15.000", rating: 4.5, duration: "1 Jam", listeners: "1.7k",
  },
  {
    id: slug("Desa Ende Sasak"), title: "Desa Adat Ende Sasak", city: "Lombok Tengah", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Kampung adat Sasak yang asri dengan gaya hidup tradisional tanpa listrik berlebihan dan melestarikan tarian petarung Peresean. Audio menceritakan sejarah perlawanan prajurit Sasak dan ritual memanggil hujan (Presean).",
    image: img(slug("Desa Ende Sasak")), price: "Rp 20.000", rating: 4.7, duration: "1.5-2 Jam", listeners: "2.6k",
  },
  {
    id: slug("Taman Narmada"), title: "Taman Narmada", city: "Lombok Barat", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "sejarah",
    description: "Istana replika Puncak Gunung Rinjani dan Danau Segara Anak yang dibangun Raja Anak Agung Ngurah Karangasem pada 1727. Audio menguraikan sumber mata air awet muda dan ritual Pujawali Kerajaan.",
    image: img(slug("Taman Narmada")), price: "Rp 25.000", rating: 4.6, duration: "1.5-2 Jam", listeners: "3.3k", isPopular: true,
  },
  {
    id: slug("Bayan Beleq"), title: "Desa Adat Bayan Beleq", city: "Lombok Utara", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Pusat peradaban tertua di Lombok Utara yang menyimpan Masjid Kuno Bayan Beleq berbahan rumbia sejak abad ke-16. Audio menguraikan proses awal masuknya Islam di Pulau Lombok melalui sintesis ajaran adat lokal.",
    image: img(slug("Bayan Beleq")), price: "Rp 15.000", rating: 4.7, duration: "1-1.5 Jam", listeners: "1.8k",
  },
  {
    id: slug("Desa Sukarara"), title: "Desa Tenun Sukarara", city: "Lombok Tengah", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Desa penghasil kain tenun Songket Sasak dengan motif khas seperti Subahnale dan Keker. Panduan audio menjelaskan filosofi wanita Sasak yang wajib pandai menenun sebelum menikah serta proses pewarnaan alami tenun.",
    image: img(slug("Desa Sukarara")), price: "Rp 10.000", rating: 4.7, duration: "1.5 Jam", listeners: "2.9k",
  },
  {
    id: slug("Museum Asi Mbojo"), title: "Museum Asi Mbojo", city: "Bima", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "museum",
    description: "Bekas Istana Kesultanan Bima bergaya arsitektur gabungan Eropa dan Bima yang menyimpan mahkota emas dan perlengkapan perang kerajaan. Audio membawa wisatawan menyelami jejak Kesultanan Bima di ujung utara pulau Sumbawa.",
    image: img(slug("Museum Asi Mbojo")), price: "Rp 10.000", rating: 4.6, duration: "1-1.5 Jam", listeners: "1.2k",
  },
  {
    id: slug("Pura Suranadi"), title: "Pura Suranadi", city: "Lombok Barat", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "religi",
    description: "Salah satu pura tertua di Lombok yang didirikan oleh Dang Hyang Nirartha pada abad ke-16 dengan lima sumber mata air suci. Panduan audio menerangkan kisah perjalanan suci pendeta Dang Hyang Nirartha dan ekosistem hutan lindung pemangku pura.",
    image: img(slug("Pura Suranadi")), price: "Rp 15.000", rating: 4.6, duration: "1-2 Jam", listeners: "1.4k",
  },
  {
    id: slug("Desa Senaru"), title: "Desa Adat Senaru Tradisional", city: "Lombok Utara", province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Dusun adat Sasak kuno di kaki Gunung Rinjani yang berdiri sejak letusan gunung purba Samalas 1257. Audio mengupas arsitektur Karang Bajo, hubungan spiritual warga dengan Rinjani, serta sistem adat penjaga hutan.",
    image: img(slug("Desa Senaru")), price: "Rp 20.000", rating: 4.7, duration: "1.5-2 Jam", listeners: "2.1k",
  },
  {
    id: slug("Kampung Adat Bena Ekstra"), title: "Kampung Adat Bena", city: "Ngada", province: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Kampung berundak megalitikum di kaki Gunung Inerie yang telah berdiri lebih dari 1.200 tahun. Panduan audio menjelaskan struktur sosial matrilinear, batu dolmen menhir sakral, serta simbolisme Ngadhu dan Bhaga.",
    image: img(slug("Kampung Adat Bena Ekstra")), price: "Rp 25.000", rating: 4.9, duration: "2-3 Jam", listeners: "4.8k", isPopular: true,
  },
  {
    id: slug("Wae Rebo Ekstra"), title: "Desa Adat Wae Rebo", city: "Manggarai Barat", province: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Desa adat terpencil di atas pegunungan Flores yang terkenal dengan 7 rumah kerucut bertingkat Mbaru Niang peraih penghargaan UNESCO. Audio menuntun kisah asal-usul suku Manggarai, ritual Waelu, dan filosofi hidup menyatu dengan alam.",
    image: img(slug("Wae Rebo Ekstra")), price: "Rp 325.000", rating: 4.9, duration: "4-5 Jam", listeners: "5.9k", isPopular: true,
  },
  {
    id: slug("Kampung Ratenggaro"), title: "Kampung Adat Ratenggaro", city: "Sumba Barat Daya", province: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Desa adat Sumba di muara sungai dengan rumah Uma Kelada menara tinggi menjulang 15 meter dan ratusan kubur batu megalitikum. Audio menjelaskan tradisi Marapu, struktur makam batu kuno, dan ritual Pasola.",
    image: img(slug("Kampung Ratenggaro")), price: "Rp 50.000", rating: 4.8, duration: "2 Jam", listeners: "3.7k", isPopular: true,
  },
  {
    id: slug("Museum NTT Kupang"), title: "Museum Daerah Nusa Tenggara Timur", city: "Kupang", province: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara", category: "museum",
    description: "Museum provinsi yang menyimpan ribuan fosil purbakala, artefak perunggu, kain tenun dari 22 kabupaten di NTT, serta fosil Homo Floresiensis. Panduan audio memamerkan narasi prasejarah dan kekayaan kriya tenun Flobamora.",
    image: img(slug("Museum NTT Kupang")), price: "Rp 10.000", rating: 4.5, duration: "1-2 Jam", listeners: "1.1k",
  },
  {
    id: slug("Kampung Prai Ijing"), title: "Kampung Adat Prai Ijing", city: "Sumba Barat", province: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Perkampungan megalitikum di lereng perbukitan Waikabubak yang memiliki jajaran rumah panggung Uma Bokulu dan sarkofagus batu. Audio menceritakan pembagian tingkat rumah berlandaskan konsep spiritual leluhur Marapu.",
    image: img(slug("Kampung Prai Ijing")), price: "Rp 50.000", rating: 4.8, duration: "1.5-2 Jam", listeners: "2.8k",
  },
  {
    id: slug("Liang Bua"), title: "Situs Arkeologi Liang Bua", city: "Manggarai", province: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara", category: "sejarah",
    description: "Gua kapur raksasa tempat ditemukannya fosil manusia purba berukuran kerdil Homo Floresiensis (The Hobbit) yang mengguncang dunia arkeologi. Audio menceritakan proses ekskavasi ilmiah dan evolusi prasejarah pulau Flores.",
    image: img(slug("Liang Bua")), price: "Rp 20.000", rating: 4.6, duration: "1.5-2 Jam", listeners: "2.3k",
  },
  {
    id: slug("Kampung Koanara"), title: "Kampung Adat Bena-Gurugina Koanara", city: "Ende", province: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara", category: "desa-adat",
    description: "Situs perkampungan tradisional di kaki Kelimutu tempat persemayaman lumbung adat dan Rumah Baku penyimpanan jenazah 13 generasi. Panduan audio menerangkan tradisi penghormatan arwah leluhur suku Lio Ende.",
    image: img(slug("Kampung Koanara")), price: "Rp 20.000", rating: 4.6, duration: "1-1.5 Jam", listeners: "1.4k",
  },
  {
    id: slug("Rumah Pengasingan Bung Karno Ende"), title: "Rumah Pengasingan Bung Karno Ende", city: "Ende", province: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara", category: "sejarah",
    description: "Situs bersejarah tempat Soekarno diasingkan oleh Pemerintah Kolonial Belanda (1934-1938) tempat lahirnya pemikiran Pancasila di bawah pohon sukun. Audio membawakan naskah sejarah perenungan kebangsaan sang proklamator.",
    image: img(slug("Rumah Pengasingan Bung Karno Ende")), price: "Rp 15.000", rating: 4.8, duration: "1-1.5 Jam", listeners: "3.2k", isPopular: true,
  },
]