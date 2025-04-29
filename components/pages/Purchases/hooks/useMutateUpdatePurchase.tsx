import { purchasesApi } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { GET_PURCHASES_QUERY_KEY } from "./useQueryGetPurchases"
import { GET_PURCHASE_QUERY_KEY } from "./useQueryGetPurchase"

export const useMutateUpdatePurchase = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: purchasesApi.updatePurchase,
    onSuccess: () => {
      toast.success("Success!", {
        description: "Purchase has been updated",
      })
      onSuccess?.()
    },
    onSettled: (purchase) => {
      queryClient.invalidateQueries({ queryKey: [GET_PURCHASES_QUERY_KEY] })

      if (purchase) {
        queryClient.invalidateQueries({
          queryKey: [GET_PURCHASE_QUERY_KEY, purchase.id],
        })
      }
    },
  })
}
