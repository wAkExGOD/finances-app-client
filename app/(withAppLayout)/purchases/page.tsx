import { Metadata } from "next"
import { Purchases } from "@/components/pages"

export const metadata: Metadata = {
  title: "Finances App - Purchases",
  description: "Add, update and delete purchases in Finance App",
}

export default function Page() {
  return <Purchases />
}
