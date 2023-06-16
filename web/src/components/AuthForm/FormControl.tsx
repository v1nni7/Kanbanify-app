import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: any
}

export default function FormControl({ register, ...props }: InputProps) {
  return <input {...register} {...props} autoComplete="off" className="peer h-12 w-full rounded-lg border-2 border-neutral-500 bg-transparent p-2 pl-10 text-xl font-semibold outline-none transition placeholder:font-semibold placeholder:text-neutral-500 focus:border-neutral-500/60 focus:placeholder:text-neutral-500/50" />
}