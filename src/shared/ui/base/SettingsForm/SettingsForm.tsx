import { useChangeProfileDataMutation } from "@/shared/api/settingsApi"
import { PATH } from "@/shared/lib/path"
import { settingsSchemas } from "@/shared/lib/schemas"
import { ZodSettings } from "@/shared/lib/types/zodSettingsType"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import { Input } from "../Input"
import { t } from "i18next"
import { DatePicker } from "../DatePicker"

type PropsType = {

}

export const SettingsForm = (props: PropsType) => {

  const [changeProfileData] = useChangeProfileDataMutation()

  const methods = useForm<ZodSettings>({
    resolver: zodResolver(settingsSchemas),
  })

  const onSubmit = (data: ZodSettings) => {
    // changeProfileData(data).unwrap().then(res => {
      
    // })
  }

  return (
    <div>
      <form onSubmit={()=>{}}>
        <FormProvider {...methods}>
          <form>
            <Input name="username" className={'w-[100%] mb-[24px]'} label={'Username'} />
            <Input name="firstName" className={'w-[100%] mb-[24px]'} label={'First name'} />
            <Input name="lastName" className={'w-[100%] mb-[24px]'} label={'Last name'} />
            <DatePicker mode="single" className={'w-[100%] mb-[24px]'} label={'Date of birth'} />
          </form>
        </FormProvider>
      </form> 
    </div>
  )
}