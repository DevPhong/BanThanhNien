import React from 'react'

import { Grid } from '@mui/material'

import TableScore from '@/views/dashboard/TableScore'

function ScorePage() {
  return (
    <Grid item xs={12}>
      <TableScore />
    </Grid>
  )
}

export default ScorePage
