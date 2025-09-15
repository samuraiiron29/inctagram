import Link from 'next/link'
import Image from 'next/image'
type Props = {
  url: string
}
export const PostImage = (props: Props) => {
  return (
    <Link href="">
      <Image width={240} height={240} className="object-cover w-100" src={props.url} alt="post photo" />
    </Link>
  )
}
