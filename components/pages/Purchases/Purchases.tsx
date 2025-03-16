import { TopPanel } from "./common/TopPanel"
import { PurchasesList } from "./common/PurchasesList"

export function Purchases() {
  return (
    <div className="flex flex-col gap-4">
      <TopPanel />
      <PurchasesList />
    </div>
  )
}
