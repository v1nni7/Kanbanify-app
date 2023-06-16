import { HTMLAttributes } from 'react'

interface FormLabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor: string
}

export default function FormLabel({
  htmlFor,
  children,
  ...props
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="absolute ml-2 text-3xl peer-focus:text-neutral-500/60"
      {...props}
    >
      {children}
    </label>
  )
}
