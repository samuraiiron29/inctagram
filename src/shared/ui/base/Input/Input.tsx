import { ChangeEvent, KeyboardEvent, useState } from "react"
import { InputImage } from "./InputImage/inputImage"

type PropsType = {
  inputType?: string
  placeholder: string
  disabled?: boolean
  onChangeInput?: (text: string) => void
}

export const Input = ({inputType, placeholder, disabled, onChangeInput}: PropsType) => {

  const [text, setText] = useState("")
  const [typeInput, setTypeInput] = useState(inputType)
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = () => {
    const trimmedText = text.trim()
    if (trimmedText !== "") {
      // props.changeInput(trimmedText)
      setText("")
    } else {
      setError(`${inputType} is required`)
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

  const onChangeTypeInput = ()=>{
    typeInput === "password" ? setTypeInput('text') : setTypeInput('password')
    
  }

  const inputStyle = {
    primary: `${inputType === "search" ? 'pl-[40px]': 'pl-[5px]'}  border rounded-xs outline-none border-[#333] 
    w-[280px] ${error ? 'border-danger-500' : 'border-[#333]'} 
    active:border-[#fff] hover:border-[#8D9094] focus:border-[#397DF6] disabled:border-[#4C4C4C] `,
  }
  
  return (
    <div className={'relative mb-[30px]'}>
      <input
        value={text}
        onChange={changeTextHandler}
        type={typeInput}
        className={inputStyle.primary}
        onKeyDown={onEnterHandler}
        onBlur={onBlurHandler}
        placeholder={placeholder}
        disabled={disabled}
      />
      <div className={'text-danger-500 absolute left-[5px] bottom-[-25px]'}>
        {error}
      </div>
      {
        inputType === "password" &&
        <InputImage inputType={inputType} width={24} height={24} onChangeTypeInput={onChangeTypeInput}/>
      }
      {
        inputType === "search" &&
         <InputImage inputType={inputType} width={20} height={20}/>
      }
    </div>
  )
}


