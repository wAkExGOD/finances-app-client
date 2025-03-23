import { Button } from "@/components/ui/button"
import { Purchase } from "@/types/Purchase"
import { EditPurchaseDialog } from "./EditPurchaseDialog"
import { DeletePurchaseDialog } from "./DeletePurchaseDialog"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

type PurchaseCardProps = {
  purchase: Purchase
  onEdit: (id: Purchase["id"]) => void
  onDelete: (id: Purchase["id"]) => void
}

export function PurchaseCard({
  purchase,
  onEdit,
  onDelete,
}: PurchaseCardProps) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <div className="relative flex flex-col gap-2 border p-2 rounded-lg md:p-4">
      <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
        {purchase.category}
      </Badge>
      <h3 className="text-lg font-semibold">{purchase.title}</h3>
      <p className="text-lg font-bold font-mono">
        ${purchase.price.toFixed(2)}
      </p>
      <p className="ml-auto text-sm text-sidebar-ring">
        Created: {new Date(purchase.createdAt * 1000).toLocaleDateString()}
      </p>
      <div className="flex flex-col flex-wrap justify-end gap-2 mt-auto md:gap-2 md:flex-row">
        <EditPurchaseDialog
          trigger={
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          }
          purchase={purchase}
          onEdit={onEdit}
        />
        <DeletePurchaseDialog
          trigger={
            <Button variant="outline" size="sm">
              Delete
            </Button>
          }
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onDelete={() => onDelete(purchase.id)}
        />
      </div>
    </div>
  )
}
