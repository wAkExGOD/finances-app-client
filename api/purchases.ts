import {
  CreatePurchaseDto,
  Purchase,
  UpdatePurchaseDto,
} from "@/types/Purchase"
import { apiInstance } from "./instance"
import { PurchaseCategory } from "@/types/PurchaseCategory"

export type PurchasesFilters = Partial<{
  filter: string
  sortBy: "price" | "createdAt"
  order: "asc" | "desc"
}>

export const purchasesApi = {
  getPurchases: ({
    filter = "",
    sortBy = "createdAt",
    order = "desc",
  }: PurchasesFilters) => {
    const params = new URLSearchParams({
      sortBy,
      order,
    })
    if (filter.length > 0) {
      params.set("filter", filter)
    }

    return apiInstance<Purchase[]>(`/purchases?${params.toString()}`)
  },
  getPurchase: (id: Purchase["id"]) =>
    apiInstance<Purchase>(`/purchases/${id}`),
  getCategories: () => apiInstance<PurchaseCategory[]>("/categories"),
  createPurchase: (purchaseData: CreatePurchaseDto) =>
    apiInstance<Purchase>("/purchases", {
      method: "POST",
      json: purchaseData,
    }),
  updatePurchase: (purchaseData: UpdatePurchaseDto) =>
    apiInstance<Purchase>(`/purchases/${purchaseData.id}`, {
      method: "PATCH",
      json: purchaseData,
    }),
  removePurchase: (id: Purchase["id"]) =>
    apiInstance(`/purchases/${id}`, {
      method: "DELETE",
    }),
}
