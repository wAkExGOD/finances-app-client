"use client"

import { TopPanel } from "./common/TopPanel"
import { PurchasesList } from "./common/PurchasesList"
import { PurchasesFiltersProvider } from "@/hooks/usePurchasesFilters"

export function Purchases() {
  return (
    <PurchasesFiltersProvider>
      <div className="flex flex-col gap-4">
        <TopPanel />
        <PurchasesList />
      </div>
    </PurchasesFiltersProvider>
  )
}
