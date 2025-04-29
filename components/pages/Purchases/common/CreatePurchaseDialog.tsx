import { ReactElement, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PurchaseForm } from "@/components/common"
import { useMutateCreatePurchase } from "../hooks/useMutateCreatePurchase"
import { PurchaseFormSchema } from "@/components/common/PurchaseForm/schemas"

type CreatePurchaseDialogProps = {
  trigger: ReactElement
}

export function CreatePurchaseDialog({ trigger }: CreatePurchaseDialogProps) {
  const [open, setOpen] = useState(false)
  const { mutate: createPurchase } = useMutateCreatePurchase(() =>
    setOpen(false)
  )

  const handleCreatePurchase = (purchase: PurchaseFormSchema) => {
    createPurchase({
      ...purchase,
      categoryId: +purchase.categoryId,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md md:gap-6">
        <DialogHeader>
          <DialogTitle>Create purchase</DialogTitle>
        </DialogHeader>
        <PurchaseForm onSuccess={handleCreatePurchase} />
      </DialogContent>
    </Dialog>
  )
}
