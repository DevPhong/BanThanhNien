// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

type TableBodyRowType = {
  avatarUrl?: string
  name: string
  fullname: string
  dateOfBirth: string
}

const rowsData: TableBodyRowType[] = [
  {
    avatarUrl: '/images/avatars/1.png',
    name: 'Stevenson',
    fullname: 'Jordan Stevenson',
    dateOfBirth: '14 Jan 2021'
  },
  {
    avatarUrl: '/images/avatars/2.png',
    name: 'Fisher',
    fullname: 'Brandon Fisher',
    dateOfBirth: '14 Jan 2021'
  }
]

const TableBirthday = () => {
  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Ngày sinh</th>
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
                  <Typography>{row.dateOfBirth}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default TableBirthday
