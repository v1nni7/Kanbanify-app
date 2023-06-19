'use client'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import {
  Roboto_Flex as Roboto,
  Lexend_Deca as LexendDeca,
} from 'next/font/google'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from 'next-auth/react'
import KanbanProvider from '@/context/KanbanContext'

const lexendDeca = LexendDeca({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-lexend-deca',
})

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

interface IProps {
  children: ReactNode
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body
        className={`bg-neutral-900 font-sans ${roboto.variable} ${lexendDeca.variable} font-sans`}
      >
        <SessionProvider>
          <KanbanProvider>
            <section className="mx-auto flex h-screen w-5/6">
              <div className="animate-fade relative my-8 w-full overflow-hidden rounded-lg bg-neutral-800 shadow">
                <ToastContainer
                  autoClose={3000}
                  className="mb-6"
                  position="bottom-right"
                />

                {children}
              </div>
            </section>
          </KanbanProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
