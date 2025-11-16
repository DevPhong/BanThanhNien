import dayjs from 'dayjs'

// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

import Link from '@/components/Link'

export default function TableList({ usersData }: any) {
  if (!usersData || usersData.length === 0) {
    return (
      <Card>
        <Typography className='p-4' variant='h6' align='center'>
          Không có dữ liệu người dùng để hiển thị.
        </Typography>
      </Card>
    )
  }

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
            {usersData.map((row: any, index: number) => (
              <tr key={index}>
                <td className='!plb-1'>
                  <div className='flex items-center gap-3'>
                    <CustomAvatar src={row?.avatarUrl} size={34} />
                    <div className='flex flex-col'>
                      <Link href='/list-member/[id]' as={`/list-member/${row.id}`}>
                        <Typography className='font-medium' color='primary'>
                          {row.name}
                        </Typography>
                      </Link>
                      <Typography variant='body2'>{row?.profile?.fullName}</Typography>
                    </div>
                  </div>
                </td>
                <td className='!plb-1'>
                  <Typography>{row?.profile?.address}</Typography>
                </td>
                <td className='!plb-1'>
                  <Typography>{row?.profile?.phone}</Typography>
                </td>
                <td className='!plb-1'>
                  <Typography>{dayjs(row.profile.joinDate).format('DD-MM-YYYY')}</Typography>
                </td>
                <td className='!pb-1'>
                  <Chip className='capitalize' label='active' variant='tonal' color='success' size='small' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
