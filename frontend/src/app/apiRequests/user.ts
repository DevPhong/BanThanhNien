import http from '@/app/lib/http'

import type { UserListResType } from '@/app/schemaValidations/user.schema'

const userApiRequest = {
  getAll: () => http.get<UserListResType>('/users')
}

export default userApiRequest
