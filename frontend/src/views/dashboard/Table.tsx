// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

import Link from '@/components/Link'

type TableBodyRowType = {
  avatarUrl?: string
  name: string
  fullname: string
  address: string
  phone: string
  email: string
  joinDate: string
  status: string
}

const rowsData: TableBodyRowType[] = [
  {
    avatarUrl: '/images/avatars/1.png',
    name: 'Stevenson',
    fullname: 'Jordan Stevenson',
    address: '3055 Kattie Turnpike, New Devon, VT 23120',
    phone: '(319) 555-0115',
    email: 'Jacinthe_Blick@hotmail.com',
    joinDate: '14 Jan 2021',
    status: 'active'
  },
  {
    avatarUrl: '/images/avatars/2.png',
    name: 'Fisher',
    fullname: 'Brandon Fisher',
    address: '426 Jordy Lodge, Lake Linnie, SD 59510',
    phone: '(605) 555-0127',
    email: 'Brandon_Fisher@hotmail.com',
    joinDate: '14 Jan 2021',
    status: 'active'
  }
]

const Table = () => {
  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Ngày vào</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {rowsData.map((row, index) => (
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
                  <Typography>{row.address}</Typography>
                </td>
                <td className='!plb-1'>
                  <Typography>{row.phone}</Typography>
                </td>
                <td className='!plb-1'>
                  <Typography>{row.joinDate}</Typography>
                </td>
                <td className='!pb-1'>
                  <Chip
                    className='capitalize'
                    variant='tonal'
                    color={row.status === 'pending' ? 'warning' : row.status === 'inactive' ? 'secondary' : 'success'}
                    label={row.status}
                    size='small'
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

export default Table
