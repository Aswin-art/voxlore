# Business Plan — Voxlore

**"Time-Aware Cultural Audio Guide" untuk Wisata Indonesia**

*Versi: 1.0 (Pivot All-Access + Kalender Festival)*

---

## 1. Ringkasan Eksekutif

**Voxlore** adalah platform peta budaya interaktif berbasis web (PWA) + QR code yang memberikan **panduan audio sinematik** (narasi pengisi suara lokal + soundscape musik tradisional) untuk destinasi budaya Indonesia. Diferensiasi utamanya: **dimensi waktu** — platform tahu *kapan* festival budaya berlangsung, sehingga membantu turis merencanakan liburan berbasis budaya.

**USP (3):**
1. **Zero-friction** — akses instan via QR, tanpa install aplikasi.
2. **Time-Aware** — kalender festival + filter rentang tanggal liburan.
3. **Satu langganan, semua akses** — all-access pass, bukan pay-per-destinasi.

**Model:** Hybrid **B2C All-Access Subscription** + **B2B Sponsorship/SaaS**.

---

## 2. Masalah & Peluang

| Problem | Peluang |
| :--- | :--- |
| Turis melewatkan festival adat karena tidak tahu jadwal | Kalender budaya terintegrasi + date-range filter |
| Pemandu tur fisik mahal ($30–100/hari) & kaku | Audio guide terjangkau & fleksibel |
| Bosan baca papan teks di lokasi | Immersive audio storytelling |
| Pengelola destinasi tak mampu buat app sendiri | Voxlore siap pakai (PWA + QR + insight) |

**Pasar:** Self-guided & experiential cultural tourism pasca-pandemi (tren naik, terutama Gen-Z/millennial dan turis asing backpacker).

---

## 3. Pivot dari Model Sebelumnya

| Aspek | Sebelumnya | Sekarang (Pivot) |
| :--- | :--- | :--- |
| Monetisasi B2C | Pay-per-Destination (Rp 25k/lokasi) | **All-Access Pass** (langganan semua fitur & semua voice note) |
| Fitur unggulan | Peta + audio | **+ Kalender Festival + Vacation Plan** |
| Alasan pivot | Logika unlock per lokasi rumit | Satu flag `isPremium` → bersih, cocok demo |

---

## 4. Produk & Fitur

**Layer B2C (untuk turis):**
1. **Peta budaya interaktif** — pilih provinsi → panel bawah (mobile) berisi budaya/makanan/tarian/kerajinan + gambar.
2. **Audio guide sinematik** — voice note per spot + soundscape, waveform, live transcript.
3. **Kalender Festival Budaya** ⭐ — input rentang tanggal liburan (misal Bali, 1–8 Des) → tampilkan festival yang berlangsung, lengkap deskripsi + video + lokasi.
4. **Vacation Plan** — simpan festival & spot ke rencana liburan, bisa di-export.
5. **QR simulator** — simulasi scan di lokasi → putar audio instan.

**Layer B2B (untuk pengelola/DMO):**
6. **Sponsored Event Slot** — festival berbayar dapat badge "Featured" + prioritas tampil.
7. **Setup Package** — produksi audio + QR board fisik + dashboard.
8. **Tourism Analytics** — insight kunjungan, QR scan, preferensi.

---

## 5. Monetisasi B2C (Pricing)

Berbasis **durasi liburan** (bukan recurring bulanan) agar sesuai perilaku turis:

| Pass | Harga | Target & Nilai |
| :--- | :--- | :--- |
| **Weekly Vacation Pass** | **Rp 29.000** | Turis liburan 1 minggu — *best seller* |
| **Monthly Pass** | Rp 59.000 | Digital nomad / staycation |
| **Annual Explorer Pass** | Rp 199.000 | Traveler aktif / pegiat budaya |

*Benchmark: VoiceMap $5.99–9.99/tur. Harga kami lebih murah untuk akses total.*

