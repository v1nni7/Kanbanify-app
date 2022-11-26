import { useState, useRef, useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BiX } from "react-icons/bi";
import Modal from "../Modal";

interface TaskPropsType {
  task: {
    id: string;
    title: string;
    display: { description: string; date: string; time: string };
  };
  index: number;
  columnTitle: string;
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
            className="board-tasklist"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div
              className="board-tasklist-item"
              onClick={() => onToggleModal()}
            >
              <div className="board-tasklist-content">
                <div className="board-tasklist-flex">
                  <div className="board-tasklist-title">{task.title}</div>
                </div>
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
            <li className="list-tags-item">
              
            </li>
          </ul>
        </div>
        <div className="modal-footer"></div>
      </Modal>
    </>
  );
};

export default Task;
