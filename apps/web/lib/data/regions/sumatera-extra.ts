import type { Destination } from "../types"

// Dataset tambahan destinasi guide-worthy (candi, museum, desa adat, religi, sejarah, alam edukatif)
const img = (id: string) => `assets/destinations/${id}.jpg`
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export const sumatraExtraDestinations: Destination[] = [
  {
    id: slug("Benteng Indra Patra"), title: "Benteng Indra Patra", city: "Aceh Besar", province: "Aceh", region: "Sumatra", category: "sejarah",
    description: "Benteng pertahanan prasejarah peninggalan Kerajaan Hindu Lamuri yang kemudian dimanfaatkan Laksamana Malahayati dalam perang melawan armada Kolonial Portugis. Narasi audio mengisahkan benteng pertahanan pesisir kuno dan keberanian prajurit wanita Aceh.",
    image: img(slug("Benteng Indra Patra")), price: "Rp 5.000", rating: 4.5, duration: "1 Jam", listeners: "2.1k", isPopular: true,
  },
  {
    id: slug("Museum Tsunami Aceh Ekstra"), title: "Museum Tsunami Aceh", city: "Banda Aceh", province: "Aceh", region: "Sumatra", category: "museum",
    description: "Museum rancangan Ridwan Kamil yang dirancang khusus sebagai pengingat tragedi Tsunami 2004 sekaligus pusat edukasi bencana. Panduan suara membimbing pengunjung menelusuri lorong cerobong gema serta ruangan sumur doa.",
    image: img(slug("Museum Tsunami Aceh Ekstra")), price: "Rp 5.000", rating: 4.8, duration: "1-2 Jam", listeners: "15.4k", isPopular: true,
  },
  {
    id: slug("Griya Warisan Budaya Desa Lubuk Sukon"), title: "Griya Warisan Budaya Lubuk Sukon", city: "Aceh Besar", province: "Aceh", region: "Sumatra", category: "desa-adat",
    description: "Desa wisata budaya khas Aceh yang mempertahankan arsitektur Rumoh Aceh bertiang tinggi dan pepohonan pekarangan rindang. Rekaman audio mendeskripsikan tata ruang adat kosmologis Aceh dan nilai kebersamaan warga desa.",
    image: img(slug("Griya Warisan Budaya Desa Lubuk Sukon")), price: "Gratis", rating: 4.4, duration: "1-2 Jam", listeners: "850",
  },
  {
    id: slug("Masjid Tuha Indrapuri"), title: "Masjid Tuha Indrapuri", city: "Aceh Besar", province: "Aceh", region: "Sumatra", category: "religi",
    description: "Masjid bersejarah abad ke-17 yang dibangun di atas fondasi pelataran benteng candi Hindu kuno. Cerita audio mengurai perpaduan arsitektur kayu tumpang tiga Hindu-Islam dan peran pentingnya masa Kesultanan Aceh.",
    image: img(slug("Masjid Tuha Indrapuri")), price: "Gratis", rating: 4.7, duration: "1 Jam", listeners: "1.8k",
  },
  {
    id: slug("Taman Nuranani Gunongan"), title: "Taman Nuranani & Gunongan", city: "Banda Aceh", province: "Aceh", region: "Sumatra", category: "sejarah",
    description: "Monumen arsitektur berbentuk gunung buatan yang dibangun Sultan Iskandar Muda untuk permaisurinya, Putri Pahang. Audio guide mengisahkan romantika istana kesultanan serta fungsi simbolis taman pemandian putri.",
    image: img(slug("Taman Nuranani Gunongan")), price: "Gratis", rating: 4.3, duration: "1 Jam", listeners: "3.2k",
  },
  {
    id: slug("Situs Candi Japakeh"), title: "Situs Candi Japakeh (Lamuri)", city: "Aceh Besar", province: "Aceh", region: "Sumatra", category: "candi",
    description: "Situs sisa bukit nisan bertuliskan arab kuno dan struktur batu benteng Lamuri abad ke-12 sebelum berkembangnya Islam. Panduan audio mengungkap sejarah perdagangan maritim Selat Malaka masa pra-Islam.",
    image: img(slug("Situs Candi Japakeh")), price: "Gratis", rating: 4.1, duration: "1-2 Jam", listeners: "620",
  },
  {
    id: slug("Ketambe Leuser"), title: "Gunung Leuser - Ketambe", city: "Aceh Tenggara", province: "Aceh", region: "Sumatra", category: "alam",
    description: "Pusat penelitian dan habitat alami orangutan Sumatra di tengah hutan hujan tropis tertua. Audio mengedukasi wisatawan mengenai biodiversitas flora-fauna serta ekosistem warisan dunia UNESCO.",
    image: img(slug("Ketambe Leuser")), price: "Rp 20.000", rating: 4.8, duration: "2-3 Jam", listeners: "4.5k", isPopular: true,
  },
  {
    id: slug("Benteng Kuta Lubok"), title: "Situs Benteng Kuta Lubok", city: "Sabang", province: "Aceh", region: "Sumatra", category: "sejarah",
    description: "Situs peninggalan benteng pertahanan militer maritim di ujung barat Pulau Weh. Audio guide menceritakan riwayat pertahanan pulau dari masa Kesultanan Aceh hingga pendudukan tentara Jepang.",
    image: img(slug("Benteng Kuta Lubok")), price: "Gratis", rating: 4.2, duration: "1 Jam", listeners: "740",
  },
  {
    id: slug("Candi Bahal"), title: "Situs Candi Bahal I, II & III", city: "Padang Lawas Utara", province: "Sumatera Utara", region: "Sumatra", category: "candi",
    description: "Kompleks percandian bata merah peninggalan Kerajaan Pannai abad ke-11 bercorak Buddha Vajrayana. Audio guide menerangkan relief figur raksasa Yaksha dan sejarah pusat keagamaan kuno di Padang Lawas.",
    image: img(slug("Candi Bahal")), price: "Rp 5.000", rating: 4.6, duration: "2 Jam", listeners: "2.4k", isPopular: true,
  },
  {
    id: slug("Desa Adat Lingga"), title: "Desa Adat Lingga", city: "Karo", province: "Sumatera Utara", region: "Sumatra", category: "desa-adat",
    description: "Desa budaya Karo antik yang menyimpan Rumah Siwaluh Jabu berusia ratusan tahun tanpa paku. Audio mengisahkan tatanan kekeluargaan merga silima dan filosofi arsitektur kepala kerbau pada atap ijuk.",
    image: img(slug("Desa Adat Lingga")), price: "Rp 10.000", rating: 4.5, duration: "1-2 Jam", listeners: "1.9k",
  },
  {
    id: slug("Museum Negeri Sumut"), title: "Museum Negeri Sumatera Utara", city: "Medan", province: "Sumatera Utara", region: "Sumatra", category: "museum",
    description: "Museum terlengkap yang memamerkan benda etnografi dari 8 etnis asli Sumatera Utara serta koleksi pra-sejarah. Narasi audio memandu penelusuran sejarah peradaban pesisir hingga pedalaman Toba dan Karo.",
    image: img(slug("Museum Negeri Sumut")), price: "Rp 5.000", rating: 4.4, duration: "1-2 Jam", listeners: "3.8k",
  },
  {
    id: slug("Masjid Azizi Tanjung Pura"), title: "Masjid Azizi Tanjung Pura", city: "Langkat", province: "Sumatera Utara", region: "Sumatra", category: "religi",
    description: "Masjid kebanggaan Kesultanan Langkat berarsitektur perpaduan Melayu, Timur Tengah, dan Eropa buatan abad ke-19. Rekaman suara menceritakan jejak pahlawan pujangga Amir Hamzah dan kejayaan tradisi Melayu.",
    image: img(slug("Masjid Azizi Tanjung Pura")), price: "Gratis", rating: 4.7, duration: "1 Jam", listeners: "2.8k",
  },
  {
    id: slug("Taman Eden 100 Toba"), title: "Taman Eden 100 Toba", city: "Toba", province: "Sumatera Utara", region: "Sumatra", category: "alam",
    description: "Kawasan konservasi alam edukatif yang mengenalkan flora langka endemik Toba seperti anggrek hutan dan tanaman Andaliman. Audio guide membagikan kisah pentingnya konservasi ekosistem Danau Toba.",
    image: img(slug("Taman Eden 100 Toba")), price: "Rp 10.000", rating: 4.5, duration: "2 Jam", listeners: "1.5k",
  },
  {
    id: slug("Museum Huta Bolon Simanindo"), title: "Museum Huta Bolon Simanindo", city: "Samosir", province: "Sumatera Utara", region: "Sumatra", category: "museum",
    description: "Ruma Bolon bekas istana Raja Simanindo yang diubah menjadi museum penyimpanan benda sakral dan pertunjukan Sigale-gale. Audio menuturkan filosofi ritual mistis dan hukum adat kuno Batak.",
    image: img(slug("Museum Huta Bolon Simanindo")), price: "Rp 20.000", rating: 4.6, duration: "1-2 Jam", listeners: "6.7k", isPopular: true,
  },
  {
    id: slug("Tjong A Fie Mansion"), title: "Tjong A Fie Mansion", city: "Medan", province: "Sumatera Utara", region: "Sumatra", category: "sejarah",
    description: "Kediaman bersejarah bergaya Tionghoa-Eropa abad 19 milik tokoh pengusaha dan dermawan ternama Kota Medan. Narasi audio membawa pendengar menyelami sejarah peradaban multikultural Medan zaman kolonial.",
    image: img(slug("Tjong A Fie Mansion")), price: "Rp 35.000", rating: 4.7, duration: "1-2 Jam", listeners: "9.1k", isPopular: true,
  },
  {
    id: slug("Kawah Putih Dolok Tinggi Raja"), title: "Kawah Putih Dolok Tinggi Raja", city: "Simalungun", province: "Sumatera Utara", region: "Sumatra", category: "alam",
    description: "Cagar alam unik dengan bukit kapur putih travertine dan sumber air panas alami yang dikelilingi hutan lebat. Audio menceritakan geologi pembentukan endapan batu kapur unik di tengah belantara Simalungun.",
    image: img(slug("Kawah Putih Dolok Tinggi Raja")), price: "Rp 10.000", rating: 4.2, duration: "2 Jam", listeners: "2.2k",
  },
  {
    id: slug("Candi Pancasandi"), title: "Candi Pancasandi (Padang Roco)", city: "Dharmasraya", province: "Sumatera Barat", region: "Sumatra", category: "candi",
    description: "Situs candi bata bersejarah tempat ditemukannya arca Amoghapasa peninggalan Kerajaan Malayupura abad 13-14. Audio menguraikan peristiwa ekspedisi Pamalayu serta persahabatan kuno Sumatra-Jawa.",
    image: img(slug("Candi Pancasandi")), price: "Gratis", rating: 4.4, duration: "1-2 Jam", listeners: "1.1k",
  },
  {
    id: slug("Desa Adat Pariangan Ekstra"), title: "Desa Adat Pariangan", city: "Tanah Datar", province: "Sumatera Barat", region: "Sumatra", category: "desa-adat",
    description: "Desa tertua Minangkabau di lereng Gunung Marapi yang memiliki deretan Rumah Gadang dan surau antik. Audio menceritakan mitos asal-usul urang Minang serta konsep adat Basamo Mambangun Nagari.",
    image: img(slug("Desa Adat Pariangan Ekstra")), price: "Rp 5.000", rating: 4.8, duration: "2 Jam", listeners: "8.3k", isPopular: true,
  },
  {
    id: slug("Museum Bung Hatta"), title: "Museum Rumah Kelahiran Bung Hatta", city: "Bukittinggi", province: "Sumatera Barat", region: "Sumatra", category: "museum",
    description: "Cagar budaya rumah kayu tradisional tempat proklamator Mohammad Hatta dilahirkan. Narasi audio mengisahkan pembentukan karakter kesederhanaan dan kejeniusan sang Proklamator.",
    image: img(slug("Museum Bung Hatta")), price: "Rp 5.000", rating: 4.7, duration: "1 Jam", listeners: "4.9k", isPopular: true,
  },
  {
    id: slug("Masjid Raya Ganting"), title: "Masjid Raya Ganting", city: "Padang", province: "Sumatera Barat", region: "Sumatra", category: "religi",
    description: "Masjid tertua di Kota Padang yang dibangun tahun 1805 dengan perpaduan arsitektur Neoklasik, Tionghoa, dan Minang. Panduan audio mengungkap peran tempat ini saat pergerakan kemerdekaan dan singgahnya Bung Karno.",
    image: img(slug("Masjid Raya Ganting")), price: "Gratis", rating: 4.6, duration: "1 Jam", listeners: "2.3k",
  },
  {
    id: slug("Lubang Japang Bukittinggi"), title: "Lubang Japang Bukittinggi", city: "Bukittinggi", province: "Sumatera Barat", region: "Sumatra", category: "sejarah",
    description: "Kompleks bunker pertahanan militer bawah tanah yang digali pada era pendudukan Jepang tahun 1942. Cerita audio membimbing di lorong-lorong gelap mengisahkan sejarah kelam romusha.",
    image: img(slug("Lubang Japang Bukittinggi")), price: "Rp 15.000", rating: 4.5, duration: "1-2 Jam", listeners: "11.2k", isPopular: true,
  },
  {
    id: slug("Candi Pulau Punjo"), title: "Candi Pulau Punjo & Mainan", city: "Dharmasraya", province: "Sumatera Barat", region: "Sumatra", category: "candi",
    description: "Kompleks peradaban kuno sepanjang aliran Sungai Batanghari yang menyimpan sisa stupa bata Kerajaan Malayu. Audio guide mengulas pusat jaringan lalu lintas perdagangan rempah masa lampau.",
    image: img(slug("Candi Pulau Punjo")), price: "Gratis", rating: 4.2, duration: "1-2 Jam", listeners: "690",
  },
  {
    id: slug("Istano Basa Pagaruyung"), title: "Istano Basa Pagaruyung", city: "Tanah Datar", province: "Sumatera Barat", region: "Sumatra", category: "sejarah",
    description: "Replikasi istana megah Kerajaan Pagaruyung tiga tingkat berpuncak ranjong khas arsitektur Minangkabau. Panduan suara menjelaskan struktur adat Matrilineal dan makna ukiran kayu warna-warni.",
    image: img(slug("Istano Basa Pagaruyung")), price: "Rp 25.000", rating: 4.7, duration: "2 Jam", listeners: "18.5k", isPopular: true,
  },
  {
    id: slug("Ngarai Sianok"), title: "Geopark Ngarai Sianok", city: "Agam", province: "Sumatera Barat", region: "Sumatra", category: "alam",
    description: "Lembah patahan tebing curam hasil aktivitas tektonik Sesar Sumatra yang dikelilingi vegetasi hijau. Audio guide memaparkan geologi patahan aktif Sumatra serta sejarah jalur pemukiman perajin perak Koto Gadang.",
    image: img(slug("Ngarai Sianok")), price: "Rp 10.000", rating: 4.7, duration: "2 Jam", listeners: "9.4k", isPopular: true,
  },
  {
    id: slug("Candi Muara Takus Ekstra"), title: "Candi Muara Takus", city: "Kampar", province: "Riau", region: "Sumatra", category: "candi",
    description: "Situs stupa Mahligai berbahan batu pasir dan bata merah abad ke-11, peninggalan peradaban Buddha Kedatuan Sriwijaya. Audio menceritakan fungsi religi stupa kuno dan arsitektur khas yang langka di Indonesia.",
    image: img(slug("Candi Muara Takus Ekstra")), price: "Rp 10.000", rating: 4.6, duration: "1-2 Jam", listeners: "5.6k", isPopular: true,
  },
  {
    id: slug("Istana Siak Ekstra"), title: "Istana Siak Sri Indrapura", city: "Siak", province: "Riau", region: "Sumatra", category: "sejarah",
    description: "Istana megah bergaya Melayu-Arab-Eropa peninggalan Sultan Assaidasyarif Hasyim. Rekaman audio mengisahkan alat musik komet langka, kaca cermin berwajah cantik, dan kedermawanan Sultan Siak untuk RI.",
    image: img(slug("Istana Siak Ekstra")), price: "Rp 10.000", rating: 4.8, duration: "2 Jam", listeners: "12.1k", isPopular: true,
  },
  {
    id: slug("Desa Wisata Okura"), title: "Desa Wisata Okura", city: "Pekanbaru", province: "Riau", region: "Sumatra", category: "desa-adat",
    description: "Perkampungan Melayu asli di tepi Sungai Siak yang menjaga kelestarian Rumah Panggung dan tradisi menenun kain Tenun Siak. Audio guide mengajak mendalami kehidupan sungai warga asli Melayu Riau.",
    image: img(slug("Desa Wisata Okura")), price: "Gratis", rating: 4.3, duration: "1-2 Jam", listeners: "1.3k",
  },
  {
    id: slug("Masjid Air Titis Kampar"), title: "Masjid Raya Jami' Air Titis", city: "Kampar", province: "Riau", region: "Sumatra", category: "religi",
    description: "Masjid kayu unik tanpa paku yang dibangun tahun 1901 dengan atap tumpang 20 tingkat. Panduan suara mengungkap kisah sejarah persatuan ulama Kampar dan arsitektur tradisional Melayu Kampar.",
    image: img(slug("Masjid Air Titis Kampar")), price: "Gratis", rating: 4.7, duration: "1 Jam", listeners: "1.7k",
  },
  {
    id: slug("Museum Sang Nila Utama"), title: "Museum Sang Nila Utama", city: "Pekanbaru", province: "Riau", region: "Sumatra", category: "museum",
    description: "Museum simpanan warisan sejarah dan budaya Melayu Riau, berisi naskah kuno, alat perikanan tradisional, dan pakaian kebesaran adat. Narasi audio memberikan wawasan mendalam mengenai kejayaan budaya bahari Melayu.",
    image: img(slug("Museum Sang Nila Utama")), price: "Rp 5.000", rating: 4.4, duration: "1-2 Jam", listeners: "2.9k",
  },
  {
    id: slug("Rumah Lontiok Kuok"), title: "Situs Rumah Lontiok Kuok", city: "Kampar", province: "Riau", region: "Sumatra", category: "desa-adat",
    description: "Kawasan pemukiman tradisional khas Kampar berbentuk rumah perahu melengkung yang sarat makna kosmologis Islam-Melayu. Narasi audio menelusuri simbol filosofis tangga dan dinding rumah lontiok.",
    image: img(slug("Rumah Lontiok Kuok")), price: "Gratis", rating: 4.5, duration: "1 Jam", listeners: "920",
  },
  {
    id: slug("Candi Sintong"), title: "Candi Sintong", city: "Rokan Hilir", province: "Riau", region: "Sumatra", category: "candi",
    description: "Reruntuhan bata kuno di sepanjang DAS Rokan yang diyakini sebagai pemukiman Hindu-Buddha abad ke-12. Panduan narasi audio menceritakan jejak arkeologis yang belum banyak terkuak di Riau utara.",
    image: img(slug("Candi Sintong")), price: "Gratis", rating: 4.0, duration: "1 Jam", listeners: "410",
  },
  {
    id: slug("Tesso Nilo"), title: "Taman Nasional Tesso Nilo", city: "Pelalawan", province: "Riau", region: "Sumatra", category: "alam",
    description: "Pusat konservasi dan perlindungan Gajah Sumatra serta keanekaragaman tanaman hutan dataran rendah Riau. Audio mendidik pendengar pentingnya pelestarian koridor satwa liar di tengah ancaman deforestasi.",
    image: img(slug("Tesso Nilo")), price: "Rp 15.000", rating: 4.5, duration: "2-3 Jam", listeners: "1.9k",
  },
  {
    id: slug("Pulau Penyengat Ekstra"), title: "Pulau Penyengat & Masjid Sultan Riau", city: "Tanjungpinang", province: "Kepulauan Riau", region: "Sumatra", category: "religi",
    description: "Pulau pusat peradaban Bahasa Melayu modern yang memuat Masjid Sultan Riau berperekat putih telur. Rekaman audio menguraikan kisah sastrawan Raja Ali Haji dan sejarah Mahakarya Gurindam XII.",
    image: img(slug("Pulau Penyengat Ekstra")), price: "Rp 10.000", rating: 4.8, duration: "2-3 Jam", listeners: "10.4k", isPopular: true,
  },
  {
    id: slug("Benteng Bukit Kursi"), title: "Benteng Bukit Kursi", city: "Tanjungpinang", province: "Kepulauan Riau", region: "Sumatra", category: "sejarah",
    description: "Benteng pertahanan meriam berdenah segi empat di Pulau Penyengat yang dibangun abad ke-18 untuk mengawal Selat Riau dari tentara Belanda. Audio menarasikan strategi perang laut Kerajaan Riau-Lingga.",
    image: img(slug("Benteng Bukit Kursi")), price: "Gratis", rating: 4.5, duration: "1 Jam", listeners: "2.1k",
  },
  {
    id: slug("Vihara Ksitigarbha"), title: "Vihara Ksitigarbha (Seribu Wajah)", city: "Tanjungpinang", province: "Kepulauan Riau", region: "Sumatra", category: "religi",
    description: "Kompleks ibadah Buddha spektakuler yang menampung 500 lebih patung murid Buddha (Arhat) berpahat ekspresi unik. Panduan suara menjelaskan sejarah ajaran Buddha Mahayana serta nilai seni pahatan batu.",
    image: img(slug("Vihara Ksitigarbha")), price: "Rp 10.000", rating: 4.7, duration: "1-2 Jam", listeners: "7.8k", isPopular: true,
  },
  {
    id: slug("Situs Istana Damnah"), title: "Situs Istana Damnah", city: "Lingga", province: "Kepulauan Riau", region: "Sumatra", category: "sejarah",
    description: "Reruntuhan pondasi dan tapak Istana Kerajaan Riau-Lingga era Sultan Sulaiman Badrul Alamsyah di Daik Lingga. Audio guide mengisahkan kejayaan Daik sebagai pusat kebudayaan dan politik Melayu abad 19.",
    image: img(slug("Situs Istana Damnah")), price: "Gratis", rating: 4.3, duration: "1-2 Jam", listeners: "820",
  },
  {
    id: slug("Museum Linggam Cahya"), title: "Museum Linggam Cahya", city: "Lingga", province: "Kepulauan Riau", region: "Sumatra", category: "museum",
    description: "Museum penyimpan pusaka dan artefak Kesultanan Riau-Lingga seperti regalia kerajaan, manuskrip, dan meriam kuno. Audio mengisahkan silsilah kebangsawanan dan sistem hukum kerajaan Melayu Lingga.",
    image: img(slug("Museum Linggam Cahya")), price: "Rp 5.000", rating: 4.4, duration: "1 Jam", listeners: "1.1k",
  },
  {
    id: slug("Kampung Tua Penyengat"), title: "Kampung Tua & Kampong Bugis", city: "Tanjungpinang", province: "Kepulauan Riau", region: "Sumatra", category: "desa-adat",
    description: "Pemukiman rumah pelantar kayu di atas laut tempat bermukimnya suku pelaut Bugis dan Melayu sejak ratusan tahun. Audio guide menceritakan integrasi budaya Bugis-Melayu dalam mengarungi laut Kepulauan Riau.",
    image: img(slug("Kampung Tua Penyengat")), price: "Gratis", rating: 4.5, duration: "1-2 Jam", listeners: "1.6k",
  },
  {
    id: slug("Prasasti Pasir Panjang"), title: "Situs Prasasti Pasir Panjang", city: "Karimun", province: "Kepulauan Riau", region: "Sumatra", category: "candi",
    description: "Prasasti batu alam berhuruf Devanagari peninggalan Mahayana abad ke-9 di tepi pantai pulau Karimun. Cerita audio mengurai pesan pemujaan Mahayana dan peran pulau Karimun dalam pelayaran kuno.",
    image: img(slug("Prasasti Pasir Panjang")), price: "Gratis", rating: 4.1, duration: "1 Jam", listeners: "530",
  },
  {
    id: slug("Geopark Natuna"), title: "Geopark Natuna (Batu Alif)", city: "Natuna", province: "Kepulauan Riau", region: "Sumatra", category: "alam",
    description: "Taman batu granit megah raksasa purba berusia ratusan juta tahun di pulau terluar Natuna. Panduan suara menjelaskan proses pembentukan geologi benua kuno Sundaland dan sejarah maritim perbatasan Natuna.",
    image: img(slug("Geopark Natuna")), price: "Gratis", rating: 4.8, duration: "2 Jam", listeners: "2.4k",
  },
  {
    id: slug("Muaro Jambi Ekstra"), title: "Kawasan Candi Muaro Jambi", city: "Muaro Jambi", province: "Jambi", region: "Sumatra", category: "candi",
    description: "Kompleks peradaban percandian bata terbesar di Asia Tenggara seluas 3.981 hektar peninggalan Kedatuan Sriwijaya & Melayu Kuno. Audio menuntun penjelajahan Candi Tinggi, Gumpung, dan sejarah Universitas Buddha purba.",
    image: img(slug("Muaro Jambi Ekstra")), price: "Rp 10.000", rating: 4.8, duration: "2-3 Jam", listeners: "14.2k", isPopular: true,
  },
  {
    id: slug("Museum Siginjei"), title: "Museum Siginjei", city: "Jambi", province: "Jambi", region: "Sumatra", category: "museum",
    description: "Museum penyimpan pusaka Keris Siginjei, arca Avalokitesvara emas, serta koleksi etnografi budaya Jambi. Audio guide menerangkan silsilah Kesultanan Jambi dan akulturasi budaya pedalaman dengan pesisir.",
    image: img(slug("Museum Siginjei")), price: "Rp 5.000", rating: 4.5, duration: "1-2 Jam", listeners: "2.7k",
  },
  {
    id: slug("Rumah Lamo Senamat"), title: "Desa Wisata Rumah Lamo Senamat", city: "Bungo", province: "Jambi", region: "Sumatra", category: "desa-adat",
    description: "Desa budaya yang melestarikan arsitektur Rumah Lamo kayu tiang tinggi dan tradisi lisan pantun batin. Audio guide membawakan dongeng rakyat marga peradaban kuno suku Anak Dalam dan suku Jambi Seberang.",
    image: img(slug("Rumah Lamo Senamat")), price: "Gratis", rating: 4.3, duration: "1-2 Jam", listeners: "760",
  },
  {
    id: slug("Masjid Seribu Tiang Jambi"), title: "Masjid Agung Al-Falah", city: "Jambi", province: "Jambi", region: "Sumatra", category: "religi",
    description: "Masjid tanpa dinding dengan pilar-pilar besi megah yang berdiri di atas situs bekas Istana Sultan Thaha Syaifuddin. Panduan suara menceritakan perlawanan Sultan Thaha melawan penjajahan kolonial Belanda.",
    image: img(slug("Masjid Seribu Tiang Jambi")), price: "Gratis", rating: 4.7, duration: "1 Jam", listeners: "6.1k", isPopular: true,
  },
  {
    id: slug("Candi Solok Sipin"), title: "Situs Candi Solok Sipin", city: "Jambi", province: "Jambi", region: "Sumatra", category: "candi",
    description: "Situs reruntuhan candi Hindu-Buddha tempat ditemukannya Stupa batu dan Arca Buddha besar di pemukiman padat kota Jambi. Audio membedah keterkaitan situs ini dengan jaringan Candi Muaro Jambi.",
    image: img(slug("Candi Solok Sipin")), price: "Gratis", rating: 4.0, duration: "1 Jam", listeners: "980",
  },
  {
    id: slug("Rumah Batu Olak Kemang"), title: "Rumah Batu Olak Kemang", city: "Jambi", province: "Jambi", region: "Sumatra", category: "sejarah",
    description: "Bangunan kuno perpaduan arsitektur Arab, Tionghoa, dan Melayu abad ke-19 milik ulama Pangeran Wiro Kusumo. Audio menceritakan sejarah penyebaran Islam dan jalur perdagangan di Jambi Seberang Kota.",
    image: img(slug("Rumah Batu Olak Kemang")), price: "Gratis", rating: 4.4, duration: "1 Jam", listeners: "1.3k",
  },
  {
    id: slug("Geopark Merangin"), title: "Geopark Merangin - Fosil Flora", city: "Merangin", province: "Jambi", region: "Sumatra", category: "alam",
    description: "Situs warisan dunia UNESCO yang menyimpan fosil flora Araucarioxylon membatu berusia 300 juta tahun di tebing sungai. Audio menceritakan keajaiban geologi zaman Permian tertua di Asia Tenggara.",
    image: img(slug("Geopark Merangin")), price: "Rp 20.000", rating: 4.8, duration: "2-3 Jam", listeners: "3.9k", isPopular: true,
  },
  {
    id: slug("Desa Lempur Danau Kaco"), title: "Desa Adat Lempur & Danau Kaco", city: "Kerinci", province: "Jambi", region: "Sumatra", category: "alam",
    description: "Desa adat di bentang alam Kerinci yang menjaga hutan adat kuno serta telaga bening bercahaya kebiruan. Audio menceritakan kearifan lokal hukum adat incung Kerinci serta legenda danau kaca.",
    image: img(slug("Desa Lempur Danau Kaco")), price: "Rp 15.000", rating: 4.7, duration: "2-3 Jam", listeners: "5.1k",
  },
  {
    id: slug("Taman Arkeologi Sriwijaya"), title: "Taman Arkeologi Sriwijaya", city: "Palembang", province: "Sumatera Selatan", region: "Sumatra", category: "candi",
    description: "Situs jaringan kanal dan pulau buatan abad ke-7 yang diyakini sebagai pusat pemukiman bahari Kedatuan Sriwijaya. Audio guide mengajak penelusuran kanal kuno dan penemuan prasasti bersejarah.",
    image: img(slug("Taman Arkeologi Sriwijaya")), price: "Rp 5.000", rating: 4.5, duration: "1-2 Jam", listeners: "5.3k", isPopular: true,
  },
  {
    id: slug("Megalit Tinggihari"), title: "Kompleks Megalitikum Tinggihari", city: "Lahat", province: "Sumatera Selatan", region: "Sumatra", category: "candi",
    description: "Situs ribuan arca batu megalit berwujud manusia memeluk gajah dan batu lumpang dari masa 3.000 tahun SM. Panduan suara menjelaskan peradaban batu tua dan kepercayaan animisme kuno di dataran Pasemah.",
    image: img(slug("Megalit Tinggihari")), price: "Rp 5.000", rating: 4.6, duration: "2 Jam", listeners: "1.8k",
  },
  {
    id: slug("Museum SMB II"), title: "Museum Sultan Mahmud Badaruddin II", city: "Palembang", province: "Sumatera Selatan", region: "Sumatra", category: "museum",
    description: "Museum bekas kediaman Sultan dan benteng kolonial di tepi Sungai Musi penyimpan artefak tekstil Kain Songket dan mata uang kuno. Rekaman audio mengisahkan perang Palembang melawan armada Inggris dan Belanda.",
    image: img(slug("Museum SMB II")), price: "Rp 5.000", rating: 4.6, duration: "1-2 Jam", listeners: "8.7k", isPopular: true,
  },
  {
    id: slug("Desa Besemah"), title: "Desa Adat Baghi Besemah", city: "Pagar Alam", province: "Sumatera Selatan", region: "Sumatra", category: "desa-adat",
    description: "Desa adat Suku Besemah yang melestarikan Rumah Baghi kayu bertiang tanpa paku dengan ukiran motif lekok tumbuhan. Audio guide menceritakan falsafah hidup Guritan dan hubungan erat warga dengan Gunung Dempo.",
    image: img(slug("Desa Besemah")), price: "Gratis", rating: 4.5, duration: "1-2 Jam", listeners: "1.2k",
  },
  {
    id: slug("Masjid Ki Marogan"), title: "Masjid Kuno Ki Marogan", city: "Palembang", province: "Sumatera Selatan", region: "Sumatra", category: "religi",
    description: "Masjid bersejarah abad ke-19 di muara Sungai Ogan yang didirikan oleh ulama besar Palembang. Panduan audio menceritakan peranannya dalam dakwah dan jaringan perdagangan kayu.",
    image: img(slug("Masjid Ki Marogan")), price: "Gratis", rating: 4.7, duration: "1 Jam", listeners: "3.4k",
  },
  {
    id: slug("Benteng Kuto Besak"), title: "Benteng Kuto Besak", city: "Palembang", province: "Sumatera Selatan", region: "Sumatra", category: "sejarah",
    description: "Benteng keraton bata abad ke-18 karya asli bangsa Melayu Palembang tanpa bantuan arsitek Eropa. Panduan audio membedah arsitektur benteng pertahanan tepi sungai Musi dan masa keruntuhan kesultanan.",
    image: img(slug("Benteng Kuto Besak")), price: "Gratis", rating: 4.6, duration: "1-2 Jam", listeners: "14.9k", isPopular: true,
  },
  {
    id: slug("Candi Bumi Ayu"), title: "Candi Bumi Ayu", city: "Penukal Abab Lematang Ilir", province: "Sumatera Selatan", region: "Sumatra", category: "candi",
    description: "Kompleks candi Hindu terbesar di Sumatera Selatan abad ke-9 hingga 13 yang terletak di pesisir Sungai Lematang. Audio guide menguraikan arsitektur bata merah, relief Shiwa, dan kejayaan masa pra-Islam.",
    image: img(slug("Candi Bumi Ayu")), price: "Rp 5.000", rating: 4.5, duration: "1-2 Jam", listeners: "2.3k",
  },
  {
    id: slug("Danau Ranau Seminung"), title: "Danau Ranau & Gunung Seminung", city: "OKU Selatan", province: "Sumatera Selatan", region: "Sumatra", category: "alam",
    description: "Danau vulkanik tektovulkanik terbesar kedua di Sumatra yang terbentuk dari letusan dahsyat gunung purba. Narasi audio mendiskusikan geologi pembentukan danau serta mitos legenda si Pahit Lidah.",
    image: img(slug("Danau Ranau Seminung")), price: "Rp 10.000", rating: 4.7, duration: "2 Jam", listeners: "4.1k",
  },
  {
    id: slug("Fort Marlborough Ekstra"), title: "Benteng Marlborough", city: "Bengkulu", province: "Bengkulu", region: "Sumatra", category: "sejarah",
    description: "Benteng pertahanan Kongsi Dagang Inggris (EIC) abad ke-18 terbesar di Asia Tenggara yang berbentuk kura-kura. Narasi audio mengisahkan memori pendudukan Inggris dan penjara pengasingan Bung Karno.",
    image: img(slug("Fort Marlborough Ekstra")), price: "Rp 10.000", rating: 4.7, duration: "1-2 Jam", listeners: "11.8k", isPopular: true,
  },
  {
    id: slug("Rumah Pengasingan Bung Karno Bengkulu"), title: "Rumah Pengasingan Bung Karno", city: "Bengkulu", province: "Bengkulu", region: "Sumatra", category: "sejarah",
    description: "Kediaman bergaya Tionghoa-Eropa tempat Ir. Soekarno diasingkan oleh Pemerintah Kolonial Belanda tahun 1938-1942. Audio guide menceritakan pemikiran perjuangan, koleksi buku, dan kisah asmara dengan Fatmawati.",
    image: img(slug("Rumah Pengasingan Bung Karno Bengkulu")), price: "Rp 5.000", rating: 4.7, duration: "1 Jam", listeners: "9.5k", isPopular: true,
  },
  {
    id: slug("Museum Negeri Bengkulu"), title: "Museum Negeri Bengkulu", city: "Bengkulu", province: "Bengkulu", region: "Sumatra", category: "museum",
    description: "Museum penyimpan naskah kuno Ka-Ga-Nga berbahan kulit kayu, senjata tradisional kain Besurek, dan perhiasan suku Rejang. Panduan suara membimbing penelusuran identitas etnis suku-suku asli Bengkulu.",
    image: img(slug("Museum Negeri Bengkulu")), price: "Rp 5.000", rating: 4.3, duration: "1 Jam", listeners: "1.4k",
  },
  {
    id: slug("Desa Rejang Gunung Bermani"), title: "Desa Adat Rejang Gunung Bermani", city: "Rejang Lebong", province: "Bengkulu", region: "Sumatra", category: "desa-adat",
    description: "Desa kebudayaan Suku Rejang yang memelihara tata aturan hukum adat, Rumah Panggung Kejei, dan tarian sakral Kejei. Audio menceritakan mitos asal usul Empat Petulai Suku Rejang.",
    image: img(slug("Desa Rejang Gunung Bermani")), price: "Gratis", rating: 4.4, duration: "1-2 Jam", listeners: "890",
  },
  {
    id: slug("Masjid Jamik Bengkulu"), title: "Masjid Jamik Bengkulu", city: "Bengkulu", province: "Bengkulu", region: "Sumatra", category: "religi",
    description: "Masjid berarsitektur atap bertingkat tiga yang dirancang langsung oleh Ir. Soekarno saat pengasingan di Bengkulu. Audio guide menerangkan perpaduan nilai arsitektur Minangkabau-Jawa dan sentuhan seni Bung Karno.",
    image: img(slug("Masjid Jamik Bengkulu")), price: "Gratis", rating: 4.6, duration: "1 Jam", listeners: "3.1k",
  },
  {
    id: slug("Bukit Kaba"), title: "Taman Wisata Alam Bukit Kaba", city: "Rejang Lebong", province: "Bengkulu", region: "Sumatra", category: "alam",
    description: "Gunung api aktif berpuncak kawah kembar hijau kebiruan dan kawah hidup yang mempesona. Panduan suara mengedukasi sejarah vulkanologi Gunung Kaba serta mitos Muning Raib masyarakat lokal.",
    image: img(slug("Bukit Kaba")), price: "Rp 10.000", rating: 4.6, duration: "2-3 Jam", listeners: "4.2k",
  },
  {
    id: slug("Pugung Raharjo"), title: "Situs Keruman Pugung Raharjo", city: "Lampung Timur", province: "Lampung", region: "Sumatra", category: "candi",
    description: "Taman purbakala unik berpagar benteng tanah yang memuat punden berundak megalitikum, keramik Dinasti Han, hingga sisa candi Hindu-Buddha. Audio memandu napak tilas evolusi peradaban 3 zaman di Lampung.",
    image: img(slug("Pugung Raharjo")), price: "Rp 5.000", rating: 4.6, duration: "2 Jam", listeners: "3.9k", isPopular: true,
  },
  {
    id: slug("Museum Ruwa Jurai"), title: "Museum Ruwa Jurai", city: "Bandar Lampung", province: "Lampung", region: "Sumatra", category: "museum",
    description: "Pusat koleksi etnografi budaya Lampung yang memamerkan kain Tapis benang emas hias, perahu Behabang, dan senjata kuno. Audio guide menceritakan keanekaragaman budaya dua pilar Saibatin dan Pepadun.",
    image: img(slug("Museum Ruwa Jurai")), price: "Rp 5.000", rating: 4.4, duration: "1-2 Jam", listeners: "2.8k",
  },
  {
    id: slug("Desa Adat Kenali"), title: "Desa Adat Kenali", city: "Lampung Barat", province: "Lampung", region: "Sumatra", category: "desa-adat",
    description: "Desa kuno suku Lampung Saibatin yang dipenuhi Rumah Panggung kayu (Lamban Pesagi) berusia lebih dari 200 tahun. Narasi audio mendeskripsikan struktur adat kebangsawanan suku Lampung coastal.",
    image: img(slug("Desa Adat Kenali")), price: "Gratis", rating: 4.5, duration: "1-2 Jam", listeners: "1.1k",
  },
  {
    id: slug("Menara Siger Ekstra"), title: "Menara Siger", city: "Lampung Selatan", province: "Lampung", region: "Sumatra", category: "sejarah",
    description: "Bangunan titik nol Sumatra berpuncak mahkota adat Tapis Lampung berwarna kuning keemasan. Narasi audio mengisahkan titik gerbang utama ekspedisi Sumatra dan simbol kebanggaan masyarakat Lampung.",
    image: img(slug("Menara Siger Ekstra")), price: "Rp 15.000", rating: 4.5, duration: "1-2 Jam", listeners: "12.7k", isPopular: true,
  },
  {
    id: slug("Masjid Kuta Penyu"), title: "Masjid Kuno Kuta Penyu", city: "Lampung Timur", province: "Lampung", region: "Sumatra", category: "religi",
    description: "Masjid tertua di tanah Lampung yang didirikan tokoh pahlawan lokal Minak Pati Pejurit abad ke-16. Audio guide membagikan kisah penyebaran ajaran Islam diawali dari pesisir Teluk Lampung.",
    image: img(slug("Masjid Kuta Penyu")), price: "Gratis", rating: 4.3, duration: "1 Jam", listeners: "780",
  },
  {
    id: slug("Prasasti Palas Pasemah"), title: "Situs Prasasti Batu Tulis Palas Pasemah", city: "Lampung Selatan", province: "Lampung", region: "Sumatra", category: "candi",
    description: "Prasasti batu alam berhuruf Pallawa abad ke-7 berisi sumpah kutukan Kesultanan Sriwijaya untuk wilayah Lampung selatan. Audio menerangkan ekspansi kekuasaan maritim Sriwijaya menguasai Selat Sunda.",
    image: img(slug("Prasasti Palas Pasemah")), price: "Gratis", rating: 4.2, duration: "1 Jam", listeners: "950",
  },
  {
    id: slug("Keramikan Suoh"), title: "Kawah Keramikan Suoh", city: "Lampung Barat", province: "Lampung", region: "Sumatra", category: "alam",
    description: "Kawasan geothermal aktif dengan hamparan kerak kalsium putih menyerupai ubin keramik alami di dekat telaga sulfur. Audio guide menguraikan fenomena geologi vulkanik sistem geothermal Suoh.",
    image: img(slug("Keramikan Suoh")), price: "Rp 10.000", rating: 4.6, duration: "2 Jam", listeners: "2.6k",
  },
  {
    id: slug("Way Kambas Ekstra"), title: "TN Way Kambas - Konservasi Gajah", city: "Lampung Timur", province: "Lampung", region: "Sumatra", category: "alam",
    description: "Kawasan perlindungan suaka margasatwa tertua tempat pelatihan dan perlindungan Gajah Sumatra dan Badak Sumatra. Audio mengedukasi seputar konflik manusia-satwa dan upaya konservasi habitat fauna.",
    image: img(slug("Way Kambas Ekstra")), price: "Rp 20.000", rating: 4.7, duration: "2-3 Jam", listeners: "10.1k", isPopular: true,
  },
  {
    id: slug("Museum Timah Pangkalpinang"), title: "Museum Timah Indonesia", city: "Pangkalpinang", province: "Kepulauan Bangka Belitung", region: "Sumatra", category: "museum",
    description: "Satu-satunya museum pertambangan timah di Asia yang menempati rumah dinas pertambangan era kolonial Belanda abad ke-19. Audio guide memandu sejarah eksploitasi timah serta gelombang migrasi penambang Tionghoa.",
    image: img(slug("Museum Timah Pangkalpinang")), price: "Gratis", rating: 4.5, duration: "1-2 Jam", listeners: "4.8k", isPopular: true,
  },
  {
    id: slug("Pesanggrahan Menumbing"), title: "Pesanggrahan Menumbing", city: "Bangka Barat", province: "Kepulauan Bangka Belitung", region: "Sumatra", category: "sejarah",
    description: "Bangunan peristirahatan di puncak bukit tempat pengasingan tokoh bangsa termasuk Soekarno dan Hatta tahun 1948-1949. Audio menceritakan siasat diplomasi memperjuangkan kedaulatan Indonesia.",
    image: img(slug("Pesanggrahan Menumbing")), price: "Rp 10.000", rating: 4.7, duration: "1-2 Jam", listeners: "6.3k", isPopular: true,
  },
  {
    id: slug("Kota Kapur"), title: "Situs Prasasti Kota Kapur", city: "Bangka", province: "Kepulauan Bangka Belitung", region: "Sumatra", category: "candi",
    description: "Situs ditemukannya prasasti batu bertuliskan Melayu Kuno abad ke-7 yang menjadi bukti awal keberadaan Kerajaan Sriwijaya. Narasi audio menguraikan penemuan bersejarah dunia.",
    image: img(slug("Kota Kapur")), price: "Gratis", rating: 4.3, duration: "1-2 Jam", listeners: "1.7k",
  },
  {
    id: slug("Suku Lom Gedong"), title: "Desa Adat Suku Lom (Gedong)", city: "Bangka", province: "Kepulauan Bangka Belitung", region: "Sumatra", category: "desa-adat",
    description: "Pemukiman tradisional suku asli pulau Bangka yang masih memegang teguh adat kepercayaan animisme purba Mapur. Audio guide membagikan kisah kearifan ramuan obat hutan dan tabu adat kuno Suku Lom.",
    image: img(slug("Suku Lom Gedong")), price: "Gratis", rating: 4.4, duration: "1-2 Jam", listeners: "920",
  },
  {
    id: slug("Klenteng Kwan Tie Miau"), title: "Klenteng Kwan Tie Miau", city: "Pangkalpinang", province: "Kepulauan Bangka Belitung", region: "Sumatra", category: "religi",
    description: "Klenteng tertua di Pulau Bangka yang didirikan pertengahan abad ke-19 sebagai pusat spiritual komunitas Hakka. Panduan suara menjelaskan arsitektur ukiran naga, tradisi Sembahyang Rebut, dan sejarah peradaban Tionghoa.",
    image: img(slug("Klenteng Kwan Tie Miau")), price: "Gratis", rating: 4.6, duration: "1 Jam", listeners: "2.3k",
  },
  {
    id: slug("Nam Salu Kelapa Kampit"), title: "Open Pit Nam Salu Kelapa Kampit", city: "Belitung Timur", province: "Kepulauan Bangka Belitung", region: "Sumatra", category: "alam",
    description: "Situs geosite kawah raksasa bekas tambang timah dalam terbesar di Asia Tenggara yang kini membentuk danau hijau kramat. Panduan audio menerangkan geologi dan sejarah penambangan bawah tanah era kolonial.",
    image: img(slug("Nam Salu Kelapa Kampit")), price: "Rp 15.000", rating: 4.6, duration: "2 Jam", listeners: "3.5k",
  },
  {
    id: slug("Masjid Jamik Muntok"), title: "Masjid Jamik Muntok", city: "Bangka Barat", province: "Kepulauan Bangka Belitung", region: "Sumatra", category: "religi",
    description: "Masjid bersejarah tahun 1883 yang berdiri berdampingan harmonis dengan Klenteng Kung Fuk Miauw di Kota Tua Muntok. Audio guide mengisahkan kerukunan antar-etnis Melayu dan Tionghoa.",
    image: img(slug("Masjid Jamik Muntok")), price: "Gratis", rating: 4.6, duration: "1 Jam", listeners: "1.4k",
  },
  {
    id: slug("Museum Kata Ekstra"), title: "Museum Kata Andrea Hirata", city: "Belitung Timur", province: "Kepulauan Bangka Belitung", region: "Sumatra", category: "museum",
    description: "Museum sastra kontemporer pertama di Indonesia yang menampilkan karya, kutipan inspiratif, dan fotografi terkait novel Laskar Pelangi. Audio membimbing pengunjung mengapresiasi pentingnya pendidikan dan dunia sastra.",
    image: img(slug("Museum Kata Ekstra")), price: "Rp 50.000", rating: 4.6, duration: "1-2 Jam", listeners: "8.9k", isPopular: true,
  },
]