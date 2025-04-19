import { Command } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PropsWithChildren } from "react"

type AuthFormLayoutProps = PropsWithChildren<{ process: "login" | "signup" }>

export function AuthFormLayout({ process, children }: AuthFormLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center items-center gap-2 font-medium">
        <div className="flex h-8 w-8 items-center justify-center rounded-md">
          <Command className="size-6" />
        </div>
        <span>Finances App</span>
      </div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {process === "login" ? "Login" : "Sign up"}
            </CardTitle>
            <CardDescription>
              {process === "login"
                ? "Enter your email below to login to your account"
                : "Enter your email below to sign up for your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  )
}
