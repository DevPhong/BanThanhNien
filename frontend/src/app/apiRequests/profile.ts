import http from '@/app/lib/http'

import type { ProfileResType } from '@/app/schemaValidations/user.schema'

const profileApiRequest = {
  getProfile: (userId: number) => http.get<ProfileResType>(`/profile/${userId}`)
}

export default profileApiRequest
