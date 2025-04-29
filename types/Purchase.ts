import { PurchaseCategory } from "./PurchaseCategory"

export type Purchase = {
  id: number
  name: string
  category: PurchaseCategory
  price: number
  createdBy: number
  createdAt: string
  updatedAt: string
}

export type CreatePurchaseDto = Pick<Purchase, "name" | "price"> & {
  categoryId: number
}

export type UpdatePurchaseDto = Partial<CreatePurchaseDto>
