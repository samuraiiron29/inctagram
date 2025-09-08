'use client'
import React from 'react'
import { Modal } from '@/features/Modal'
import { Button } from '@/shared/ui/base/Button/Button'

type Props = {
  open: boolean
  onDiscard: () => void
  onSaveDraft: () => void
  onClose: () => void
}

export function CloseConfirmModal({ open, onDiscard, onSaveDraft, onClose }: Props) {
  if (!open) return null
  return (
    <Modal open={open} onClose={onClose} modalTitle={'close'} width={'380px'}>
      <p>Do you really want to close the creation of a publication? If you close everything will be deleted</p>
      <div className={'flex items-center justify-between mt-[20px]'}>
        <Button variant={'outlined'} onClick={onDiscard}>
          Discard
        </Button>
        <Button variant={'primary'} onClick={onSaveDraft}>
          Save draft
        </Button>
      </div>
    </Modal>
  )
}
