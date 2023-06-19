'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BiEnvelope, BiLock, BiLockOpen, BiUser } from 'react-icons/bi'

import {
  FormGroup,
  FormControl,
  FormLabel,
  FormSubmit,
  FormTooltip,
} from '@/components/AuthForm'
import { signUpRequest } from '@/services/user'
import { signUpSchema } from '@/schemas/authSchemas'

type FieldValues = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export default function Signup() {
  const router = useRouter()

  const { handleSubmit, register, formState } = useForm<FieldValues>({
    resolver: yupResolver(signUpSchema),
  })
  const { isSubmitting, errors } = formState

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await signUpRequest(data)

      if (response.status === 201) {
        router.push('/signin')
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex w-80 flex-col gap-4">
        <h2 className="text-center font-alt text-2xl text-neutral-300">
          Sign Up
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <FormGroup>
            <FormControl
              id="username"
              type="text"
              placeholder="Username"
              register={register('username')}
            />
            <FormLabel htmlFor="username">
              <BiUser />
            </FormLabel>
            <FormTooltip errors={errors.username} />
          </FormGroup>

          <FormGroup>
            <FormControl
              id="email"
              type="text"
              placeholder="Email"
              register={register('email')}
            />
            <FormLabel htmlFor="email">
              <BiEnvelope />
            </FormLabel>
            <FormTooltip errors={errors.email} />
          </FormGroup>

          <FormGroup>
            <FormControl
              id="password"
              type="password"
              placeholder="Password"
              register={register('password')}
            />
            <FormLabel htmlFor="password">
              <BiLockOpen />
            </FormLabel>
            <FormTooltip errors={errors.password} />
          </FormGroup>

          <FormGroup>
            <FormControl
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              register={register('confirmPassword')}
            />
            <FormLabel htmlFor="confirmPassword">
              <BiLock />
            </FormLabel>
            <FormTooltip errors={errors.confirmPassword} />
          </FormGroup>

          <FormSubmit disabled={isSubmitting}>Create Account</FormSubmit>

          <div className="text-center">
            <Link href="/signin" className="text-violet-500 hover:underline">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
