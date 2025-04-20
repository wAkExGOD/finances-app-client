import { ReactElement } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PurchaseDto } from "@/api"
import { PurchaseForm } from "@/components/common"

type EditPurchaseDialogProps = {
  onEdit: (id: PurchaseDto["id"]) => void
  trigger: ReactElement
  purchase: PurchaseDto
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
