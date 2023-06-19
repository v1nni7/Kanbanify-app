import { HTMLAttributes, ReactNode } from 'react'
import LoadingSpinner from '../LoadingSpinner'

interface FormSubmitProps extends HTMLAttributes<HTMLButtonElement> {
  disabled: boolean
  children: ReactNode
}

export default function FormSubmit({ children, disabled }: FormSubmitProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="flex h-[60px] items-center justify-center rounded-lg bg-violet-500 p-4 font-alt text-xl font-semibold text-neutral-300 transition hover:bg-violet-500/60 focus:bg-violet-500/60 disabled:bg-violet-400"
    >
      {disabled ? <LoadingSpinner height={30} width={30} /> : children}
    </button>
  )
}
