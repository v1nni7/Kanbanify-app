import { ReactNode } from 'react'

type ModalProps = {
  element?: any
  show: boolean
  children: ReactNode
  width: 'large' | 'medium' | 'small'
}

export default function Modal({ children, width, show, element }: ModalProps) {
  const modalWidth = {
    small: 'w-3/12',
    medium: 'w-4/12',
    large: 'w-5/12',
  }

  return (
    <>
      {show && (
        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center overflow-y-auto bg-neutral-900/50">
          <div className={`${modalWidth[width]} max-h-full`} ref={element}>
            {children}

            <div className="p-1"></div>
          </div>
        </div>
      )}
    </>
  )
}
