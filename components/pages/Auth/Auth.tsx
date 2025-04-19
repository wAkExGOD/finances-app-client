"use client"

import { useState } from "react"
import { LogInForm } from "./common/LogInForm"
import { SignUpForm } from "./common/SignUpForm"
import { AuthFormLayout } from "./common/AuthFormLayout"

export function Auth() {
  const [activeProcess, setActiveProcess] = useState<"login" | "signup">(
    "login"
  )

  const handleSetSignUp = () => setActiveProcess("signup")
  const handleSetLogIn = () => setActiveProcess("login")

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthFormLayout process={activeProcess}>
          {activeProcess === "login" ? (
            <LogInForm onToggleClick={handleSetSignUp} />
          ) : (
            <SignUpForm onToggleClick={handleSetLogIn} />
          )}
        </AuthFormLayout>
      </div>
    </div>
  )
}
