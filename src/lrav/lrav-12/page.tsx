'use client'
import { Input } from '@/shared/ui/base/Input/Input'
import { FormProvider, useForm } from 'react-hook-form'
import { test } from '@/shared/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerTest } from '@/shared/lib/schemas'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Button } from '@/shared/ui/base/Button/Button'

export default function Page() {
  const methods = useForm<test>({
    resolver: zodResolver(registerTest),
    mode: 'onChange',
  })

  const onSubmit = (data: test) => {
    console.log('Submitted data:', data)
  }

  return (
    <FormProvider {...methods}>
      <Cards onSubmit={methods.handleSubmit(onSubmit)}>
        <Input type="email" name="email" width="300" label="" />
        <Input type="password" name="password" width="300" label="" />
        <Button type="submit">Submit</Button>
      </Cards>
    </FormProvider>
  )
}
