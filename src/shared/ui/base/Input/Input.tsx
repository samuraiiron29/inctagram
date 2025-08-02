import { ChangeEvent, KeyboardEvent, useState } from "react"
import Image from "next/image"

type PropsType = {
  inputType?: string
  placeholder: string
  disabled?: boolean
  imageSrc?: string
  width?: number
  height?: number
  left?:boolean
  onChangeInput?: (text: string) => void
}

export const Input = ({
  inputType, 
  placeholder, 
  disabled, 
  imageSrc, 
  width, 
  height, 
  left, 
  onChangeInput
}: PropsType) => {

  const [text, setText] = useState("")
  const [typeInput, setTypeInput] = useState(inputType)
  const [inputImage, setInputImage] = useState<string | undefined>(imageSrc)
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = () => {
    const trimmedText = text.trim()
    if (trimmedText !== "") {
      // changeInput(trimmedText)
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
    if (typeInput === "password") {
      setTypeInput('text'), 
      setInputImage('/pass_eye.svg')
    } else {
      setTypeInput('password'), 
      setInputImage(imageSrc)
    }
  }

  const inputStyle = {
    input: `${inputType === "search" ? 'pl-[40px]': 'pl-[5px]'}  border rounded-xs outline-none border-[#333] 
    w-[280px] ${error ? 'border-danger-500' : 'border-[#333]'} 
    active:border-[#fff] hover:border-[#8D9094] focus:border-[#397DF6] disabled:border-[#4C4C4C] `,
    image: {
      password: `right-[8px] top-[1px]`,
	    search: `left-[8px] top-[2px] z-[-1]`
    }
  }
  
  return (
    <div className={'relative mb-[30px]'}>
      <input
        value={text}
        onChange={changeTextHandler}
        type={typeInput}
        className={inputStyle.input}
        onKeyDown={onEnterHandler}
        onBlur={onBlurHandler}
        placeholder={placeholder}
        disabled={disabled}
      />
      <div className={'text-danger-500 absolute left-[5px] bottom-[-25px]'}>
        {error}
      </div>
      {imageSrc && 
      <Image 
        src={`${inputImage}`} 
        alt="svg" 
        width={width} 
        height={height} 
        onClick={onChangeTypeInput} 
        className={`cursor-pointer absolute ${left ? inputStyle.image.search : inputStyle.image.password}`}
      />}
    </div>
  )
}


