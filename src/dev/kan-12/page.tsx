'use client'
import { Input } from '@/shared/ui/base/Input/Input'
import { FormProvider, useForm } from 'react-hook-form'
import { ZodInputs } from '@/shared/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema } from '@/shared/lib/schemas'

export default function Page() {
  const methods = useForm<ZodInputs>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
  })

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(console.log)}>
          <Input type="email" name="email" width={'300'} />
          <Input type="password" name="password" width={'300'} />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </>
  )
}
