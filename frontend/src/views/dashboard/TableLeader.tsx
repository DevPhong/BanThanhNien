'use client'

import React, { useState } from 'react'

import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'

import FormControlLabel from '@mui/material/FormControlLabel'

import CustomAvatar from '@core/components/mui/Avatar'
import tableStyles from '@core/styles/table.module.css'

type TableBodyRowType = {
  avatarUrl?: string
  name: string
  fullname: string
  phone: string
  position: string
  role?: string
}

const rowsData: TableBodyRowType[] = [
  {
    avatarUrl: '/images/avatars/1.png',
    name: 'Stevenson',
    fullname: 'Jordan Stevenson',
    phone: '(319) 555-0115',
    position: 'Trưởng ban',
    role: 'Admin'
  },
  {
    avatarUrl: '/images/avatars/2.png',
    name: 'Fisher',
    fullname: 'Brandon Fisher',
    phone: '(605) 555-0127',
    position: 'Phó ban',
    role: 'Moderator'
  }
]

const TableLeader = () => {
  const [roles, setRoles] = useState(rowsData.map(row => row.role === 'Admin'))

  const handleRoleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedRoles = [...roles]

    updatedRoles[index] = event.target.checked
    setRoles(updatedRoles)
  }

  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Chức vụ</th>
              <th>Phân quyền</th>
            </tr>
          </thead>
          <tbody>
            {rowsData.map((row, index) => (
              <tr key={index}>
                <td className='!plb-1'>
                  <div className='flex items-center gap-3'>
                    <CustomAvatar src={row.avatarUrl} size={34} />
                    <div className='flex flex-col'>
                      <Typography className='font-medium' color='primary'>
                        {row.name}
                      </Typography>
                      <Typography variant='body2'>{row.fullname}</Typography>
                    </div>
                  </div>
                </td>
                <td className='!plb-1'>
                  <Typography>{row.phone}</Typography>
                </td>
                <td className='!plb-1'>
                  <Typography>{row.position}</Typography>
                </td>
                <td className='!plb-1'>
                  <FormControlLabel
                    control={<Switch checked={roles[index]} onChange={handleRoleChange(index)} color='primary' />}
                    label={roles[index] ? 'Admin' : 'User'}
                    disabled
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default TableLeader
