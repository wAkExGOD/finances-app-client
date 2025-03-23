export type SortByItem = {
  name: "price-asc" | "price-desc" | "date-asc" | "date-desc"
  displayName: string
  type: "asc" | "desc"
}

export const SORT_BY_ITEMS: SortByItem[] = [
  { name: "price-asc", displayName: "Price", type: "asc" },
  { name: "price-desc", displayName: "Price", type: "desc" },
  { name: "date-asc", displayName: "Date", type: "asc" },
  { name: "date-desc", displayName: "Date", type: "desc" },
]
