import { HTMLAttributes, ReactNode } from 'react'
import LoadingSpinner from '../LoadingSpinner'

interface PrimaryButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled: boolean
  children: ReactNode
  className?: string
  onClick?: () => void
  size: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit'
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  const { size, children, disabled, onClick, type, className } = props

  const height = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-16',
  }

  const fontSize = {
    sm: 'text-md',
    md: 'text-lg',
    lg: 'text-xl',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${height[size]} ${fontSize[size]} ${className} flex items-center justify-center rounded-lg bg-indigo-500 font-alt text-neutral-300 transition-colors hover:bg-indigo-500/80 disabled:bg-indigo-400`}
    >
      {disabled ? <LoadingSpinner height={30} width={30} /> : children}
    </button>
  )
}
