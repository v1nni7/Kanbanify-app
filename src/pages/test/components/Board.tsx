import {
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ThreeCircles } from "react-loader-spinner";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { initialData } from "./data";
import { IoSaveOutline } from "react-icons/io5";

import Column from "./Column";

interface TypeColumns {
  tasks: object;
  columns: object;
  columnOrder: TemplateStringsArray;
}

const DroppableArea = () => {
  const [board, setBoard] = useState<SetStateAction<TypeColumns> | any>({
    tasks: {},
    columns: {},
    columnOrder: [],
  });
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>("Nova coluna");
  const [inputTaskValue, setInputTaskValue] = useState<string>("Nova tarefa");
  const [column, setColumn] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);

  const handleDragEnd: any = useCallback(
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
        const newColumnOrder = Array.from(board.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newState = {
          ...board,
          columnOrder: newColumnOrder,
        };

        setBoard(newState);
        localStorage.setItem("board", JSON.stringify(newState));
        return;
      }

      const start = board?.columns[source.droppableId];
      const finish = board?.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        const newBoardData: any = {
          ...board,
          columns: {
            ...board?.columns,
            [newColumn.id]: newColumn,
          },
        };

        setBoard(newBoardData);
        localStorage.setItem("board", JSON.stringify(newBoardData));
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
        ...board,
        columns: {
          ...board?.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };

      setBoard(newState);
      localStorage.setItem("board", JSON.stringify(newState));
    },
    [board]
  );

  const createNewTask: any = (e: HTMLFormElement) => {
    e.preventDefault();
    

    /* setBoard({
      tasks: {
        ...board.tasks,
        [newIndexTask]: {
          id: newIndexTask,
          content: "Adicionar tarefa",
          isAction: true,
          totalCheckbox: undefined,
          completedCheckbox: undefined,
        },
      },
      columns: {},
      columnOrder: [...board.columnOrder, newIndexTask],
    }); */
  };

  const createNewColumn: any = (e: HTMLFormElement) => {
    e.preventDefault();
    const newInputValue = inputValue.replace(" ", "-").toLowerCase();
    const newIndexTaskValue = `task-${newInputValue}`;

    console.log(newIndexTaskValue);

    setBoard({
      tasks: {
        ...board.tasks,
        [newIndexTaskValue]: {
          id: newIndexTaskValue,
          content: "Adicionar tarefa",
          isAction: true,
          totalCheckbox: undefined,
          completedCheckbox: undefined,
        },
      },
      columns: {
        ...board.columns,
        [newInputValue]: {
          id: newInputValue,
          title: inputValue,
          taskIds: [newIndexTaskValue],
        },
      },
      columnOrder: [...board.columnOrder, newInputValue],
    });

    setIsOpen(false);
    setInputValue("Nova coluna");
  };

  useEffect(() => {
    if (!initialData) {
      setLoading(true);
      return;
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="modal-load">
          <ThreeCircles height={80} width={80} color="#7e57c2" />
        </div>
      ) : (
        <></>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
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
              {board ? (
                board?.columnOrder.map((columnId: number, index: number) => {
                  const column = board.columns[columnId];
                  const tasks = column.taskIds.map(
                    (taskId: number) => board.tasks[taskId]
                  );

                  return (
                    <Column
                      key={column.id}
                      column={column}
                      tasks={tasks}
                      index={index}
                      board={board}
                      setBoard={setBoard}
                      createNewTask={createNewTask}
                      inputTaskValue={inputTaskValue}
                      setInputTaskValue={setInputTaskValue}
                    />
                  );
                })
              ) : (
                <></>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="board-create-column hide">
        <form onSubmit={createNewColumn}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            <IoSaveOutline />
          </button>
        </form>
      </div>
    </>
  );
};

export default DroppableArea;
