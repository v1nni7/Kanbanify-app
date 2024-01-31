import { ReactNode } from 'react'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

type WorkspaceLayoutProps = {
  children: ReactNode
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return (
    <>
      <div className="grid h-full grid-cols-[240px_minmax(240px,_1fr)_0]">
        <Sidebar />

        <div className="grid h-full grid-rows-[72px_minmax(72px,_1fr)_0]">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  )
}
