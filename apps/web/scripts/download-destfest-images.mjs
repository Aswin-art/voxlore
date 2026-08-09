// scripts/download-destfest-images.mjs
// Mengunduh gambar destinasi wisata & festival ke public/assets/destinations/
// menggunakan Wikimedia Commons API search per item.
import { mkdir, writeFile, access } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { DEST_FEST_QUERIES } from "./destfest-queries.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, "../public/assets/destinations")

const UA = "Voxlore-Research/1.0 (contact: dev@voxlore.id)"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function searchCommons(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query" +
    "&generator=search&gsrsearch=" +
    encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=5&prop=imageinfo" +
    "&iiprop=url|size|mime" +
    "&iiurlwidth=900" +
    "&format=json&origin=*"
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(30000) })
  if (res.status === 429) throw new Error("rate-limited")
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const pages = data?.query?.pages
  if (!pages) return null
  const results = Object.values(pages)
    .map((p) => p.imageinfo?.[0])
    .filter(Boolean)
    .filter((ii) => /jpe?g|png|webp/i.test(ii.mime || ""))
    .sort((a, b) => (b.width || 0) - (a.width || 0))
  return results[0] || null
}

async function downloadImage(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    redirect: "follow",
    signal: AbortSignal.timeout(60000),
  })
  if (res.status === 429) throw new Error("rate-limited")
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1000) throw new Error("too small")
  await writeFile(dest, buf)
  return buf.length
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const entries = Object.entries(DEST_FEST_QUERIES)
  let ok = 0
  let fail = 0
  const failures = []

  for (let i = 0; i < entries.length; i++) {
    const [key, query] = entries[i]
    const dest = resolve(OUT_DIR, `${key}.jpg`)
    try {
      await access(dest)
      ok++
      continue
    } catch {}
    try {
      const best = await searchCommons(query)
      if (!best || !best.thumburl) throw new Error("no image found")
      const bytes = await downloadImage(best.thumburl.replace(/&utm.*$/, ""), dest)
      ok++
      if (ok % 20 === 0) console.log(`  ...${ok}/${entries.length} berhasil`)
    } catch (err) {
      fail++
      failures.push({ key, query, error: err.message })
      console.error(`  x ${key} (${query}): ${err.message}`)
    }
    await sleep(1300)
  }

  console.log(`\nSelesai: ${ok} gambar berhasil, ${fail} gagal dari ${entries.length} total.`)
  if (failures.length) {
    console.log("\nDaftar gagal:")
    for (const f of failures) console.log(`  - ${f.key} <- "${f.query}" (${f.error})`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})