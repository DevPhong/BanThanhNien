// MUI Imports
import Grid from '@mui/material/Grid'

import userApiRequest from '@/app/apiRequests/user'

import TableList from '@/views/dashboard/TableList'

export default async function ListMember() {
  const usersData = await userApiRequest.getAll()

  return (
    <Grid item xs={12}>
      <TableList usersData={usersData} />
    </Grid>
  )
}
