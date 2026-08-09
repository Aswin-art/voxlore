// scripts/download-extra-images.mjs
// Mengunduh gambar destinasi TAMBAHAN (*-extra.ts) ke public/assets/destinations/
// Query di-generate otomatis dari title tiap destinasi (± region untuk disambiguasi).
import { mkdir, writeFile, access, readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = resolve(__dirname, "../lib/data/regions")
const OUT_DIR = resolve(__dirname, "../public/assets/destinations")

const UA = "Voxlore-Research/1.0 (contact: dev@voxlore.id)"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Ambil pasangan [slugId, title, region] dari file TS add-on
async function parseRegionTitles() {
  const files = [
    "sumatera-extra.ts",
    "jawa-extra.ts",
    "bali-nusa-extra.ts",
    "kalimantan-extra.ts",
    "sulawesi-extra.ts",
    "maluku-papua-extra.ts",
  ]
  const rows = []
  for (const f of files) {
    const src = await readFile(resolve(DATA_DIR, f), "utf8")
    // id: slug("..."), title: "..."
    const idRe = /id: slug\("([^"]+)"\)/g
    const titleRe = /title: "([^"]+)",\s*city: "([^"]+)",\s*province: "([^"]+)"/g
    const ids = [...src.matchAll(idRe)].map((m) => m[1])
    let t
    let i = 0
    while ((t = titleRe.exec(src)) !== null) {
      rows.push({ id: ids[i++], title: t[1], province: t[3] })
    }
  }
  return rows
}

async function searchCommons(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query" +
    "&generator=search&gsrsearch=" +
    encodeURIComponent(query) +
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

async function downloadImage(url, dest) {
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
  const rows = await parseRegionTitles()
  console.log(`Membaca ${rows.length} destinasi tambahan`)

  let ok = 0
  let fail = 0
  const failures = []

  for (let i = 0; i < rows.length; i++) {
    const { id, title, province } = rows[i]
    const dest = resolve(OUT_DIR, `${id}.jpg`)
    try {
      await access(dest)
      ok++
      continue // sudah ada
    } catch {}

    // query: title + provinsi (disambiguasi)
    const query = province ? `${title} ${province}` : title
    try {
      const best = await searchCommons(query)
      if (!best || !best.thumburl) throw new Error("no image found")
      await downloadImage(best.thumburl.replace(/&utm.*$/, ""), dest)
      ok++
      if (ok % 20 === 0) console.log(`  ...${ok}/${rows.length} berhasil`)
    } catch (err) {
      fail++
      failures.push({ id, query, error: err.message })
    }
    await sleep(1300)
  }

  console.log(`\nSelesai: ${ok} gambar berhasil, ${fail} gagal dari ${rows.length} total.`)
  if (failures.length) {
    console.log("\nGagal:")
    for (const f of failures) console.log(`  - ${f.id} <- "${f.query}" (${f.error})`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})