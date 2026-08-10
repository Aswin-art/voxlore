import { DESTINATION_IMAGE_KEYS, CULTURE_IMAGE_KEYS } from "@/lib/data/image-manifest"

export function hasCatalogImage(image: string | undefined): boolean {
  if (!image?.trim()) return false
  const key = image
    .split("/")
    .pop()!
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .trim()
  return DESTINATION_IMAGE_KEYS.has(key) || CULTURE_IMAGE_KEYS.has(key)
}
