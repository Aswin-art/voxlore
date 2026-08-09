// scripts/download-festival-fix.mjs
// Retry download gambar festival menggunakan query manual yang lebih baik.
import { mkdir, writeFile, access } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { FESTIVAL_IMAGE_QUERIES } from "./festival-image-queries.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, "../public/assets/destinations")

const UA = "Voxlore-Research/1.0 (contact: dev@voxlore.id)"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function searchCommons(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query" +
    "&generator=search&gsrsearch=" + encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=5&prop=imageinfo" +
    "&iiprop=url|size|mime&iiurlwidth=900&format=json&origin=*"
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(30000) })
  if (res.status === 429) throw new Error("rate-limited")
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const pages = data?.query?.pages
  if (!pages) return null
  return (
    Object.values(pages)
      .map((p) => p.imageinfo?.[0])
      .filter(Boolean)
      .filter((ii) => /jpe?g|png|webp/i.test(ii.mime || ""))
      .sort((a, b) => (b.width || 0) - (a.width || 0))[0] || null
  )
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow", signal: AbortSignal.timeout(60000) })
  if (res.status === 429) throw new Error("rate-limited")
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1000) throw new Error("too small")
  await writeFile(dest, buf)
  return buf.length
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const entries = Object.entries(FESTIVAL_IMAGE_QUERIES)
  let ok = 0; let fail = 0; const failures = []

  for (let i = 0; i < entries.length; i++) {
    const [key, query] = entries[i]
    const dest = resolve(OUT_DIR, `${key}.jpg`)
    // skip jika sudah foto asli (bukan placeholder SVG)
    try {
      const existing = await import("node:fs/promises").then((m) => m.readFile(dest))
      const head = existing.subarray(0, 200).toString("latin1")
      const isPlaceholder = /^\uFEFF?\s*</.test(head.trimStart())
      if (existing.length > 0 && !isPlaceholder) { ok++; continue } // sudah foto asli
    } catch {}
    try {
      const best = await searchCommons(query)
      if (!best || !best.thumburl) throw new Error("no image found")
      await download(best.thumburl.replace(/&utm.*$/, ""), dest)
      ok++
      if (ok % 15 === 0) console.log(`  ...${ok}/${entries.length} berhasil`)
    } catch (err) {
      fail++; failures.push({ key, query, error: err.message })
    }
    await sleep(1300)
  }
  console.log(`\nSelesai: ${ok} berhasil, ${fail} gagal dari ${entries.length}`)
  if (failures.length) {
    console.log("\nGagal:")
    for (const f of failures) console.log(`  - ${f.key} <- "${f.query}" (${f.error})`)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })