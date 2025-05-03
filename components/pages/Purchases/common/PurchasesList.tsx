import { PurchaseCard } from "./PurchaseCard"
import { useQueryGetPurchases } from "../hooks/useQueryGetPurchases"
import { usePurchasesFilters } from "@/hooks/usePurchasesFilters"

export function PurchasesList() {
  const { sortingFunction, searchString } = usePurchasesFilters()
  const { data: purchases, isLoading } = useQueryGetPurchases({
    filter: searchString,
    sortBy: sortingFunction.value,
    order: sortingFunction.type,
  })

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (!purchases?.length) {
    return <div className="text-center">You have no purchases</div>
  }

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
      {purchases.map((purchase) => (
        <PurchaseCard key={purchase.id} purchase={purchase} />
      ))}
    </div>
  )
}
