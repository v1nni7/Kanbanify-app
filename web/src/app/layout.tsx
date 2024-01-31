import './globals.css'

import { ReactNode } from 'react'
import { Poppins, Lexend_Deca as LexendDeca } from 'next/font/google'

import Providers from './providers'

const lexendDeca = LexendDeca({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-lexend-deca',
})
const poppins = Poppins({
  subsets: ['latin'],
  style: 'normal',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

interface IProps {
  children: ReactNode
}

export const metadata = {
  title: 'Kanban',
  description: 'Kanban board',
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="pt-br">
      <body
        className={`font-poppins bg-gray-100 text-gray-950 dark:bg-gray-900 dark:text-gray-300 ${poppins.variable} ${lexendDeca.variable} font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
