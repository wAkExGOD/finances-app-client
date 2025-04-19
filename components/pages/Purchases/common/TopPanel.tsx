import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Pencil } from "lucide-react"
import { CreatePurchaseDialog } from "./CreatePurchaseDialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SORT_BY_ITEMS } from "@/lib/constants/filters"
import { usePurchases } from "@/hooks/usePurchases"

export function TopPanel() {
  const {
    sortingFunction,
    searchString,
    handleSortChange,
    handleSearchChange,
  } = usePurchases()

  return (
    <div className="flex justify-between gap-4">
      <div className="flex gap-2">
        <Input
          value={searchString}
          type="text"
          placeholder="Purchase name"
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        <Select onValueChange={handleSortChange} defaultValue={sortingFunction}>
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SORT_BY_ITEMS.map(({ name, displayName, type }) => (
                <SelectItem key={name} value={name}>
                  {type === "asc" ? <ArrowUp /> : <ArrowDown />} {displayName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <CreatePurchaseDialog
        onCreate={() => console.log("created")}
        trigger={
          <Button>
            <Pencil /> Create purchase
          </Button>
        }
      />
    </div>
  )
}
