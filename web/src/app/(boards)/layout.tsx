import { ReactNode } from 'react'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

type WorkspaceLayoutProps = {
  children: ReactNode
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
