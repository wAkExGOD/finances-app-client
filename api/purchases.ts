import { Purchase } from "@/types/Purchase"
import { apiInstance } from "./instance"

export const purchasesApi = {
  getPurchases: () => {
    return apiInstance<Purchase[]>("/purchases")
  },
}
