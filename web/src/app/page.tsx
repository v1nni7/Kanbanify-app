import Link from 'next/link'
import { IoHeart } from 'react-icons/io5'

export default function Home() {
  return (
    <main className="grid h-full grid-cols-2">
      <div className="relative flex h-full flex-col justify-between overflow-hidden border-r-2 border-zinc-400 p-6">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-600 opacity-40 blur-full" />
        <div className=""></div>
        {/* Hero */}
        <div className="m-auto w-[420px]">
          <div className="flex flex-col items-start justify-center gap-4">
            <h2 className="rounded-s-md rounded-tr-md bg-gradient-to-r from-indigo-500 to-indigo-700 p-2 text-3xl">
              Kanbanify
            </h2>
            <p>
              Aumente sua produtividade organizando suas tarefas de maneira
              simples e eficiente com o Kanbanify.
            </p>
            <Link
              href="/signup"
              className="rounded-md bg-indigo-500 px-4 py-2 transition-colors duration-300 hover:bg-indigo-500/80"
            >
              Cadastre-se
            </Link>
          </div>
        </div>

        <footer className="flex flex-col items-center gap-4">
          <h2 className="text-lg">
            <span className="rounded-s-md rounded-tr-md bg-gradient-to-r from-indigo-500 to-indigo-700 p-1 text-2xl">
              Kanbanify
            </span>{' '}
            Todos os direitos reservados © 2021
          </h2>
          <h3 className="flex items-center gap-2">
            Feito com <IoHeart className="text-red-500" /> por
            <a
              target="_blank"
              href="https://github.com/v1nni7"
              className="cursor-pointer text-indigo-400 transition-colors hover:text-indigo-500"
              rel="noreferrer"
            >
              Vinicius Cezar
            </a>
          </h3>
        </footer>
      </div>
      <div className="p-6">
        <div className="mb-10 flex flex-col gap-2">
          <h2 className="text-2xl">
            Conheça o Kanbanify: Organização e produtividade ao seu alcance
          </h2>
          <p>
            Olá! Eu sou Vinicius Silveira Cezar, desenvolvedor do Kanbanify, um
            projeto que venho dedicando meus esforços diários. Estou
            constantemente implementando novas funcionalidades para tornar essa
            aplicação ainda melhor.
          </p>
        </div>
        <div className="mb-10 flex flex-col gap-2">
          <h2 className="text-2xl">Aviso importante:</h2>

          <p>
            Gostaria de salientar que o Kanbanify ainda está em fase de
            desenvolvimento, o que significa que podem ocorrer eventuais erros.
            Portanto, é recomendado que a aplicação não seja utilizada em
            situações reais de trabalho. Além disso, devido à hospedagem do
            aplicativo no Render, o banco de dados pode ser limpo diariamente.
          </p>

          <p>
            No entanto, fique à vontade para experimentar a aplicação em outras
            situações!
          </p>

          <p>
            Encorajo você a enviar feedback, seja para relatar problemas, fazer
            sugestões ou críticas construtivas. Utilize a aba de feedback na
            aplicação. Tenha uma ótima experiência com o Kanbanify e até a
            próxima!
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Notas de Desenvolvimento:</h2>

          <ul className="">
            <li className="ml-10 list-disc">
              <span className="font-semibold">Versão atual da aplicação:</span>{' '}
              1.0-beta
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
