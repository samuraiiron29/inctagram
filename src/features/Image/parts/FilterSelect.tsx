'use client'

import { OPTIONS } from '../consts/consts'

type Props = {
  value: string
  onChange: (v: string) => void
}

export function FilterSelect({ value, onChange }: Props) {
  return (
    <label>
      Filter:
      <select
        className="ml-2 rounded border bg-dark-200 p-1 [color-scheme:dark] appearance-none"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {OPTIONS.map(({ id, name, value }) => (
          <option key={id} value={value} className="bg-black/60">
            {name}
          </option>
        ))}
      </select>
    </label>
  )
}
