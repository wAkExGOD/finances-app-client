"use client"

import { TopPanel } from "./common/TopPanel"
import { PurchasesList } from "./common/PurchasesList"
import { PurchasesProvider } from "@/hooks/usePurchases"

export function Purchases() {
  return (
    <PurchasesProvider>
      <div className="flex flex-col gap-4">
        <TopPanel />
        <PurchasesList />
      </div>
    </PurchasesProvider>
  )
}
