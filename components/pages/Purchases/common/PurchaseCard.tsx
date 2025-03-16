import { Button } from "@/components/ui/button"
import { Purchase } from "@/types/Purchase"
import { EditPurchaseDialog } from "./EditPurchaseDialog"
import { DeletePurchaseDialog } from "./DeletePurchaseDialog"
import { useState } from "react"

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
    <div className="flex flex-col gap-2 border p-4 rounded-lg">
      <h3 className="text-lg font-semibold">{purchase.title}</h3>
      <div>
        <p className="text-sm text-primary">{purchase.category}</p>
        <p className="text-sm text-secondary">
          {new Date(purchase.createdAt).toLocaleDateString()}
        </p>
      </div>
      <p className="text-lg font-bold">${purchase.price.toFixed(2)}</p>
      <div className="flex justify-end gap-2 mt-auto">
        <EditPurchaseDialog
          trigger={<Button variant="secondary">Edit</Button>}
          purchase={purchase}
          onEdit={onEdit}
        />
        <DeletePurchaseDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onDelete={() => onDelete(purchase.id)}
        />
      </div>
    </div>
  )
}
