import type { Destination } from "../types"

const img = (id: string) => `assets/destinations/${id}.jpg`
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export const jawaExtraDestinations: Destination[] = [
  {
    id: slug("Benteng Speelwijk"), title: "Benteng Speelwijk", city: "Serang", province: "Banten", region: "Jawa", category: "sejarah",
    description: "Reruntuhan benteng pertahanan VOC abad ke-17 yang menjadi saksi masuknya kekuasaan kolonial Belanda di Banten Lama. Narasi audio mengupas arsitektur benteng, ruang tahanan kolonial, serta dramatisasi konflik VOC dan Kesultanan Banten.",
    image: img(slug("Benteng Speelwijk")), price: "Gratis", rating: 4.4, duration: "1-2 Jam", listeners: "1.2k",
  },
  {
    id: slug("Vihara Avalokitesvara Banten"), title: "Vihara Avalokitesvara Banten", city: "Serang", province: "Banten", region: "Jawa", category: "religi",
    description: "Vihara tertua di Banten yang dibangun sejak era Sunan Gunung Jati sebagai simbol toleransi antar umat beragama. Panduan suara menceritakan kisah Dewi Kwan Im, arsitektur klenteng antik, serta keharmonisan warga Tionghoa dan Kesultanan Banten.",
    image: img(slug("Vihara Avalokitesvara Banten")), price: "Gratis", rating: 4.6, duration: "1 Jam", listeners: "1.8k",
  },
  {
    id: slug("Museum Negeri Banten"), title: "Museum Negeri Banten", city: "Serang", province: "Banten", region: "Jawa", category: "museum",
    description: "Berada di bekas gedung kediaman Gubernur Belanda (Pendopo Gubernur), museum ini menyimpan fosil, keramik kuno, serta pusaka Banten. Audio guide menceritakan perjalanan sejarah Banten dari masa prasejarah hingga zaman keemasan Kesultanan.",
    image: img(slug("Museum Negeri Banten")), price: "Rp 5.000", rating: 4.3, duration: "1-2 Jam", listeners: "950",
  },
  {
    id: slug("Candi Cangkuang Banten"), title: "Situs Candi Mengger", city: "Pandeglang", province: "Banten", region: "Jawa", category: "candi",
    description: "Situs purbakala berupa struktur batu kuno peninggalan era Hindu-Buddha awal di pesisir Pandeglang. Cerita audio mengulas dugaan jaringan peradaban Sunda kuno serta jejak pengaruh ritual keagamaan masa lampau.",
    image: img(slug("Candi Cangkuang Banten")), price: "Gratis", rating: 4.1, duration: "1 Jam", listeners: "600",
  },
  {
    id: slug("Baduy Luar Ciboleger"), title: "Desa Adat Baduy Luar (Ciboleger)", city: "Lebak", province: "Banten", region: "Jawa", category: "desa-adat",
    description: "Gerbang utama menuju pemukiman suku Baduy yang masih memegang teguh adat Pikukuh dan falsafah hidup menyatu dengan alam. Panduan audio menjelaskan aturan adat, keahlian menenun kain khas, serta struktur sosial masyarakat Kanekes.",
    image: img(slug("Baduy Luar Ciboleger")), price: "Rp 10.000", rating: 4.8, duration: "3-4 Jam", listeners: "4.5k", isPopular: true,
  },
  {
    id: slug("Masjid Agung Tanara"), title: "Masjid Agung Tanara", city: "Serang", province: "Banten", region: "Jawa", category: "religi",
    description: "Masjid bersejarah peninggalan Sultan Maulana Hasanuddin yang juga merupakan tempat kelahiran ulama besar Syekh Nawawi Al-Bantani. Audio menelusuri arsitektur atap tumpang khas Nusantara dan rekam jejak keilmuan Syekh Nawawi.",
    image: img(slug("Masjid Agung Tanara")), price: "Gratis", rating: 4.7, duration: "1 Jam", listeners: "1.5k",
  },
  {
    id: slug("Ujung Kulon Honje"), title: "Ujung Kulon & Gunung Honje", city: "Pandeglang", province: "Banten", region: "Jawa", category: "alam",
    description: "Kawasan konservasi Situs Warisan Dunia UNESCO yang menyimpan ekosistem hutan hujan tropis kuno dan habitat Badak Jawa. Narasi audio membawakan sejarah sains, ekspedisi keanekaragaman hayati, serta legenda konservasi kawasan ini.",
    image: img(slug("Ujung Kulon Honje")), price: "Rp 20.000", rating: 4.7, duration: "4-5 Jam", listeners: "2.1k",
  },
  {
    id: slug("Museum Multatuli"), title: "Museum Multatuli", city: "Lebak", province: "Banten", region: "Jawa", category: "museum",
    description: "Museum antikolonial pertama di Indonesia yang menempati eks kantor asisten residen Belanda di Rangkasbitung. Cerita panduan memaparkan kisah Eduard Douwes Dekker (Multatuli), penulisan novel Max Havelaar, serta sejarah perlawanan antikolonial.",
    image: img(slug("Museum Multatuli")), price: "Rp 2.000", rating: 4.7, duration: "1-2 Jam", listeners: "2.8k", isPopular: true,
  },
  {
    id: slug("Kawah Karang Pandeglang"), title: "Kawah Karang Pandeglang", city: "Pandeglang", province: "Banten", region: "Jawa", category: "alam",
    description: "Kawasan kawah stratovolcano non-aktif Gunung Karang yang dipenuhi sumber air panas dan situs ziarah spiritual. Audio menceritakan geologi gunung api Banten serta cerita rakyat tentang para wali dan pertapa kuno di puncaknya.",
    image: img(slug("Kawah Karang Pandeglang")), price: "Rp 10.000", rating: 4.4, duration: "2-3 Jam", listeners: "1.1k",
  },
  {
    id: slug("Masjid Cariang Asnawi"), title: "Masjid Cariang & Situs Syekh Asnawi", city: "Pandeglang", province: "Banten", region: "Jawa", category: "religi",
    description: "Pusat penyebaran Islam pesisir barat Banten yang terkait erat dengan tokoh perjuangan Syekh Asnawi Caringin. Panduan audio mengisahkan dampak letusan Gunung Krakatau 1883 serta sejarah perlawanan lokal.",
    image: img(slug("Masjid Cariang Asnawi")), price: "Gratis", rating: 4.5, duration: "1 Jam", listeners: "850",
  },
  {
    id: slug("Museum MH Thamrin"), title: "Museum MH Thamrin", city: "Jakarta Pusat", province: "DKI Jakarta", region: "Jawa", category: "museum",
    description: "Gedung bersejarah bekas tempat berkumpulnya pergerakan nasional yang didedikasikan untuk pahlawan pergerakan Betawi, Mohammad Husni Thamrin. Audio guide mengisahkan perjuangan parlemen Thamrin dan barang-barang peninggalan otentiknya.",
    image: img(slug("Museum MH Thamrin")), price: "Rp 5.000", rating: 4.5, duration: "1-2 Jam", listeners: "1.4k",
  },
  {
    id: slug("Gereja Sion"), title: "Gereja Sion (Gereja Portugis)", city: "Jakarta Barat", province: "DKI Jakarta", region: "Jawa", category: "religi",
    description: "Gereja tertua yang masih berfungsi di Jakarta, dibangun tahun 1695 untuk kaum Mardijkers (bekas budak Portugis). Narasi audio mengungkap keajaiban organ pipa kuno buatan abad ke-18 dan arsitektur interior berornamentasi kayu asli.",
    image: img(slug("Gereja Sion")), price: "Gratis", rating: 4.6, duration: "1 Jam", listeners: "1.9k",
  },
  {
    id: slug("Gedung Kebangkitan Nasional"), title: "Gedung Kebangkitan Nasional (STOVIA)", city: "Jakarta Pusat", province: "DKI Jakarta", region: "Jawa", category: "sejarah",
    description: "Kawasan bekas sekolah dokter Jawa STOVIA tempat berdirinya organisasi Budi Utomo pada tahun 1908. Audio guide membimbing pengunjung menyusuri ruang kelas kuno, asrama medis, dan cerita lahirnya fajar kesadaran nasionalis Indonesia.",
    image: img(slug("Gedung Kebangkitan Nasional")), price: "Rp 5.000", rating: 4.7, duration: "2 Jam", listeners: "3.1k", isPopular: true,
  },
  {
    id: slug("Museum Sumpah Pemuda"), title: "Museum Sumpah Pemuda", city: "Jakarta Pusat", province: "DKI Jakarta", region: "Jawa", category: "sejarah",
    description: "Gedung Kramat 106 tempat dilantunkannya ikrar Sumpah Pemuda 1928 dan lagu Indonesia Raya pertama kali. Panduan audio menghidupkan kembali suasana rapat pemuda lintas daerah dan gema biola bersejarah.",
    image: img(slug("Museum Sumpah Pemuda")), price: "Rp 5.000", rating: 4.6, duration: "1-2 Jam", listeners: "2.9k", isPopular: true,
  },
  {
    id: slug("Museum Prasasti"), title: "Museum Prasasti", city: "Jakarta Pusat", province: "DKI Jakarta", region: "Jawa", category: "museum",
    description: "Cagar budaya cikal bakal pemakaman umum modern tertua di dunia (Kebon Jahe Kober). Cerita suara mengupas seni pahat nisan neoklasik serta biografi tokoh-tokoh Batavia seperti Olivia Marianne Raffles dan Soe Hok Gie.",
    image: img(slug("Museum Prasasti")), price: "Rp 5.000", rating: 4.5, duration: "1-2 Jam", listeners: "2.3k",
  },
  {
    id: slug("Masjid Luar Batang"), title: "Masjid Luar Batang & Makam Habib Husein", city: "Jakarta Utara", province: "DKI Jakarta", region: "Jawa", category: "religi",
    description: "Masjid bersejarah di pelabuhan kuno Sunda Kelapa yang didirikan abad ke-18 oleh Habib Husein bin Abubakar Alaydrus. Audio menceritakan sejarah permukiman bahari Batavia, keajaiban spiritual, dan peran peninggalan ulama pesisir.",
    image: img(slug("Masjid Luar Batang")), price: "Gratis", rating: 4.7, duration: "1 Jam", listeners: "2.0k",
  },
  {
    id: slug("Klenteng Jin De Yuan"), title: "Klenteng Jin De Yuan (Vihara Dharma Bhakti)", city: "Jakarta Barat", province: "DKI Jakarta", region: "Jawa", category: "religi",
    description: "Klenteng tertua di Petak Sembilan Glodok yang dibangun sejak tahun 1650. Panduan audio mengulas arsitektur klenteng khas Fujian, tradisi perayaan Imlek, serta sejarah ketahanan komunitas Tionghoa pasca Tragedi Angke 1740.",
    image: img(slug("Klenteng Jin De Yuan")), price: "Gratis", rating: 4.6, duration: "1-2 Jam", listeners: "2.5k", isPopular: true,
  },
  {
    id: slug("Setu Babakan"), title: "Perkampungan Budaya Betawi Setu Babakan", city: "Jakarta Selatan", province: "DKI Jakarta", region: "Jawa", category: "desa-adat",
    description: "Pusat pelestarian warisan budaya Betawi yang mempertahankan arsitektur rumah kabang, seni tutur, dan tata cara adat. Audio guide menceritakan sejarah suku Betawi, seni Ondel-ondel, gambang kromong, serta kebiasaan hidup tepi danau.",
    image: img(slug("Setu Babakan")), price: "Gratis", rating: 4.4, duration: "2-3 Jam", listeners: "3.5k", isPopular: true,
  },
  {
    id: slug("Candi Tugu"), title: "Candi Tugu (Situs Prasasti Tugu)", city: "Jakarta Utara", province: "DKI Jakarta", region: "Jawa", category: "candi",
    description: "Lokasi ditemukannya Prasasti Tugu abad ke-5 peninggalan Kerajaan Tarumanagara mengenai penggalian Sungai Chandrabaga. Narasi audio mengisahkan peradaban sungai kuno Jakarta, teknik irigasi awal Nusantara, dan jejak Raja Purnawarman.",
    image: img(slug("Candi Tugu")), price: "Gratis", rating: 4.2, duration: "1 Jam", listeners: "800",
  },
  {
    id: slug("Gedung Kesenian Jakarta"), title: "Gedung Kesenian Jakarta", city: "Jakarta Pusat", province: "DKI Jakarta", region: "Jawa", category: "sejarah",
    description: "Gedung teater bergaya neoklasik yang didirikan pada masa pemerintahan Raffles (1814) dengan sebutan Schouwburg. Narasi audio membawa pengunjung menelusuri sejarah pertunjukan opera Batavia dan dinamika seni pertunjukan modern Indonesia.",
    image: img(slug("Gedung Kesenian Jakarta")), price: "Gratis", rating: 4.5, duration: "1 Jam", listeners: "1.2k",
  },
  {
    id: slug("Museum Tekstil Jakarta"), title: "Museum Tekstil Jakarta", city: "Jakarta Barat", province: "DKI Jakarta", region: "Jawa", category: "museum",
    description: "Menempati gedung bernuansa kolonial Prancis abad ke-19, museum ini merawat ribuan koleksi kain tenun dan batik dari seluruh Nusantara. Audio guide memandu pemahaman teknik motif kain, zat pewarna alami, dan nilai kultural kain etnis.",
    image: img(slug("Museum Tekstil Jakarta")), price: "Rp 5.000", rating: 4.5, duration: "1-2 Jam", listeners: "1.7k",
  },
  {
    id: slug("Candi Cangkuang Garut"), title: "Candi Cangkuang & Kampung Pulo", city: "Garut", province: "Jawa Barat", region: "Jawa", category: "candi",
    description: "Satu-satunya candi Hindu abad ke-8 di Jawa Barat yang berdiri anggun di tengah danau, berdampingan dengan Kampung Pulo yang unik. Narasi audio mengungkap misteri arsitektur candi serta tradisi unik pemukiman adat 6 kepala keluarga.",
    image: img(slug("Candi Cangkuang Garut")), price: "Rp 10.000", rating: 4.6, duration: "2-3 Jam", listeners: "3.8k", isPopular: true,
  },
  {
    id: slug("Situs Megalitikum Gunung Padang"), title: "Situs Megalitikum Gunung Padang", city: "Cianjur", province: "Jawa Barat", region: "Jawa", category: "candi",
    description: "Situs punden berundak megalitikum terbesar di Asia Tenggara yang tersusun dari batu columnar joint vulkanik. Panduan audio mengajak mengeksplorasi susunan teras mistis, teori kontroversial punden pra-aksara, dan astronomi kuno.",
    image: img(slug("Situs Megalitikum Gunung Padang")), price: "Rp 10.000", rating: 4.5, duration: "2-3 Jam", listeners: "5.2k", isPopular: true,
  },
  {
    id: slug("Keraton Kasepuhan Ekstra"), title: "Keraton Kasepuhan Cirebon", city: "Cirebon", province: "Jawa Barat", region: "Jawa", category: "sejarah",
    description: "Istana kesultanan tertua di Cirebon yang memadukan arsitektur Islam, Hindu, dan Tionghoa dengan dinding berhias porselen Belanda. Audio guide mengisahkan kejayaan Sunan Gunung Jati, kereta kencana Singa Barong, dan tradisi lokal.",
    image: img(slug("Keraton Kasepuhan Ekstra")), price: "Rp 20.000", rating: 4.6, duration: "2 Jam", listeners: "4.1k", isPopular: true,
  },
  {
    id: slug("Desa Adat Ciptagelar"), title: "Desa Adat Ciptagelar", city: "Sukabumi", province: "Jawa Barat", region: "Jawa", category: "desa-adat",
    description: "Kampung adat Kasepuhan Sunda yang memegang teguh tradisi bertanam padi tanpa kimia dan ritual Seren Taun. Audio menguraikan filosofi tata ruang rumah kayu, struktur kepemimpinan Abah, serta kearifan lokal ketahanan pangan.",
    image: img(slug("Desa Adat Ciptagelar")), price: "Rp 15.000", rating: 4.8, duration: "3-4 Jam", listeners: "1.9k",
  },
  {
    id: slug("Kawah Putih Gunung Patuha"), title: "Kawah Putih Gunung Patuha", city: "Bandung", province: "Jawa Barat", region: "Jawa", category: "alam",
    description: "Danau kawah vulkanik surealis dengan warna air klorin kehijauan dan tanah berkapur putih di ketinggian 2.400 mdpl. Audio menceritakan sejarah geologi erupsi purba Gunung Patuha serta penemuan ilmiah oleh Dr. Franz Junghuhn.",
    image: img(slug("Kawah Putih Gunung Patuha")), price: "Rp 29.000", rating: 4.6, duration: "2 Jam", listeners: "6.4k", isPopular: true,
  },
  {
    id: slug("Gua Sunyaragi"), title: "Gua Sunyaragi (Taman Air)", city: "Cirebon", province: "Jawa Barat", region: "Jawa", category: "sejarah",
    description: "Kompleks pesanggrahan kuno berbentuk benteng batu karang terumbu tempat meditasi para sultan Cirebon. Audio guide menelusuri lorong-lorong rahasia, fungsi petilasan spiritual, dan akulturasi gaya arsitektur Klasik-Tionghoa.",
    image: img(slug("Gua Sunyaragi")), price: "Rp 15.000", rating: 4.5, duration: "1-2 Jam", listeners: "2.7k",
  },
  {
    id: slug("Museum Geologi Bandung"), title: "Museum Geologi Bandung", city: "Bandung", province: "Jawa Barat", region: "Jawa", category: "museum",
    description: "Museum sains geologi terlengkap di Indonesia yang menyimpan replika fosil T-Rex, Manusia Purba Jawa, dan batuan meteorit. Panduan suara menceritakan pembentukan cekungan Danau Purba Bandung dan kekayaan mineral Nusantara.",
    image: img(slug("Museum Geologi Bandung")), price: "Rp 3.000", rating: 4.7, duration: "2 Jam", listeners: "4.9k", isPopular: true,
  },
  {
    id: slug("Kampung Naga Ekstra"), title: "Desa Adat Kampung Naga", city: "Tasikmalaya", province: "Jawa Barat", region: "Jawa", category: "desa-adat",
    description: "Pemukiman tradisional Sunda di lembah subur yang menolak modernisasi listrik dan bangunan permanen. Audio guide memandu tata aturan pemukiman berkisi bambu, kearifan lokal menjaga hutan larangan, serta filosofi kesederhanaan.",
    image: img(slug("Kampung Naga Ekstra")), price: "Gratis", rating: 4.7, duration: "2-3 Jam", listeners: "3.3k", isPopular: true,
  },
  {
    id: slug("Masjid Sang Cipta Rasa"), title: "Masjid Agung Sang Cipta Rasa", city: "Cirebon", province: "Jawa Barat", region: "Jawa", category: "religi",
    description: "Masjid tua peninggalan Walisongo yang dibangun oleh Sunan Kalijaga dan arsitek Raden Sepat pada abad ke-15. Audio mengulas tradisi unik Azan Pitu (azan 7 muazin) serta arsitektur tiang tatal kayu penyangga.",
    image: img(slug("Masjid Sang Cipta Rasa")), price: "Gratis", rating: 4.8, duration: "1 Jam", listeners: "1.8k",
  },
  {
    id: slug("Situs Galuh Karangkamulyan"), title: "Situs Kerajaan Galuh Karangkamulyan", city: "Ciamis", province: "Jawa Barat", region: "Jawa", category: "sejarah",
    description: "Situs arkeologi cagar budaya berupa reruntuhan batu peninggalan Kerajaan Galuh kuno abad ke-8. Panduan suara menghidupkan kembali kisah legenda Ciung Wanara, adu ayam bersejarah, serta struktur benteng batu di tengah hutan rindang.",
    image: img(slug("Situs Galuh Karangkamulyan")), price: "Rp 5.000", rating: 4.4, duration: "1-2 Jam", listeners: "1.1k",
  },
  {
    id: slug("Gua Maria Sawer Rahmat"), title: "Gua Maria Sawer Rahmat Cisantana", city: "Kuningan", province: "Jawa Barat", region: "Jawa", category: "religi",
    description: "Tempat ziarah Katolik yang asri di lereng Gunung Ciremai dengan suasana alaminya yang hening. Audio guide memberikan panduan kontemplatif Jalan Salib, sejarah keuskupan lokal, serta harmoni alam pegunungan.",
    image: img(slug("Gua Maria Sawer Rahmat")), price: "Gratis", rating: 4.7, duration: "1-2 Jam", listeners: "1.3k",
  },
  {
    id: slug("Museum Sri Baduga"), title: "Museum Sri Baduga", city: "Bandung", province: "Jawa Barat", region: "Jawa", category: "museum",
    description: "Museum kebudayaan Jawa Barat berarsitektur rumah adat Sunda yang menampung benda sejarah Sunda dari masa naskah lontar hingga perkakas kuno. Narasi audio mengisahkan kebesaran Raja Siliwangi dan kejayaan Kerajaan Sunda Pakuan Pajajaran.",
    image: img(slug("Museum Sri Baduga")), price: "Rp 3.000", rating: 4.5, duration: "1-2 Jam", listeners: "1.6k",
  },
  {
    id: slug("Candi Cibuaya"), title: "Candi Cibuaya", city: "Karawang", province: "Jawa Barat", region: "Jawa", category: "candi",
    description: "Kompleks reruntuhan bata merah kuno peninggalan era Tarumanagara yang ditemukan di persawahan pesisir Karawang. Audio mengurai temuan arca Wisnu kuno serta bukti sejarah masuknya kebudayaan Hindu awal di tanah Jawa bagian barat.",
    image: img(slug("Candi Cibuaya")), price: "Gratis", rating: 4.1, duration: "1 Jam", listeners: "500",
  },
  {
    id: slug("Candi Sewu"), title: "Candi Sewu Kompleks", city: "Klaten", province: "Jawa Tengah", region: "Jawa", category: "candi",
    description: "Kompleks candi Buddha terbesar kedua di Indonesia yang berdiri megah tidak jauh dari Prambanan. Panduan audio menceritakan kemegahan 240 candi perwara, patung Dwarapala raksasa, dan pesan perdamaian antar umat Hindu-Buddha abad ke-8.",
    image: img(slug("Candi Sewu")), price: "Rp 50.000", rating: 4.7, duration: "2 Jam", listeners: "3.9k", isPopular: true,
  },
  {
    id: slug("Candi Plaosan"), title: "Candi Plaosan", city: "Klaten", province: "Jawa Tengah", region: "Jawa", category: "candi",
    description: "Candi kembar elok simbol cinta suci antara Rakai Pikatan dari dinasti Hindu dan Pramodhawardhani dari dinasti Buddha. Panduan suara menguraikan detail relief indah, teras batu bercahaya matahari terbenam, dan perpaduan dua tradisi keagamaan.",
    image: img(slug("Candi Plaosan")), price: "Rp 10.000", rating: 4.7, duration: "1-2 Jam", listeners: "4.2k", isPopular: true,
  },
  {
    id: slug("Situs Sangiran"), title: "Situs Sangiran (Cluster Krikilan)", city: "Sragen", province: "Jawa Tengah", region: "Jawa", category: "museum",
    description: "Situs Paleontologi Manusia Purba Warisan Dunia UNESCO tempat ditemukannya fosil Homo erectus dan fauna purba. Narasi audio membawa pendengar melintasi garis waktu evolusi manusia Nusantara 1,5 juta tahun lalu.",
    image: img(slug("Situs Sangiran")), price: "Rp 15.000", rating: 4.7, duration: "2-3 Jam", listeners: "3.6k", isPopular: true,
  },
  {
    id: slug("Candi Sukuh"), title: "Candi Sukuh", city: "Karanganyar", province: "Jawa Tengah", region: "Jawa", category: "candi",
    description: "Candi Hindu unik berarsitektur piramida terpotong menyerupai Kuil Maya di lereng Gunung Lawu. Panduan audio mengupas relief eksotis tentang kesuburan, ritual kesucian jiwa, dan pergeseran seni pahat akhir masa Majapahit.",
    image: img(slug("Candi Sukuh")), price: "Rp 10.000", rating: 4.6, duration: "1-2 Jam", listeners: "3.1k", isPopular: true,
  },
  {
    id: slug("Candi Cetho"), title: "Candi Cetho", city: "Karanganyar", province: "Jawa Tengah", region: "Jawa", category: "candi",
    description: "Candi Hindu berundak sembilan teras yang berdiri dramatis di atas hamparan kebun teh pegunungan diselimuti kabut. Audio guide menjelaskan simbolisme murni pemujaan dewa-dewa pegunungan dan arsitektur punden masa akhir Hindu Jawa.",
    image: img(slug("Candi Cetho")), price: "Rp 10.000", rating: 4.7, duration: "2 Jam", listeners: "4.5k", isPopular: true,
  },
  {
    id: slug("Masjid Menara Kudus"), title: "Masjid Menara Kudus", city: "Kudus", province: "Jawa Tengah", region: "Jawa", category: "religi",
    description: "Masjid unik dengan menara bata merah berbentuk candi Hindu karya Sunan Kudus abad ke-16. Audio guide mengisahkan kearifan dakwah Sunan Kudus, larangan menyembelih sapi demi menghormati umat Hindu, serta alkulturasi budaya.",
    image: img(slug("Masjid Menara Kudus")), price: "Gratis", rating: 4.8, duration: "1 Jam", listeners: "3.7k", isPopular: true,
  },
  {
    id: slug("Candi Gedong Songo"), title: "Candi Gedong Songo", city: "Semarang", province: "Jawa Tengah", region: "Jawa", category: "candi",
    description: "Kompleks sembilan candi Hindu peninggalan Mataram Kuno yang tersebar di lereng Gunung Ungaran dengan latar sumber sulfur alami. Audio menceritakan geologi kawah, mitologi Hanoman, dan keindahan arsitektur batu candi gunung.",
    image: img(slug("Candi Gedong Songo")), price: "Rp 15.000", rating: 4.6, duration: "2-3 Jam", listeners: "3.4k", isPopular: true,
  },
  {
    id: slug("Gereja Blenduk"), title: "Gereja Blenduk Semarang", city: "Semarang", province: "Jawa Tengah", region: "Jawa", category: "religi",
    description: "Gereja Kristen tertua di Jawa Tengah bertahun 1753 dengan kubah oktagonal khas arsitektur Eropa klasik di Kota Lama Semarang. Audio menceritakan pemugaran abad ke-19, instrumen organ kuno, dan tata kota colonial VOC.",
    image: img(slug("Gereja Blenduk")), price: "Gratis", rating: 4.6, duration: "1 Jam", listeners: "2.9k",
  },
  {
    id: slug("Museum Kereta Api Ambarawa"), title: "Museum Kereta Api Ambarawa", city: "Semarang", province: "Jawa Tengah", region: "Jawa", category: "museum",
    description: "Stasiun kereta api abad ke-19 yang diubah menjadi museum lokomotif uap kuno bergerigi pelintas pegunungan. Audio guide menghidupkan kembali era kejayaan transportasi komoditas rempah dan kayu di Jawa.",
    image: img(slug("Museum Kereta Api Ambarawa")), price: "Rp 20.000", rating: 4.6, duration: "2 Jam", listeners: "3.2k", isPopular: true,
  },
  {
    id: slug("Candi Arjuna Dieng"), title: "Dieng & Kompleks Candi Arjuna", city: "Banjarnegara", province: "Jawa Tengah", region: "Jawa", category: "candi",
    description: "Kompleks candi tertua di Pulau Jawa (abad ke-7) yang berdiri di dataran tinggi vulkanik Dieng (tempat kediaman para dewa). Narasi audio membahas arsitektur candi pendawa, fenomena es bun upas, dan ritual pemotongan rambut gimbal.",
    image: img(slug("Candi Arjuna Dieng")), price: "Rp 20.000", rating: 4.7, duration: "2-3 Jam", listeners: "5.8k", isPopular: true,
  },
  {
    id: slug("Masjid Agung Demak"), title: "Masjid Agung Demak", city: "Demak", province: "Jawa Tengah", region: "Jawa", category: "religi",
    description: "Masjid tertua di Jawa bekas pusat penyiaran agama Islam oleh Walisongo dan ibu kota Kesultanan Demak Bintoro. Audio menceritakan sejarah Saka Tatal buatan Sunan Kalijaga, pintu petek, dan arsitektur atap meru tumpang tiga.",
    image: img(slug("Masjid Agung Demak")), price: "Gratis", rating: 4.8, duration: "1-2 Jam", listeners: "4.0k", isPopular: true,
  },
  {
    id: slug("Desa Batik Laweyan"), title: "Desa Wisata Batik Laweyan", city: "Surakarta", province: "Jawa Tengah", region: "Jawa", category: "desa-adat",
    description: "Kampung saudagar batik bersejarah sejak abad ke-19 dengan arsitektur rumah bertembok tinggi memadukan gaya Jawa-Eropa. Audio memandu penelusuran gang sempit antik, sejarah Serikat Dagang Islam, dan proses pembatikan tulis.",
    image: img(slug("Desa Batik Laweyan")), price: "Gratis", rating: 4.5, duration: "2 Jam", listeners: "2.2k",
  },
  {
    id: slug("Kawah Sikidang Dieng"), title: "Kawah Sikidang Dieng", city: "Banjarnegara", province: "Jawa Tengah", region: "Jawa", category: "alam",
    description: "Lapangan geotermal aktif dengan kolam lumpur bergolak yang berpindah-pindah bagaikan kijang melompat. Audio menceritakan fenomena geologi energi panas bumi Dieng dan mite lokal kisah Pangeran Kidang Garungan.",
    image: img(slug("Kawah Sikidang Dieng")), price: "Rp 20.000", rating: 4.5, duration: "1-2 Jam", listeners: "4.1k", isPopular: true,
  },
  {
    id: slug("Benteng Pendem Cilacap"), title: "Benteng Pendem Cilacap", city: "Cilacap", province: "Jawa Tengah", region: "Jawa", category: "sejarah",
    description: "Benteng pertahanan bawah tanah tentara kolonial Belanda yang dibangun tahun 1861 di pesisir selatan. Audio guide menuntun pengunjung menelusuri parit perlindungan, barak prajurit, dan ruang penyimpanan amunisi tertimbun tanah.",
    image: img(slug("Benteng Pendem Cilacap")), price: "Rp 7.500", rating: 4.3, duration: "1-2 Jam", listeners: "1.4k",
  },
  {
    id: slug("Candi Mendut"), title: "Candi Mendut", city: "Magelang", province: "DI Yogyakarta", region: "Jawa", category: "candi",
    description: "Candi Buddha abad ke-9 yang terletak selaras garis lurus dengan Candi Borobudur dan Pawon. Panduan suara menjelaskan keindahan tiga arca raksasa di dalam ruangan candi utama (termasuk Bodhisatwa Vajrapani) serta jataka kisah moral di relief luar.",
    image: img(slug("Candi Mendut")), price: "Rp 10.000", rating: 4.7, duration: "1 Jam", listeners: "3.5k", isPopular: true,
  },
  {
    id: slug("Candi Kalasan"), title: "Candi Kalasan", city: "Sleman", province: "DI Yogyakarta", region: "Jawa", category: "candi",
    description: "Candi Buddha tertua di dataran Prambanan yang dibangun tahun 778 M sebagai penghormatan kepada Dewi Tara. Panduan suara menceritakan keunikan lepa pencerah Bajralepa yang melapisi batu candi dan ornamen ukiran kala yang megah.",
    image: img(slug("Candi Kalasan")), price: "Rp 10.000", rating: 4.5, duration: "1 Jam", listeners: "2.1k",
  },
  {
    id: slug("Candi Sambisari"), title: "Candi Sambisari", city: "Sleman", province: "DI Yogyakarta", region: "Jawa", category: "candi",
    description: "Candi Hindu Syaiwa yang unik karena terletak 6.5 meter di bawah permukaan tanah akibat tertimbun lahar erupsi Gunung Merapi purba. Audio guide memaparkan proses ekskavasi dramatis dan keutuhan lingga-yoni di bilik utama.",
    image: img(slug("Candi Sambisari")), price: "Rp 6.000", rating: 4.6, duration: "1 Jam", listeners: "3.3k", isPopular: true,
  },
  {
    id: slug("Museum Ullen Sentalu"), title: "Museum Ullen Sentalu", city: "Sleman", province: "DI Yogyakarta", region: "Jawa", category: "museum",
    description: "Museum privat terbaik yang menyajikan kisah seni dan budaya bangsawan Dinasti Mataram. Panduan audio menuntun keanggunan busana batik, surat cinta kuno, dan arsitektur ghaib.",
    image: img(slug("Museum Ullen Sentalu")), price: "Rp 50.000", rating: 4.8, duration: "2 Jam", listeners: "5.6k", isPopular: true,
  },
  {
    id: slug("Museum Sonobudoyo"), title: "Museum Sonobudoyo", city: "Yogyakarta", province: "DI Yogyakarta", region: "Jawa", category: "museum",
    description: "Museum sejarah kebudayaan Jawa terlengkap kedua setelah Museum Nasional, berlokasi di utara Alun-Alun Utara Yogyakarta. Panduan suara mengulas koleksi wayang kulit antik, keris pusaka, hingga naskah lontar abad pertengahan.",
    image: img(slug("Museum Sonobudoyo")), price: "Rp 10.000", rating: 4.7, duration: "1-2 Jam", listeners: "2.8k", isPopular: true,
  },
  {
    id: slug("Benteng Vredeburg"), title: "Museum Benteng Vredeburg", city: "Yogyakarta", province: "DI Yogyakarta", region: "Jawa", category: "sejarah",
    description: "Benteng kolonial Belanda berbentuk segi empat di ujung Malioboro yang kini berfungsi sebagai museum perjuangan nasional. Audio menceritakan diorama pergerakan kemerdekaan, Peristiwa 1 Maret 1949, dan arsitektur pertahanan benteng.",
    image: img(slug("Benteng Vredeburg")), price: "Rp 10.000", rating: 4.6, duration: "2 Jam", listeners: "4.8k", isPopular: true,
  },
  {
    id: slug("Candi Ijo"), title: "Candi Ijo", city: "Sleman", province: "DI Yogyakarta", region: "Jawa", category: "candi",
    description: "Candi bercorak Hindu tertinggi di Yogyakarta yang dibangun pada ketinggian 410 mdpl di Bukit Gumuk Ijo. Audio guide memandu pemahaman atas relief naga, pemujaan Siwa, dan panorama matahari terbenam atas dataran rendah.",
    image: img(slug("Candi Ijo")), price: "Rp 10.000", rating: 4.6, duration: "1-2 Jam", listeners: "4.1k", isPopular: true,
  },
  {
    id: slug("Situs Ratu Boko"), title: "Situs Ratu Boko", city: "Sleman", province: "DI Yogyakarta", region: "Jawa", category: "candi",
    description: "Kompleks istana kraton bertingkat abad ke-8 yang memadukan elemen Hindu dan Buddha di perbukitan abadi. Narasi audio membawa ingatan pada gerbang megah, tempat pembakaran jenazah, pendopo agung, dan kolam pemandian putri raja.",
    image: img(slug("Situs Ratu Boko")), price: "Rp 50.000", rating: 4.7, duration: "2 Jam", listeners: "5.0k", isPopular: true,
  },
  {
    id: slug("Makam Imogiri"), title: "Makam Imogiri", city: "Bantul", province: "DI Yogyakarta", region: "Jawa", category: "religi",
    description: "Kompleks pemakaman agung para Sultan Yogyakarta dan Surakarta di puncak Bukit Merapi Imogiri yang didirikan Sultan Agung tahun 1632. Audio menjelaskan tangga berundak 409, tradisi Nguri-uri budaya, dan arsitektur gapura paduraksa.",
    image: img(slug("Makam Imogiri")), price: "Rp 5.000", rating: 4.6, duration: "2-3 Jam", listeners: "2.4k",
  },
  {
    id: slug("Masjid Gede Mataram Kotagede"), title: "Masjid Gede Mataram Kotagede", city: "Yogyakarta", province: "DI Yogyakarta", region: "Jawa", category: "religi",
    description: "Masjid tertua di Yogyakarta peninggalan Kerajaan Mataram Islam abad ke-16 yang sarat nuansa arsitektur Hindu Jawa. Panduan audio menceritakan tiang kayu tatal, gapura candi bentar, serta keasrian sendang tempat pemandian kuno.",
    image: img(slug("Masjid Gede Mataram Kotagede")), price: "Gratis", rating: 4.8, duration: "1 Jam", listeners: "2.2k",
  },
  {
    id: slug("Gua Maria Sendang Sriningsih"), title: "Gua Maria Sendang Sriningsih", city: "Sleman", province: "DI Yogyakarta", region: "Jawa", category: "religi",
    description: "Tempat perziarahan umat Katolik di perbukitan Prambanan dengan jenjang jalan salib yang teduh dan air suci sendang. Audio memandu ziarah doa hening, sejarah pembukaan tempat ziarah tahun 1934, dan kedamaian alam.",
    image: img(slug("Gua Maria Sendang Sriningsih")), price: "Gratis", rating: 4.7, duration: "1-2 Jam", listeners: "1.5k",
  },
  {
    id: slug("Desa Kasongan"), title: "Desa Wisata Kasongan", city: "Bantul", province: "DI Yogyakarta", region: "Jawa", category: "desa-adat",
    description: "Pusat seni kerajinan gerabah dan keramik tradisional yang diwariskan turun-temurun sejak era Perang Diponegoro. Audio menceritakan sejarah warga lokal mengolah tanah liat menjadi karya seni patung kloro bledek dan perabotan ekspor.",
    image: img(slug("Desa Kasongan")), price: "Gratis", rating: 4.5, duration: "2 Jam", listeners: "3.0k",
  },
  {
    id: slug("Candi Banyunibo"), title: "Candi Banyunibo", city: "Sleman", province: "DI Yogyakarta", region: "Jawa", category: "candi",
    description: "Candi Buddha tunggal abad ke-9 yang tersembunyi di area persawahan subur Ratu Boko. Panduan audio menceritakan relief keharmonisan keluarga (Hariti dan Pancika) serta arsitektur puncak stupa tunggal yang tenang.",
    image: img(slug("Candi Banyunibo")), price: "Rp 5.000", rating: 4.5, duration: "1 Jam", listeners: "1.3k",
  },
  {
    id: slug("Situs Trowulan"), title: "Situs Trowulan (Candi Tikus & Bajang Ratu)", city: "Mojokerto", province: "Jawa Timur", region: "Jawa", category: "candi",
    description: "Pusat bekas ibu kota Kerajaan Majapahit yang memperlihatkan sistem pemandian kuno Candi Tikus dan gapura gerbang paduraksa Bajang Ratu. Panduan audio membimbing imajinasi tentang kejayaan tata kota kuno dan Sumpah Palapa Gajah Mada.",
    image: img(slug("Situs Trowulan")), price: "Rp 10.000", rating: 4.7, duration: "2-3 Jam", listeners: "4.8k", isPopular: true,
  },
  {
    id: slug("Candi Penataran"), title: "Candi Penataran", city: "Blitar", province: "Jawa Timur", region: "Jawa", category: "candi",
    description: "Kompleks candi Hindu terbesar di Jawa Timur yang menjadi candi negara era Kerajaan Singasari hingga Majapahit. Audio menceritakan relief epos Ramayana dan Krishnayana serta keterkaitan candi ini dengan kitab Nagarakretagama.",
    image: img(slug("Candi Penataran")), price: "Rp 5.000", rating: 4.7, duration: "2 Jam", listeners: "3.6k", isPopular: true,
  },
  {
    id: slug("Museum BI Surabaya"), title: "Museum Bank Indonesia Surabaya", city: "Surabaya", province: "Jawa Timur", region: "Jawa", category: "museum",
    description: "Gedung cagar budaya bekas De Javasche Bank cabang Surabaya berarsitektur neo-renaisans. Audio guide membawa perjalanan sejarah perbankan kolonial, percetakan mata uang kuno, dan arsitektur khazanah penyimpanan emas.",
    image: img(slug("Museum BI Surabaya")), price: "Gratis", rating: 4.7, duration: "1-2 Jam", listeners: "2.4k",
  },
  {
    id: slug("Museum Mpu Tantular"), title: "Museum Mpu Tantular", city: "Sidoarjo", province: "Jawa Timur", region: "Jawa", category: "museum",
    description: "Museum Negeri Jawa Timur yang menyimpan ribuan artefak etnografi, naskah kuno, arca perunggu, dan sejarah geologi. Narasi suara menjelaskan kisah pujangga Mpu Tantular pencetus semboyan Bhinneka Tunggal Ika.",
    image: img(slug("Museum Mpu Tantular")), price: "Rp 5.000", rating: 4.4, duration: "2 Jam", listeners: "1.5k",
  },
  {
    id: slug("Desa Tengger Ngadisari"), title: "Desa Adat Tengger Ngadisari", city: "Probolinggo", province: "Jawa Timur", region: "Jawa", category: "desa-adat",
    description: "Pemukiman suku Tengger di pintu masuk Bromo yang memelihara kebiasaan Hindu kuno dan bahasa Jawa Kuno. Audio menceritakan mitologi Roro Anteng dan Joko Seger serta tata cara upacara ritual Yadnya Kasada di bibir kawah.",
    image: img(slug("Desa Tengger Ngadisari")), price: "Gratis", rating: 4.7, duration: "2-3 Jam", listeners: "3.9k", isPopular: true,
  },
  {
    id: slug("Candi Singosari"), title: "Candi Singosari", city: "Malang", province: "Jawa Timur", region: "Jawa", category: "candi",
    description: "Candi Hindu-Buddha abad ke-13 yang dibangun untuk menghormati Raja Kertanegara dari Kerajaan Singasari. Panduan suara mengungkap kisah pengkhianatan Ken Arok, keris Mpu Gandring, dan sepasang arca Dwarapala terbesar di Jawa.",
    image: img(slug("Candi Singosari")), price: "Rp 5.000", rating: 4.5, duration: "1 Jam", listeners: "2.7k",
  },
  {
    id: slug("Gereja Puhsarang"), title: "Gua Maria Puhsarang & Gereja Katolik", city: "Kediri", province: "Jawa Timur", region: "Jawa", category: "religi",
    description: "Kompleks gereja dan tempat ziarah unik berarsitektur perpaduan Jawa Majapahit dan Gereja Katolik karya Romo Maclaine Pont. Audio guide mengisahkan batu alam lokal, pendopo kemah doa, serta sumur air suci Puhsarang.",
    image: img(slug("Gereja Puhsarang")), price: "Gratis", rating: 4.8, duration: "1-2 Jam", listeners: "2.6k", isPopular: true,
  },
  {
    id: slug("Kawah Ijen Ekstra"), title: "Kawah Ijen & Fenomena Api Biru", city: "Banyuwangi", province: "Jawa Timur", region: "Jawa", category: "alam",
    description: "Kawah vulkanik asam terbesar di dunia yang terkenal dengan fenomena Blue Fire dan perjuangan penambang belerang. Audio menceritakan geologi pembentukan kawah, reaksi kimia gas asam, dan kehidupan sosial penambang.",
    image: img(slug("Kawah Ijen Ekstra")), price: "Rp 15.000", rating: 4.8, duration: "3-4 Jam", listeners: "7.1k", isPopular: true,
  },
  {
    id: slug("Masjid Ampel"), title: "Masjid Ampel & Kawasan Arab Surabaya", city: "Surabaya", province: "Jawa Timur", region: "Jawa", category: "religi",
    description: "Pusat ziarah Islam dan pemukiman bersejarah abad ke-15 yang didirikan oleh Sunan Ampel. Audio guide mengisahkan penyebaran Islam pesisir Jawa, keunikan arsitektur tiang kayu nangka, serta kehidupan kawasan niaga pesisir.",
    image: img(slug("Masjid Ampel")), price: "Gratis", rating: 4.8, duration: "1-2 Jam", listeners: "3.5k", isPopular: true,
  },
  {
    id: slug("Candi Jawi"), title: "Candi Jawi", city: "Pasuruan", province: "Jawa Timur", region: "Jawa", category: "candi",
    description: "Candi siwa-buddha bertingkat dari batu hitam dan putih tempat pendarmaan abu jenazah Raja Kertanegara di kaki Gunung Welirang. Audio memandu pembacaan relief keagamaan serta deskripsi keindahannya dalam Kitab Negarakretagama.",
    image: img(slug("Candi Jawi")), price: "Rp 5.000", rating: 4.6, duration: "1 Jam", listeners: "1.7k",
  },
  {
    id: slug("Desa Osing Kemiren"), title: "Desa Adat Osing Kemiren", city: "Banyuwangi", province: "Jawa Timur", region: "Jawa", category: "desa-adat",
    description: "Desa adat tempat bermukimnya suku Osing (penduduk asli Banyuwangi) yang merawat tradisi Tari Gandrung dan sangrai kopi lokal. Narasi suara menjelaskan arsitektur rumah tikel tulang, ritual Barong Ider Bumi, dan seni tutur.",
    image: img(slug("Desa Osing Kemiren")), price: "Gratis", rating: 4.7, duration: "2 Jam", listeners: "2.1k",
  },
  {
    id: slug("Klenteng Kwan Sing Bio"), title: "Klenteng Kwan Sing Bio", city: "Tuban", province: "Jawa Timur", region: "Jawa", category: "religi",
    description: "Klenteng satu-satunya di Asia Tenggara yang menghadap langsung ke laut lepas dengan simbol kepiting raksasa di atas gapuranya. Audio menceritakan penghormatan pada Deva Kwan Sing Tee Koen dan sejarah jalur maritim perdagangan kuno.",
    image: img(slug("Klenteng Kwan Sing Bio")), price: "Gratis", rating: 4.6, duration: "1-2 Jam", listeners: "2.0k",
  },
  {
    id: slug("Candi Badut"), title: "Candi Badut", city: "Malang", province: "Jawa Timur", region: "Jawa", category: "candi",
    description: "Candi Hindu tertua di Jawa Timur yang diperkirakan dibangun pada tahun 760 M peninggalan Kerajaan Kanjuruhan. Narasi audio mengisahkan Raja Gajayana, penemuan Prasasti Dinoyo, dan bentuk batu polos peralihan Jawa Tengah ke Jawa Timur.",
    image: img(slug("Candi Badut")), price: "Rp 5.000", rating: 4.4, duration: "1 Jam", listeners: "1.2k",
  },
  {
    id: slug("Museum Angkut Ekstra"), title: "Museum Angkut", city: "Batu", province: "Jawa Timur", region: "Jawa", category: "museum",
    description: "Museum transportasi pertama di Asia Tenggara yang menyajikan evolusi alat angkut dunia dengan setting zonasi budaya sejarah global. Audio mengulas mobil kepresidenan pertama RI, becak Jawa antik, hingga gerobak tradisional.",
    image: img(slug("Museum Angkut Ekstra")), price: "Rp 100.000", rating: 4.7, duration: "3-4 Jam", listeners: "8.2k", isPopular: true,
  },
]