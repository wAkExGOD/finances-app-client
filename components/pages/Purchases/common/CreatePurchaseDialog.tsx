import { ReactElement } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PurchaseForm } from "@/components/common"

type CreatePurchaseDialogProps = {
  onCreate: () => void
  trigger: ReactElement
}

export function CreatePurchaseDialog({ trigger }: CreatePurchaseDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md md:gap-6">
        <DialogHeader>
          <DialogTitle>Create purchase</DialogTitle>
        </DialogHeader>
        <PurchaseForm />
      </DialogContent>
    </Dialog>
  )
}
