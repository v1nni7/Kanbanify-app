import './globals.css'

import { ReactNode } from 'react'
import { Poppins, Lexend_Deca as LexendDeca } from 'next/font/google'

import Providers from './Providers'

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
    <html lang="en">
      <body
        className={`font-poppins bg-neutral-900 font-medium ${poppins.variable} ${lexendDeca.variable} font-sans`}
      >
        <Providers>
          <section className="mx-auto flex h-screen w-5/6">
            <div className="animate-fade relative my-8 w-full overflow-hidden rounded-lg bg-neutral-800 shadow">
              {children}
            </div>
          </section>
        </Providers>
      </body>
    </html>
  )
}
