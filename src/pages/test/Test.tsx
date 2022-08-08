import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IoEllipsisHorizontalSharp, IoPencil, IoCheckboxOutline } from 'react-icons/io5';
import { initialData, TypeData } from './initial-data';

import './styles.scss';

const Test = () => {

  const [boardData, setBoardData] = useState<TypeData>();

  const onDragEnd: any = useCallback(({destination, source, draggableId}: any) => {
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

    const column = boardData?.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    const newBoardData: any = {
      ...boardData,
      columns: {
        ...boardData?.columns,
        [newColumn.id]: newColumn,
      }
    };

    setBoardData(newBoardData);
  }, [boardData])

  useEffect(() => {
    setBoardData(initialData);
  }, [])

  return (
    <>
      <div className="test-section">
        <DragDropContext onDragEnd={onDragEnd} >
          {boardData?.columnOrder.map((columnId: any) => {
            const column = boardData.columns[columnId];
            const tasks = column.taskIds.map((taskId: any) => boardData.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </DragDropContext>
      </div>
    </>
  )
}

const Column = ({ column, tasks }: any) => {

  return (
    <>
      <div className="board">
        <div className="board-title">
          {column.title}
        </div>
        <Droppable droppableId={column.id}>
          {(provided) => (
            <div
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
    </>
  )
}

const Task = ({ task, index }: any) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div className="board-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="board-content">
            <div className="board-item-title">
              {task.content}
            </div>
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
  )
}

export default Test;