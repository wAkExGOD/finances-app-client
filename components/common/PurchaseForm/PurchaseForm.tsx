"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Purchase } from "@/types/Purchase"
import { cn } from "@/lib/utils"
import { purchaseFormSchema, PurchaseFormSchema } from "./schemas"
import { useQueryGetCategories } from "@/hooks/useQueryGetCategories"

export type PurchaseFormProps = {
  purchase?: Purchase
  onSuccess?: (purchase: PurchaseFormSchema) => void
}

export function PurchaseForm({ purchase, onSuccess }: PurchaseFormProps) {
  const isEdit = purchase !== undefined

  const { data: categories, isLoading: areCategoriesLoading } =
    useQueryGetCategories()

  const form = useForm<PurchaseFormSchema>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: isEdit
      ? {
          name: purchase.name,
          categoryId: String(purchase.category.id),
          price: purchase.price,
        }
      : {
          name: "",
          categoryId: "",
          price: 0,
        },
  })

  function onSubmit(values: z.infer<typeof purchaseFormSchema>) {
    onSuccess?.(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6")}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Fanta" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of your purchase.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {categories && (
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(({ id, name }) => (
                      <SelectItem key={id} value={String(id)}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  This is the category of your purchase.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="2.50" {...field} />
              </FormControl>
              <FormDescription>
                This is the price of your purchase.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={areCategoriesLoading}>
          {isEdit ? "Save" : "Create"}
        </Button>
      </form>
    </Form>
  )
}
