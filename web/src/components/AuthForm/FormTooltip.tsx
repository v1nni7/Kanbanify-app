import { BiErrorCircle } from 'react-icons/bi'

interface FormTooltipProps {
  errors: any
}

export default function FormTooltip({ errors }: FormTooltipProps) {
  if (!errors) return

  return (
    <div className="absolute right-2">
      <div className="relative flex flex-col items-center justify-center">
        <BiErrorCircle className="peer text-2xl text-red-500" />

        <div className="invisible absolute left-10 z-20 w-44 rounded-md bg-red-500 p-1 text-center text-neutral-200 peer-hover:visible">
          {errors.message}
        </div>
      </div>
    </div>
  )
}
