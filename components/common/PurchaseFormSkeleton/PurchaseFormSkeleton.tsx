import { Skeleton } from "@/components/ui/skeleton"

export function PurchaseFormSkeleton() {
  return (
    <div className="flex p-4 gap-4">
      <div className="flex-1">
        <Skeleton className="h-6 w-full" />

        <Skeleton className="h-8 w-full mt-4" />
      </div>
    </div>
  )
}
