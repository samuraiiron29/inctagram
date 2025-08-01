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
  //       reset()}})}

  return (
    <Flex className="bg-fuchsia-900 p-5 m-5 rounded-3xl ">
      <span>Sign Up</span>
      {/* <TextField label="Email" margin="normal" error={!!errors.email} {...register('email')} />
        {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        <TextField type="password" label="Password" margin="normal" error={!!errors.email} {...register('password')} />
        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>} */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <Flex>
          <Form.Root className="">
            <Form.Field name="username">
              <Flex>
                <Form.Label>
                  <span>Username</span>
                </Form.Label>
                <Form.Message match="valueMissing">
                  <span>enter your name</span>
                </Form.Message>
              </Flex>
              <Form.Control asChild>
                <input type="username" />
              </Form.Control>
            </Form.Field>

            <Form.Field name="email">
              <Flex>
                <Form.Label>
                  <span>Email</span>
                </Form.Label>
                <Form.Message match="valueMissing">
                  <span>enter your email</span>
                </Form.Message>
                <Form.Message match="typeMismatch">
                  <span>enter a valid email</span>
                </Form.Message>
              </Flex>

              <Form.Control asChild>
                <input type="email" />
              </Form.Control>
            </Form.Field>

            <Form.Field name="password">
              <Flex>
                <Form.Label>Password</Form.Label>
                <Form.Message match="valueMissing">
                  <span>enter your password</span>
                </Form.Message>
              </Flex>
              <Form.Control asChild>
                <input type="password" />
              </Form.Control>
            </Form.Field>

            <Form.Field name="password">
              <Flex>
                <Form.Label>
                  <span>Password confirmation</span>
                </Form.Label>
                <Form.Message match="valueMissing">
                  <span>enter your password</span>
                </Form.Message>
              </Flex>
              <Form.Control asChild>
                <input type="password" />
              </Form.Control>
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

            <Form.Submit asChild>
              <Button type="submit" variant="classic" children={'Login'} />
            </Form.Submit>
            {/* <FormControlLabel
          label={'Remember me'}
          control={<Controller name={'rememberMe'} control={control} render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}/>}/> */}
          </Form.Root>
        </Flex>
      </form>
    </Flex>
  )
}
