"use client"

import { authApi } from "@/api"
import { AppLoadingScreen } from "@/components/common"
import { ROUTES } from "@/lib/constants/routes"
import { LoggedInUser } from "@/types/User"
import { useQuery } from "@tanstack/react-query"
import { ApiError } from "next/dist/server/api-utils"
import { usePathname, useRouter } from "next/navigation"
import { PropsWithChildren, createContext, useContext } from "react"
import { toast } from "sonner"

export type AuthContextType = {
  isLoading: boolean
  error: Error | null
  login: (data: LoggedInUser) => void
  logout: () => void
}

export const AUTH_TOKEN_KEY = "finances-app-token"
export const AUTHED_GUARD_ROUTES = [
  ROUTES.HOME,
  ROUTES.PURCHASES,
  ROUTES.OVERVIEW,
  ROUTES.SETTINGS,
] as const

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  const isAuthedGuardRoute = AUTHED_GUARD_ROUTES.includes(pathname)
  const router = useRouter()
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const user = await authApi.getMe()

        return user
      } catch (error) {
        toast.error((error as ApiError)?.message || "Unauthorized")

        router.push(ROUTES.AUTH)

        return null
      }
    },
    enabled: isAuthedGuardRoute,
  })

  const login = (data: LoggedInUser) => {
    localStorage.setItem(AUTH_TOKEN_KEY, data.access_token)
  }
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    router.push(ROUTES.AUTH)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {!isAuthedGuardRoute && children}
      {isAuthedGuardRoute && isLoading ? (
        <AppLoadingScreen />
      ) : (
        user && children
      )}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext) as AuthContextType

export { AuthProvider, useAuth }
