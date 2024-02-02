'use client'

import Link from 'next/link'
import { Oval } from 'react-loader-spinner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaCircleExclamation } from 'react-icons/fa6'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SignUpData, signUpSchema } from '@/schemas/authSchemas'
import { api } from '@/services/api'

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    try {
      const response = await api.post('/user/sign-up/email', data)

      console.log(response.data)
    } catch (error) {}
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-center font-bold">Registre-se para continuar</h2>

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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Oval
              width={24}
              height={24}
              strokeWidth={4}
              color="#ffffff"
              secondaryColor="#ffffff"
            />
          ) : (
            'Criar conta'
          )}
        </Button>
      </form>

      <div className="flex justify-center">
        <Link href="/login" className="mt-10 block font-normal hover:underline">
          Já possui uma conta?
        </Link>
      </div>
    </>
  )
}
