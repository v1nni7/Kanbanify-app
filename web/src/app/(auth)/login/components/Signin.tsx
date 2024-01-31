import Link from 'next/link'

import { Input } from '@/components/ui/input'

export default function SigninForm() {
  return (
    <form className="space-y-4">
      <h2 className="text-center font-bold">Acesse sua conta</h2>

      <Input type="text" placeholder="E-mail" />

      <div className="space-y-1">
        <Input type="password" placeholder="Senha" />

        <Link
          href="/"
          className="mt-6 block px-0.5 font-normal hover:underline"
        >
          Esqueceu a senha?
        </Link>
      </div>

      <button className="w-full rounded-md bg-indigo-600 p-2.5 text-white transition-colors hover:bg-indigo-500">
        Acessar
      </button>
    </form>
  )
}
