'use client'

// MUI Imports
import React, { useState } from 'react'

import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

import Link from '@/components/Link'

type TableBodyRowType = {
  avatarUrl?: string
  name: string
  fullname: string
  score: number
}

const rowsData: TableBodyRowType[] = [
  {
    avatarUrl: '/images/avatars/1.png',
    name: 'Stevenson',
    fullname: 'Jordan Stevenson',
    score: 10
  },
  {
    avatarUrl: '/images/avatars/2.png',
    name: 'Fisher',
    fullname: 'Brandon Fisher',
    score: 8
  }
]

const TableScore = () => {
  const [filter, setFilter] = useState('day')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [quarter, setQuarter] = useState('')
  const [year, setYear] = useState('')

  // Hàm lọc dữ liệu theo filter (demo, chưa có dữ liệu ngày tháng thực tế)
  const getFilteredRows = () => {
    // Ở đây bạn sẽ lọc dữ liệu thực tế dựa vào các giá trị day, month, quarter, year
    // Hiện tại chỉ trả về toàn bộ dữ liệu mẫu
    return rowsData
  }

  return (
    <Card>
      <FormControl size='small' sx={{ minWidth: 180, m: 2 }}>
        <InputLabel id='filter-label'>Lọc theo</InputLabel>
        <Select labelId='filter-label' value={filter} label='Lọc theo' onChange={e => setFilter(e.target.value)}>
          <MenuItem value='day'>Ngày</MenuItem>
          <MenuItem value='month'>Tháng</MenuItem>
          <MenuItem value='quarter'>Qúy</MenuItem>
          <MenuItem value='year'>Năm</MenuItem>
        </Select>
      </FormControl>
      {filter === 'day' && (
        <FormControl size='small' sx={{ minWidth: 180, m: 2 }}>
          <InputLabel id='day-label'>Chọn ngày</InputLabel>
          <Select labelId='day-label' value={day} label='Chọn ngày' onChange={e => setDay(e.target.value)}>
            <MenuItem value='1'>1</MenuItem>
            <MenuItem value='2'>2</MenuItem>
            <MenuItem value='3'>3</MenuItem>
            {/* ...Thêm các ngày khác nếu cần */}
          </Select>
        </FormControl>
      )}
      {filter === 'month' && (
        <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
          <FormControl size='small' sx={{ minWidth: 100, p: 2 }}>
            <InputLabel id='month-label'>Tháng</InputLabel>
            <Select labelId='month-label' value={month} label='Tháng' onChange={e => setMonth(e.target.value)}>
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='2'>2</MenuItem>
              <MenuItem value='3'>3</MenuItem>
              {/* ...Thêm các tháng khác nếu cần */}
            </Select>
          </FormControl>
          <FormControl size='small' sx={{ minWidth: 100, p: 2 }}>
            <InputLabel id='year-label'>Năm</InputLabel>
            <Select labelId='year-label' value={year} label='Năm' onChange={e => setYear(e.target.value)}>
              <MenuItem value='2025'>2025</MenuItem>
              <MenuItem value='2024'>2024</MenuItem>
              {/* ...Thêm các năm khác nếu cần */}
            </Select>
          </FormControl>
        </div>
      )}
      {filter === 'quarter' && (
        <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
          <FormControl size='small' sx={{ minWidth: 100, p: 2 }}>
            <InputLabel id='quarter-label'>Quý</InputLabel>
            <Select labelId='quarter-label' value={quarter} label='Quý' onChange={e => setQuarter(e.target.value)}>
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='2'>2</MenuItem>
              <MenuItem value='3'>3</MenuItem>
              <MenuItem value='4'>4</MenuItem>
            </Select>
          </FormControl>
          <FormControl size='small' sx={{ minWidth: 100, p: 2 }}>
            <InputLabel id='year-label-q'>Năm</InputLabel>
            <Select labelId='year-label-q' value={year} label='Năm' onChange={e => setYear(e.target.value)}>
              <MenuItem value='2025'>2025</MenuItem>
              <MenuItem value='2024'>2024</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
      {filter === 'year' && (
        <FormControl size='small' sx={{ minWidth: 120, m: 2 }}>
          <InputLabel id='year-label-only'>Năm</InputLabel>
          <Select labelId='year-label-only' value={year} label='Năm' onChange={e => setYear(e.target.value)}>
            <MenuItem value='2025'>2025</MenuItem>
            <MenuItem value='2024'>2024</MenuItem>
          </Select>
        </FormControl>
      )}
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Điểm hiện tại</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredRows().map((row, index) => (
              <tr key={index}>
                <td className='!plb-1'>
                  <div className='flex items-center gap-3'>
                    <CustomAvatar src={row.avatarUrl} size={34} />
                    <div className='flex flex-col'>
                      <Link href='/account-settings'>
                        <Typography className='font-medium' color='primary'>
                          {row.name}
                        </Typography>
                      </Link>
                      <Typography variant='body2'>{row.fullname}</Typography>
                    </div>
                  </div>
                </td>
                <td className='!plb-1'>
                  <Typography color='primary'>{row.score}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default TableScore
