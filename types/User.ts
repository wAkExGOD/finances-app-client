export type User = {
  id: number
  email: string
}

export type LoggedInUser = {
  user: User
  access_token: string
}
