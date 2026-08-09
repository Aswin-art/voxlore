import type { Destination } from "../types"

const img = (id: string) => `assets/destinations/${id}.jpg`
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export const kalimantanExtraDestinations: Destination[] = [
  {
    id: slug("Rumah Radakng Pontianak"), title: "Rumah Radakng Pontianak", city: "Pontianak", province: "Kalimantan Barat", region: "Kalimantan", category: "desa-adat",
    description: "Rumah betang Dayak terbesar di Indonesia yang menjadi landmark kebanggaan Kalimantan Barat. Panduan audio mengulas arsitektur tiang tinggi, simbolisme ornamen ukiran Dayak Kanayatn, serta fungsi sosialnya sebagai pusat festival adat Gawai Dayak.",
    image: img(slug("Rumah Radakng Pontianak")), price: "Rp 10.000", rating: 4.7, duration: "1-2 Jam", listeners: "2.400", isPopular: true,
  },
  {
    id: slug("Keraton Kadriyah Pontianak"), title: "Keraton Kadriyah Kesultanan Pontianak", city: "Pontianak", province: "Kalimantan Barat", region: "Kalimantan", category: "sejarah",
    description: "Istana kayu belian bersejarah bentukan Syarif Abdurrahman Alkadrie di muara Sungai Kapuas dan Landak. Audio memandu pengunjung menelusuri benda pusaka peninggalan sultan, silsilah kesultanan Melayu, serta meriam kuno peninggalan Prancis dan Belanda.",
    image: img(slug("Keraton Kadriyah Pontianak")), price: "Rp 15.000", rating: 4.6, duration: "1-2 Jam", listeners: "1.800", isPopular: true,
  },
  {
    id: slug("Museum Kapuas Raya Sintang"), title: "Museum Kapuas Raya Sintang", city: "Sintang", province: "Kalimantan Barat", region: "Kalimantan", category: "museum",
    description: "Museum kebudayaan terkemuka yang merekam jejak tiga kebudayaan besar pedalaman Kapuas: Melayu, Dayak, dan Tionghoa. Pemandu audio menyingkap kisah tenun ikat adat, koleksi etnografi pedalaman, dan sejarah pendirian Sintang.",
    image: img(slug("Museum Kapuas Raya Sintang")), price: "Rp 10.000", rating: 4.5, duration: "1-2 Jam", listeners: "950",
  },
  {
    id: slug("Desa Ensaid Panjang"), title: "Desa Budaya Ensaid Panjang", city: "Sintang", province: "Kalimantan Barat", region: "Kalimantan", category: "desa-adat",
    description: "Desa adat Dayak Desa yang terkenal sebagai pusat pelestarian tenun ikat tradisional pewarna alami. Audio menceritakan filosofi motif tenun peninggalan leluhur, tradisi menenun para wanita suku Dayak, dan ritme kehidupan di rumah betang panjang.",
    image: img(slug("Desa Ensaid Panjang")), price: "Rp 20.000", rating: 4.8, duration: "2-3 Jam", listeners: "1.100",
  },
  {
    id: slug("Museum Provinsi Kalbar"), title: "Museum Provinsi Kalimantan Barat", city: "Pontianak", province: "Kalimantan Barat", region: "Kalimantan", category: "museum",
    description: "Pusat artefak terlengkap yang menyimpan keramik kuno, pakaian adat, miniatur rumah betang, serta benda spiritual Dayak dan Melayu. Narasi audio mendampingi penelusuran galeri arkeologi, kerajinan keramik, dan tradisi maritim Kapuas.",
    image: img(slug("Museum Provinsi Kalbar")), price: "Rp 5.000", rating: 4.5, duration: "1-2 Jam", listeners: "1.500",
  },
  {
    id: slug("Keraton Ismahayana Landak"), title: "Keraton Ismahayana Landak", city: "Landak", province: "Kalimantan Barat", region: "Kalimantan", category: "sejarah",
    description: "Istana kesultanan Melayu kuno di Ngabang yang merekam hubungan erat kerajaan Melayu pedalaman dengan suku Dayak. Audio membeberkan kisah mahkota kerajaan, barang-barang kerajaan, serta tradisi tumpang negeri yang digelar tahunan.",
    image: img(slug("Keraton Ismahayana Landak")), price: "Gratis", rating: 4.4, duration: "1-2 Jam", listeners: "720",
  },
  {
    id: slug("Rumah Betang Sahapm"), title: "Rumah Betang Sahapm", city: "Landak", province: "Kalimantan Barat", region: "Kalimantan", category: "desa-adat",
    description: "Rumah betang asli suku Dayak Kanayatn berusia lebih dari satu abad yang masih dihuni puluhan kepala keluarga. Narasi audio mengajak pendengar menyusuri keaslian arsitektur kayu belian murni dan aturan adat kehidupan bersama di betang.",
    image: img(slug("Rumah Betang Sahapm")), price: "Rp 15.000", rating: 4.7, duration: "1-2 Jam", listeners: "1.300",
  },
  {
    id: slug("Keraton Amantubillah Mempawah"), title: "Keraton Amantubillah Mempawah", city: "Mempawah", province: "Kalimantan Barat", region: "Kalimantan", category: "sejarah",
    description: "Keraton bersejarah Kesultanan Mempawah berbalut warna hijau keputihan di tepi sungai. Audio memaparkan silsilah Opu Daeng Manambon, sejarah percampuran Bugis-Melayu di Kalbar, serta ritual adat Robok-Robok.",
    image: img(slug("Keraton Amantubillah Mempawah")), price: "Rp 10.000", rating: 4.5, duration: "1-2 Jam", listeners: "880",
  },
  {
    id: slug("Betung Kerihun Ekstra"), title: "Taman Nasional Betung Kerihun", city: "Kapuas Hulu", province: "Kalimantan Barat", region: "Kalimantan", category: "alam",
    description: "Kawasan konservasi bentang alam jantung Kalimantan dengan keanekaragaman hayati dan hulu sungai purba. Audio mengedukasi wisatawan mengenai ekosistem hutan hujan tropis, serta kearifan lokal Dayak Iban dan Punan dalam menjaga hutan.",
    image: img(slug("Betung Kerihun Ekstra")), price: "Rp 25.000", rating: 4.8, duration: "3-4 Jam", listeners: "650",
  },
  {
    id: slug("Gunung Palung"), title: "Taman Nasional Gunung Palung", city: "Kayong Utara", province: "Kalimantan Barat", region: "Kalimantan", category: "alam",
    description: "Habitat alami orangutan Kalimantan yang membentang dari ekosistem mangrove hingga hutan pegunungan. Panduan audio memberikan wawasan edukatif mengenai riset primata, vegetasi flora langka, serta pentingnya perlindungan koridor satwa liar.",
    image: img(slug("Gunung Palung")), price: "Rp 15.000", rating: 4.6, duration: "2-3 Jam", listeners: "920",
  },
  {
    id: slug("Museum Balanga"), title: "Museum Balanga Palangka Raya", city: "Palangka Raya", province: "Kalimantan Tengah", region: "Kalimantan", category: "museum",
    description: "Museum etnografi terlengkap yang mendokumentasikan daur hidup suku Dayak Ngaju mulai dari kelahiran hingga kematian. Audio menguraikan ritual Tiwah, simbolisme guci tajau kuno, ukiran belanga, serta perkakas berburu tradisional.",
    image: img(slug("Museum Balanga")), price: "Rp 10.000", rating: 4.6, duration: "1-2 Jam", listeners: "1.900", isPopular: true,
  },
  {
    id: slug("Betang Pasir Panjang"), title: "Rumah Betang Pasir Panjang", city: "Kotawaringin Barat", province: "Kalimantan Tengah", region: "Kalimantan", category: "desa-adat",
    description: "Rumah betang megah suku Dayak Tamuan yang menjadi pusat aktivitas seni tari dan ritus budaya di Pangkalan Bun. Panduan audio mengulas arsitektur kayu, struktur tiang penyangga, dan falsafah hidup 'Huma Betang' yang toleran.",
    image: img(slug("Betang Pasir Panjang")), price: "Rp 15.000", rating: 4.6, duration: "1-2 Jam", listeners: "1.400",
  },
  {
    id: slug("Istana Kuning Kutawaringin"), title: "Istana Kuning Kesultanan Kutawaringin", city: "Kotawaringin Barat", province: "Kalimantan Tengah", region: "Kalimantan", category: "sejarah",
    description: "Satu-satunya keraton kerajaan Melayu Islam di Kalimantan Tengah yang dibangun dari kayu ulin tanpa paku logam. Narasi audio membimbing pengunjung mengagumi gerbang beratap tumpang, peninggalan meriam, dan sejarah kesultanan pecahan Banjar ini.",
    image: img(slug("Istana Kuning Kutawaringin")), price: "Rp 10.000", rating: 4.5, duration: "1-2 Jam", listeners: "1.650", isPopular: true,
  },
  {
    id: slug("Tanjung Puting Ekstra"), title: "Taman Nasional Tanjung Puting", city: "Kotawaringin Barat", province: "Kalimantan Tengah", region: "Kalimantan", category: "alam",
    description: "Pusat rehabilitasi orangutan dunia di Camp Leakey yang tersohor. Audio edukatif menyajikan sejarah konservasi Birute Galdikas, ekosistem sungai gambut hitam, serta perlindungan satwa endemik Kalimantan.",
    image: img(slug("Tanjung Puting Ekstra")), price: "Rp 50.000", rating: 4.9, duration: "3-4 Jam", listeners: "3.500", isPopular: true,
  },
  {
    id: slug("Sandung Ngaju Tumbang Malahoi"), title: "Situs Budaya Sandung Ngaju", city: "Gunung Mas", province: "Kalimantan Tengah", region: "Kalimantan", category: "religi",
    description: "Kompleks pemakaman adat Dayak Kaharingan yang berisi sandung (rumah tulang) berukir indah. Panduan audio menjelaskan konsep kosmologi Kaharingan tentang alam atas dan bawah serta tata cara upacara penyempurnaan jiwa (Tiwah).",
    image: img(slug("Sandung Ngaju Tumbang Malahoi")), price: "Rp 10.000", rating: 4.5, duration: "1-2 Jam", listeners: "780",
  },
  {
    id: slug("Desa Tumbang Manggu"), title: "Desa Adat Tumbang Manggu", city: "Katingan", province: "Kalimantan Tengah", region: "Kalimantan", category: "desa-adat",
    description: "Desa bersejarah lokasi Perjanjian Tumbang Anoi 1894 yang menghentikan tradisi mengayau (penggal kepala) di seluruh Kalimantan. Audio mengisahkan jalannya rapat akbar suku Dayak dan tonggak peradaban damai antar-subsuku.",
    image: img(slug("Desa Tumbang Manggu")), price: "Rp 15.000", rating: 4.6, duration: "2-3 Jam", listeners: "950",
  },
  {
    id: slug("Sebangau Ekstra"), title: "Taman Nasional Sebangau", city: "Pulang Pisau", province: "Kalimantan Tengah", region: "Kalimantan", category: "alam",
    description: "Ekosistem rawa gambut terluas yang menjadi rumah bagi ribuan orangutan liar dan bekantan. Audio memberikan pemahaman mendalam tentang tata air gambut, pencegahan karhutla, dan pentingnya menjaga paru-paru dunia.",
    image: img(slug("Sebangau Ekstra")), price: "Rp 20.000", rating: 4.7, duration: "2-3 Jam", listeners: "1.200",
  },
  {
    id: slug("Betang Damang Batu"), title: "Rumah Betang Damang Batu", city: "Gunung Mas", province: "Kalimantan Tengah", region: "Kalimantan", category: "sejarah",
    description: "Situs cagar budaya bekas tempat berlangsungnya rapat perdamaian adat Dayak se-Kalimantan tahun 1894. Narasi audio mengungkap peninggalan barang antik, struktur kayu tua betang, dan amanat tetua adat untuk persatuan Dayak.",
    image: img(slug("Betang Damang Batu")), price: "Rp 10.000", rating: 4.4, duration: "1-2 Jam", listeners: "620",
  },
  {
    id: slug("Museum Lambung Mangkurat"), title: "Museum Lambung Mangkurat", city: "Banjarbaru", province: "Kalimantan Selatan", region: "Kalimantan", category: "museum",
    description: "Museum kebudayaan Banjar terbesar bergaya arsitektur Rumah Bubungan Tinggi. Pemandu audio menerangkan koleksi batu nisan kuno, mahkota Kesultanan Banjar, kitab tajusalatin, dan benda etnografi suku Dayak Bukit.",
    image: img(slug("Museum Lambung Mangkurat")), price: "Rp 5.000", rating: 4.6, duration: "1-2 Jam", listeners: "2.100", isPopular: true,
  },
  {
    id: slug("Candi Agung Amuntai"), title: "Candi Agung Amuntai", city: "Hulu Sungai Utara", province: "Kalimantan Selatan", region: "Kalimantan", category: "candi",
    description: "Situs percandian Hindu kuno peninggalan Kerajaan Negara Dipa dari abad ke-14 yang terbuat dari susunan bata merah. Audio menelusuri legenda Pangeran Suryanata, Putri Junjung Buih, serta temuan tiang kayu ulin purba di lokasi situs.",
    image: img(slug("Candi Agung Amuntai")), price: "Rp 10.000", rating: 4.5, duration: "1-2 Jam", listeners: "1.750", isPopular: true,
  },
  {
    id: slug("Candi Laras Margasari"), title: "Candi Laras Margasari", city: "Tapin", province: "Kalimantan Selatan", region: "Kalimantan", category: "candi",
    description: "Situs peninggalan Hindu prapemerintahan Islam di Tanah Banjar yang mengindikasikan jejak Kerajaan Negara Daha. Audio menarasikan arca Buddha Dipangkara serta struktur landasan candi bata yang mengapung di kawasan rawa.",
    image: img(slug("Candi Laras Margasari")), price: "Rp 5.000", rating: 4.2, duration: "1 jam", listeners: "680",
  },
  {
    id: slug("Masjid Sultan Suriansyah"), title: "Makam & Masjid Sultan Suriansyah", city: "Banjarmasin", province: "Kalimantan Selatan", region: "Kalimantan", category: "religi",
    description: "Kompleks pemakaman dan masjid tertua di Kalsel tempat bersemayamnya raja Banjar pertama yang memeluk Islam. Narasi audio membawa pengunjung menelusuri arsitektur tumpang tiga khas Banjar dan sejarah masuknya Islam di Kuin.",
    image: img(slug("Masjid Sultan Suriansyah")), price: "Gratis", rating: 4.7, duration: "1-2 Jam", listeners: "2.300", isPopular: true,
  },
  {
    id: slug("Makam Syekh Arsyad Al-Banjari"), title: "Makam Syekh Muhammad Arsyad Al-Banjari", city: "Banjar", province: "Kalimantan Selatan", region: "Kalimantan", category: "religi",
    description: "Pusat ziarah keagamaan terbesar tempat persemayaman pengarang kitab Sabilal Muhtadin yang tersohor di Asia Tenggara. Audio menceritakan perjalanan ilmu Syekh Arsyad ke Makkah, pemikirannya, dan pengaruh besarnya bagi Banjar.",
    image: img(slug("Makam Syekh Arsyad Al-Banjari")), price: "Gratis", rating: 4.8, duration: "1-2 Jam", listeners: "3.100", isPopular: true,
  },
  {
    id: slug("Dayak Meratus Loksado"), title: "Desa Adat Dayak Meratus Loksado", city: "Hulu Sungai Selatan", province: "Kalimantan Selatan", region: "Kalimantan", category: "desa-adat",
    description: "Kawasan pemukiman suku Dayak Meratus yang mempertahankan balai adat dan ritual Aruh Ganal. Audio menerangkan keharmonisan masyarakat adat dengan Pegunungan Meratus, kearifan pertanian ladang gilir, serta navigasi rakit bambu.",
    image: img(slug("Dayak Meratus Loksado")), price: "Rp 20.000", rating: 4.7, duration: "2-3 Jam", listeners: "1.850", isPopular: true,
  },
  {
    id: slug("Benteng Madang"), title: "Benteng Madang", city: "Hulu Sungai Selatan", province: "Kalimantan Selatan", region: "Kalimantan", category: "sejarah",
    description: "Benteng pertahanan kayu Ulin milik pejuang Perang Banjar di puncak bukit yang dipimpin Pangeran Antasari. Pemandu audio mengisahkan strategi taktik gerilya rakyat Banjar menahan gempuran serdadu kolonial Belanda.",
    image: img(slug("Benteng Madang")), price: "Rp 5.000", rating: 4.3, duration: "1-2 Jam", listeners: "540",
  },
  {
    id: slug("Pendulangan Intan Cempaka"), title: "Pendulangan Intan Cempaka", city: "Banjarbaru", province: "Kalimantan Selatan", region: "Kalimantan", category: "alam",
    description: "Lokasi tambang tradisional berusia ratusan tahun tempat penemuan intan raksasa 'Trisakti'. Narasi audio menjelaskan teknik tradisional mendulang dengan emping, geologi batuan intan, serta riwayat hidup para pendulang.",
    image: img(slug("Pendulangan Intan Cempaka")), price: "Rp 10.000", rating: 4.4, duration: "1-2 Jam", listeners: "1.300",
  },
  {
    id: slug("Tahura Sultan Adam"), title: "Geopark Meratus - Tahura Sultan Adam", city: "Banjar", province: "Kalimantan Selatan", region: "Kalimantan", category: "alam",
    description: "Taman hutan raya dengan hamparan batuan ofiolit purba kompleks Pegunungan Meratus dan benteng Belanda kuno. Audio mendidik pengunjung tentang keunikan taburan batuan dasar samudera purba serta flora endemik Borneo.",
    image: img(slug("Tahura Sultan Adam")), price: "Rp 15.000", rating: 4.6, duration: "2-3 Jam", listeners: "1.600",
  },
  {
    id: slug("Museum Mulawarman"), title: "Museum Mulawarman Tenggarong", city: "Kutai Kartanegara", province: "Kalimantan Timur", region: "Kalimantan", category: "museum",
    description: "Ex-istana Kesultanan Kutai Kartanegara yang menyimpan takhta berkulit kambing, perhiasan emas kerajaan, dan replika Prasasti Yupa. Audio mengarahkan pemahaman tentang sejarah kerajaan Hindu tertua di Indonesia dan dinamika kesultanan.",
    image: img(slug("Museum Mulawarman")), price: "Rp 15.000", rating: 4.7, duration: "1-2 Jam", listeners: "2.800", isPopular: true,
  },
  {
    id: slug("Prasasti Yupa Muara Kaman"), title: "Situs Prasasti Yupa Muara Kaman", city: "Kutai Kartanegara", province: "Kalimantan Timur", region: "Kalimantan", category: "sejarah",
    description: "Lokasi ditemukannya 7 tugu batu berhuruf Pallawa tulisan Sanskerta dari abad ke-4 Masehi peninggalan Raja Mulawarman. Audio menerangkan keagungan persembahan 20.000 ekor sapi dan dimulainya era sejarah tertulis di Nusantara.",
    image: img(slug("Prasasti Yupa Muara Kaman")), price: "Rp 5.000", rating: 4.4, duration: "1-2 Jam", listeners: "1.100",
  },
  {
    id: slug("Desa Budaya Pampang Ekstra"), title: "Desa Budaya Pampang", city: "Samarinda", province: "Kalimantan Timur", region: "Kalimantan", category: "desa-adat",
    description: "Pemukiman suku Dayak Kenyah yang menampilkan Lamin (rumah adat panjang) berukir megah dan atraksi seni tari tiap akhir pekan. Audio menceritakan sejarah migrasi Dayak Kenyah dari Apokayan serta tradisi telinga panjang.",
    image: img(slug("Desa Budaya Pampang Ekstra")), price: "Rp 25.000", rating: 4.6, duration: "2-3 Jam", listeners: "2.200", isPopular: true,
  },
  {
    id: slug("Makam Habib Hasbi"), title: "Makam Habib Hasbi bin Musawa", city: "Kutai Kartanegara", province: "Kalimantan Timur", region: "Kalimantan", category: "religi",
    description: "Situs ziarah sejarah Islam di pesisir Mahakam yang memperingati penyebar ajaran Islam di tanah Kutai. Narasi audio menceritakan perpaduan dakwah damai para ulama dengan adat istiadat istana Kutai.",
    image: img(slug("Makam Habib Hasbi")), price: "Gratis", rating: 4.6, duration: "1 Jam", listeners: "850",
  },
  {
    id: slug("Museum Sadurengas Paser"), title: "Museum Sadurengas Paser", city: "Paser", province: "Kalimantan Timur", region: "Kalimantan", category: "museum",
    description: "Museum berupa kediaman panggung kayu belian mantan Sultan Paser Sultan Ibrahim Khaliluddin. Audio menyingkap artefak khas Kesultanan Paser, haul al-Qur'an tulis tangan kuno, serta alat musik tradisional khas Paser.",
    image: img(slug("Museum Sadurengas Paser")), price: "Rp 5.000", rating: 4.4, duration: "1-2 Jam", listeners: "740",
  },
  {
    id: slug("Gua Liang Jon"), title: "Situs Cagar Budaya Gua Liang Jon", city: "Kutai Timur", province: "Kalimantan Timur", region: "Kalimantan", category: "sejarah",
    description: "Gua karang purba bagian dari kawasan Karst Sangkulirang-Mangkalihat yang menyimpan cap tangan merah praaksara. Pemandu audio menuturkan jejak migrasi manusia purba Austronesia dan simbolisme seni cadas berumur puluhan ribu tahun.",
    image: img(slug("Gua Liang Jon")), price: "Rp 20.000", rating: 4.8, duration: "2-3 Jam", listeners: "890",
  },
  {
    id: slug("Taman Nasional Kutai"), title: "Taman Nasional Kutai", city: "Kutai Timur", province: "Kalimantan Timur", region: "Kalimantan", category: "alam",
    description: "Kawasan konservasi hutan ulin raksasa Sangkima dan pusat habitat orangutan liar di pesisir Kaltim. Audio mengedukasi wisatawan mengenai keanekaragaman vegetasi kayu ulin yang berumur ratusan tahun dan ekosistem hutan dataran rendah.",
    image: img(slug("Taman Nasional Kutai")), price: "Rp 15.000", rating: 4.5, duration: "2-3 Jam", listeners: "1.050",
  },
  {
    id: slug("Danau Jempang Jangkat"), title: "Danau Jempang & Kampung Terapung Jangkat", city: "Kutai Barat", province: "Kalimantan Timur", region: "Kalimantan", category: "alam",
    description: "Danau dataran banjir terbesar di lembah Mahakam dengan kehidupan suku Dayak Benuaq di atas rumah rakit. Audio menceritakan ekologi danau musiman, tradisi penangkapan ikan air tawar, serta kriya ukir patung Blontang.",
    image: img(slug("Danau Jempang Jangkat")), price: "Rp 15.000", rating: 4.6, duration: "2-3 Jam", listeners: "980",
  },
  {
    id: slug("Betang Manunggal Jaya"), title: "Rumah Betang Manunggal Jaya", city: "Kutai Barat", province: "Kalimantan Timur", region: "Kalimantan", category: "desa-adat",
    description: "Rumah adat besar suku Dayak Benuaq yang memelihara tradisi kain ulap doyo dari serat daun alami. Panduan audio menerangkan filosofi tenun doyo, ritus kematian Kwangkay, dan arsitektur ukir khas Lou Benuaq.",
    image: img(slug("Betang Manunggal Jaya")), price: "Rp 15.000", rating: 4.7, duration: "1-2 Jam", listeners: "820",
  },
  {
    id: slug("Desa Setlang Malinau"), title: "Desa Budaya Setlang", city: "Malinau", province: "Kalimantan Utara", region: "Kalimantan", category: "desa-adat",
    description: "Desa adat suku Dayak Lundayeh yang mempertahankan balai adat kayu, tugu ulung (batu berukir), dan kerajinan anyaman bambu. Audio mengisahkan filosofi bertani padi adan khas pedalaman dan kearifan menjaga hutan rimba Malinau.",
    image: img(slug("Desa Setlang Malinau")), price: "Rp 15.000", rating: 4.6, duration: "1-2 Jam", listeners: "710",
  },
  {
    id: slug("Museum Kesultanan Bulungan"), title: "Museum Kesultanan Bulungan", city: "Bulungan", province: "Kalimantan Utara", region: "Kalimantan", category: "museum",
    description: "Museum peninggalan Kesultanan Bulungan di Tanjung Palas yang menyimpan sisa kemegahan istana raja Bulungan. Audio membeberkan sejarah berdirinya kerajaan Melayu-Tidung, memorabilia dinasti sultan, dan tragedi pascakemerdekaan.",
    image: img(slug("Museum Kesultanan Bulungan")), price: "Rp 10.000", rating: 4.5, duration: "1-2 Jam", listeners: "1.150", isPopular: true,
  },
  {
    id: slug("Rumah Baloy Mayo Tidung"), title: "Rumah Baloy Mayo Tidung", city: "Tarakan", province: "Kalimantan Utara", region: "Kalimantan", category: "desa-adat",
    description: "Rumah adat tradisional suku Tidung yang dibangun di atas tiang kayu ulin berukir khas pesisir Kaltara. Narasi audio mendampingi penelusuran 4 ruang utama baloy, fungsi sosial tempat musyawarah adat, dan ukiran naga pesisir.",
    image: img(slug("Rumah Baloy Mayo Tidung")), price: "Rp 10.000", rating: 4.6, duration: "1-2 Jam", listeners: "1.700", isPopular: true,
  },
  {
    id: slug("Cagar Budaya PD II Tarakan"), title: "Cagar Budaya Peninggalan PD II Tarakan", city: "Tarakan", province: "Kalimantan Utara", region: "Kalimantan", category: "sejarah",
    description: "Situs peninggalan bunker, meriam peninggalan Jepang dan Sekutu, serta kilang minyak bersejarah penarik perhatian tentara dunia. Audio membawa cerita pertempuran sengit perebutan sumber energi minyak bumi di Tarakan tahun 1942 dan 1945.",
    image: img(slug("Cagar Budaya PD II Tarakan")), price: "Rp 10.000", rating: 4.5, duration: "2-3 Jam", listeners: "1.350",
  },
  {
    id: slug("Makam Batu Lampublik"), title: "Makam Keramat Batu Lampublik", city: "Nunukan", province: "Kalimantan Utara", region: "Kalimantan", category: "religi",
    description: "Situs sejarah keagamaan dan penyebaran Islam tua di pulau Sebatik perbatasan Indonesia-Malaysia. Narasi audio menjelaskan latar belakang tokoh agama ulung pesisir dan persahabatan antar suku Tidung dan suku Dayak pedalaman.",
    image: img(slug("Makam Batu Lampublik")), price: "Gratis", rating: 4.3, duration: "1 Jam", listeners: "490",
  },
  {
    id: slug("Desa Pulau Sapi"), title: "Desa Budaya Pulau Sapi", city: "Malinau", province: "Kalimantan Utara", region: "Kalimantan", category: "desa-adat",
    description: "Desa wisata kebudayaan unggulan tempat berkumpulnya pemuda Dayak Lundayeh melestarikan musik bambu sampoton dan tarian tradisional. Audio menceritakan transformasi desa menjadi pusat diplomasi budaya perbatasan.",
    image: img(slug("Desa Pulau Sapi")), price: "Rp 20.000", rating: 4.7, duration: "2-3 Jam", listeners: "920",
  },
  {
    id: slug("Kayan Mentarang Ekstra"), title: "Taman Nasional Kayan Mentarang", city: "Malinau", province: "Kalimantan Utara", region: "Kalimantan", category: "alam",
    description: "Kawasan konservasi terbesar di Kalimantan yang menyimpan situs kearifan lokal kuburan batu megalit berusia ribuan tahun. Audio mengedukasi wisatawan mengenai jaringan kearifan tradisional Formadat dan keanekaragaman flora pedalaman.",
    image: img(slug("Kayan Mentarang Ekstra")), price: "Rp 30.000", rating: 4.9, duration: "3-4 Jam", listeners: "810",
  },
  {
    id: slug("Mangrove Bekantan Tarakan"), title: "Kawasan Mangrove & Bekantan Tarakan", city: "Tarakan", province: "Kalimantan Utara", region: "Kalimantan", category: "alam",
    description: "Hutan bakau alami di tengah kota yang menjadi suaka perlindungan spesies endemik maskot Borneo, Bekantan. Audio menyajikan fakta biologi unik bekantan, fungsi benteng ekologis bakau dari erosi air laut, serta sejarah konservasi kota.",
    image: img(slug("Mangrove Bekantan Tarakan")), price: "Rp 15.000", rating: 4.6, duration: "1-2 Jam", listeners: "1.950", isPopular: true,
  },
]