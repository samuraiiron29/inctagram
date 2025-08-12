'use client'
import { useCallback, useState } from 'react'
import { useAppSelector } from '@/shared/lib/hooks'
import { selectAppEmail } from '@/store/slices/appSlice'
import { useLogoutMutation } from '@/shared/api'
import { PATH } from '@/shared/lib/path'

export const useLogout = (onOpenChange: (open: boolean) => void) => {
  const email = useAppSelector(selectAppEmail)
  const [logout] = useLogoutMutation()

  const onConfirm = useCallback(async () => {
    try {
      await logout().unwrap()
      window.location.replace(PATH.AUTH.LOGIN)
    } catch (e) {
      console.error('Logout failed:', e)
    } finally {
      onOpenChange(false)
    }
  }, [logout, onOpenChange])
  const onCancel = useCallback(() => onOpenChange(false), [onOpenChange])
  return { email, onConfirm, onCancel }
}
