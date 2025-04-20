import { LogInSchema, SignUpSchema } from "@/components/pages/Auth/schemas"
import { apiInstance } from "./instance"
import { LoggedInUser, User } from "@/types/User"

export const authApi = {
  logIn: (logInData: LogInSchema) =>
    apiInstance<LoggedInUser>("/auth/login", {
      method: "POST",
      json: logInData,
    }),
  signUp: (signUpData: Omit<SignUpSchema, "confirmPassword">) =>
    apiInstance("/auth/register", {
      method: "POST",
      json: signUpData,
    }),
  getMe: () => apiInstance<User>("/auth/profile"),
}
