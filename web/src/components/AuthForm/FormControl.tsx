import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: any
}

export default function FormControl({ register, ...props }: InputProps) {
  return (
    <input
      {...props}
      {...register}
      autoComplete="off"
      className="w-full rounded-lg border-2 border-neutral-600 bg-transparent px-10 py-4 font-alt text-lg outline-none placeholder:text-neutral-600 focus:border-neutral-500"
    />
  )
}
