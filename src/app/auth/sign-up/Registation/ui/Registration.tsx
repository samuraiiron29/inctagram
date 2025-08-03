'use client'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { type ZodInputs, registrationSchema } from '../lib/schemas/RegistrationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'radix-ui'
import { Box, Button, Flex, Text, TextArea } from '@radix-ui/themes'
import { useAppDispatch } from '@/shared/lib/hooks/appHooks'
import Checkbox from '@/shared/ui/base/CheckBox/CheckBox'

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
    watch,
    reset,
    control,

    formState: { errors, isValid },
  } = useForm<ZodInputs>({
    resolver: zodResolver(registrationSchema),
    mode: 'all',
    defaultValues: {
      firstName: 'Qwertyyyy',
      email: 'aaaa@mail.com',
      password: 'Qwerty12345!@#',
      confirmPassword: 'Qwerty12345!@#',
      rememberMe: false,
    },
    shouldFocusError: true,
  })
  const onSubmit = (data: ZodInputs) => {
    console.log(data)
  }
  // const onSubmit: SubmitHandler<Inputs> = data => {
  //   login(data).then(res => {
  //     if (res.data?.resultCode === ResultCode.Success) {
  //       dispatch(setIsLoggedInAC({ isLoggedIn: true }))
  //       localStorage.setItem(AUTH_TOKEN, res.data.data.token)
  //       reset()}})}

  // console.log(watch('email'))
  console.log(isValid)
  return (
    <Flex direction={'column'} align={'center'} className="bg-dark-100 p-5 m-5 rounded-3xl">
      <span>Sign Up</span>
      <Flex gap={'2'}>
        <Button children={'Gmail'} />
        <Button children={'GitHub'} />
      </Flex>
      {/* <TextField label="Email" margin="normal" error={!!errors.email} {...register('email')} />
        {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        <TextField type="password" label="Password" margin="normal" error={!!errors.email} {...register('password')} />
        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>} */}

      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Field name="firstName">
          <Flex className={fieldClassName}>
            <Form.Label children={<span>Username</span>} />
            <Form.Control
              asChild
              children={<input type="text" autoComplete="firstName" {...register('firstName')} />}
              placeholder="Hello"
            />
            {errors.firstName && (
              <Text color="red" size="1">
                {errors.firstName.message}
              </Text>
            )}
          </Flex>
        </Form.Field>

        <Form.Field name="email">
          <Flex className={fieldClassName}>
            <Form.Label children={<span>Email</span>} />
            <Form.Control asChild children={<input type="email" autoComplete="email" {...register('email')} />} />
          </Flex>
          {errors.email && (
            <Text color="red" size="1">
              {errors.email.message}
            </Text>
          )}
        </Form.Field>

        <Form.Field name="password">
          <Flex className={fieldClassName}>
            <Form.Label children={<span>Password</span>} />
            <Form.Control asChild children={<input type="text" autoComplete="password" {...register('password')} />} />
            {errors.password && (
              <Text color="red" size="1">
                {errors.password.message}
              </Text>
            )}
          </Flex>
        </Form.Field>

        <Form.Field name="confirmPassword">
          <Flex className={fieldClassName}>
            <h1>Qwerty1234!2</h1>
            <Form.Label children={<span>confirmPassword</span>} />
            <Form.Control asChild children={<input type="text" autoComplete="confirmPassword" {...register('confirmPassword')} />} />
            {errors.confirmPassword && (
              <Text color="red" size="1">
                {errors.confirmPassword.message}
              </Text>
            )}
          </Flex>
        </Form.Field>

        {/* <Form.Field name="password">
          <Flex className={fieldClassName}>
            <Form.Label children={<span>Password confirmation</span>} />
            <Form.Control asChild children={<input type="password" {...register('password')} />} />
          </Flex>
        </Form.Field> */}

        <Flex>
          <Controller
            {...register('rememberMe')}
            name="rememberMe"
            control={control}
            render={({ field }) => {
              return <Checkbox checked={field.value} onChange={checked => field.onChange(checked)} />
            }}
          />
          <Text>
            <span>I agree to the </span>
            <Button variant="ghost">
              <span>Terms of Service</span>
            </Button>
            <span>and</span>
            <Button variant="ghost">
              <span>Privacy Policy</span>
            </Button>
          </Text>
        </Flex>
        <Form.Submit asChild children={<Button type="submit" variant="classic" disabled={!isValid} children={'Sign Up'} />} />
      </Form.Root>

      <span>Do you have an account?</span>
      <Flex className="text-accent-500">Sing In</Flex>
    </Flex>
  )
}
