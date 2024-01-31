'use client'

import * as React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const inputType =
      type === 'password' ? (showPassword ? 'text' : 'password') : type

    const onToggleShowPassword = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="relative flex items-center">
        <input
          type={inputType}
          className={cn(
            'w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-indigo-500 disabled:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-indigo-500 dark:disabled:bg-gray-600',
            className,
          )}
          ref={ref}
          {...props}
        />

        {type === 'password' && (
          <>
            <button
              type="button"
              onClick={onToggleShowPassword}
              className="absolute right-3 text-xl text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
