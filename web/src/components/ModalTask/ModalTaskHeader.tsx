import { useRef } from "react"

type ModalTaskHeaderProps = {
  title: string
}

export default function ModalTaskHeader({ title }: ModalTaskHeaderProps) {
  const contentEditable = useRef<HTMLHeadElement>(null)


  const onSubmit = () => {
    if (!contentEditable.current) return

    console.log(contentEditable.current.innerHTML)
  }

  return (
    <>
      <div className="flex items-center">

      </div>
    </>
  )
}