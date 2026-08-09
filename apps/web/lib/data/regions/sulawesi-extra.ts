import type { Destination } from "../types"

const img = (id: string) => `assets/destinations/${id}.jpg`
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export const sulawesiExtraDestinations: Destination[] = [
  {
    id: slug("Benteng Otanaha Ekstra"), title: "Benteng Otanaha", city: "Gorontalo", province: "Gorontalo", region: "Sulawesi", category: "sejarah",
    description: "Benteng batu abad ke-16 peninggalan Kerajaan Limboto yang dibangun menggunakan perekat putih telur burung maleo. Tempat ini menjadi saksi perlawanan masyarakat lokal terhadap bangsa Portugis di pesisir Danau Limboto.",
    image: img(slug("Benteng Otanaha Ekstra")), price: "Rp 5.000", rating: 4.5, duration: "1-2 Jam", listeners: "850", isPopular: true,
  },
  {
    id: slug("Rumah Adat Dulohupa"), title: "Rumah Adat Dulohupa", city: "Gorontalo", province: "Gorontalo", region: "Sulawesi", category: "desa-adat",
    description: "Rumah panggung tradisional Gorontalo berseni arsitektur tinggi yang dahulu difungsikan sebagai balai musyawarah dan ruang sidang adat kerajaan. Atapnya bersusun dua mencerminkan perpaduan syariat Islam dan hukum adat.",
    image: img(slug("Rumah Adat Dulohupa")), price: "Rp 5.000", rating: 4.4, duration: "1 Jam", listeners: "620",
  },
  {
    id: slug("Museum Popa Eyato"), title: "Museum Popa Eyato", city: "Gorontalo", province: "Gorontalo", region: "Sulawesi", category: "museum",
    description: "Museum negeri yang menyimpan ragam koleksi etnografi, arkeologi, serta artefak peninggalan kerajaan-kerajaan Gorontalo. Tempat ini menguraikan narasi sejarah peradaban dan perjuangan pahlawan Nani Wartabone.",
    image: img(slug("Museum Popa Eyato")), price: "Rp 5.000", rating: 4.3, duration: "1-2 Jam", listeners: "410",
  },
  {
    id: slug("Rumah Adat Gobel"), title: "Rumah Adat Gobel", city: "Bone Bolango", province: "Gorontalo", region: "Sulawesi", category: "desa-adat",
    description: "Bangunan kuno peninggalan Raja Gobel yang menjadi pusat pemerintahan Kerajaan Bone Suwawa di masa lampau. Rumah adat ini sarat cerita silsilah kebangsawanan dan struktur sosial masyarakat Gorontalo.",
    image: img(slug("Rumah Adat Gobel")), price: "Rp 5.000", rating: 4.2, duration: "1 Jam", listeners: "330",
  },
  {
    id: slug("Masjid Hunto Sultan Amai"), title: "Masjid Tua Hunto Sultan Amai", city: "Gorontalo", province: "Gorontalo", region: "Sulawesi", category: "religi",
    description: "Masjid tertua di Gorontalo yang didirikan oleh Sultan Amai pada abad ke-15 saat Islam pertama kali ditetapkan sebagai agama resmi kerajaan. Kompleks masjid menyimpan makam sultan dan sumur kuno sarat nilai sejarah.",
    image: img(slug("Masjid Hunto Sultan Amai")), price: "Gratis", rating: 4.6, duration: "1 Jam", listeners: "940", isPopular: true,
  },
  {
    id: slug("Benteng Orange Kwandang"), title: "Benteng Orange Kwandang", city: "Gorontalo Utara", province: "Gorontalo", region: "Sulawesi", category: "sejarah",
    description: "Benteng pertahanan buatan kolonial Belanda pada abad ke-17 di pesisir utara Gorontalo. Struktur dinding batu tua dan fondasinya menyajikan kisah jalur perdagangan rempah serta pos pertahanan militer laut.",
    image: img(slug("Benteng Orange Kwandang")), price: "Rp 5.000", rating: 4.3, duration: "1-2 Jam", listeners: "510",
  },
  {
    id: slug("Rumah Adat Bandayo Poboide"), title: "Rumah Adat Bandayo Poboide", city: "Gorontalo", province: "Gorontalo", region: "Sulawesi", category: "desa-adat",
    description: "Rumah adat besar di kawasan Limboto yang difungsikan sebagai gedung pertemuan adat dan tempat pagelaran seni tradisional. Arsitekturnya menyimbolkan tatanan kosmologi dan nilai permusyawaratan masyarakat tempatan.",
    image: img(slug("Rumah Adat Bandayo Poboide")), price: "Rp 5.000", rating: 4.4, duration: "1 Jam", listeners: "470",
  },
  {
    id: slug("Bogani Nani Wartabone"), title: "TN Bogani Nani Wartabone", city: "Bone Bolango", province: "Gorontalo", region: "Sulawesi", category: "alam",
    description: "Kawasan konservasi hutan hujan tropis endemik yang menjadi habitat utama burung Maleo dan Babirusa. Audionavigasi menguraikan kebiasaan unik bertelur Maleo di tanah geotermal serta pentingnya konservasi flora rimba.",
    image: img(slug("Bogani Nani Wartabone")), price: "Rp 10.000", rating: 4.7, duration: "3-4 Jam", listeners: "780",
  },
  {
    id: slug("Danau Limboto Dembe"), title: "Danau Limboto & Situs Dembe", city: "Gorontalo", province: "Gorontalo", region: "Sulawesi", category: "alam",
    description: "Danau bersejarah tempat berlangsungnya tradisi nelayan perahu dayung dan situs pemukiman kuno suku Gorontalo. Menyimpan cerita mitologi asal usul dan ekologi danau purba yang kian menyusut.",
    image: img(slug("Danau Limboto Dembe")), price: "Gratis", rating: 4.3, duration: "1-2 Jam", listeners: "1.2k", isPopular: true,
  },
  {
    id: slug("Desa Religies Bongo"), title: "Desa Wisata Religies Bongo", city: "Gorontalo", province: "Gorontalo", region: "Sulawesi", category: "desa-adat",
    description: "Desa pesisir bersejarah yang terkenal dengan tradisi Walima dan Museum Fosil Kayu serta Pesantren Alam. Menawarkan pengalaman audio unik tentang perpaduan spiritualitas Islam dan kearifan lokal Gorontalo.",
    image: img(slug("Desa Religies Bongo")), price: "Rp 10.000", rating: 4.6, duration: "2 Jam", listeners: "1.4k", isPopular: true,
  },
  {
    id: slug("Benteng Rotterdam"), title: "Benteng Rotterdam", city: "Makassar", province: "Sulawesi Selatan", region: "Sulawesi", category: "sejarah",
    description: "Benteng penyu peninggalan Kerajaan Gowa-Tallo abad ke-16 yang kemudian direbut oleh VOC Belanda. Kompleks benteng ini menyimpan Museum La Galigo dan ruang tahanan Pangeran Diponegoro.",
    image: img(slug("Benteng Rotterdam")), price: "Rp 10.000", rating: 4.7, duration: "2-3 Jam", listeners: "5.4k", isPopular: true,
  },
  {
    id: slug("Benteng Somba Opu"), title: "Benteng Somba Opu", city: "Gowa", province: "Sulawesi Selatan", region: "Sulawesi", category: "sejarah",
    description: "Pusat perbentengan dan ibu kota Kerajaan Gowa-Tallo pada abad ke-16 yang pernah menjadi bandar rempah internasional. Kini berfungsi sebagai kawasan kebudayaan berisi replika rumah adat dari berbagai suku di Sulawesi Selatan.",
    image: img(slug("Benteng Somba Opu")), price: "Rp 10.000", rating: 4.5, duration: "2-3 Jam", listeners: "2.8k", isPopular: true,
  },
  {
    id: slug("Museum Balla Lompoa"), title: "Museum Balla Lompoa", city: "Gowa", province: "Sulawesi Selatan", region: "Sulawesi", category: "museum",
    description: "Rekonstruksi Istana Kerajaan Gowa buatan tahun 1936 berbentuk rumah panggung kayu ulin megah. Mengoleksi benda-benda pusaka kerajaan seperti mahkota emas, pedang saloko, dan silsilah raja-raja Gowa.",
    image: img(slug("Museum Balla Lompoa")), price: "Rp 10.000", rating: 4.6, duration: "1-2 Jam", listeners: "3.1k", isPopular: true,
  },
  {
    id: slug("Kete Kesu Ekstra"), title: "Kete Kesu", city: "Toraja Utara", province: "Sulawesi Selatan", region: "Sulawesi", category: "desa-adat",
    description: "Desa adat Toraja terlengkap yang memperlihatkan deretan rumah adat Tongkonan, lumbung alang, serta pemakaman tebing kuno ber-Erong. Audio guide memandu alur upacara adat kematian Rambu Solo.",
    image: img(slug("Kete Kesu Ekstra")), price: "Rp 25.000", rating: 4.8, duration: "2-3 Jam", listeners: "6.2k", isPopular: true,
  },
  {
    id: slug("Leang Leang Maros"), title: "Situs Purba Leang-Leang", city: "Maros", province: "Sulawesi Selatan", region: "Sulawesi", category: "sejarah",
    description: "Situs lukisan gua prasejarah di kawasan karst Maros berpola cap tangan manusia dan babi rusa berusia lebih dari 40.000 tahun. Narasi mendalam mengulas jejak awal migrasi manusia modern purba.",
    image: img(slug("Leang Leang Maros")), price: "Rp 15.000", rating: 4.7, duration: "2 Jam", listeners: "4.1k", isPopular: true,
  },
  {
    id: slug("Makam Raja Gowa Katangka"), title: "Kompleks Makam Raja-Raja Gowa", city: "Gowa", province: "Sulawesi Selatan", region: "Sulawesi", category: "sejarah",
    description: "Kompleks pemakaman kubah batu tempat beristirahatnya pahlawan nasional Sultan Hasanuddin dan raja-raja Gowa lainnya. Menyimpan cerita kejayaan militer maritim dan sejarah masuknya Islam di Sulsel.",
    image: img(slug("Makam Raja Gowa Katangka")), price: "Rp 5.000", rating: 4.6, duration: "1 Jam", listeners: "2.3k",
  },
  {
    id: slug("Desa Ammatoa Kajang"), title: "Desa Adat Ammatoa Kajang", city: "Bulukumba", province: "Sulawesi Selatan", region: "Sulawesi", category: "desa-adat",
    description: "Permukiman adat suku Kajang Dalam yang memegang prinsip hidup bersahaja (Kamase-masea) tanpa listrik dan serba hitam. Pemandu suara menjelaskan nilai konservasi hutan adat Pasang ri Kajang.",
    image: img(slug("Desa Ammatoa Kajang")), price: "Rp 20.000", rating: 4.7, duration: "2-3 Jam", listeners: "1.9k",
  },
  {
    id: slug("Tanah Beru Pinisi"), title: "Kawasan Pembuatan Perahu Pinisi", city: "Bulukumba", province: "Sulawesi Selatan", region: "Sulawesi", category: "sejarah",
    description: "Pusat galangan kayu tradisional perahu Pinisi warisan budaya takbenda UNESCO. Pengunjung dapat mendengarkan detil teknik pembuatan kapal layar tradisional suku Konjo tanpa gambar cetak biru.",
    image: img(slug("Tanah Beru Pinisi")), price: "Rp 10.000", rating: 4.7, duration: "1-2 Jam", listeners: "3.5k", isPopular: true,
  },
  {
    id: slug("Londa Toraja"), title: "Situs Megalitikum Londa", city: "Tana Toraja", province: "Sulawesi Selatan", region: "Sulawesi", category: "sejarah",
    description: "Kawasan pekuburan gua alam di tebing batu Londa lengkap dengan patung Tau-Tau penghormatan leluhur. Menyajikan pengetahuan audio komprehensif mengenai tata cara pemakaman tradisi Aluk Todolo.",
    image: img(slug("Londa Toraja")), price: "Rp 30.000", rating: 4.8, duration: "2 Jam", listeners: "5.7k", isPopular: true,
  },
  {
    id: slug("Museum La Galigo"), title: "Museum La Galigo", city: "Makassar", province: "Sulawesi Selatan", region: "Sulawesi", category: "museum",
    description: "Museum provinsi yang berada di dalam Fort Rotterdam dengan ribuan naskah kuno, maket perahu, dan diorama kebudayaan empat suku utama Sulawesi Selatan (Bugis, Makassar, Toraja, Mandar).",
    image: img(slug("Museum La Galigo")), price: "Rp 5.000", rating: 4.5, duration: "1-2 Jam", listeners: "2.1k",
  },
  {
    id: slug("Lembah Bada Arca Sepe"), title: "Situs Megalitikum Lembah Bada", city: "Poso", province: "Sulawesi Tengah", region: "Sulawesi", category: "sejarah",
    description: "Kawasan arca batu antropomorfik raksasa Sepe dan bejana batu Kalamba peninggalan zaman megalitikum ribuan tahun silam di kawasan Lore Lindu. Audio menceritakan misteri fungsi ritual spiritual purba.",
    image: img(slug("Lembah Bada Arca Sepe")), price: "Rp 15.000", rating: 4.9, duration: "3-4 Jam", listeners: "3.2k", isPopular: true,
  },
  {
    id: slug("Pokekea Besoa"), title: "Situs Megalitikum Lembah Besoa", city: "Poso", province: "Sulawesi Tengah", region: "Sulawesi", category: "sejarah",
    description: "Kompleks situs megalit Pokekea berisikan puluhan Kalamba (tempayan kubur batu) berukir relief wajah manusia dan tutup batu Tuatena. Menyajikan kajian arkeologi prasejarah Austronesia.",
    image: img(slug("Pokekea Besoa")), price: "Rp 15.000", rating: 4.8, duration: "2-3 Jam", listeners: "1.8k",
  },
  {
    id: slug("Museum Sulawesi Tengah"), title: "Museum Sulawesi Tengah", city: "Palu", province: "Sulawesi Tengah", region: "Sulawesi", category: "museum",
    description: "Museum negeri di Palu yang memamerkan naskah kuno, busana kain kulit kayu khas suku Lore, serta koleksi etnografi suku Kaili dan Kulawi. Sangat cocok sebagai pengantar studi sejarah lokal.",
    image: img(slug("Museum Sulawesi Tengah")), price: "Rp 5.000", rating: 4.4, duration: "1-2 Jam", listeners: "750",
  },
  {
    id: slug("Desa Salena Kaili"), title: "Desa Adat Salena (Suku Kaili)", city: "Palu", province: "Sulawesi Tengah", region: "Sulawesi", category: "desa-adat",
    description: "Desa adat suku Kaili yang bermukim di perbukitan Palu Barat. Tempat ini mempertahankan tradisi ritual Balia serta rumah arsitektur kayu tradisional Souraja dalam kearifan lokal pegunungan.",
    image: img(slug("Desa Salena Kaili")), price: "Gratis", rating: 4.5, duration: "2 Jam", listeners: "620",
  },
  {
    id: slug("Rumah Adat Souraja"), title: "Rumah Adat Souraja (Banua Oge)", city: "Palu", province: "Sulawesi Tengah", region: "Sulawesi", category: "desa-adat",
    description: "Istana kayu megah peninggalan Raja Palu abad ke-19 bertipe panggung kayu tanpa paku. Audio guide membedah struktur arsitektur kayu Kaili dan peranan sang raja dalam diplomasi wilayah.",
    image: img(slug("Rumah Adat Souraja")), price: "Rp 5.000", rating: 4.6, duration: "1 Jam", listeners: "1.1k", isPopular: true,
  },
  {
    id: slug("Lore Lindu Danau Lindu"), title: "TN Lore Lindu & Danau Lindu", city: "Sigi", province: "Sulawesi Tengah", region: "Sulawesi", category: "alam",
    description: "Cagar biosfer dunia UNESCO yang menggabungkan keindahan danau dataran tinggi dan habitat satwa liar endemik. Narasi mengisahkan kearifan adat suku Tado dalam menjaga kelestarian rimba.",
    image: img(slug("Lore Lindu Danau Lindu")), price: "Rp 20.000", rating: 4.7, duration: "4-5 Jam", listeners: "1.4k", isPopular: true,
  },
  {
    id: slug("Napu Valley Watu Kaji"), title: "Kawasan Megalit Lembah Napu", city: "Poso", province: "Sulawesi Tengah", region: "Sulawesi", category: "sejarah",
    description: "Bagian dari lanskap megalitik Lore Lindu di utara Poso yang memamerkan patung batu silindris dan lumpang batu tua. Tempat ideal untuk mengeksplorasi kronologi peradaban batu Sulawesi.",
    image: img(slug("Napu Valley Watu Kaji")), price: "Rp 10.000", rating: 4.6, duration: "2-3 Jam", listeners: "920",
  },
  {
    id: slug("Makam Kerajaan Banggai"), title: "Kompleks Makam Kerajaan Banggai", city: "Banggai Laut", province: "Sulawesi Tengah", region: "Sulawesi", category: "sejarah",
    description: "Situs sejarah Kerajaan Banggai berisi makam raja-raja dan keraton di pesisir kepulauan. Pemandu menceritakan peran maritim Kesultanan Banggai dalam jaringan pelayaran rempah.",
    image: img(slug("Makam Kerajaan Banggai")), price: "Rp 5.000", rating: 4.3, duration: "1 Jam", listeners: "410",
  },
  {
    id: slug("Gua Latea Poso"), title: "Gua Latea (Pemakaman Kuno Poso)", city: "Poso", province: "Sulawesi Tengah", region: "Sulawesi", category: "sejarah",
    description: "Gua kapur tempat persemayaman peti mati kayu (Erong) dan tengkorak leluhur suku Pamona zaman dahulu. Memberikan narasi menarik tentang kosmologi kematian pra-Kristen di kawasan Poso.",
    image: img(slug("Gua Latea Poso")), price: "Rp 10.000", rating: 4.5, duration: "1-2 Jam", listeners: "880",
  },
  {
    id: slug("Tenun Donggala"), title: "Pusat Kain Tenun Donggala", city: "Donggala", province: "Sulawesi Tengah", region: "Sulawesi", category: "desa-adat",
    description: "Kawasan pusat pembuatan kain tenun ikat tradisional Bu'u khas Donggala yang diwariskan turun-temurun. Audio mendeskripsikan kerumitan ragam motif dan teknik tenun alat kayu tradisional.",
    image: img(slug("Tenun Donggala")), price: "Gratis", rating: 4.6, duration: "1-2 Jam", listeners: "1.0k",
  },
  {
    id: slug("Rumah Adat Boyang Pamboang"), title: "Rumah Adat Boyang Pamboang", city: "Majene", province: "Sulawesi Barat", region: "Sulawesi", category: "desa-adat",
    description: "Rumah panggung tradisional kayu khas suku Mandar bertingkat yang kaya ornamen kayu ukir. Audio memandu struktur filosofis tiga tingkatan bangunan (Bawa Boyang, Boyang, dan Taka).",
    image: img(slug("Rumah Adat Boyang Pamboang")), price: "Rp 5.000", rating: 4.5, duration: "1 Jam", listeners: "540",
  },
  {
    id: slug("Museum Mandar Majene"), title: "Museum Mandar Majene", city: "Majene", province: "Sulawesi Barat", region: "Sulawesi", category: "museum",
    description: "Museum bekas gedung rumah dinas Kontroleur Belanda yang menyimpan koleksi pakaian adat, perhiasan emas raja, serta maket perahu Cadik Sandeq khas pelaut Mandar.",
    image: img(slug("Museum Mandar Majene")), price: "Rp 5.000", rating: 4.4, duration: "1-2 Jam", listeners: "670",
  },
  {
    id: slug("Makam Raja Sendana"), title: "Makam Raja-Raja Sendana", city: "Majene", province: "Sulawesi Barat", region: "Sulawesi", category: "sejarah",
    description: "Kompleks pemakaman batu pahat para raja dan bangsawan Kerajaan Sendana pada abad ke-16 hingga ke-18. Tempat ini menguraikan kisah hegemoni persekutuan kerajaan Pitu Baqbana Binanga.",
    image: img(slug("Makam Raja Sendana")), price: "Rp 5.000", rating: 4.3, duration: "1 Jam", listeners: "380",
  },
  {
    id: slug("Pambusuang Sandeq"), title: "Kawasan Pesisir Perahu Sandeq", city: "Polewali Mandar", province: "Sulawesi Barat", region: "Sulawesi", category: "sejarah",
    description: "Pusat pembuatan Sandeq, perahu layar bercadik terdepan dan tercepat ciptaan pelaut suku Mandar. Audio menceritakan ketangguhan para Passandeq menerjang lautan lintas pulau.",
    image: img(slug("Pambusuang Sandeq")), price: "Gratis", rating: 4.7, duration: "1-2 Jam", listeners: "1.3k", isPopular: true,
  },
  {
    id: slug("Desa Adat Mamasa Ekstra"), title: "Desa Adat Mamasa (Balla Satzia)", city: "Mamasa", province: "Sulawesi Barat", region: "Sulawesi", category: "desa-adat",
    description: "Permukiman adat dataran tinggi suku Mamasa berarsitektur rumah Banua bersorong atap mirip penyu. Memiliki alur budaya unik perpaduan adat pegunungan dan tradisi ukir kayu khas.",
    image: img(slug("Desa Adat Mamasa Ekstra")), price: "Rp 15.000", rating: 4.6, duration: "2-3 Jam", listeners: "890",
  },
  {
    id: slug("Benteng Kapegu"), title: "Benteng Kapegu", city: "Mamuju", province: "Sulawesi Barat", region: "Sulawesi", category: "sejarah",
    description: "Situs benteng pertahanan tradisional di perbukitan Mamuju peninggalan Kerajaan Tapalang. Saksi sejarah penting perlawanan raja lokal melawan kolonialisme Barat.",
    image: img(slug("Benteng Kapegu")), price: "Rp 5.000", rating: 4.1, duration: "1 Jam", listeners: "290",
  },
  {
    id: slug("Rumah Adat Karossa"), title: "Kompleks Rumah Adat Karossa", city: "Pasangkayu", province: "Sulawesi Barat", region: "Sulawesi", category: "desa-adat",
    description: "Kawasan cagar budaya yang menampilkan arsitektur tradisional suku asli Pasangkayu dan Mandar utara. Narasi audio membahas sejarah migrasi dan toleransi antar-etnis di wilayah perbatasan.",
    image: img(slug("Rumah Adat Karossa")), price: "Gratis", rating: 4.2, duration: "1 Jam", listeners: "310",
  },
  {
    id: slug("Makam Imam Lapeo"), title: "Situs Makam Imam Lapeo", city: "Polewali Mandar", province: "Sulawesi Barat", region: "Sulawesi", category: "religi",
    description: "Makam ulama karismatik Kyai Haji Muhammad Thahir (Imam Lapeo) penyebar Islam utama di tanah Mandar. Menyajikan kisah-kisah spiritualitas, karamah, dan pembangunan masjid berarsitektur unik.",
    image: img(slug("Makam Imam Lapeo")), price: "Gratis", rating: 4.8, duration: "1 Jam", listeners: "2.5k", isPopular: true,
  },
  {
    id: slug("Buntu Liarra"), title: "Landmark Negeri Di Atas Awan Buntu Liarra", city: "Mamasa", province: "Sulawesi Barat", region: "Sulawesi", category: "alam",
    description: "Puncak perbukitan spektakuler yang memperlihatkan pemandangan lautan awan dan lembah pedesaan Mamasa. Audionavigasi memandu mitos leluhur suku pegunungan serta keseimbangan alam.",
    image: img(slug("Buntu Liarra")), price: "Rp 10.000", rating: 4.7, duration: "2 Jam", listeners: "1.6k", isPopular: true,
  },
  {
    id: slug("Rumah Kayu Suwandi"), title: "Rumah Adat Bola Soba", city: "Mamuju", province: "Sulawesi Barat", region: "Sulawesi", category: "desa-adat",
    description: "Rumah panggung kayu berukuran besar peninggalan bangsawan Kerajaan Mamuju. Memamerkan foto-foto era kolonial, benda pusaka sarung tenun Sekomandi, dan benda adat Kerajaan Manarra.",
    image: img(slug("Rumah Kayu Suwandi")), price: "Rp 5.000", rating: 4.3, duration: "1 Jam", listeners: "490",
  },
  {
    id: slug("Benteng Keraton Buton Ekstra"), title: "Benteng Keraton Buton (Wolio)", city: "Baubau", province: "Sulawesi Tenggara", region: "Sulawesi", category: "sejarah",
    description: "Benteng terluas di dunia versi Guinness World Records peninggalan Kesultanan Buton abad ke-16. Di dalamnya terdapat Istana Sultan, Masjid Agung Wolio, Batu Popaua, dan sistem hukum adat unik.",
    image: img(slug("Benteng Keraton Buton Ekstra")), price: "Rp 15.000", rating: 4.9, duration: "3-4 Jam", listeners: "4.8k", isPopular: true,
  },
  {
    id: slug("Liang Kabori Muna"), title: "Situs Gua Prasejarah Liang Kabori", city: "Muna", province: "Sulawesi Tenggara", region: "Sulawesi", category: "sejarah",
    description: "Gua kapur prasejarah berisi lebih dari 130 seni cadas (cave painting) bergambar manusia, perahu, dan gambar layang-layang purba tertua di dunia. Menyediakan riset arkeologi visual audio.",
    image: img(slug("Liang Kabori Muna")), price: "Rp 10.000", rating: 4.8, duration: "2 Jam", listeners: "2.2k", isPopular: true,
  },
  {
    id: slug("Museum Sulawesi Tenggara"), title: "Museum Sulawesi Tenggara", city: "Kendari", province: "Sulawesi Tenggara", region: "Sulawesi", category: "museum",
    description: "Museum provinsi yang menyimpan ribuan benda bersejarah, perhiasan perak, busana adat Tolaki, Buton, Muna, serta diorama peradaban maritim dan pertanian tradisional Sultra.",
    image: img(slug("Museum Sulawesi Tenggara")), price: "Rp 5.000", rating: 4.4, duration: "1-2 Jam", listeners: "820",
  },
  {
    id: slug("Rumah Adat Tolaki"), title: "Rumah Adat Laika Aha (Tolaki)", city: "Kendari", province: "Sulawesi Tenggara", region: "Sulawesi", category: "desa-adat",
    description: "Rumah besar berarsitektur panggung khas suku Tolaki yang disangga tiang-tiang kayu tanpa paku besi. Audio menguraikan filosofi adat Kalo Sara dalam kehidupan sosial pemuda Tolaki.",
    image: img(slug("Rumah Adat Tolaki")), price: "Rp 5.000", rating: 4.3, duration: "1 Jam", listeners: "610",
  },
  {
    id: slug("Benteng Tiworo"), title: "Benteng Tiworo", city: "Muna Barat", province: "Sulawesi Tenggara", region: "Sulawesi", category: "sejarah",
    description: "Situs benteng pertahanan batu kapur peninggalan Kerajaan Tiworo abad ke-16 yang menjadi perisai dari serangan bajak laut dan angkatan laut kerajaan asing di Selat Tiworo.",
    image: img(slug("Benteng Tiworo")), price: "Rp 5.000", rating: 4.2, duration: "1-2 Jam", listeners: "390",
  },
  {
    id: slug("Istana Malige Buton"), title: "Istana Malige Buton", city: "Baubau", province: "Sulawesi Tenggara", region: "Sulawesi", category: "desa-adat",
    description: "Rumah adat kayu bertingkat empat milik Kesultanan Buton yang dibangun tanpa menggunakan paku tunggal melainkan pasak kayu. Menampilkan arsitektur megah dan ukiran bermakna islami.",
    image: img(slug("Istana Malige Buton")), price: "Rp 10.000", rating: 4.7, duration: "1-2 Jam", listeners: "1.7k", isPopular: true,
  },
  {
    id: slug("Masjid Wapaila Liya"), title: "Masjid Agung Wapaila & Keraton Liya", city: "Wakatobi", province: "Sulawesi Tenggara", region: "Sulawesi", category: "religi",
    description: "Masjid kayu tua dan kompleks benteng Benteng Liya di Pulau Wangi-Wangi. Pemandu mendeskripsikan masuknya syiar Islam ke Wakatobi dan sistem pertahanan maritim pulau benteng.",
    image: img(slug("Masjid Wapaila Liya")), price: "Rp 10.000", rating: 4.6, duration: "1-2 Jam", listeners: "950",
  },
  {
    id: slug("Rawa Aopa Watumohai"), title: "Taman Nasional Rawa Aopa Watumohai", city: "Konawe Selatan", province: "Sulawesi Tenggara", region: "Sulawesi", category: "alam",
    description: "Kawasan konservasi lahan basah dan savana terluas di Sulawesi yang dihuni anoa, babirusa, dan burung air. Menawarkan panduan audio keanekaragaman hayati dan habitat flora fauna.",
    image: img(slug("Rawa Aopa Watumohai")), price: "Rp 15.000", rating: 4.5, duration: "3 Jam", listeners: "870",
  },
  {
    id: slug("Makam Sultan Murhum"), title: "Situs Makam Sultan Murhum", city: "Baubau", province: "Sulawesi Tenggara", region: "Sulawesi", category: "sejarah",
    description: "Makam Sultan Buton pertama yang memeluk Islam (Lakilaponto/Sultan Murhum Kaimuddin). Tempat ini menjadi tonggak penting perubahan sistem Raja Buton menjadi Kesultanan Buton.",
    image: img(slug("Makam Sultan Murhum")), price: "Rp 5.000", rating: 4.6, duration: "1 Jam", listeners: "1.1k",
  },
  {
    id: slug("Desa Adat Masiri"), title: "Desa Adat Masiri", city: "Buton Selatan", province: "Sulawesi Tenggara", region: "Sulawesi", category: "desa-adat",
    description: "Desa adat pesisir Buton yang mempertahankan kebudayaan pembuatan tenun ikat khas Buton dan ritual pesta adat Posuo (pingitan gadis remaja). Kaya akan nilai antropologi audio.",
    image: img(slug("Desa Adat Masiri")), price: "Rp 10.000", rating: 4.5, duration: "2 Jam", listeners: "530",
  },
  {
    id: slug("Museum Negeri Manado"), title: "Museum Negeri Sulawesi Utara", city: "Manado", province: "Sulawesi Utara", region: "Sulawesi", category: "museum",
    description: "Museum utama di Sulawesi Utara yang mengoleksi keramik kuno Tiongkok, busana adat Minahasa, peralatan perang suku Sangir-Talaud, serta diorama sejarah lokal permukiman purba.",
    image: img(slug("Museum Negeri Manado")), price: "Rp 5.000", rating: 4.4, duration: "1-2 Jam", listeners: "1.2k", isPopular: true,
  },
  {
    id: slug("Waruga Sawangan"), title: "Situs Waruga Sawangan", city: "Minahasa Utara", province: "Sulawesi Utara", region: "Sulawesi", category: "sejarah",
    description: "Kompleks kubur batu leluhur suku Minahasa berisikan 144 Waruga bertutup pahatan relief unik yang menggambarkan profesi sang jenazah semasa hidup. Audio mengupas konsep kematian kuno Minahasa.",
    image: img(slug("Waruga Sawangan")), price: "Rp 10.000", rating: 4.7, duration: "1-2 Jam", listeners: "2.9k", isPopular: true,
  },
  {
    id: slug("Benteng Moraya"), title: "Benteng Moraya", city: "Minahasa", province: "Sulawesi Utara", region: "Sulawesi", category: "sejarah",
    description: "Monumen dan benteng pertahanan bersejarah lokasi Perang Tondano antara pejuang Minahasa melawan pasukan VOC Belanda. Menampilkan ukiran kayu relief silsilah marga (Tonaas) Minahasa.",
    image: img(slug("Benteng Moraya")), price: "Rp 5.000", rating: 4.6, duration: "1-2 Jam", listeners: "3.4k", isPopular: true,
  },
  {
    id: slug("Woloan Knockdown House"), title: "Desa Woloan (Rumah Knockdown)", city: "Tomohon", province: "Sulawesi Utara", region: "Sulawesi", category: "desa-adat",
    description: "Desa pengrajin rumah kayu panggung tradisional khas Minahasa yang dibuat dengan sistem bongkar pasang (knockdown). Pemandu menceritakan keahlian tukang kayu lokal yang diekspor ke mancanegara.",
    image: img(slug("Woloan Knockdown House")), price: "Gratis", rating: 4.6, duration: "1-2 Jam", listeners: "2.1k", isPopular: true,
  },
  {
    id: slug("Makam Kiai Modjo"), title: "Makam Pahlawan Nasional Kiai Modjo", city: "Minahasa", province: "Sulawesi Utara", region: "Sulawesi", category: "sejarah",
    description: "Kompleks pemakaman ulama dan penasihat Pangeran Diponegoro yang diasingkan Belanda ke Tondano. Menjadi asal-usul terbentuknya komunitas suku Jawa Tondano (Jaton).",
    image: img(slug("Makam Kiai Modjo")), price: "Gratis", rating: 4.5, duration: "1 Jam", listeners: "1.3k",
  },
  {
    id: slug("Tangkoko Batuangus"), title: "Taman Nasional Tangkoko Batuangus", city: "Bitung", province: "Sulawesi Utara", region: "Sulawesi", category: "alam",
    description: "Hutan konservasi alami habitat satwa primata terkecil di dunia Tarsius Spektral dan monyet hitam Sulawesi (Macaca nigra). Audio guide memandu jelajah flora endemik dan sejarah riset Wallace.",
    image: img(slug("Tangkoko Batuangus")), price: "Rp 85.000", rating: 4.8, duration: "3-4 Jam", listeners: "3.8k", isPopular: true,
  },
  {
    id: slug("Batu Pinabetengan"), title: "Situs Batu Pinabetengan", city: "Minahasa", province: "Sulawesi Utara", region: "Sulawesi", category: "sejarah",
    description: "Batu megalit besar bertuliskan goresan gambar purba yang menjadi tempat musyawarah pembagian sub-etnis Minahasa di masa purba. Memiliki nilai historis kosmologis tertinggi di tanah Minahasa.",
    image: img(slug("Batu Pinabetengan")), price: "Rp 5.000", rating: 4.6, duration: "1 Jam", listeners: "1.5k",
  },
  {
    id: slug("Museum Bolaang Mongondow"), title: "Museum Kebudayaan Bolaang Mongondow", city: "Bolaang Mongondow", province: "Sulawesi Utara", region: "Sulawesi", category: "museum",
    description: "Museum peninggalan bersejarah Kesultanan Bolaang Mongondow yang memamerkan pakaian kebesaran kerajaan, perhiasan emas antik, serta peralatan musik tradisional Kolintang dan Salude.",
    image: img(slug("Museum Bolaang Mongondow")), price: "Rp 5.000", rating: 4.2, duration: "1 Jam", listeners: "420",
  },
  {
    id: slug("Kawah Gunung Mahawu"), title: "Kawah Gunung Mahawu", city: "Tomohon", province: "Sulawesi Utara", region: "Sulawesi", category: "alam",
    description: "Kawah gunung berapi aktif yang memiliki jalur treking edukatif tentang geologi vulkanik cincin api Sulawesi. Menyajikan cerita rakyat Minahasa mengenai gunung berapi pelindung kota.",
    image: img(slug("Kawah Gunung Mahawu")), price: "Rp 10.000", rating: 4.6, duration: "2 Jam", listeners: "2.7k", isPopular: true,
  },
  {
    id: slug("Makam Tuanku Imam Bonjol"), title: "Situs Makam Tuanku Imam Bonjol", city: "Minahasa Utara", province: "Sulawesi Utara", region: "Sulawesi", category: "sejarah",
    description: "Bangunan makam pahlawan nasional Tuanku Imam Bonjol yang berbentuk Rumah Gadang di tanah Minahasa tempat lokasi pengasingan akhirnya hingga wafat. Menyajikan kisah perjuangan Perang Padri.",
    image: img(slug("Makam Tuanku Imam Bonjol")), price: "Gratis", rating: 4.6, duration: "1 Jam", listeners: "1.8k",
  },
]