'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import KanbanProvider from '@/context/KanbanContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <KanbanProvider>{children}</KanbanProvider>
    </SessionProvider>
  )
}
