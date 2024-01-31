'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState<boolean>()
  const { setTheme, resolvedTheme } = useTheme()

  const onToggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button onClick={onToggleTheme} className="absolute right-4 top-4 text-2xl">
      {resolvedTheme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  )
}
