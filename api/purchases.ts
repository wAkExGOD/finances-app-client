import {
  AllPurchases,
  CreatePurchaseDto,
  Purchase,
  PurchasesDailyStatsResponse,
  PurchasesMonthlySpendingStatsResponse,
  DatePeriod,
  SpendingForPeriodResponse,
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
    filters,
    pagination,
  }: {
    filters: PurchasesFilters
    pagination?: {
      page: number
      pageSize: number
    }
  }) => {
    const { sortBy, order, filter } = filters
    const params = new URLSearchParams()

    if (sortBy) {
      params.set("sortBy", sortBy)
    }
    if (order) {
      params.set("order", order)
    }
    if (filter) {
      params.set("filter", filter)
    }
    if (pagination) {
      params.set("page", String(pagination.page))
      params.set("pageSize", String(pagination.pageSize))
    }

    return apiInstance<AllPurchases>(`/purchases?${params.toString()}`)
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

  /* Statistics */
  getPurchasesDailyStats: () =>
    apiInstance<PurchasesDailyStatsResponse>("/purchases/statistics/daily"),
  getMonthlySpendingByCategory: (categoryId: PurchaseCategory["id"]) =>
    apiInstance<PurchasesMonthlySpendingStatsResponse>(
      `/purchases/statistics/category/${categoryId}`
    ),
  getSpendingStatsForPeriod: (period: DatePeriod) =>
    apiInstance<SpendingForPeriodResponse>("/purchases/statistics/for-period", {
      method: "POST",
      json: period,
    }),
}
