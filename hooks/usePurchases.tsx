import { purchasesApi } from "@/api"
import { SortByItem } from "@/lib/constants/filters"
import { Purchase } from "@/types/Purchase"
import { useQuery } from "@tanstack/react-query"
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react"

export type PurchasesContextType = {
  isLoading: boolean
  error: Error | null
  refetch: () => void
  purchases: Purchase[]
  handleSortChange: (sortBy: SortByItem["name"]) => void
  handleSearchChange: (searchText: string) => void
  sortingFunction: SortByItem["name"]
  searchString: string
}

const sortFunctions: Record<
  SortByItem["name"],
  (a: Purchase, b: Purchase) => number
> = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "date-asc": (a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  "date-desc": (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
}

const PurchasesContext = createContext<PurchasesContextType | null>(null)

const PurchasesProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["purchases"],
    queryFn: () => purchasesApi.getPurchases(),
  })

  const [sortingFunction, setSortingFunction] =
    useState<SortByItem["name"]>("price-asc")
  const [searchString, setSearchString] = useState("")

  const handleSortChange = (name: SortByItem["name"]) =>
    setSortingFunction(name)
  const handleSearchChange = (searchString: string) =>
    setSearchString(searchString)

  const purchases = useMemo(
    () =>
      data?.length
        ? [...data]
            .filter((purchase) => {
              const lowercasedSearchString = searchString.toLowerCase()
              return lowercasedSearchString
                ? purchase.name.toLowerCase().includes(lowercasedSearchString)
                : true
            })
            .sort(sortFunctions[sortingFunction])
        : [],
    [data, searchString, sortingFunction]
  )

  return (
    <PurchasesContext.Provider
      value={{
        isLoading,
        error,
        refetch,
        purchases,
        sortingFunction,
        searchString,
        handleSortChange,
        handleSearchChange,
      }}
    >
      {children}
    </PurchasesContext.Provider>
  )
}

const usePurchases = () => useContext(PurchasesContext) as PurchasesContextType

export { PurchasesProvider, usePurchases }
