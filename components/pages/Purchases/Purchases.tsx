"use client"

import { TopPanel } from "./common/TopPanel"
import { PurchasesList } from "./common/PurchasesList"
import { PurchasesSettingsProvider } from "@/hooks/usePurchasesSettings"

export function Purchases() {
  return (
    <PurchasesSettingsProvider>
      <div className="h-full flex flex-col gap-4">
        <TopPanel />
        <PurchasesList />
      </div>
    </PurchasesSettingsProvider>
  )
}
