import { PATH } from '@/shared/lib/path/path'
import { Button } from '@/shared/ui/base/Button/Button'
import Image from 'next/image'
import Link from 'next/link'

export const RegistrationConfirmation = (props: Props) => {
  return (
    <>
      <h1>Congratulations!</h1>
      <h3>Your email has been confirmed</h3>
      <Link href={PATH.AUTH.LOGIN}>
        <Button children={'Sign In'} />
      </Link>
      <Image src="/bro.png" alt="bro" width={432} height={300} />
    </>
  )
}
type Props = {}
