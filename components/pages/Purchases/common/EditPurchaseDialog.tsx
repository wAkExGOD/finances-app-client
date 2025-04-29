import { ReactElement, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  PurchaseForm,
  PurchaseFormProps,
  PurchaseFormSkeleton,
} from "@/components/common"
import { useMutateUpdatePurchase } from "../hooks/useMutateUpdatePurchase"
import { PurchaseFormSchema } from "@/components/common/PurchaseForm/schemas"
import { Purchase } from "@/types/Purchase"
import { useQueryGetPurchase } from "../hooks/useQueryGetPurchase"

type EditPurchaseDialogProps = {
  trigger: ReactElement
  purchaseId: Purchase["id"]
}
type PurchaseFormWrapper = Pick<PurchaseFormProps, "onSuccess"> & {
  purchaseId: Purchase["id"]
}

export function EditPurchaseDialog({
  trigger,
  purchaseId,
}: EditPurchaseDialogProps) {
  const [open, setOpen] = useState(false)

  const { mutate: updatePurchase } = useMutateUpdatePurchase(() =>
    setOpen(false)
  )

  const handleUpdatePurchase = (updatedPurchase: PurchaseFormSchema) => {
    if (!updatedPurchase) {
      return
    }

    updatePurchase({
      ...updatedPurchase,
      categoryId: +updatedPurchase.categoryId,
      id: purchaseId,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md md:gap-6">
        <DialogHeader>
          <DialogTitle>Edit purchase</DialogTitle>
        </DialogHeader>
        <PurchaseFormWrapper
          purchaseId={purchaseId}
          onSuccess={handleUpdatePurchase}
        />
      </DialogContent>
    </Dialog>
  )
}

const PurchaseFormWrapper = ({
  purchaseId,
  onSuccess,
}: PurchaseFormWrapper) => {
  const { data: purchase, isLoading } = useQueryGetPurchase(purchaseId)

  if (isLoading) {
    return <PurchaseFormSkeleton />
  }

  if (!purchase) {
    return <div>{`Can't load purchase ${purchaseId}`}</div>
  }

  return <PurchaseForm purchase={purchase} onSuccess={onSuccess} />
}
