import { Skeleton } from "@/components/ui/skeleton"

export const PurchasesSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-40 rounded-lg" />
      ))}
    </div>
  )
}
