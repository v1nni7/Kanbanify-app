import Link from 'next/link'
import { IoChatboxEllipses, IoHome, IoReload } from 'react-icons/io5'

export default function Sidebar() {
  return (
    <div className="bg-neutral-700">
      <div className="flex h-full flex-col items-center justify-start p-2">
        <div className="h-[72px]">
          <h2 className="rounded-s-md rounded-tr-md bg-gradient-to-r from-indigo-500 to-indigo-700 p-2 text-3xl">
            Kanbanify
          </h2>
        </div>

        <div className="flex w-full flex-col gap-4 p-2">
          <Link
            href="/boards"
            className="flex w-full items-center gap-2 rounded-md p-2 text-lg transition-colors duration-500 hover:bg-indigo-500/50 hover:text-white"
          >
            <IoHome className="text-2xl" />
            Inicio
          </Link>
          <Link
            href="/feedback"
            className="flex w-full items-center gap-2 rounded-md p-2 text-lg transition-colors duration-500 hover:bg-indigo-500/50 hover:text-white"
          >
            <IoChatboxEllipses className="text-2xl" />
            Feedback
          </Link>
          <Link
            href="/patch-notes"
            className="flex w-full items-center gap-2 rounded-md p-2 text-lg transition-colors duration-500 hover:bg-indigo-500/50 hover:text-white"
          >
            <IoReload className="text-2xl" />
            Atualizações
          </Link>
        </div>
      </div>
    </div>
  )
}
