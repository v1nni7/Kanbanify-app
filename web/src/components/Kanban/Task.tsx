"use client"

import { Draggable } from "react-beautiful-dnd";
import { IoCheckbox, IoClose } from "react-icons/io5";
import { MdReorder, MdSubtitles } from "react-icons/md";

import useToggleClickOutside from "@/hooks/useToggleClickOutside";
import ModalTask from "@/components/ModalTask"

type TaskProps = {
  task: {
    id: string;
    title: string;
    description: string;
    checklists: [
      {
        id: string;
        title: string;
        items: [
          {
            id: string;
            title: string;
            checked: boolean;
          }
        ];
      }
    ];
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

      <ModalTask task={task} show={show} element={element} width="large" />
    </>
  );
}
