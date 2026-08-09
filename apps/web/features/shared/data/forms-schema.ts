import { z } from "zod"

/** Validasi form ubah kata sandi (halaman /security). */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Kata sandi lama wajib diisi"),
    newPassword: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi"),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Konfirmasi kata sandi tidak cocok",
      })
    }
  })

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

/** Validasi form edit profil (halaman /profile/edit). */
export const editProfileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(6, "Nomor telepon tidak valid"),
  bio: z.string().max(280, "Biografi maksimal 280 karakter").optional().or(z.literal("")),
})

export type EditProfileFormValues = z.infer<typeof editProfileSchema>

/** Validasi form tulis ulasan (drawer review). */
export const reviewSchema = z.object({
  rating: z.number().int().min(1, "Pilih minimal 1 bintang").max(5),
  comment: z.string().min(10, "Ulasan minimal 10 karakter").max(1000, "Ulasan maksimal 1000 karakter"),
  tags: z.array(z.string()).max(5, "Maksimal 5 tag").default([]),
})

export type ReviewFormValues = z.infer<typeof reviewSchema>
