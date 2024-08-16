import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material'

interface User {
  id: string
  login: string
  group: string
  status: string
  currency: string
  balance: string
  bonusBalance: string
  dateRegistration: string
}

interface UsersTableProps {
  rows: User[]
  currentPages: number
  handleSorting: (field: string) => void
  handleNextPages: () => void
  handlePreviousPages: () => void
}

export const UsersTable: React.FC<UsersTableProps> = ({
  rows,
  currentPages,
  handleSorting,
  handleNextPages,
  handlePreviousPages
}) => {
  return (
    <TableContainer component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel onClick={() => handleSorting('id')}>ID</TableSortLabel>
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel onClick={() => handleSorting('login')}>Логин</TableSortLabel>
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel onClick={() => handleSorting('group')}>Группа</TableSortLabel>
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel onClick={() => handleSorting('userStatus')}>Статус</TableSortLabel>
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel onClick={() => handleSorting('currency')}>Валюта</TableSortLabel>
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel onClick={() => handleSorting('balance')}>Баланс</TableSortLabel>
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel onClick={() => handleSorting('bonus_balance')}>Бонусный баланс</TableSortLabel>
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel onClick={() => handleSorting('date_reg')}>Дата регистрации</TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.login}>
            <TableCell>{row.id}</TableCell>
            <TableCell align='right'>{row.login}</TableCell>
            <TableCell align='right'>{row.group}</TableCell>
            <TableCell align='right'>{row.status}</TableCell>
            <TableCell align='right'>{row.currency}</TableCell>
            <TableCell align='right'>{row.balance}</TableCell>
            <TableCell align='right'>{row.bonusBalance}</TableCell>
            <TableCell align='right'>{row.dateRegistration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color='primary' onClick={handlePreviousPages}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography variant='body1'>
            {currentPages + 1}-{currentPages + 5}
          </Typography>
          <IconButton color='primary' onClick={handleNextPages}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </TableRow>
      </TableFooter>
    </TableContainer>
  )
}
