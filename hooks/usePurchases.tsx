import { SortByItem } from "@/lib/constants/filters"
import { Purchase } from "@/types/Purchase"
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react"

export type PurchasesContextType = {
  // isLoading: boolean
  // error: Error | null
  // refetch: () => void
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
  "date-asc": (a, b) => a.createdAt - b.createdAt,
  "date-desc": (a, b) => b.createdAt - a.createdAt,
}

const PurchasesContext = createContext<PurchasesContextType | null>(null)

const PurchasesProvider = ({ children }: PropsWithChildren) => {
  // const {
  //   data: notes,
  //   isLoading,
  //   error,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["purchases"],
  //   queryFn: () => getPurchases(),
  // })

  const [sortingFunction, setSortingFunction] =
    useState<SortByItem["name"]>("price-asc")
  const [searchString, setSearchString] = useState("")

  const handleSortChange = (name: SortByItem["name"]) =>
    setSortingFunction(name)
  const handleSearchChange = (searchString: string) =>
    setSearchString(searchString)

  const purchases = useMemo(
    () =>
      [...MOCK_PURCHASES]
        .filter((purchase) => {
          const lowercasedSearchString = searchString.toLowerCase()
          return lowercasedSearchString
            ? purchase.title.toLowerCase().includes(lowercasedSearchString)
            : true
        })
        .sort(sortFunctions[sortingFunction]),
    [searchString, sortingFunction]
  )

  return (
    <PurchasesContext.Provider
      value={{
        // isLoading,
        // error,
        // refetch,
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

const MOCK_PURCHASES: Purchase[] = [
  {
    id: 1,
    title: "Pears",
    description: "Juicy and sweet pears",
    category: "Food and Drink",
    price: 3.5,
    createdAt: 1742727445,
  },
  {
    id: 2,
    title: "Coffee",
    description: "Rich and aromatic coffee beans",
    category: "Food and Drink",
    price: 7.0,
    createdAt: 1742727545,
  },
  {
    id: 3,
    title: "Notebook",
    category: "Purchases",
    price: 2.5,
    createdAt: 1742727645,
  },
  {
    id: 4,
    title: "Headphones",
    description: "Wireless over-ear headphones",
    category: "Communication, PC",
    price: 89.99,
    createdAt: 1742727745,
  },
  {
    id: 5,
    title: "Shampoo",
    description: "Moisturizing shampoo for all hair types",
    category: "Life and entertainment",
    price: 12.0,
    createdAt: 1742727845,
  },
]

const usePurchases = () => useContext(PurchasesContext) as PurchasesContextType

export { PurchasesProvider, usePurchases }
