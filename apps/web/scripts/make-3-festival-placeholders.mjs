import { writeFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const base = join(__dirname, "..")
const dir = join(base, "public/assets/destinations")

const failed = ["kirab-nadran-cirebon-2026", "festival-sandeq-silumba-2026", "kaghati-kolope-2026"]
let made = 0
for (const id of failed) {
  const f = join(dir, `${id}.jpg`)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#1E2229'/><text x='400' y='300' fill='#C8AA6E' font-family='sans-serif' font-size='22' text-anchor='middle'>${id}</text></svg>`
  writeFileSync(f, svg, "utf8")
  made++
}
console.log("Placeholder dibuat:", made)
console.log("Total file .jpg di destinations:", readdirSync(dir).filter((x) => x.endsWith(".jpg")).length)