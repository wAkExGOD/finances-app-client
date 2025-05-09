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

export type AllPurchases = {
  totalCount: number
  totalPages: number
  currentPage: number
  purchases: Purchase[]
}

export type CreatePurchaseDto = Pick<Purchase, "name" | "price"> & {
  categoryId: number
}

export type UpdatePurchaseDto = Partial<CreatePurchaseDto> & {
  id: Purchase["id"]
}

export type PurchasesDailyStats = {
  [categoryId: number]: number
  date: string
}[]

export type TransformedPurchasesStats = ({
  [categoryName: string]: number
} & { month: string })[]

export type PurchasesMonthlySpendingStats = {
  month: string
  [categoryId: number]: number
}[]
