import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { CreatePurchaseDialog } from "./CreatePurchaseDialog"

export function TopPanel() {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex gap-2">filters</div>
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
