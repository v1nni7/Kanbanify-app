'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { IoMdSettings, IoMdNotifications } from 'react-icons/io'
import { usePathname, useRouter } from 'next/navigation'
import { IoArrowBackOutline } from 'react-icons/io5'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const { data: session } = useSession()

  let user = null

  if (session) {
    user = session.user
  }

  return (
    <nav className="flex items-center justify-end gap-4 px-8 py-2">
      <div className="mr-auto">
        {pathname !== '/boards' && (
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-1 rounded-lg p-2 font-alt text-neutral-300"
          >
            <IoArrowBackOutline className="text-xl transition group-hover:-translate-x-2" />
            Voltar
          </button>
        )}
      </div>
      <div className="relative flex items-center">
        <button className="group text-2xl text-neutral-200 hover:text-neutral-200/60">
          <IoMdNotifications className="group-hover:animate-wiggle" />
        </button>
      </div>

      <button className="group text-2xl text-neutral-200 hover:text-neutral-200/60">
        <IoMdSettings className="group-hover:animate-[spin_2s_linear]" />
      </button>

      {user?.photo && (
        <Image
          width={300}
          height={300}
          src={user.photo}
          alt=""
          className="h-12 w-12 rounded-full object-cover"
        />
      )}
    </nav>
  )
}
