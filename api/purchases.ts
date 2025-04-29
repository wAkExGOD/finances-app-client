import {
  CreatePurchaseDto,
  Purchase,
  UpdatePurchaseDto,
} from "@/types/Purchase"
import { apiInstance } from "./instance"

export const purchasesApi = {
  getPurchases: () => apiInstance<Purchase[]>("/purchases"),
  createPurchase: (purchaseData: CreatePurchaseDto) =>
    apiInstance<Purchase>("/purchases", {
      method: "POST",
      json: purchaseData,
    }),
  updatePurchase: (purchaseData: UpdatePurchaseDto) =>
    apiInstance<Purchase>("/purchases", {
      method: "PATCH",
      json: purchaseData,
    }),
  removePurchase: (id: Purchase["id"]) =>
    apiInstance(`/purchases/${id}`, {
      method: "DELETE",
    }),
}
