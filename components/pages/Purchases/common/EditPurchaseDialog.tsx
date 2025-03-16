import { ReactElement } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Purchase } from "@/types/Purchase"
import { PurchaseForm } from "@/components/common"

type EditPurchaseDialogProps = {
  onEdit: (id: Purchase["id"]) => void
  trigger: ReactElement
  purchase: Purchase
}

export function EditPurchaseDialog({
  trigger,
  purchase,
}: EditPurchaseDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md md:gap-6">
        <DialogHeader>
          <DialogTitle>Edit purchase</DialogTitle>
        </DialogHeader>
        <PurchaseForm purchase={purchase} />
      </DialogContent>
    </Dialog>
  )
}
