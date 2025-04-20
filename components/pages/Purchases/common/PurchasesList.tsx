import { Purchase } from "@/types/Purchase"
import { PurchaseCard } from "./PurchaseCard"
import { usePurchases } from "@/hooks/usePurchases"

export function PurchasesList() {
  const { isLoading, purchases } = usePurchases()

  const handleDelete = (id: Purchase["id"]) => console.log(`delete ${id}`)
  const handleEdit = async (id: Purchase["id"]) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(console.log(`edit ${id}`)))
    })
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (purchases.length === 0) {
    return <div className="text-center">You have no purchases</div>
  }

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
      {purchases.map((purchase) => (
        <PurchaseCard
          key={purchase.id}
          purchase={purchase}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  )
}
