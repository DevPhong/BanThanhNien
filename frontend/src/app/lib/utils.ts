import dayjs from 'dayjs'
import { type ClassValue, clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'

import { EntityError } from '@/app/lib/http'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({ error, setError, duration }: { error: any; setError?: any; duration?: number }) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach(item => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else {
    // Show toast error message
    console.error('API Error TOAST:', error, duration)
  }
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const formatDate = (date: Date) => (date ? dayjs(date).format('YYYY-MM-DD') : '')
