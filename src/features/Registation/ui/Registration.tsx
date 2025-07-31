import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { type ZodInputs, registrationSchema } from '../lib/schemas/RegistrationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui/base/Button/Button'
import { Form } from 'radix-ui'
import { Checkbox, Flex, Text, TextArea } from '@radix-ui/themes'
import { useAppDispatch } from '@/shared/lib/hooks/appHooks'
// import { ResultCode } from '@/common/enums'
// import { useLoginMutation } from '@/features/auth/api/authApi'
// import { setIsLoggedInAC } from '@/app/app-slice'

export const Registration = () => {
  // const [login] = useLoginMutation()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ZodInputs>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })
  const submitHandler = () => {}
  // const onSubmit: SubmitHandler<Inputs> = data => {
  //   login(data).then(res => {
  //     if (res.data?.resultCode === ResultCode.Success) {
  //       dispatch(setIsLoggedInAC({ isLoggedIn: true }))
  //       localStorage.setItem(AUTH_TOKEN, res.data.data.token)
  //       reset()
  //     }
  //   })
  // }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Form.Root>
        <Form.Field name="email">
          <Form.Label children={'email'} />
          <Form.Message match={'valueMissing'} children={'enter your email'} />
          <Form.Message match={'typeMismatch'} children={'enter a valid email'} />
          <Form.Control>
            <TextArea id="email" required />
          </Form.Control>
        </Form.Field>

        {/* <TextField label="Email" margin="normal" error={!!errors.email} {...register('email')} />
        {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        <TextField type="password" label="Password" margin="normal" error={!!errors.email} {...register('password')} />
        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>} */}
        <Flex>
          <Checkbox />
          <Text children={'Agree policy'} />
        </Flex>
        <Form.Submit asChild>
          <Button type="submit" variant="primary" children={'Login'} />
        </Form.Submit>
        {/* <FormControlLabel
          label={'Remember me'}
          control={
            <Controller
              name={'rememberMe'}
              control={control}
              render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
            />
          }
        /> */}
      </Form.Root>
    </form>
  )
}
