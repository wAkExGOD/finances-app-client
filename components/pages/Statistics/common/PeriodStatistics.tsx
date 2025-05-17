"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { purchasesApi } from "@/api"
import { DatePeriod } from "@/types/Purchase"
import { useMutation } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const periodStatisticsSchema = z
  .object({
    startDate: z.date({
      required_error: "Start date is required.",
    }),
    endDate: z.date({
      required_error: "End date is required.",
    }),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "Start date must be before end date.",
    path: ["startDate"],
  })
type PeriodStatisticsSchema = z.infer<typeof periodStatisticsSchema>

export function PeriodStatistics() {
  const form = useForm<PeriodStatisticsSchema>({
    resolver: zodResolver(periodStatisticsSchema),
  })

  const {
    data: stats,
    mutate: getStats,
    isPending,
  } = useMutation({
    mutationFn: async (datePeriod: DatePeriod) =>
      purchasesApi.getSpendingStatsForPeriod(datePeriod),
    onError: (error) => {
      toast.error(error.message)
    },
  })

  function onSubmit(data: PeriodStatisticsSchema) {
    getStats({
      startDate: data.startDate.toDateString(),
      endDate: data.endDate.toDateString(),
    })
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b pb-5 sm:flex-row">
        <CardTitle>Spending statistics over a period of time</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-stretch md:flex-row md:items-start gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const endDate = form.getValues("endDate")
                          const isDisabled = endDate ? date > endDate : false

                          return (
                            date > new Date() ||
                            date < new Date("1900-01-01") ||
                            isDisabled
                          )
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const startDate = form.getValues("startDate")
                          const isDisabled = startDate
                            ? date < startDate
                            : false

                          return (
                            date > new Date() ||
                            date < new Date("1900-01-01") ||
                            isDisabled
                          )
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        {(isPending || stats) && (
          <div className="flex flex-col grow gap-4">
            {isPending && <div className="text-center">Loading...</div>}
            {stats &&
              (stats.total > 0 ? (
                <Table className="font-mono border p-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Category</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.categories.map(({ name, value }) => (
                      <TableRow key={name}>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell>{value}$</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/40">
                      <TableCell className="font-bold text-right">
                        Total
                      </TableCell>
                      <TableCell>{stats.total}$</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <div className="text-destructive">
                  {"You didn't buy anything during this period"}
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
