'use client'

// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { CardHeader } from '@mui/material'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'

import OptionMenu from '@/@core/components/option-menu'

type Data = {
  fullName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  address?: string
  dateOfBirth?: string
  joinDate?: string
}

// Vars
const initialData: Data = {
  fullName: 'John Doe',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '+1 (917) 543-9876',
  address: '123 Main St, New York, NY 10001',
  dateOfBirth: '1990-01-01',
  joinDate: '2020-01-01'
}

const AccountDetails = () => {
  // States

  const [formData, setFormData] = useState<Data>(initialData)
  const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileInputChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result as string)
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  // Xử lý khi chọn option trong OptionMenu
  const handleOptionMenuClick = (option: string) => {
    if (option === 'Delete') setOpenDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)

  const handleConfirmDelete = () => {
    setOpenDeleteDialog(false)

    // Thực hiện logic xóa ở đây
  }

  return (
    <Card>
      <CardHeader
        title='Đăng ký thành viên'
        action={
          <OptionMenu
            iconClassName='text-textPrimary'
            options={['Xóa']}
            onOptionClick={() => handleOptionMenuClick('Delete')}
          />
        }
      />
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Xác nhận xóa thành viên</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn xóa tài khoản này không?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color='secondary'>
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color='error' variant='contained'>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <CardContent className='mbe-5'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' size='small' variant='contained' htmlFor='account-settings-upload-image'>
                Cập nhật ảnh
                <input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg, image/jpg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button size='small' variant='outlined' color='error' onClick={handleFileInputReset}>
                Xóa ảnh
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Họ và tên'
                value={formData.fullName}
                placeholder='John Doe'
                onChange={e => handleFormChange('fullName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Tên'
                value={formData.lastName}
                placeholder='Doe'
                onChange={e => handleFormChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Email'
                value={formData.email}
                placeholder='john.doe@gmail.com'
                onChange={e => handleFormChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Mật khẩu'
                value={'12345678'}
                placeholder='Nhập mật khẩu'

                // onChange={e => handleFormChange('password', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Số điện thoại'
                value={formData.phoneNumber}
                placeholder='+1 (234) 567-8901'
                onChange={e => handleFormChange('phoneNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Địa chỉ hiện tại'
                value={formData.address}
                placeholder='Địa chỉ'
                onChange={e => handleFormChange('address', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Ngày sinh'
                type='date'
                value={formData.dateOfBirth} // ví dụ: '2021-01-14'
                onChange={e => handleFormChange('dateOfBirth', e.target.value)}
                InputLabelProps={{ shrink: true }} // Giữ label nổi khi có giá trị
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Ngày vào BTN'
                value={formData.joinDate} // ví dụ: '2021-01-14'
                onChange={e => handleFormChange('joinDate', e.target.value)}
                InputLabelProps={{ shrink: true }} // Giữ label nổi khi có giá trị
              />
            </Grid>

            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                Lưu
              </Button>
              <Button variant='outlined' type='reset' color='secondary' onClick={() => setFormData(initialData)}>
                Hủy
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
