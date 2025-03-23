"use client"

import { useTheme } from "next-themes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function Settings() {
  const { theme: activeTheme, themes, setTheme } = useTheme()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success("You submitted the following values:", {
      description: <span>{data.username}</span>,
    })
  }

  console.log({ activeTheme, themes })

  return (
    <>
      <div className="p-4 rounded-xl border">
        <h3 className="text-lg font-medium mb-6">Profile</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>

      <div className="p-4 rounded-xl border">
        <h3 className="text-lg font-medium mb-6">Appearance</h3>
        <div className="flex flex-col gap-4">
          <Label>Light Mode</Label>
          <div className="flex flex-wrap gap-4">
            {themes.map((theme) => {
              console.log(theme, activeTheme)
              return (
                <Button
                  key={theme}
                  onClick={() => setTheme(theme)}
                  variant={theme === activeTheme ? "default" : "outline"}
                >
                  {theme}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
