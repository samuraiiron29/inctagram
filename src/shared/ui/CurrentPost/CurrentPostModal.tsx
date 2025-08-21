'use client'
import { clsx } from 'clsx'
import { ComponentPropsWithoutRef, useEffect, useRef } from 'react'
import { Dialog } from 'radix-ui'
import Image from 'next/image'
import { Post } from '@/shared/lib/types'
import { TextArea } from '@/shared/ui/base/TextArea'
import { Button } from '@/shared/ui/base/Button'
import { useTranslation } from 'react-i18next'
import { Skeleton } from '@radix-ui/themes'
import { useClickOutside } from '@/shared/ui/CurrentPost/hooks/useClickOutside'
import { usePostActions } from '@/shared/ui/CurrentPost/hooks/usePostActions'
import { useEditPostDescription } from '@/shared/ui/CurrentPost/hooks/useEditPostDescription'
import { PostImage } from '@/shared/ui/CurrentPost/PostImage'
import { selectUserId } from '@/store/slices/appSlice'
import { useAppSelector } from '@/shared/lib/hooks'

export type Props = {
  width?: string
  height?: string
  open: boolean
  onClose: () => void
  modalTitle: string
  editPostHeader: boolean
  post: Post
  images: any
} & ComponentPropsWithoutRef<'div'>

export const CurrentPostModal = ({ modalTitle, width, height, onClose, children, open, editPostHeader, post, images, ...res }: Props) => {
  const actionsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const userId = useAppSelector(selectUserId)
  const isPostOwner = userId === post.ownerId

  const { postActions, editPost, setIsHovered, togglePostActions, startEdit, stopEdit, stopPostActions, getIcon } = usePostActions()
  const { text, handleChange, saveDescription, isLoading } = useEditPostDescription(post.description, post.id, stopEdit)
  useClickOutside(contentRef, onClose)
  const { t } = useTranslation()

  useEffect(() => {
    if (!open) {
      stopEdit()
      stopPostActions()
    }
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...res}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={clsx('fixed inset-0 bg-dark-900 opacity-70', 'animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]')}
        />
        <Dialog.Content
          ref={contentRef}
          className={clsx(
            'fixed top-1/2 left-1/2',
            'transform -translate-x-1/2 -translate-y-1/2',
            'overflow-auto w-[972px] h-[574px]',
            'bg-dark-300 border border-dark-100',
            'focus:outline-none overflow-visible'
          )}
          style={{ width, height }}
        >
          {!editPost && (
            <Image
              className={'hover:cursor-pointer absolute z-50 right-[-48px] top-[-40px]'}
              onClick={onClose}
              src={'/closeButton.svg'}
              alt={'closeButton'}
              width={'24'}
              height={'24'}
            />
          )}
          {editPost && (
            <div className={'flex justify-between h-[70px] items-center px-[24px] border-b border-dark-100 box-border'}>
              <span className={'text-light-100 text-h1'}>{t('post.editPost')}</span>
              <Image
                className={'hover:cursor-pointer'}
                onClick={stopEdit}
                src={'/closeButton.svg'}
                alt={'closeButton'}
                width={'24'}
                height={'24'}
              />
            </div>
          )}
          <div className={'flex w-full'}>
            <div className={clsx('flex-1 relative', editPost ? 'h-[502px]' : 'h-[572px]')}>
              <PostImage src={post.images[0].url} alt="post" className="object-cover" />
            </div>
            <div className={'flex flex-1 flex-col relative'}>
              {!editPost && (
                <div className={'flex justify-between items-center h-[60px] px-[24px] border-b border-box border-dark-100'}>
                  <div className={'flex'}>
                    <Image src={`/${post.avatarOwner}`} alt={`${post.owner.firstName}`} width={'24'} height={'24'} />
                    <span>{post.owner.firstName}</span>
                  </div>
                  {isPostOwner && (
                    <Image
                      src={getIcon()}
                      alt={'kebab-icon'}
                      onClick={togglePostActions}
                      className={'cursor-pointer'}
                      width={'24'}
                      height={'24'}
                      id="kebab-icon"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    />
                  )}
                </div>
              )}

              {postActions && (
                <div
                  ref={actionsRef}
                  className={clsx(
                    'absolute top-[40px] right-[24px] z-50 border-box',
                    'bg-dark-500 border border-dark-100 rounded-[2px] ',
                    'flex flex-col p-[12px] gap-[12px]'
                  )}
                >
                  <div className={'flex gap-[12px] cursor-pointer'} onClick={startEdit}>
                    <Image src={'/edit-2-outline.svg'} alt={'edit'} width={'24'} height={'24'} />
                    <button className="text-regular_text14 text-light-100 cursor-pointer">{t('post.editPost')}</button>
                  </div>
                  <div className={'flex gap-[12px] cursor-pointer'}>
                    <Image src={'/trash-outline.svg'} alt={'trash'} width={'24'} height={'24'} />
                    <button
                      className="text-regular_text14 text-light-100 cursor-pointer"
                      onClick={() => console.log('Delete post', post.id)}
                    >
                      {t('post.deletePost')}
                    </button>
                  </div>
                </div>
              )}
              {editPost ? (
                <div className={'p-[24px] flex flex-col justify-between h-[502px]'}>
                  <div>
                    <div className={'flex'}>
                      <Image src={`/${post.avatarOwner}`} alt={`${post.owner.firstName}`} width={'24'} height={'24'} />
                      <span>{post.owner.firstName}</span>
                    </div>
                    <p className={'text-light-900'}>{t('post.addPublicationDescriptions')}</p>
                    <TextArea
                      value={text}
                      placeholder={''}
                      size={'small'}
                      label={''}
                      onChange={e => handleChange(e.target.value)}
                      className={'w-[433px] bg-dark-500 text-light-100 text-regular_text16'}
                    />
                    <p className={'text-light-900 text-right w-[433px]'}>{text.length}/500</p>
                  </div>
                  <div className={'text-right'}>
                    <Button onClick={saveDescription}>{t('button.saveChanges')}</Button>
                  </div>
                </div>
              ) : isLoading ? (
                <Skeleton width="200px" height="24px" className={'mt-[5px] ml-[5px]'} />
              ) : (
                children
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