**Alasan all-access > per-destinasi:**
- Turis multi-destinasi (Bali→Lombok 1 minggu) tak perlu beli pass berulang.
- Arsitektur sederhana (1 flag `isPremium`), demo mulus.
- Kontra: turis jarang liburan enggan recurring → diatasi dengan Weekly Pass (bukan langganan).

---

## 6. Monetisasi B2B (Keuntungan Pengelola)

**Mengapa pengelola mau bekerjasama/bayar?**
- Tanpa buang dana besar buat app sendiri (hemat Rp 100M+).
- Naikkan **dwell-time & spending** turis (audio guide memperpanjang kunjungan → UMKM terjual).
- Dapat **data insight** yang selama ini blind-spot bagi DMO.

**Revenue stream (urut prioritas):**

| # | Stream | Deskripsi | Kenapa pengelola mau |
| :-- | :--- | :--- | :--- |
| 1 | **Sponsored Event Slot** | Badge "Featured" emas + prioritas di filter tanggal | Festival tak sepi — tepat menarget turis yang sedang merencanakan liburan |
| 2 | **Hotel Bulk Voucher** | Jual voucher all-access grosir (diskon 50%) ke hotel | Hotel dapat bonus fasilitas terbaik untuk tamu |
| 3 | **Setup Package** (Rp 3–10jt/destinasi) | Produksi audio naratif + QR board + dashboard | Digitalisasi tanpa biaya IT mahal |
| 4 | **Analytics Dashboard** | Lisensi data kunjungan untuk DMO | Dapat insight pengunjung |

---

## 7. Posisi Kompetitif

| Parameter | VoiceMap | SmartGuide | **Voxlore** |
| :--- | :--- | :--- | :--- |
| Model | Pay-per-tour / kredit | B2B SaaS | **All-Access + B2B Sponsor** |
| Install app | Ya | Ya | **Tidak (PWA + QR)** |
| Kalender festival | Tidak ada | Terbatas | **Time-Aware + Vacation Plan** |
| Fokus | Global/umum | Global enterprise | **Budaya & pariwisata Indonesia** |

---

## 8. Rencana Eksekusi (Roadmap Lomba)

**Fase 1 — MVP inti (Must-have):**
- Kalender festival + filter rentang tanggal → update marker peta real-time.
- Vacation Drawer (simpan festival/spot).
- Audio player sinematik (2–3 sample narasi + placeholder).
- 1-click Vacation Pass via Midtrans.
- QR simulator.

**Fase 2 — Mock B2B (Should-have):**
- Sponsored badge (1 festival diperlakukan "Featured").
- DMO Analytics tab (dummy chart).

**Fase 3 — Ditunda (bukan untuk lomba):**
- Backend DB & auth real-time.
- Drag-and-drop itinerary routing (Google Maps).
- Multi-tier B2B portal.
- PWA offline caching kompleks.

**Data festival:** file statis `festivals.json` (20–25 festival ikonik), diklaim sinkron dari Kemenparekraf (Karisma Event Nusantara).

---

## 9. Strategi Pitch (3–5 menit)

1. **Hook (30 detik):** Turis Indonesia melewatkan festival adat karena tak tahu jadwal + pemandu mahal.
2. **Demo B2C (90 detik):** Input tanggal liburan Bali → muncul festival → tambah ke rencana → QR scan → audio sinematik berputar.
3. **Monetisasi B2C (30 detik):** 1-click Vacation Pass Rp 29k via Midtrans.
4. **B2B win-win (60 detik):** Pengelola tak perlu app mahal; bisa jadi sponsored + QR board.
5. **Closing (30 detik):** Voxlore melestarikan budaya sambil mendigitalkan experiential tourism.

---

## 10. Metrik Kunci (untuk Validasi)

| Metrik | Target Fase Pilot |
| :--- | :--- |
| QR Scan Rate | Turis memindai papan QR |
| Completion Rate | % mendengarkan audio hingga selesai |
| Conversion Rate | % membeli Vacation Pass |
| Recurring | Churn Weekly → Monthly/Annual |