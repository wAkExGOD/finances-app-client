import { apiInstance } from "./instance"
import { LoggedInUser, AuthDto, User } from "@/types/User"

export const authApi = {
  getMe: () => apiInstance<User>("/auth/profile"),
  logIn: (logInData: AuthDto) =>
    apiInstance<LoggedInUser>("/auth/login", {
      method: "POST",
      json: logInData,
    }),
  signUp: (signUpData: AuthDto) =>
    apiInstance("/auth/register", {
      method: "POST",
      json: signUpData,
    }),
}
