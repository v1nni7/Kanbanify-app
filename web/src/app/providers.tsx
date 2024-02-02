'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

import ThemeSwitch from '@/components/ThemeSwitch'
import KanbanProvider from '@/context/KanbanContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <KanbanProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <ThemeSwitch />
      </ThemeProvider>
    </KanbanProvider>
  )
}
