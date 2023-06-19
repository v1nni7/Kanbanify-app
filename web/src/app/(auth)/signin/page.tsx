'use client'

import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BiEnvelope, BiLock } from 'react-icons/bi'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import {
  FormControl,
  FormGroup,
  FormLabel,
  FormTooltip,
} from '@/components/AuthForm'
import FormSubmit from '@/components/AuthForm/FormSubmit'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInSchema } from '@/schemas/authSchemas'

type FieldValues = {
  email: string
  password: string
}

export default function Signin() {
  const router = useRouter()
  const { handleSubmit, register, formState } = useForm<FieldValues>({
    resolver: yupResolver(signInSchema),
  })
  const { isSubmitting, errors } = formState

  const onSubmit: SubmitHandler<FieldValues> = async ({ email, password }) => {
    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/boards',
      })

      if (!response?.ok) {
        return
      }

      router.push('/boards')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex w-80 flex-col gap-4">
        <h2 className="text-center font-alt text-2xl text-neutral-300">
          Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <FormGroup>
            <FormControl
              id="email"
              type="text"
              autoComplete="off"
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
              autoComplete="off"
              placeholder="Password"
              register={register('password')}
            />
            <FormLabel htmlFor="password">
              <BiLock />
            </FormLabel>
            <FormTooltip errors={errors.password} />
          </FormGroup>

          <FormSubmit disabled={isSubmitting}>Submit</FormSubmit>

          <div className="text-center">
            <Link href="/signup" className="text-violet-500 hover:underline">
              {"Don't"} have an account?
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
