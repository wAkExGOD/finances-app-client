import { purchasesApi } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { GET_PURCHASES_QUERY_KEY } from "./useQueryGetPurchases"

export const useMutateCreatePurchase = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: purchasesApi.createPurchase,
    onSuccess: () => {
      toast.success("Success!", {
        description: "Purchase has been created",
      })
      onSuccess?.()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PURCHASES_QUERY_KEY] })
    },
  })
}
