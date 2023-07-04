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
  FormTooltip,
} from '@/components/AuthForm'
import PrimaryButton from '@/components/_Buttons/PrimaryButton'
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
          Cadastro
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <FormGroup>
            <FormControl
              id="username"
              type="text"
              placeholder="Usuário"
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
              placeholder="Senha"
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
              placeholder="Confirmar senha"
              register={register('confirmPassword')}
            />
            <FormLabel htmlFor="confirmPassword">
              <BiLock />
            </FormLabel>
            <FormTooltip errors={errors.confirmPassword} />
          </FormGroup>

          <PrimaryButton type="submit" size="lg" disabled={isSubmitting}>
            Criar conta
          </PrimaryButton>

          <div className="text-center">
            <Link href="/signin" className="text-indigo-500 hover:underline">
              Já possui uma conta? Faça login
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
