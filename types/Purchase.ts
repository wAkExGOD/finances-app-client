import { PurchaseCategory } from "./PurchaseCategory"

export type Purchase = {
  id: number
  title: string
  description?: string
  category: PurchaseCategory
  price: number
  createdAt: number
}
