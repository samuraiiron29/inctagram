import { ChangeEvent, KeyboardEvent, useState } from "react"

type PropsType = {
  inputType?: string
  placeholder: string
  disabled?: boolean
  onChangeInput?: (text: string) => void
}

export const Input = (props: PropsType) => {

  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = () => {
    const trimmedText = text.trim()
    if (trimmedText !== "") {
      // props.changeInput(trimmedText)
      setText("")
    } else {
      setError(`${props.inputType} is required`)
    }
  }

  const changeTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value)
    setError(null)
  }

  const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onChangeHandler()
    }
  }

  const onBlurHandler = () => {
      text.length <= 1 ? setError('enter text') : setError('')
  }
  
  return (
    <div>
      <input
        value={text}
        onChange={changeTextHandler}
        type={props.inputType}
        className={'border rounded-xs border-[#333] w-2xs'}
        onKeyDown={onEnterHandler}
        onBlur={onBlurHandler}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
      <div className={'text-[#cc1439]'}>
        {error}
      </div>
    </div>
  )
}
