import { BiX } from "react-icons/bi";
import { Draggable } from "react-beautiful-dnd";
import { IoImageOutline } from "react-icons/io5";
import useToggleClickOutside from "@/hooks/useToggleClickOutside";

import Modal from "../Modal";

type TaskProps = {
  task: {
    id: string;
    title: string;
    description: string;
  };
  index: number;
};

export default function Task({ task, index }: TaskProps) {
  const [show, toggleShow, element] = useToggleClickOutside(false);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {({ dragHandleProps, draggableProps, innerRef }) => (
          <div
            onClick={() => toggleShow()}
            className="mb-2 rounded-lg bg-neutral-700 p-2"
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
          >
            <h1 className="text-neutral-100">{task.title}</h1>
            <p className="text-neutral-400">{task.description}</p>
          </div>
        )}
      </Draggable>

      <Modal show={show} element={element} width="large">
        <div className="flex flex-col">
          <div className="flex items-center">
            <input type="text" value={task.title} />
          </div>
        </div>
      </Modal>
    </>
  );
}
