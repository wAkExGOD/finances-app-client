import { z } from "zod"

export const logInSchema = z.object({
  email: z.string().min(3, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(6, "Password is too small")
    .max(50, "Password is too big"),
})

export const signUpSchema = logInSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export type LogInSchema = z.infer<typeof logInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
