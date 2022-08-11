import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  IoEllipsisHorizontalSharp,
  IoPencil,
  IoCheckboxOutline,
} from "react-icons/io5";
import { initialData, TypeData } from "./initial-data";

import "./styles.scss";

const Test = () => {
  const [boardData, setBoardData] = useState<any>();

  // Código aprendido na https://egghead.io/lessons/
  const onDragEnd: any = useCallback(
    ({ destination, source, draggableId, type }: any) => {
      // Reorganizar as colunas
      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppbleId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === "column") {
        const newColumnOrder = Array.from(boardData.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newState = {
          ...boardData,
          columnOrder: newColumnOrder,
        }

        setBoardData(newState);
        return;
      }

      const start = boardData?.columns[source.droppableId];
      const finish = boardData?.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        const newBoardData: any = {
          ...boardData,
          columns: {
            ...boardData?.columns,
            [newColumn.id]: newColumn,
          },
        };

        setBoardData(newBoardData);
        return;
      }

      // Movendo de uma lista para outra
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...boardData,
        columns: {
          ...boardData?.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      setBoardData(newState);
    },
    [boardData]
  );

  useEffect(() => {
    setBoardData(initialData);
  }, []);

  return (
    <>
      <div className="test-section">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="flex"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {boardData?.columnOrder.map((columnId: any, index: any) => {
                  const column = boardData.columns[columnId];
                  const tasks = column.taskIds.map(
                    (taskId: any) => boardData.tasks[taskId]
                  );

                  return (
                    <Column
                      key={column.id}
                      column={column}
                      tasks={tasks}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

const Column = ({ column, tasks, index }: any) => {
  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <div
            className="board"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="board-title" {...provided.dragHandleProps}>
              {column.title}
            </div>
            <Droppable droppableId={column.id} type="task">
              {(provided) => (
                <div
                  className="tasklist"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.map((task: any, index: any) => (
                    <Task key={task.id} index={index} task={task} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
};

const Task = ({ task, index }: any) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="board-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="board-content">
            <div className="board-item-title">{task.content}</div>
            <div className="board-item-checked">
              <div className="board-icon-checked">
                <IoCheckboxOutline />
              </div>
              <div className="board-number-checked">
                {task.completedCheckbox}/{task.totalCheckbox}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Test;
