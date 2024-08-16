// ** MUI Imports
import { Input } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { UsersTable } from 'src/layouts/components/table/UsersTable'

interface User {
  id: string
  login: string
  group: number
  status: number
  currency: string
  balance: string
  bonus_balance: string
  date_reg: string
}

function createData(user: User) {
  return {
    id: user.id,
    login: user.login,
    group: user.group.toString(),
    status: user.status.toString(),
    currency: user.currency,
    balance: user.balance,
    bonusBalance: user.bonus_balance,
    dateRegistration: new Date(user.date_reg).toLocaleDateString()
  }
}

const Home = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rows, setRows] = useState<ReturnType<typeof createData>[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [sortField, setSortField] = useState<string>('id')
  const [currentPages, setCurrentPages] = useState(0)
  const [currency, setCurrency] = useState('')
  const [group, setGroup] = useState('')
  const [status, setStatus] = useState('')

  const fetchData = useCallback(() => {
    axios
      .get<User[]>(
        `http://localhost:3200/api/users/${rowsPerPage}/${currentPages}?currency=${currency}&userStatus=${status}&group=${group}&sort=${sortField}&order=${sortOrder}`
      )
      .then(response => {
        const formattedData = response.data.map(createData)
        setRows(formattedData)
      })
      .catch(error => {
        console.error('Error')
      })
  }, [currentPages, currency, status, sortField, sortOrder, group])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleNextPages = () => {
    setCurrentPages(currentPages + 5)
  }

  const handlePreviousPages = () => {
    if (currentPages - 5 >= 0) {
      setCurrentPages(currentPages - 5)
    }
  }
  const resetCurrentPages = () => {
    setCurrentPages(0)
  }

  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    resetCurrentPages()
    setter(event.target.value)
  }

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => handleFilterChange(setCurrency, event)

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => handleFilterChange(setStatus, event)

  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => handleFilterChange(setGroup, event)

  const handleSorting = (item: string) => {
    if (item === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(item)
      setSortOrder('asc')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Список пользователей'></CardHeader>
          <CardContent>
            <Grid container spacing={2} alignItems='center' justifyContent='center'>
              <Grid item>
                <Input placeholder='Валюта' onChange={handleCurrencyChange} />
              </Grid>
              <Grid item>
                <Input placeholder='Статус' onChange={handleStatusChange} />
              </Grid>
              <Grid item>
                <Input placeholder='Группа' onChange={handleGroupChange} />
              </Grid>
            </Grid>
            <UsersTable
              rows={rows}
              currentPages={currentPages}
              handleSorting={handleSorting}
              handleNextPages={handleNextPages}
              handlePreviousPages={handlePreviousPages}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='ACL and JWT 🔒'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are
              implemented in the starter-kit as well.
            </Typography>
            <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Home
