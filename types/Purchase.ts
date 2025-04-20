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
