'use client'

import { RadioGroup } from 'radix-ui'
import { Fragment, useState } from 'react'

type Option = {
  label: string
  value: string
  disabled?: boolean
}

type Props = {
  options: Option[]
  value?: string
  onChangeAction?: (val: string) => void
  defaultValue?: string
  name?: string
  className?: string
  disabled?: boolean
}

export const RadioGroupComponent = ({ options, value, onChangeAction, name, defaultValue, disabled = false, className = '' }: Props) => {
  const [internalValue, setInternalValue] = useState(defaultValue || options[0].value)
  const isControlled = value !== undefined

  const currentValue = isControlled ? value : internalValue

  const onValueChangeHandler = (val: string) => {
    if (!isControlled) {
      setInternalValue(val)
    }
    onChangeAction?.(val)
  }

  return (
    <RadioGroup.Root
      className={`flex flex-row gap-[50px] ${className}`}
      value={currentValue}
      onValueChange={onValueChangeHandler}
      name={name}
      disabled={disabled}
    >
      {options.map(({ label, value }) => (
        <Fragment key={value}>
          <label htmlFor={value} className={`relative inline-flex items-center gap-[10px] ${!disabled && 'cursor-pointer'} group`}>
            {/* Кружок */}
            <div className="relative inline-flex items-center justify-center w-5 h-5">
              {!disabled && (
                <span
                  className="
                                    pointer-events-none
                                    absolute
                                    top-1/2 left-1/2
                                    -translate-x-1/2 -translate-y-1/2
                                    w-[36px] h-[36px]
                                    rounded-full
                                    bg-[var(--dark-100)]
                                    opacity-0
                                    transition-opacity transition-colors duration-150
                                    group-hover:opacity-100
                                    group-hover:bg-[var(--dark-300)]
                                    group-active:opacity-100
                                    group-active:bg-[var(--dark-100)]
                                    z-0
                                "
                />
              )}

              <RadioGroup.Item
                value={value}
                id={value}
                className="
                                    relative
                                    h-5 w-5
                                    rounded-full
                                    border-2 border-[var(--light-100)]
                                    bg-transparent
                                    focus:outline-none
                                    disabled:opacity-50
                                    z-10
                                    flex-shrink-0
                                "
              >
                <RadioGroup.Indicator
                  className="
                                        absolute
                                        top-1/2 left-1/2
                                        -translate-x-1/2 -translate-y-1/2
                                        w-[10px] h-[10px]
                                        rounded-full
                                        bg-[var(--light-100)]
                                        z-20
                                    "
                />
              </RadioGroup.Item>
            </div>
            <span className={`text-sm select-none text-[var(--light-100)] ${disabled && 'opacity-50'}`}>{label}</span>
          </label>
        </Fragment>
      ))}
    </RadioGroup.Root>
  )
}
