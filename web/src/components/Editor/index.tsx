import React, { Ref, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import css from 'styled-jsx/css'

interface BaseProps {
  className: string
  [key: string]: unknown
}

type OrNull<T> = T | null

export const Button = React.forwardRef(function Button(
  {
    className,
    active,
    reversed,
    ...props
  }: PropsWithChildren<
    {
      active: boolean
      reversed: boolean
    } & BaseProps
  >,
  ref: Ref<OrNull<HTMLSpanElement>>,
) {
  return (
    <span
      {...props}
      ref={ref}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          event.currentTarget.click()
        }
      }}
      className={`${
        className ? className + ' ' : ''
      }cursor-pointer block rounded-md p-2 text-white transition-all hover:scale-110 focus:hover:scale-110 ${
        reversed
          ? active
            ? 'text-white'
            : 'text-gray-500'
          : active
          ? 'bg-neutral-700'
          : ' bg-neutral-500'
      }`}
    />
  )
})
