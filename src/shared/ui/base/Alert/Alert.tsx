'use client'
import { Toaster as HotToast } from 'react-hot-toast'

export const Toaster = (props: Props) => {
  const success = { style: { background: '#28a745' } }
  const error = { style: { background: '#dc3545' } }
  return (
    <HotToast
      position="bottom-left"
      toastOptions={{
        style: {
          borderRadius: '8px',
          background: '#1a1a1a',
          color: '#fff',
          padding: '12px 16px',
          fontSize: '14px',
        },
        success,
        error,
      }}
    />
  )
}
type Props = {}
