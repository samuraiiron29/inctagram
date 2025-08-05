import React from 'react'
import Image from 'next/image'

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string | React.ReactNode
  disabled?: boolean
}

const Checkbox = ({ checked, onChange, label, disabled = false }: Props) => {
  return (
    <div className="inline-flex items-center">
      <label className="relative flex cursor-pointer items-center rounded-full p-3" htmlFor="ripple-on">
        <input
          id="ripple-on"
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={() => onChange(!checked)}
          className="
            peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-amber-50
            shadow hover:shadow-md transition-all
            before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12
            before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-400
            before:opacity-0 before:transition-opacity
            checked:border-amber-50 checked:bg-amber-50
            checked:before:bg-slate-400 hover:before:opacity-10
          "
        />
        <span
          className="
            pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4
            text-white opacity-0 transition-opacity peer-checked:opacity-100
          "
        >
          <Image src={'/check.svg'} alt={'check'} width={100} height={100} />
        </span>
      </label>
      <label htmlFor="ripple-on" className="cursor-pointer text-amber-50 text-sm">
        {label}
      </label>
    </div>
  )
}

export default Checkbox
