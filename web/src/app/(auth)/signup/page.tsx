'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BiEnvelope, BiLock, BiLockOpen, BiUser } from 'react-icons/bi'
import { signUpRequest } from '@/services/user'
import { FormGroup, FormControl, FormLabel } from '@/components/AuthForm'
import LoadingSpinner from '@/components/LoadingSpinner'

type FieldValues = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export default function Signup() {
  const router = useRouter()
  const { handleSubmit, register, formState } = useForm<FieldValues>()
  const { isSubmitting } = formState

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await signUpRequest(data)

      if (response.status === 201) {
        router.push('/signin')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex w-80 flex-col gap-4">
        <h2 className="font-alt text-center text-2xl text-neutral-300">
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
          </FormGroup>

          <FormGroup>
            <FormControl
              id="email"
              type="text"
              placeholder="Email"
              register={register}
            />
            <FormLabel htmlFor="email">
              <BiEnvelope />
            </FormLabel>
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
          </FormGroup>

          <FormGroup>
            <FormControl
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              register={register('confirmPassword')}
            />
            <label
              htmlFor="confirmPassword"
              className="absolute ml-2 text-3xl peer-focus:text-neutral-500/60"
            >
              <BiLock />
            </label>
          </FormGroup>

          <button
            type="submit"
            className="font-alt rounded-lg bg-violet-500 p-2 text-xl font-semibold text-neutral-300 transition hover:bg-violet-500/60 focus:bg-violet-500/60 disabled:bg-violet-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingSpinner /> : 'Submit'}
          </button>

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
