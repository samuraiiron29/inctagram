import { Button } from '@/shared/ui/base/Button'

type Props = {
  onClick: () => void
}
export const IsError = (props: Props) => {
  return (
    <div className="p-4 text-sm">
      Не удалось загрузить посты.
      <Button className="ml-2 underline" onClick={props.onClick} children={'Повторить'} />
    </div>
  )
}
