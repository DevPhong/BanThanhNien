import React from 'react'

import { Grid, Typography } from '@mui/material'

import AccountDetails from '@/views/account-settings/AccountDetails'

import userApiRequest from '@/app/apiRequests/user'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProfileDetailPage(props: Props) {
  const params = await props.params
  let profile = null
  // eslint-disable-next-line padding-line-between-statements
  try {
    const usersData = await userApiRequest.getAll()
    const dataProfile = usersData.find((user: any) => user.id === Number(params.id))

    profile = dataProfile
  } catch (error) {
    console.error('Error fetching profile data:', error)
  }

  if (!profile) {
    return (
      <Grid item xs={12}>
        <Typography className='p-4' variant='h6' align='center'>
          Không tìm thấy thành viên
        </Typography>
      </Grid>
    )
  }

  return (
    <Grid item xs={12}>
      <AccountDetails profile={profile} />
    </Grid>
  )
}
