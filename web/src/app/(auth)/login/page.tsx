'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

import KanbanifyLogo from '@/assets/kanbanify_logo.svg'
import SigninForm from './components/Signin'
import SignupForm from './components/Signup'

export default function Login() {
  const [loginForm, setLoginForm] = useState<boolean>(true)

  return (
    <>
      <main className="flex h-screen items-center">
        <div className="mx-auto w-full max-w-sm rounded-md bg-gray-50 p-4 shadow dark:bg-gray-800 dark:shadow-gray-700">
          <div className="mb-8 mt-4 flex items-center justify-center gap-2">
            <Image src={KanbanifyLogo} className="h-8 w-8" alt="" />

            <h1 className="font-alt text-2xl uppercase">Kanbanify</h1>
          </div>

          {loginForm ? <SigninForm /> : <SignupForm />}

          <div className="flex justify-center">
            <button
              onClick={() => setLoginForm(!loginForm)}
              className="mt-10 block font-normal hover:underline"
            >
              {loginForm ? 'Não possui uma conta?' : 'Já possui uma conta?'}
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <hr className="w-full bg-gray-500 pt-px" />
            ou
            <hr className="w-full bg-gray-500 pt-px" />
          </div>

          <div className="mt-4 space-y-2">
            <button className="flex w-full items-center justify-center gap-2 rounded border border-gray-400 p-2.5 font-medium hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700">
              <FcGoogle className="text-xl" />
              Entre com Google
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
