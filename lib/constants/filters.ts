export type SortItem = {
  name: "price-asc" | "price-desc" | "date-asc" | "date-desc"
  displayName: string
  value: "createdAt" | "price"
  type: "asc" | "desc"
}

export const SORT_ITEMS: SortItem[] = [
  { name: "date-desc", displayName: "Date", value: "createdAt", type: "desc" },
  { name: "date-asc", displayName: "Date", value: "createdAt", type: "asc" },
  { name: "price-desc", displayName: "Price", value: "price", type: "desc" },
  { name: "price-asc", displayName: "Price", value: "price", type: "asc" },
]
