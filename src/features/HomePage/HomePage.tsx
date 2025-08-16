'use client'
import { RegistrationUsers } from './registrationUsers'
import { useAppSelector } from '@/shared/lib/hooks'
import { selectAppStatus } from '@/store/slices/appSlice'
import { PublicPosts } from './PublicPosts/PublicPosts'
type Props = {
  count: string
}
export const HomePage = ({ count }: Props) => {
  const status = useAppSelector(selectAppStatus)
  //  const [deleteUser] = useDeleteUserProfileMutation()
  // const deleteUsers = async () => {
  //   try {
  //     await deleteUser({ id: 3060 }).unwrap()
  //   } catch (error) {
  //     console.log('Delete error', error)
  //   }
  // }
  // <Button onClick={deleteUsers} children={'Delete Me'} />

  return (
    <div className={'max-w-[972px] mx-auto my-[24px]'}>
      {status === 'loading' && <div>hello</div>}
      <RegistrationUsers count={count} />
      <div className="grid grid-cols-4 gap-4 w-full">
        <PublicPosts />
      </div>
    </div>
  )
}
