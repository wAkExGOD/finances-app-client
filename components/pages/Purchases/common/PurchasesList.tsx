"use client"

import { useCallback } from "react"
import { usePurchasesSettings } from "@/hooks/usePurchasesSettings"
import { Pagination } from "@/components/custom-ui/pagination"
import { useQueryGetPurchases } from "../hooks/useQueryGetPurchases"
import { PurchaseCard } from "./PurchaseCard"
import { PurchasesSkeleton } from "./PurchasesSkeleton"

const PURCHASES_PER_PAGE = 12

export function PurchasesList() {
  const { sortingFunction, searchString, currentPage, setCurrentPage } =
    usePurchasesSettings()
  const { data, isLoading } = useQueryGetPurchases({
    filters: {
      filter: searchString,
      sortBy: sortingFunction.value,
      order: sortingFunction.type,
    },
    pagination: {
      page: currentPage,
      pageSize: PURCHASES_PER_PAGE,
    },
  })

  const handleSetPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSetNextPage = useCallback(() => {
    if (!data) {
      return
    }
    if (currentPage < data.totalPages) {
      setCurrentPage((page) => page + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showPurchases = !isLoading && data && data.purchases.length > 0
  const showNoPurchasesMessage =
    !isLoading && data && data.purchases.length === 0

  return (
    <div className="h-full flex flex-col justify-between gap-4">
      {showPurchases && (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
          {data.purchases.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </div>
      )}

      {showNoPurchasesMessage && (
        <div className="text-center">You have no purchases</div>
      )}

      {isLoading && <PurchasesSkeleton />}

      {showPurchases && (
        <Pagination
          page={currentPage}
          totalPages={data.totalPages}
          onSetPage={setCurrentPage}
          onSetPrevPage={handleSetPrevPage}
          onSetNextPage={handleSetNextPage}
        />
      )}
    </div>
  )
}
