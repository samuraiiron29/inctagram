'use client'
import Image from 'next/image'
import { clsx } from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
import { Dialog } from 'radix-ui'

export type Props = {
  width?: string
  height?: string
  open: boolean
  onClose: () => void
  modalTitle: string
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({ modalTitle, width, height, onClose, children, open, ...res }: Props) => (
  <Dialog.Root open={open} onOpenChange={onClose} {...res}>
    <Dialog.Portal>
      <Dialog.Overlay className={clsx('fixed inset-0 bg-dark-900 opacity-70', 'animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]')} />
      <Dialog.Content
        className={clsx(
          'fixed top-1/2 left-1/2',
          'transform -translate-x-1/2 -translate-y-1/2',
          'overflow-auto w-[90vw] max-w-[500px] max-h-[85vh]',
          'bg-dark-300 border border-dark-100',
          'focus:outline-none'
        )}
        style={{ width, height }}
      >
        <div className={clsx('flex items-center justify-between px-6 py-3', 'border-b border-dark-100')}>
          <Dialog.Title className="text-[20px] font-bold text-amber-50">{modalTitle}</Dialog.Title>

          <Dialog.Close>
            <button
              className={clsx(
                'cursor-pointer flex items-center justify-center w-8 h-8',
                'bg-transparent border-none',
                'focus:outline-none focus:ring-2'
              )}
              aria-label="Close"
            >
              <Image src="/close-outline.svg" alt="Close" width={24} height={24} />
            </button>
          </Dialog.Close>
        </div>
        <div className="m-[30px_24px] text-[16px] font-normal leading-6 text-amber-50">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
