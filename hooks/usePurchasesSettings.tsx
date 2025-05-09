import { SORT_ITEMS, SortItem } from "@/lib/constants/filters"
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"

export type PurchasesSettingsContextType = {
  sortingFunction: SortItem
  searchString: string
  currentPage: number
  handleSortChange: (sortBy: SortItem["name"]) => void
  handleSearchChange: (searchText: string) => void
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const PurchasesSettingsContext =
  createContext<PurchasesSettingsContextType | null>(null)

const PurchasesSettingsProvider = ({ children }: PropsWithChildren) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortingFunction, setSortingFunction] = useState<SortItem>(
    SORT_ITEMS[0]
  )
  const [searchString, setSearchString] = useState("")

  const handleSortChange = (name: SortItem["name"]) => {
    setCurrentPage(1)
    setSortingFunction(SORT_ITEMS.find((fn) => fn.name === name) as SortItem)
  }
  const handleSearchChange = (searchString: string) => {
    setCurrentPage(1)
    setSearchString(searchString)
  }

  return (
    <PurchasesSettingsContext.Provider
      value={{
        sortingFunction,
        searchString,
        currentPage,
        handleSortChange,
        handleSearchChange,
        setCurrentPage,
      }}
    >
      {children}
    </PurchasesSettingsContext.Provider>
  )
}

const usePurchasesSettings = () =>
  useContext(PurchasesSettingsContext) as PurchasesSettingsContextType

export { PurchasesSettingsProvider, usePurchasesSettings }
