import { purchasesApi } from "@/api"
import { Purchase } from "@/types/Purchase"
import { useQuery } from "@tanstack/react-query"

export const GET_PURCHASE_QUERY_KEY = "purchase"

export const useQueryGetPurchase = (id?: Purchase["id"]) => {
  return useQuery({
    queryKey: [GET_PURCHASE_QUERY_KEY, id],
    queryFn: async () => {
      if (!id) {
        return undefined
      }

      return await purchasesApi.getPurchase(id)
    },
  })
}
