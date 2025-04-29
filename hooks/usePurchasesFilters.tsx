import { SORT_ITEMS, SortItem } from "@/lib/constants/filters"
import { PropsWithChildren, createContext, useContext, useState } from "react"

export type PurchasesFiltersContextType = {
  handleSortChange: (sortBy: SortItem["name"]) => void
  handleSearchChange: (searchText: string) => void
  sortingFunction: SortItem
  searchString: string
}

const PurchasesFiltersContext =
  createContext<PurchasesFiltersContextType | null>(null)

const PurchasesFiltersProvider = ({ children }: PropsWithChildren) => {
  const [sortingFunction, setSortingFunction] = useState<SortItem>(
    SORT_ITEMS[0]
  )
  const [searchString, setSearchString] = useState("")

  const handleSortChange = (name: SortItem["name"]) => {
    setSortingFunction(SORT_ITEMS.find((fn) => fn.name === name) as SortItem)
  }
  const handleSearchChange = (searchString: string) =>
    setSearchString(searchString)

  return (
    <PurchasesFiltersContext.Provider
      value={{
        sortingFunction,
        searchString,
        handleSortChange,
        handleSearchChange,
      }}
    >
      {children}
    </PurchasesFiltersContext.Provider>
  )
}

const usePurchasesFilters = () =>
  useContext(PurchasesFiltersContext) as PurchasesFiltersContextType

export { PurchasesFiltersProvider, usePurchasesFilters }
