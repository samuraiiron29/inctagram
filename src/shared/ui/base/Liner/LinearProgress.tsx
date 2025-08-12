'use client'
type Props = {
  color?: string
}

const LinearProgress = ({ color = '#234e99' }: Props) => {
  return (
    <div className={'w-[100%] h-[5px] bg-accent-300 border-r-[4px] overflow-hidden position fixed top-[60px] z-[-50]'}>
      <div
        className={'h-[100%] w-[50%] position absolute top-0 left-[-50%] animate-[progress_2s_linear_infinite]'}
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

export default LinearProgress
