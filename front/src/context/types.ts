export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}

export type User = {
  id: string
  login: string
  group: number
  status: number
  currency: string
  balance: string
  bonus_balance: string
  date_reg: string
}

export type FilterParam = {
  currency?: string
  group?: number
  status?: number
}

export type UserContextType = {
  users: User[] | null
  loading: boolean
  fetchUsers: (rowsPerPage: number, currentPage: number, filter?: FilterParam) => void
}
