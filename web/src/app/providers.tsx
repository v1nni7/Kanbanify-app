'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'

import ThemeSwitch from '@/components/ThemeSwitch'
import KanbanProvider from '@/context/KanbanContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <KanbanProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ThemeSwitch />
        </ThemeProvider>
      </KanbanProvider>
    </SessionProvider>
  )
}
