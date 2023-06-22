import Modal from '../Modal'
import ModalTaskHeader from './ModalTaskHeader'

type ModalTaskProps = {
  task: any
  element: any
  show: boolean
  width: 'large' | 'medium' | 'small'
}

export default function ModalTask(props: ModalTaskProps) {
  const { task } = props

  return (
    <Modal {...props}>
      <div className="rounded-lg bg-neutral-800 p-4">
        {/* Header */}
        <ModalTaskHeader title={task.title} />
      </div>
    </Modal>
  )
}
