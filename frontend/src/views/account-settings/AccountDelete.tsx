// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

const AccountDelete = () => {
  return (
    <Card>
      <CardHeader title='Xóa tài khoản' />
      <CardContent className='flex flex-col items-start gap-6'>
        <FormControlLabel control={<Checkbox />} label='Xác nhận xóa tài khoản' />
        <Button variant='contained' color='error' type='submit'>
          Xóa tài khoản
        </Button>
      </CardContent>
    </Card>
  )
}

export default AccountDelete
