'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import { Oval } from 'react-loader-spinner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { SigninData, signInSchema } from '@/schemas/authSchemas'
import { FaCircleExclamation } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { api } from '@/services/api'

export default function Login() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<SigninData> = async (data) => {
    try {
      const response = await api.post('/user/sign-in', data)

      setCookie(undefined, 'token', response.data.token, null)

      router.push('/boards')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-center font-bold">Acesse sua conta</h2>

        <div className="space-y-1">
          <Input
            type="text"
            placeholder="E-mail"
            {...register('email')}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="ml-1 flex items-center gap-1 text-xs text-red-400">
              <FaCircleExclamation />
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Input
            type="password"
            placeholder="Senha"
            {...register('password')}
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="ml-1 flex items-center gap-1 text-xs text-red-400">
              <FaCircleExclamation />
              {errors.password.message}
            </p>
          )}

          <Link
            href="/"
            className="mt-6 block px-0.5 font-normal hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <Button disabled={isSubmitting}>
          {isSubmitting ? (
            <Oval
              width={24}
              height={24}
              strokeWidth={4}
              color="#ffffff"
              secondaryColor="#ffffff"
            />
          ) : (
            'Acessar'
          )}
        </Button>
      </form>

      <div className="flex justify-center">
        <Link
          href="/signup"
          className="mt-10 block font-normal hover:underline"
        >
          Não possui uma conta?
        </Link>
      </div>
    </>
  )
}
