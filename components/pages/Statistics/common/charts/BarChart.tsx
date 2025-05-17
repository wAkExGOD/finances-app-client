"use client"

import { TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart as BarChartComponent,
  CartesianGrid,
  LabelList,
  XAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PurchaseCategory } from "@/types/PurchaseCategory"
import { useEffect, useState } from "react"
import { purchasesApi } from "@/api"
import { useQuery } from "@tanstack/react-query"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQueryGetCategories } from "@/hooks/useQueryGetCategories"

type BarChartWrapperProps = {
  categories?: PurchaseCategory[]
  activeCategory?: PurchaseCategory
  onActiveCategoryClick: (id: string) => void
}

export const GET_BAR_CHART_QUERY_KEY = "stats-by-category"

const createChartConfig = (category: PurchaseCategory): ChartConfig => ({
  [category.id]: {
    label: category.name,
    color: "hsl(var(--chart-1))",
  },
})

export function BarChart() {
  const [category, setCategory] = useState<PurchaseCategory>()

  const { data: categories } = useQueryGetCategories()

  useEffect(() => {
    if (categories) setCategory(categories[0])
  }, [categories])

  const handleActiveCategoryClick = (id: string) => {
    const category = categories?.find((c) => c.id === +id)

    if (category) setCategory(category)
  }

  return (
    <BarChartWrapper
      categories={categories}
      activeCategory={category}
      onActiveCategoryClick={handleActiveCategoryClick}
    />
  )
}

const BarChartWrapper = ({
  categories,
  activeCategory,
  onActiveCategoryClick,
}: BarChartWrapperProps) => {
  const { data: chartData } = useQuery({
    queryKey: [GET_BAR_CHART_QUERY_KEY, activeCategory?.id],
    enabled: Boolean(activeCategory),
    queryFn: async () => {
      if (!activeCategory) {
        return undefined
      }

      const stats = await purchasesApi.getMonthlySpendingByCategory(
        activeCategory?.id
      )

      return stats
    },
  })

  const chartConfig = activeCategory ? createChartConfig(activeCategory) : {}

  const getLastMonthTrending = () => {
    if (!chartData || !activeCategory) {
      return null
    }

    const spentLastMonth = chartData[chartData.length - 1][activeCategory.id]
    const spentMonthAgo = chartData[chartData.length - 2][activeCategory.id]
    const diff = spentLastMonth / spentMonthAgo

    if (isNaN(diff) || diff === Infinity || diff <= 1) {
      return null
    }

    return ((diff - 1) * 100).toFixed(2)
  }

  const lastMonthTrending = getLastMonthTrending()

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b pb-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Bar Chart - Monthly spending by category</CardTitle>
          {chartData && (
            <CardDescription>
              {chartData[0].month} - {chartData[chartData.length - 1].month}
            </CardDescription>
          )}
        </div>
        {activeCategory && categories && (
          <Select
            value={String(activeCategory.id)}
            onValueChange={onActiveCategoryClick}
          >
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={String(category.id)}
                  className="rounded-lg"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChartComponent
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {activeCategory && (
              <Bar
                dataKey={activeCategory.id}
                fill={`var(--color-${activeCategory.id})`}
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            )}
          </BarChartComponent>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {lastMonthTrending && (
          <div className="flex gap-2 font-medium leading-none">
            Trending up by {lastMonthTrending}% this month{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Shows the total amount spent by category for the last year
        </div>
      </CardFooter>
    </Card>
  )
}
