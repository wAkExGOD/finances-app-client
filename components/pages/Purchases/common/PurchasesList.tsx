"use client"

import { PurchaseCard } from "./PurchaseCard"
import { useQueryGetPurchases } from "../hooks/useQueryGetPurchases"
import { usePurchasesFilters } from "@/hooks/usePurchasesFilters"
import { useCallback, useState } from "react"
import { PurchasesSkeleton } from "./PurchasesSkeleton"
import { Pagination } from "@/components/custom-ui/pagination"

const PURCHASES_PER_PAGE = 12

export function PurchasesList() {
  const [page, setPage] = useState(1)
  const { sortingFunction, searchString } = usePurchasesFilters()
  const { data, isLoading } = useQueryGetPurchases({
    filters: {
      filter: searchString,
      sortBy: sortingFunction.value,
      order: sortingFunction.type,
    },
    pagination: {
      page,
      pageSize: PURCHASES_PER_PAGE,
    },
  })

  const handleSetPrevPage = useCallback(() => {
    if (page > 1) {
      setPage((page) => page - 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSetNextPage = useCallback(() => {
    if (!data) {
      return
    }
    if (page < data.totalPages) {
      setPage((page) => page + 1)
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
          page={page}
          totalPages={data.totalPages}
          onSetPage={setPage}
          onSetPrevPage={handleSetPrevPage}
          onSetNextPage={handleSetNextPage}
        />
      )}
    </div>
  )
}
