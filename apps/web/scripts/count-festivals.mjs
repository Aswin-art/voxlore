import { readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const base = join(__dirname, "..")
const regions = ["sumatera", "jawa", "bali-nusa", "kalimantan", "sulawesi", "maluku-papua"]
let oldCount = 0
for (const r of regions) {
  const f = readFileSync(join(base, `lib/data/regions/${r}.ts`), "utf8")
  oldCount += [...f.matchAll(/startDate:/g)].length
}
const aug = readFileSync(join(base, "lib/data/regions/festivals-aug-sep.ts"), "utf8")
const newCount = [...aug.matchAll(/startDate:/g)].length
console.log("Festival lama (region files):", oldCount)
console.log("Festival tambahan (aug-sep):", newCount)
console.log("TOTAL festival:", oldCount + newCount)