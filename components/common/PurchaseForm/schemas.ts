import { z } from "zod"

export const purchaseFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  categoryId: z.string(),
  price: z
    .union([
      z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
      z.number(),
    ])
    .pipe(z.coerce.number().min(0.01).max(999999999)),
})

export type PurchaseFormSchema = z.infer<typeof purchaseFormSchema>
