import type { Destination } from "../types"

const img = (id: string) => `assets/destinations/${id}.jpg`
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export const malukuPapuaExtraDestinations: Destination[] = [
  {
    id: slug("Benteng Belgica"), title: "Benteng Belgica", city: "Banda Neira, Maluku Tengah", province: "Maluku", region: "Maluku & Papua", category: "sejarah",
    description: "Benteng berbentuk segi lima bundar peninggalan VOC abad ke-17 di Pulau Neira yang menyimpan memori monopoli rempah pala dunia. Pemandangan dari atas benteng menghadap Gunung Api Banda sangat spektakuler dan penuh hikayat sejarah geopolitik abad pertengahan.",
    image: img(slug("Benteng Belgica")), price: "Rp 20.000", rating: 4.8, duration: "1-2 Jam", listeners: "2.4K", isPopular: true,
  },
  {
    id: slug("Museum Siwalima"), title: "Museum Siwalima", city: "Ambon", province: "Maluku", region: "Maluku & Papua", category: "museum",
    description: "Museum pusat kebudayaan Maluku yang memamerkan kerajinan etnografi, kain tenun ikat, busana adat, miniatur perahu kora-kora, serta kerangka mamalia laut purba. Narasi audionya mengulas perpaduan nilai budaya Siwa dan Lima yang mendasari persaudaraan Maluku.",
    image: img(slug("Museum Siwalima")), price: "Rp 10.000", rating: 4.5, duration: "1-2 Jam", listeners: "1.1K",
  },
  {
    id: slug("Desa Negeri Sawai"), title: "Desa Adat Negeri Sawai", city: "Seram Utara, Maluku Tengah", province: "Maluku", region: "Maluku & Papua", category: "desa-adat",
    description: "Desa adat tertua di Pulau Seram yang terkenal dengan rumah-rumah terapung di atas sungai jernih dan laut dangkal. Audio guide menceritakan tradisi kelautan, cerita rakyat lokal, serta harmoni kehidupan masyarakat pesisir di kaki Tebing Sawai.",
    image: img(slug("Desa Negeri Sawai")), price: "Gratis", rating: 4.7, duration: "2-3 Jam", listeners: "950",
  },
  {
    id: slug("Benteng Ferhangi"), title: "Benteng Ferhangi", city: "Banda Neira, Maluku Tengah", province: "Maluku", region: "Maluku & Papua", category: "sejarah",
    description: "Sisa benteng pertama yang dibangun oleh bangsa Portugis pada dekade awal abad ke-16 sebelum jatuh ke tangan Belanda. Tempat ini sangat kuat membawa narasi sejarah persaingan awal bangsa Eropa dalam menguasai jalur rempah Kepulauan Banda.",
    image: img(slug("Benteng Ferhangi")), price: "Gratis", rating: 4.4, duration: "1 Jam", listeners: "520",
  },
  {
    id: slug("Desa Adat Hulaliu"), title: "Desa Adat Hulaliu", city: "Pulau Haruku, Maluku Tengah", province: "Maluku", region: "Maluku & Papua", category: "desa-adat",
    description: "Desa adat dengan kearifan lokal sistem Sasi (hukum adat perlindungan alam dan hasil bumi) yang masih dijalankan ketat. Audio panduan menelusuri tradisi Sasi laut dan darat serta sejarah perjuangan kapitan lokal melawan penjajahan.",
    image: img(slug("Desa Adat Hulaliu")), price: "Gratis", rating: 4.6, duration: "1-2 Jam", listeners: "410",
  },
  {
    id: slug("Kedaton Sultan Ternate"), title: "Istana Kesultanan Ternate", city: "Ternate", province: "Maluku Utara", region: "Maluku & Papua", category: "sejarah",
    description: "Kedaton megah berarsitektur khas Islam-Maluku di lereng Gunung Gamalama tempat bersemayamnya peninggalan Mahkota Berambut Sultan Ternate. Panduan audio menyajikan kisah kejayaan jalur cengkeh global dan sistem ketatanegaraan Kesultanan Ternate.",
    image: img(slug("Kedaton Sultan Ternate")), price: "Rp 15.000", rating: 4.7, duration: "1-2 Jam", listeners: "1.8K", isPopular: true,
  },
  {
    id: slug("Benteng Tolukko Ekstra"), title: "Benteng Tolukko", city: "Ternate", province: "Maluku Utara", region: "Maluku & Papua", category: "sejarah",
    description: "Benteng pertahanan Portugis abad ke-16 yang berdiri anggun di atas bukit batu karang menghadap Pulau Tidore. Narasi audio memaparkan fungsi benteng ini sebagai pos pengintai lalu lintas perdagangan cengkeh serta perlindungan Sultan Ternate.",
    image: img(slug("Benteng Tolukko Ekstra")), price: "Rp 10.000", rating: 4.6, duration: "1 Jam", listeners: "1.2K",
  },
  {
    id: slug("Kedaton Kesultanan Tidore"), title: "Kedaton Kesultanan Tidore", city: "Tidore Kepulauan", province: "Maluku Utara", region: "Maluku & Papua", category: "sejarah",
    description: "Pusat pemerintahan sejarah Kesultanan Tidore yang pernah menguasai wilayah melintasi daratan Papua Barat. Narasi audionya memuat kisah diplomasi kepahlawanan Sultan Nuku dan kejayaan rempah-rempah Kepulauan Tidore.",
    image: img(slug("Kedaton Kesultanan Tidore")), price: "Rp 10.000", rating: 4.6, duration: "1-2 Jam", listeners: "890",
  },
  {
    id: slug("Benteng Kalamata"), title: "Benteng Kalamata", city: "Ternate", province: "Maluku Utara", region: "Maluku & Papua", category: "sejarah",
    description: "Benteng unik berbentuk empat sudut menyerupai kelopak bunga yang dibangun Portugis dan diperebutkan oleh Spanyol serta Belanda. Audio guide menjelaskan taktik peperangan maritim dan desain arsitektur militer kolonial abad ke-17.",
    image: img(slug("Benteng Kalamata")), price: "Rp 10.000", rating: 4.5, duration: "1 Jam", listeners: "760",
  },
  {
    id: slug("Museum Moloku Kie Raha"), title: "Museum Kerajaan Moloku Kie Raha", city: "Ternate", province: "Maluku Utara", region: "Maluku & Papua", category: "museum",
    description: "Museum yang menyimpan artefak kelautan, silsilah empat kerajaan rempah (Ternate, Tidore, Jailolo, Bacan), serta perhiasan adat kuno. Audio panduan membawa pengunjung menyelami kebudayaan perserikatan empat gunung (Moloku Kie Raha).",
    image: img(slug("Museum Moloku Kie Raha")), price: "Rp 10.000", rating: 4.4, duration: "1-2 Jam", listeners: "510",
  },
  {
    id: slug("Museum Loka Budaya Uncen"), title: "Museum Loka Budaya Uncen", city: "Jayapura", province: "Papua", region: "Maluku & Papua", category: "museum",
    description: "Museum etnografi terlengkap di Jayapura yang menyimpan ukiran kayu Asmat, alat musik tifa, pakaian serat kayu, serta benda sakral suku-suku Papua. Audio guide mengulas kosmologi, simbolisme seni, dan keanekaragaman budaya Papua.",
    image: img(slug("Museum Loka Budaya Uncen")), price: "Rp 10.000", rating: 4.6, duration: "1-2 Jam", listeners: "1.3K", isPopular: true,
  },
  {
    id: slug("Kampung Adat Enggros"), title: "Kampung Adat Enggros", city: "Teluk Youtefa, Jayapura", province: "Papua", region: "Maluku & Papua", category: "desa-adat",
    description: "Kampung adat terapung di tengah Teluk Youtefa yang terkenal dengan rumah di atas air dan struktur pemerintahan adat yang dipimpin Ondoafi. Audio menceritakan kearifan lokal konservasi hutan bakau serta sejarah permukiman kuno pesisir Jayapura.",
    image: img(slug("Kampung Adat Enggros")), price: "Gratis", rating: 4.6, duration: "2 Jam", listeners: "780",
  },
  {
    id: slug("Teluk Cenderawasih Nabire"), title: "TN Teluk Cenderawasih - Kultur Pesisir", city: "Nabire", province: "Papua", region: "Maluku & Papua", category: "alam",
    description: "Kawasan konservasi laut terbesar yang kaya akan hubungan spiritual antara masyarakat adat pesisir Papua dan hiu paus. Panduan audio menceritakan mitos lokal, tradisi nelayan adat, serta ekologi maritim Teluk Cenderawasih.",
    image: img(slug("Teluk Cenderawasih Nabire")), price: "Rp 20.000", rating: 4.8, duration: "3+ Jam", listeners: "1.5K", isPopular: true,
  },
  {
    id: slug("Situs Megalitikum Tutari"), title: "Situs Megalitikum Tutari", city: "Jayapura", province: "Papua", region: "Maluku & Papua", category: "sejarah",
    description: "Situs arkeologi penting berisikan batu-batu lukis prasejarah di atas perbukitan tepi Danau Sentani yang menggambarkan bentuk hewan dan kehidupan suku purba. Audio guide memandu cerita mengenai misteri seni cadas dan migrasi manusia pra-sejarah di Papua.",
    image: img(slug("Situs Megalitikum Tutari")), price: "Gratis", rating: 4.5, duration: "1-2 Jam", listeners: "640",
  },
  {
    id: slug("Perang Dunia II Yapen"), title: "Situs Peninggalan PD II Pulau Yapen", city: "Kepulauan Yapen", province: "Papua", region: "Maluku & Papua", category: "sejarah",
    description: "Kawasan bersejarah yang menyimpan sisa-sisa pos komando sekutu, bunker tentara Jepang, dan bangkai pesawat tempur dari masa Perang Pasifik. Audio guide menyajikan peristiwa dramatis pertempuran udara dan laut di Pasifik Selatan tahun 1944.",
    image: img(slug("Perang Dunia II Yapen")), price: "Gratis", rating: 4.4, duration: "1-2 Jam", listeners: "430",
  },
  {
    id: slug("Biak Gua Binsari MacArthur"), title: "Situs Sekutu & Jenderal MacArthur", city: "Biak Numfor", province: "Papua Barat", region: "Maluku & Papua", category: "sejarah",
    description: "Monumen dan kompleks Gua Binsari di Biak yang menjadi saksi pertempuran sengit pasukan Amerika Serikat di bawah perintah Jenderal Douglas MacArthur melawan tentara Jepang. Narasi audio menceritakan taktik militer dan sejarah Perang Pasifik.",
    image: img(slug("Biak Gua Binsari MacArthur")), price: "Rp 15.000", rating: 4.6, duration: "1-2 Jam", listeners: "1.1K",
  },
  {
    id: slug("Pulau Mansinam"), title: "Situs Peninggalan Alkitab Pulau Mansinam", city: "Manokwari", province: "Papua Barat", region: "Maluku & Papua", category: "religi",
    description: "Pulau bersejarah tempat pendaratan pertama misionaris Eropa Ottow dan Geissler pada tahun 1855 yang menjadi titik awal peradaban modern dan keagamaan di Papua. Audio guide mengulas kisah sejarah masuknya pendidikan formal dan sosial budayanya.",
    image: img(slug("Pulau Mansinam")), price: "Gratis", rating: 4.7, duration: "2 Jam", listeners: "1.4K", isPopular: true,
  },
  {
    id: slug("Kokas Cap Tangan"), title: "Situs Cap Tangan Prasejarah Kokas", city: "Fakfak", province: "Papua Barat", region: "Maluku & Papua", category: "sejarah",
    description: "Tebing-tebing batu kapur di pesisir Kokas yang dipenuhi lukisan cadas cap tangan berwarna merah misterius dari ribuan tahun lalu. Audio guide menceritakan teori asal usul lukisan prasejarah ini serta ikatan magisnya dengan suku pesisir Fakfak.",
    image: img(slug("Kokas Cap Tangan")), price: "Gratis", rating: 4.7, duration: "2 Jam", listeners: "870",
  },
  {
    id: slug("Kampung Ransiki"), title: "Kampung Adat Ransiki", city: "Manokwari Selatan", province: "Papua Barat", region: "Maluku & Papua", category: "desa-adat",
    description: "Desa budaya tempat berdiamnya suku Sougb yang mengelola kebun kakao kearifan lokal di kaki Pegunungan Arfak. Audio guide menjelaskan tradisi rumah kaki seribu (Ig Ya) dan kearifan lokal pengelolaan hutan adat suku Sougb.",
    image: img(slug("Kampung Ransiki")), price: "Gratis", rating: 4.5, duration: "2 Jam", listeners: "530",
  },
  {
    id: slug("Kampung Sawinggrai"), title: "Kampung Adat Sawinggrai", city: "Raja Ampat", province: "Papua Barat Daya", region: "Maluku & Papua", category: "desa-adat",
    description: "Kampung adat pesisir tempat tinggal suku Maya yang terkenal dengan habitat burung Cenderawasih Merah (Paradisaea rubra). Panduan audio menuntun wisatawan mendengarkan tarian ritual adat serta filosofi pemeliharaan satwa langka yang diajarkan turun-temurun.",
    image: img(slug("Kampung Sawinggrai")), price: "Gratis", rating: 4.8, duration: "2-3 Jam", listeners: "2.1K", isPopular: true,
  },
  {
    id: slug("Kampung Arborek"), title: "Kampung Adat Arborek", city: "Raja Ampat", province: "Papua Barat Daya", region: "Maluku & Papua", category: "desa-adat",
    description: "Desa pelopor wisata berbasis masyarakat adat yang mempertahankan kerajinan anyaman topi noken bertanduk dan tarian tradisional. Narasi audio mengungkap kehidupan sosial masyarakat bahari Raja Ampat serta upaya penangkaran konservasi alam bawah laut.",
    image: img(slug("Kampung Arborek")), price: "Gratis", rating: 4.7, duration: "2 Jam", listeners: "1.7K",
  },
  {
    id: slug("Kampung Malagufuk"), title: "Kampung Adat Malagufuk", city: "Sorong", province: "Papua Barat Daya", region: "Maluku & Papua", category: "desa-adat",
    description: "Desa hutan adat suku Moi yang terpencil di pedalaman hutan hujan tropis Sorong. Audio guide membawa pengalaman unik mendengarkan kisah kehidupan suku Moi yang memanfaatkan obat-obatan herbal alami dan menjaga kedaulatan hutan mereka.",
    image: img(slug("Kampung Malagufuk")), price: "Gratis", rating: 4.6, duration: "2-3 Jam", listeners: "680",
  },
  {
    id: slug("Museum Asmat Agats"), title: "Museum Kebudayaan Suku Asmat", city: "Agats, Asmat", province: "Papua Selatan", region: "Maluku & Papua", category: "museum",
    description: "Museum etno-arkeologi paling penting di Agats yang menampilkan koleksi patung ukir Bisj, perahu lesung adat, dan perisai perang sakral suku Asmat. Audio guide membedah makna spiritual setiap ukiran kayu yang menghubungkan dunia manusia dengan roh leluhur.",
    image: img(slug("Museum Asmat Agats")), price: "Rp 15.000", rating: 4.8, duration: "1-2 Jam", listeners: "1.9K", isPopular: true,
  },
  {
    id: slug("Desa Ukir Syuru Asmat"), title: "Desa Adat Bis Agats & Kampung Ukir Syuru", city: "Agats, Asmat", province: "Papua Selatan", region: "Maluku & Papua", category: "desa-adat",
    description: "Kampung di atas papan kayu tempat pengukir Asmat melahirkan karya pahatan kayu yang diakui UNESCO. Audio guide memandu pendengar menyusuri lorong-lorong kayu seraya mendengarkan kisah mistis di balik proses pemahatan kayu tanpa pola rancangan awal.",
    image: img(slug("Desa Ukir Syuru Asmat")), price: "Gratis", rating: 4.7, duration: "2 Jam", listeners: "1.2K",
  },
  {
    id: slug("Wasur Kawasan Kanume"), title: "Taman Nasional Wasur - Kawasan Kanume", city: "Merauke", province: "Papua Selatan", region: "Maluku & Papua", category: "alam",
    description: "Kawasan sabana luas yang sering dijuluki 'Serengeti Papua', menjadi rumah bagi suku adat Kanume, Marind, dan Mappi. Narasi audionya memuat sistem pemanfaatan lahan secara adat, legenda rumah semut raksasa (Musimub), dan interaksi suku lokal dengan lingkungan.",
    image: img(slug("Wasur Kawasan Kanume")), price: "Rp 20.000", rating: 4.7, duration: "3+ Jam", listeners: "1.6K", isPopular: true,
  },
  {
    id: slug("Rumah Adat Jew Asmat"), title: "Rumah Adat Jew Suku Asmat", city: "Asmat", province: "Papua Selatan", region: "Maluku & Papua", category: "desa-adat",
    description: "Rumah bujang adat Asmat berbahan kayu dan daun sagu yang menjadi pusat kehidupan politik, pendidikan adat, dan ritual kebudayaan para pemuda Asmat. Panduan audio menguraikan fungsi sakral Jew yang dilarang dimasuki wanita pada masa lalu saat ritual tertentu.",
    image: img(slug("Rumah Adat Jew Asmat")), price: "Gratis", rating: 4.8, duration: "1-2 Jam", listeners: "980",
  },
  {
    id: slug("Korowai Rumah Pohon"), title: "Desa Adat Korowai (Rumah Tinggi)", city: "Mappi", province: "Papua Selatan", region: "Maluku & Papua", category: "desa-adat",
    description: "Permukiman tradisional suku Korowai yang terkenal membangun rumah pohon (Luing) setinggi 15 hingga 50 meter di atas kanopi hutan. Audio guide memberikan wawasan menakjubkan tentang teknik arsitektur alami dan filosofi bertahan hidup dari ancaman alam.",
    image: img(slug("Korowai Rumah Pohon")), price: "Gratis", rating: 4.9, duration: "3+ Jam", listeners: "2.2K", isPopular: true,
  },
  {
    id: slug("Lorentz Amungme"), title: "TN Lorentz - Kawasan Amungme & Dani", city: "Mimika", province: "Papua Tengah", region: "Maluku & Papua", category: "alam",
    description: "Situs Warisan Dunia UNESCO dengan ekosistem terlengkap dari puncak salju tropis hingga laut. Panduan audionya membawa cerita keterikatan sakral suku Amungme terhadap gunung-gunung tinggi yang dianggap sebagai kepala tempat bersemayamnya roh leluhur.",
    image: img(slug("Lorentz Amungme")), price: "Rp 25.000", rating: 4.9, duration: "3+ Jam", listeners: "2.8K", isPopular: true,
  },
  {
    id: slug("Suku Mee Danau Paniai"), title: "Kampung Adat Suku Mee (Danau Paniai)", city: "Paniai", province: "Papua Tengah", region: "Maluku & Papua", category: "desa-adat",
    description: "Kawasan permukiman adat suku Mee di sekeliling Danau Paniai yang kaya akan norma adat 'Owae Katano' (mata uang kerang kowri/Mote). Audio guide menuturkan sejarah perdagangan kuno kerang serta sistem kekerabatan masyarakat dataran tinggi Paniai.",
    image: img(slug("Suku Mee Danau Paniai")), price: "Gratis", rating: 4.6, duration: "2 Jam", listeners: "740",
  },
  {
    id: slug("Karapao Suku Kamoro"), title: "Rumah Tradisional Karapao Suku Kamoro", city: "Mimika", province: "Papua Tengah", region: "Maluku & Papua", category: "desa-adat",
    description: "Bangunan adat tempat diselenggarakannya inisiasi pendewasaan pemuda suku Kamoro yang mendiami wilayah pesisir Mimika. Narasi audio memaparkan seni patung Mbitoro serta ritual tradisional penangkapan ikan dan sagu suku Kamoro.",
    image: img(slug("Karapao Suku Kamoro")), price: "Gratis", rating: 4.5, duration: "1-2 Jam", listeners: "560",
  },
  {
    id: slug("Museum Budaya Mimika"), title: "Museum Budaya Mimika", city: "Timika, Mimika", province: "Papua Tengah", region: "Maluku & Papua", category: "museum",
    description: "Museum daerah yang mengombinasikan benda budaya dari dua suku utama Mimika, yaitu Amungme di dataran tinggi dan Kamoro di dataran rendah pesisir. Audio guide mengulas kontras arsitektur, alat musik, dan cara hidup kedua suku tersebut.",
    image: img(slug("Museum Budaya Mimika")), price: "Rp 10.000", rating: 4.3, duration: "1 Jam", listeners: "410",
  },
  {
    id: slug("Kampung Obuntaku"), title: "Kampung Adat Obuntaku (Baduy Papua)", city: "Mamberamo Tengah", province: "Papua Pegunungan", region: "Maluku & Papua", category: "desa-adat",
    description: "Komunitas adat terisolasi yang menerapkan gaya hidup tertutup dan memegang teguh hukum isolasi tradisi seperti Suku Baduy di Jawa. Panduan audio mengulas kearifan penolakan modernisasi eksternal demi mempertahankan kesucian aturan hukum adat kuno.",
    image: img(slug("Kampung Obuntaku")), price: "Gratis", rating: 4.7, duration: "3+ Jam", listeners: "890",
  },
  {
    id: slug("Jiwika Mumi Aikima"), title: "Desa Adat Jiwika & Mumi Aikima", city: "Jayawijaya", province: "Papua Pegunungan", region: "Maluku & Papua", category: "desa-adat",
    description: "Desa adat suku Dani tempat bersemayamnya mumi panglima perang 'Wim Motok Mabel' yang diawetkan menggunakan asap ratusan tahun lalu. Audio guide menceritakan proses pengawetan mumi sakral, struktur rumah Honai, dan tarian pertempuran tradisional suku Dani.",
    image: img(slug("Jiwika Mumi Aikima")), price: "Rp 25.000", rating: 4.9, duration: "2 Jam", listeners: "3.1K", isPopular: true,
  },
  {
    id: slug("Kampung Soba Honai"), title: "Kampung Adat Soba (Honai & Ebeai)", city: "Jayawijaya", province: "Papua Pegunungan", region: "Maluku & Papua", category: "desa-adat",
    description: "Permukiman tradisional asli suku Dani yang dikelilingi kebun keladi dan pagar kayu di tengah keindahan Lembah Baliem. Narasi audio menjelaskan perbedaan filosofis antara Honai (rumah pria), Ebeai (rumah wanita), dan Wamai (kandang babi).",
    image: img(slug("Kampung Soba Honai")), price: "Gratis", rating: 4.8, duration: "2 Jam", listeners: "1.8K",
  },
  {
    id: slug("Goa Kontilola Ekstra"), title: "Situs Goa Kontilola", city: "Wamena, Jayawijaya", province: "Papua Pegunungan", region: "Maluku & Papua", category: "sejarah",
    description: "Gua alam kuno di lembah pegunungan yang dinding dalamnya memiliki lukisan cadas misterius bertubuh tinggi besar menyerupai manusia purba. Audio guide memandu ekspedisi menelusuri keajaiban geologi sekaligus mitos manusia pertama masyarakat Baliem.",
    image: img(slug("Goa Kontilola Ekstra")), price: "Rp 15.000", rating: 4.6, duration: "1-2 Jam", listeners: "1.1K",
  },
  {
    id: slug("Kampung Kurima Yali"), title: "Kampung Adat Kurima (Suku Yali)", city: "Yahukimo", province: "Papua Pegunungan", region: "Maluku & Papua", category: "desa-adat",
    description: "Desa tempat tinggal suku Yali yang dikenal dengan busana tradisional rok lingkaran rotan (Humi) serta rumah bulat kecil di lereng bukit curam. Panduan audio mengisahkan transisi budaya perang suku Yali menuju kehidupan kedamaian di dataran tinggi.",
    image: img(slug("Kampung Kurima Yali")), price: "Gratis", rating: 4.7, duration: "2-3 Jam", listeners: "920",
  },
]