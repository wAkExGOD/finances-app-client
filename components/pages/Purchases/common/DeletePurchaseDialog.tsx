import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Purchase } from "@/types/Purchase"
import { ReactElement } from "react"
import { useMutateDeletePurchase } from "../hooks/useMutateDeletePurchase"

type DeletePurchaseDialogProps = {
  open: boolean
  trigger: ReactElement
  setOpen: (open: boolean) => void
  purchaseId: Purchase["id"]
}

export function DeletePurchaseDialog({
  open,
  trigger,
  setOpen,
  purchaseId,
}: DeletePurchaseDialogProps) {
  const { mutate: deletePurchase } = useMutateDeletePurchase()

  const handleDeletePurchase = () => {
    deletePurchase(purchaseId)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            purchase from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletePurchase}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
