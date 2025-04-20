"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { PropsWithChildren, useState } from "react"

export function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
