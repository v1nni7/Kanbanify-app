import { ReactNode } from "react";
import Modal from "../Modal";
import ModalTaskHeader from "./ModalTaskHeader";

type ModalTaskProps = {
  task: any
  element: any;
  show: boolean;
  width: "large" | "medium" | "small";
};

export default function ModalTask(props: ModalTaskProps) {
  const { task } = props

  return (
    <Modal {...props} >
      <div className="bg-neutral-800 p-4 rounded-lg">
        {/* Header */}
        <ModalTaskHeader title={task.title} />

      </div>
    </Modal>
  )
}