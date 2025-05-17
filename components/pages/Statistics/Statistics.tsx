import { getQueryClient } from "@/app/get-query-client"
import { purchasesApi } from "@/api"
import { AreaChart, GET_AREA_CHART_QUERY_KEY } from "./common/charts/AreaChart"
import { BarChart } from "./common/charts/BarChart"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export function Statistics() {
  return (
    <>
      <AreaChartWrapper />
      <BarChart />
    </>
  )
}

async function AreaChartWrapper() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: [GET_AREA_CHART_QUERY_KEY],
    queryFn: purchasesApi.getPurchasesDailyStats,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AreaChart />
    </HydrationBoundary>
  )
}
