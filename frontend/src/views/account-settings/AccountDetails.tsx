'use client'

// React Imports
import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'

import { useRouter } from 'next/navigation'

import { Controller, useForm } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { CardHeader } from '@mui/material'
import InputMask from 'react-input-mask'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'

import OptionMenu from '@/@core/components/option-menu'
import { formatDate } from '@/app/lib/utils'

const AccountDetails = ({ profile }: any) => {
  // States

  const router = useRouter()
  const [fileInput, setFileInput] = useState<File | null>(null)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      profile: {
        fullName: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        joinDate: '',
        avatarUrl: ''
      }
    }
  })

  // Load form when user loaded
  useEffect(() => {
    if (!profile) return

    const p = profile.profile || {}

    reset({
      name: profile.name,
      email: profile.email,
      profile: {
        fullName: p.fullName,
        phone: p.phone,
        address: p.address,
        dateOfBirth: formatDate(p.dateOfBirth),
        joinDate: formatDate(p.joinDate),
        avatarUrl: ''
      }
    })
  }, [profile, reset])

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    setFileInput(selectedFile)

    // preview
    const reader = new FileReader()

    reader.onload = () => setImgSrc(reader.result as string)
    reader.readAsDataURL(selectedFile)

    setValue('profile.avatarUrl', 'test', { shouldDirty: true })
  }

  const handleFileInputReset = () => {
    setFileInput(null)
    setImgSrc('/images/avatars/1.png')
  }

  // Xử lý khi chọn option trong OptionMenu
  const handleOptionMenuClick = (option: string) => {
    if (option === 'Delete') setOpenDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)

  const handleConfirmDelete = () => {
    setOpenDeleteDialog(false)
  }

  // Submit data
  const onSubmit = async (data: any) => {
    let uploadedUrl = data.profile.avatarUrl

    if (fileInput) {
      const result = await handleUpload()

      console.log('res', result)

      uploadedUrl = result.url
    }

    // Gán vào payload
    data.profile.avatarUrl = uploadedUrl

    console.log('Final submit data:', data)
  }

  const handleUpload = async () => {
    if (!fileInput) return

    const formData = new FormData()

    formData.append('file', fileInput)

    setLoading(true)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    console.log('resss', res)

    const data = await res.json()

    setLoading(false)

    return data
  }

  console.log(fileInput)

  return (
    <Card>
      <CardHeader
        title={`${profile ? 'Thông tin thành viên' : 'Thêm thành viên'}`}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='profile.fullName'
                control={control}
                render={({ field }) => <TextField {...field} fullWidth label='Họ và tên' />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => <TextField {...field} fullWidth label='Họ và tên' />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => <TextField {...field} fullWidth label='Email' />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='profile.phone'
                control={control}
                render={({ field }) => (
                  <InputMask {...field} mask='999 9999 9999' maskChar=''>
                    {(inputProps: any) => <TextField {...inputProps} fullWidth label='Số điện thoại' />}
                  </InputMask>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='profile.dateOfBirth'
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label='Ngày sinh' type='date' InputLabelProps={{ shrink: true }} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='profile.joinDate'
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label='Ngày vào BTN' type='date' InputLabelProps={{ shrink: true }} />
                )}
              />
            </Grid>

            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit' disabled={!isDirty}>
                Lưu
              </Button>
              <Button onClick={router.back} variant='outlined' color='secondary'>
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
