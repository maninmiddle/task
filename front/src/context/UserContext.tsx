import axios from 'axios'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  login: string
  group: number
  status: number
  currency: string
  balance: string
  bonusBalance: string
  dateRegistration: string
}

interface UserContextType {
  users: User[]
  page: number
  rowsPerPage: number
  currentPages: number
  currency: string
  fetchUsers: (rowsPerPage: number, currentPage: number, currency: string) => void
  setCurrency: (currency: string) => void
  handleNextPages: () => void
  handlePreviousPages: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPages, setCurrentPages] = useState(0)
  const [currency, setCurrency] = useState('None')

  const fetchUsers = (rowsPerPage: number, currentPage: number, currency: string) => {
    axios
      .get<User[]>(`http://localhost:3200/api/admins/${rowsPerPage}/${currentPage}?currency=${currency}`)
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error('Error fetching users:', error)
      })
  }

  const handleNextPages = () => {
    setCurrentPages(prev => prev + rowsPerPage)
  }

  const handlePreviousPages = () => {
    setCurrentPages(prev => (prev - rowsPerPage >= 0 ? prev - rowsPerPage : 0))
  }

  useEffect(() => {
    fetchUsers(rowsPerPage, currentPages, currency)
  }, [rowsPerPage, currentPages, currency])

  return (
    <UserContext.Provider
      value={{
        users,
        page,
        rowsPerPage,
        currentPages,
        currency,
        fetchUsers,
        setCurrency,
        handleNextPages,
        handlePreviousPages
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
