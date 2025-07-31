import Image from "next/image"

type InputImagePropsType ={
	inputType?: string
	width: number
	height: number
	onChangeTypeInput?: () => void
}

const InputImageStyle ={
	password: `right-[8px] top-[1px]`,
	search: `left-[8px] top-[2px] z-[-1]`
}

export const InputImage = ({inputType, width, height, onChangeTypeInput}: InputImagePropsType)=>{
	return (
		<>
			<Image
				onClick={onChangeTypeInput}
				src={inputType === 'password' ? "/pass_eye.svg" : "/search.svg"}
				alt="svg"
				width={width}
				height={height}
				className={`cursor-pointer absolute ${inputType === "password" ? InputImageStyle.password : InputImageStyle.search}`}
			/>
		</>
	)
}