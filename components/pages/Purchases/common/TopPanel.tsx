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
import { SORT_ITEMS } from "@/lib/constants/filters"
import { usePurchasesSettings } from "@/hooks/usePurchasesSettings"

export function TopPanel() {
  const {
    sortingFunction,
    searchString,
    handleSortChange,
    handleSearchChange,
  } = usePurchasesSettings()

  return (
    <div className="flex justify-between gap-4 flex-wrap">
      <div className="flex gap-2">
        <Input
          value={searchString}
          type="text"
          placeholder="Purchase name"
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        <Select
          onValueChange={handleSortChange}
          defaultValue={sortingFunction.name}
        >
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SORT_ITEMS.map(({ name, displayName, type }) => (
                <SelectItem key={name} value={name}>
                  {type === "asc" ? <ArrowUp /> : <ArrowDown />} {displayName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <CreatePurchaseDialog
        trigger={
          <Button>
            <Pencil /> Create purchase
          </Button>
        }
      />
    </div>
  )
}
