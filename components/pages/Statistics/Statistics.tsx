import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "@/app/get-query-client"
import { purchasesApi } from "@/api"
import { AreaChart, GET_AREA_CHART_QUERY_KEY } from "./common/AreaChart"
import { BarChart } from "./common/BarChart"
import { PeriodStatistics } from "./common/PeriodStatistics"

export function Statistics() {
  return (
    <>
      <AreaChartWrapper />
      <BarChart />
      <PeriodStatistics />
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
