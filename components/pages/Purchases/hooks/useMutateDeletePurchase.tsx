import { purchasesApi } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { GET_PURCHASES_QUERY_KEY } from "./useQueryGetPurchases"

export const useMutateDeletePurchase = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: purchasesApi.removePurchase,
    onSuccess: () => {
      toast.success("Success!", {
        description: "Purchase has been deleted",
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PURCHASES_QUERY_KEY] })
    },
  })
}
