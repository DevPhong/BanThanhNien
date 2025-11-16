import { z } from 'zod'

export const ProfileSchema = z.object({
  id: z.number(),
  userId: z.number(),
  address: z.string(),
  phone: z.string(),
  avatarUrl: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  fullName: z.string(),
  joinDate: z.string().nullable(),
  note: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  profile: ProfileSchema.nullable(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type UserListResType = z.TypeOf<typeof UserSchema>

export type ProfileResType = z.TypeOf<typeof ProfileSchema>
