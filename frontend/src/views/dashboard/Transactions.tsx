//MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import CustomAvatar from '@core/components/mui/Avatar'

// Vars
const data = [
  {
    stats: '12.5k',
    title: 'Số lượng',
    color: 'success',
    icon: 'ri-group-line'
  },
  {
    stats: '30',
    title: 'Hoạt động',
    color: 'primary',
    icon: 'ri-pie-chart-2-line'
  }
]

const Transactions = () => {
  return (
    <Card className='bs-full'>
      <CardHeader title='Thống kê' />
      <CardContent className='!pbs-5'>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={6} md={6} key={index}>
              <div className='flex items-center gap-3'>
                <CustomAvatar variant='rounded' color={item.color} className='shadow-xs'>
                  <i className={item.icon}></i>
                </CustomAvatar>
                <div>
                  <Typography>{item.title}</Typography>
                  <Typography variant='h5'>{item.stats}</Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Transactions
