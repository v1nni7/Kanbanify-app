import { useState, useRef, useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BiPlus, BiX } from "react-icons/bi";
import Modal from "../Modal";

interface TaskPropsType {
  task: {
    id: string;
    title: string;
    display: {
      description: string;
      date: string;
      time: string;
      tags: [{ id: string; name: string }];
    };
  };
  index: number;
  columnTitle: string;
}

interface ITag {
  id: string;
  name: string;
}

const Task = ({ index, task, columnTitle }: TaskPropsType) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onToggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className="task"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="task-container">
              <div
                className="board-tasklist-item"
                onClick={() => onToggleModal()}
              >
                <div className="task-title">{task.title}</div>
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <Modal
        isModalLarge={true}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <div className="modal-header">
          <input
            className="modal-task-title"
            type="text"
            defaultValue={task.display.description}
          />
          <button
            type="button"
            className="btn-close-modal"
            onClick={() => setModalOpen(false)}
          >
            <BiX />
          </button>
        </div>
        <div className="modal-body">
          <ul className="list-tags">
            <li className="list-tags-item-create">
              <BiPlus />
            </li>
            {task.display.tags.map((tag: ITag, index: number) => (
              <li className="list-tags-item" key={index}>
                <span className="list-tags-item-title">{tag.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-footer"></div>
      </Modal>
    </>
  );
};

export default Task;
