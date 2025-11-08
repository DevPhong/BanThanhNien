import React from 'react'

import { Grid } from '@mui/material'

import FormLayoutsResetPassword from '@/views/form-layouts/FormLayoutsResetPassword'

function ResetPasswordPage() {
  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={12}>
        <FormLayoutsResetPassword />
      </Grid>
    </Grid>
  )
}

export default ResetPasswordPage
