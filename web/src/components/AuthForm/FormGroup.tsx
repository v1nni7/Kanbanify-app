import { HTMLAttributes } from 'react'

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {}

export default function FormGroup({ children, ...props }: FormGroupProps) {
  return (
    <div className="relative flex items-center text-neutral-500" {...props}>
      {children}
    </div>
  )
}
