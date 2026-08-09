import { z } from "zod"

/** Validasi nyata tanggal YYYY-MM-DD. */
export function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const d = new Date(`${value}T00:00:00`)
  return !Number.isNaN(d.getTime())
}

export const TravelPlanSchema = z
  .object({
    start: z
      .string()
      .min(1, "Pilih tanggal mulai liburan")
      .refine(isValidDate, { message: "Tanggal mulai tidak valid" }),
    end: z.string().min(1, "Pilih tanggal selesai liburan"),
    province: z.string().default("Semua"),
  })
  .superRefine((data, ctx) => {
    if (data.end && data.start && data.end < data.start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["end"],
        message: "Tanggal selesai harus setelah/ sama dengan tanggal mulai",
      })
    }
  })

export type TravelPlanFormValues = z.infer<typeof TravelPlanSchema>
