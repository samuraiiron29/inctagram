'use client'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { type ZodInputs, registrationSchema } from '../lib/schemas/RegistrationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'radix-ui'
import { Box, Button, Checkbox, Flex, Text, TextArea } from '@radix-ui/themes'
import { useAppDispatch } from '@/shared/lib/hooks/appHooks'

// import { ResultCode } from '@/common/enums'
// import { useLoginMutation } from '@/features/auth/api/authApi'
// import { setIsLoggedInAC } from '@/app/app-slice'

export const Registration = () => {
  // const [login] = useLoginMutation()
  const dispatch = useAppDispatch()
  const fieldClassName = 'flex-col gap-3'
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ZodInputs>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { email: '', password: '', username: '' },
  })
  const submitHandler = () => {}
  // const onSubmit: SubmitHandler<Inputs> = data => {
  //   login(data).then(res => {
  //     if (res.data?.resultCode === ResultCode.Success) {
  //       dispatch(setIsLoggedInAC({ isLoggedIn: true }))
  //       localStorage.setItem(AUTH_TOKEN, res.data.data.token)
  //       reset()}})}

  return (
    <Flex direction={'column'} align={'center'} className="bg-fuchsia-900 p-5 m-5 rounded-3xl">
      <span>Sign Up</span>
      <Flex gap={'2'}>
        <Button children={'Gmail'} />
        <Button children={'GitHub'} />
      </Flex>
      {/* <TextField label="Email" margin="normal" error={!!errors.email} {...register('email')} />
        {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        <TextField type="password" label="Password" margin="normal" error={!!errors.email} {...register('password')} />
        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>} */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <Form.Root>
          <Form.Field name="username">
            <Flex className={fieldClassName}>
              <Form.Label children={<span>Username</span>} />
              <Form.Control asChild children={<input type="text" {...register('username')} />} />
            </Flex>
          </Form.Field>

          <Form.Field name="email">
            <Flex className={fieldClassName}>
              <Form.Label children={<span>Email</span>}></Form.Label>
              <Form.Control asChild children={<input type="email" {...register('email')} />} />
            </Flex>
          </Form.Field>

          <Form.Field name="password">
            <Flex className={fieldClassName}>
              <Form.Label children={<span>Password</span>} />
              <Form.Control asChild children={<input type="password" {...register('password')} />} />
            </Flex>
          </Form.Field>

          <Form.Field name="password">
            <Flex className={fieldClassName}>
              <Form.Label children={<span>Password confirmation</span>} />
              <Form.Control asChild children={<input type="password" {...register('password')} />} />
            </Flex>
          </Form.Field>

          <Flex>
            <Checkbox />
            <Text>
              <span>I agree to the </span>
              <Button variant="outline">
                <span>Terms of Service</span>
              </Button>
              <span>and</span>
              <Button variant="outline">
                <span>Privacy Policy</span>
              </Button>
            </Text>
          </Flex>
          <Form.Submit asChild children={<Button type="submit" variant="classic" children={'Sign Up'} />} />
        </Form.Root>
      </form>
      <span>Do you have an account?</span>
      <Button>Sing In</Button>
    </Flex>
  )
}
