'use client'

import { RefObject, useEffect, useRef, useState } from 'react'

export default function useToggleClickOutside(
  defaultValue: boolean,
): [
  boolean,
  () => void,
  RefObject<HTMLElement> | any,
  RefObject<HTMLElement> | any,
] {
  const [value, setValue] = useState(defaultValue)

  const elementRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLElement>(null)

  const toggle = () => {
    setValue(!value)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current?.contains(event.target as Node)) return

      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setValue(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return [value, toggle, elementRef, buttonRef]
}
