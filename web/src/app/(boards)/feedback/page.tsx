'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { IoCaretDownOutline } from 'react-icons/io5'
import { SubmitHandler, useForm } from 'react-hook-form'

import useToggleClickOutside from '@/hooks/useToggleClickOutside'

// eslint-disable-next-line
import TextAreaEditor from '@/components/TextAreaEditor'
import { createFeedback } from '@/services/board'
import { data } from 'autoprefixer'

type FieldValues = {
  email: string
  username: string
  subject: string
  message: string
}

export default function Feedback() {
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [category, setCategory] = useState<string | null>('')
  const [dropdownOpen, toggleOpen, element, button] =
    useToggleClickOutside(false)

  const { data: session } = useSession()

  let user: any = null

  if (session) {
    user = session.user
  }

  const { handleSubmit, register, setValue } = useForm<FieldValues>()

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      try {
        await createFeedback({ ...data, category })

        setFeedbackSent(true)
      } catch (error) {
        console.log(error)
      }
    },
    [category],
  )

  useEffect(() => {
    if (user) {
      setValue('email', user.email)
      setValue('username', user.username)
    }
  }, [user, setValue])

  return (
    <main className="h-full w-full bg-neutral-600/20 px-8 py-4">
      <div className="mb-6">
        <h1 className="text-2xl">Feedback</h1>

        <p className="text-md text-neutral-400">
          Aqui você pode enviar feedbacks, sugestões, críticas, elogios,
          problemas etc.
        </p>
      </div>

      {feedbackSent ? (
        <div className="flex h-full flex-col items-center justify-center gap-10">
          <h2 className="w-[580px] text-center text-4xl">
            Obrigado pelo seu feedback! Ele é muito importante para nós.
          </h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid w-full grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-md mb-2">
                Usuário
              </label>
              <input
                id="username"
                type="text"
                {...register('username')}
                defaultValue={user?.username}
                disabled
                className="rounded-md border-2 border-transparent bg-neutral-600 px-2 py-4 outline-none transition-colors focus:border-2 focus:border-indigo-400 disabled:bg-neutral-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-md mb-2">
                E-mail
              </label>
              <input
                id="email"
                type="text"
                {...register('email')}
                defaultValue={user?.email}
                disabled
                className="rounded-md border-2 border-transparent bg-neutral-600 px-2 py-4 outline-none transition-colors focus:border-2 focus:border-indigo-400 disabled:bg-neutral-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category" className="text-md mb-2">
                Categoria
              </label>

              <div className="relative w-full">
                <button
                  ref={button}
                  type="button"
                  id="category"
                  onClick={() => toggleOpen()}
                  className="relative flex w-full items-center justify-between rounded-md border-2 border-transparent bg-neutral-600 px-2 py-4 outline-none transition-colors focus:border-2 focus:border-indigo-400 disabled:bg-neutral-500"
                >
                  {category || 'Selecione uma opção'}

                  <IoCaretDownOutline />
                </button>

                <div
                  className={`absolute z-30 mt-4 w-full overflow-hidden rounded-md bg-neutral-700 p-2 transition-all ${
                    dropdownOpen ? 'opacity-1 max-h-96' : 'max-h-0 opacity-0'
                  }`}
                  ref={element}
                >
                  <div className="flex flex-col gap-2 rounded-md border-2 border-neutral-500 p-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCategory('Feedback')
                        toggleOpen()
                      }}
                      className="w-full rounded-md p-4 text-center transition-colors hover:bg-neutral-800/60"
                    >
                      Feedback
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory('Sugestão')
                        toggleOpen()
                      }}
                      className="w-full rounded-md p-4 text-center transition-colors hover:bg-neutral-800/60"
                    >
                      Sugestão
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory('Problema')
                        toggleOpen()
                      }}
                      className="w-full rounded-md p-4 text-center transition-colors hover:bg-neutral-800/60"
                    >
                      Problema
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory('Dúvida')
                        toggleOpen()
                      }}
                      className="w-full rounded-md p-4 text-center transition-colors hover:bg-neutral-800/60"
                    >
                      Dúvida
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory('Outros')
                        toggleOpen()
                      }}
                      className="w-full rounded-md p-4 text-center transition-colors hover:bg-neutral-800/60"
                    >
                      Outros
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="subject" className="text-md mb-2">
                Assunto
              </label>
              <input
                id="subject"
                type="text"
                {...register('subject')}
                className="rounded-md border-2 border-transparent bg-neutral-600 px-2 py-4 outline-none transition-colors focus:border-2 focus:border-indigo-400 disabled:bg-neutral-500"
              />
            </div>
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="message" className="text-md mb-2">
              Mensagem
            </label>

            {/* <TextAreaEditor /> */}

            <textarea
              rows={12}
              id="message"
              {...register('message')}
              className="w-full resize-none rounded-md border-2 border-transparent bg-neutral-600 px-2 py-4 outline-none transition-colors focus:border-2 focus:border-indigo-400 disabled:bg-neutral-500"
            />
          </div>
          <button
            type="submit"
            className="self-end rounded-md bg-indigo-500 px-12 py-4 transition-colors hover:bg-indigo-500/80 focus:bg-indigo-500/80"
          >
            Enviar
          </button>
        </form>
      )}
    </main>
  )
}
