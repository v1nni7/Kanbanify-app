'use client'

import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Oval } from 'react-loader-spinner'
import { FaCircleExclamation } from 'react-icons/fa6'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { finishSignupSchema, FinishSignupSchema } from '@/schemas/authSchemas'
import { zodResolver } from '@hookform/resolvers/zod'

export default function Finish() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FinishSignupSchema>({
    resolver: zodResolver(finishSignupSchema),
  })

  const onSubmit: SubmitHandler<FinishSignupSchema> = async () => {}

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-center font-bold">Finalize seu cadastro</h2>

        <div className="space-y-1">
          <Input
            type="text"
            placeholder="Nome"
            {...register('name')}
            disabled={isSubmitting}
          />

          {errors.name && (
            <p className="ml-1 flex items-center gap-1 text-xs text-red-400">
              <FaCircleExclamation />
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Input
            type="text"
            placeholder="Usuário"
            {...register('username')}
            disabled={isSubmitting}
          />

          {errors.username && (
            <p className="ml-1 flex items-center gap-1 text-xs text-red-400">
              <FaCircleExclamation />
              {errors.username.message}
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
            'Finalizar cadastro'
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
