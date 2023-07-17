'use client'

import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BiEnvelope, BiLock, BiX } from 'react-icons/bi'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import {
  FormControl,
  FormGroup,
  FormLabel,
  FormTooltip,
} from '@/components/AuthForm'
import PrimaryButton from '@/components/_Buttons/PrimaryButton'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInSchema } from '@/schemas/authSchemas'
import { useState } from 'react'

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
  const [error, setError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<FieldValues> = async ({ email, password }) => {
    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/boards',
      })

      console.log(response)

      if (response?.error) {
        setError('Invalid credentials')
      }

      router.push(response?.url || '/boards')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex w-80 flex-col gap-4">
        <h2 className="text-center font-alt text-2xl text-neutral-300">
          Entrar
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          {error && (
            <div className="flex items-center justify-between rounded-lg bg-red-400 p-2 text-center font-alt text-lg font-bold text-neutral-50">
              {error}

              <button onClick={() => setError(null)}>
                <BiX className="text-3xl" />
              </button>
            </div>
          )}
          <FormGroup>
            <FormControl
              id="email"
              type="text"
              autoComplete="off"
              placeholder="E-mail"
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
              placeholder="Senha"
              register={register('password')}
            />
            <FormLabel htmlFor="password">
              <BiLock />
            </FormLabel>
            <FormTooltip errors={errors.password} />
          </FormGroup>

          <PrimaryButton size="lg" type="submit" disabled={isSubmitting}>
            Enviar
          </PrimaryButton>

          <div className="text-center">
            <Link href="/signup" className="text-indigo-500 hover:underline">
              Não tem uma conta? Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
