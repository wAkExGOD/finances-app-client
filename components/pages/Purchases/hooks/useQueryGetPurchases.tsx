import { purchasesApi, PurchasesFilters } from "@/api"
import { ApiError } from "@/api/instance"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export const GET_PURCHASES_QUERY_KEY = "purchases"

type QueryGetPurchasesProps = {
  filters: PurchasesFilters
  pagination: {
    page: number
    pageSize: number
  }
}

export const useQueryGetPurchases = (props: QueryGetPurchasesProps) => {
  return useQuery({
    queryKey: [
      GET_PURCHASES_QUERY_KEY,
      props.filters.filter,
      props.filters.order,
      props.filters.sortBy,
      props.pagination.page,
      props.pagination.pageSize,
    ],
    queryFn: async () => {
      try {
        const data = await purchasesApi.getPurchases({
          filters: props.filters,
          pagination: props.pagination,
        })

        return data
      } catch (error) {
        const errorMessage = (error as ApiError).message
        toast.error(errorMessage || "Error while getting purchases")
      }
    },
    placeholderData: keepPreviousData,
  })
}
