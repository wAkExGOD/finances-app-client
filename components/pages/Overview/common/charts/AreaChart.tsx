"use client"

import * as React from "react"
import {
  Area,
  AreaChart as AreaChartComponent,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PurchaseCategory } from "@/types/PurchaseCategory"
import { useQuery } from "@tanstack/react-query"
import { purchasesApi } from "@/api"

const createChartConfig = (categories: PurchaseCategory[]): ChartConfig => {
  const config = {}

  categories.forEach((category, i) => {
    Object.defineProperty(config, category.id, {
      value: {
        label: category.name,
        color: `hsl(var(--chart-${i + 1}))`,
      },
      enumerable: true,
    })
  })

  return config
}

export function AreaChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const { data: categories } = useQuery({
    queryFn: purchasesApi.getCategories,
    queryKey: ["categories"],
  })
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: purchasesApi.getPurchasesDailyStats,
  })

  if (!stats || !categories) {
    return null
  }

  const chartConfig = createChartConfig(categories) satisfies ChartConfig

  const filteredData = stats.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date()

    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b pb-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChartComponent data={filteredData}>
            <defs>
              {categories.map(({ id }) => (
                <linearGradient
                  key={id}
                  id={`fill-${id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${id})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${id})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
              {/* <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient> */}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            {categories.map(({ id }) => (
              <Area
                key={id}
                dataKey={id}
                type="natural"
                fill={`url(#fill-${id})`}
                // fillOpacity={0.4}
                stroke={`var(--color-${id})`}
                stackId="a"
              />
            ))}
            {/* <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            /> */}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChartComponent>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
