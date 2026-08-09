import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const base = join(__dirname, "..")
const dir = join(base, "public/assets/destinations")
const src = readFileSync(join(base, "lib/data/regions/festivals-aug-sep.ts"), "utf8")

const idRe = /id: slug\("([^"]+)"\)/g
const ids = [...src.matchAll(idRe)].map((m) => m[1])
console.log("Total festival di data:", ids.length)

let missing = 0
for (const id of ids) {
  const f = join(dir, `${id}.jpg`)
  if (!existsSync(f)) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#1E2229'/><text x='400' y='300' fill='#C8AA6E' font-family='sans-serif' font-size='22' text-anchor='middle'>${id}</text></svg>`
    writeFileSync(f, svg, "utf8")
    missing++
  }
}
const total = readdirSync(dir).filter((x) => x.endsWith(".jpg")).length
console.log("Placeholder dibuat utk festival yg gagal:", missing)
console.log("Total file gambar .jpg sekarang:", total)