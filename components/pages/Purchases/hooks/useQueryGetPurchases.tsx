import { purchasesApi, PurchasesFilters } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const GET_PURCHASES_QUERY_KEY = "purchases"

export const useQueryGetPurchases = (filters: PurchasesFilters) => {
  return useQuery({
    queryKey: [
      GET_PURCHASES_QUERY_KEY,
      filters.filter,
      filters.order,
      filters.sortBy,
    ],
    queryFn: async () => {
      return await purchasesApi.getPurchases(filters)
    },
  })
}
