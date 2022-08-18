import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoCheckboxOutline, IoAddSharp, IoClose } from "react-icons/io5";
import board from "../board";
import { initialData } from "./components/data";

import "./styles.scss";

const Test = () => {
  const [boardData, setBoardData] = useState<any>();
  const [modalIsOpen, setModalIsOpen] = useState<any>(false);

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
        };

        setBoardData(newState);
        localStorage.setItem("boardData", JSON.stringify(newState));
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
        localStorage.setItem("boardData", JSON.stringify(newBoardData));
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
      localStorage.setItem("boardData", JSON.stringify(newState));
    },
    [boardData]
  );

  const createNewColumn = useCallback(() => {
    if (boardData) {
      setBoardData({
        tasks: {},
        columns: {
          ...setBoardData,
          "column-1": { id: "column-1", title: "Nova coluna", taskIds: [] },
        },
        columnOrder: [...boardData.columnOrder, "column-1"],
      });
    } else {
      setBoardData({
        tasks: {},
        columns: {
          "column-1": { id: "column-1", title: "Nova coluna", taskIds: [] },
        },
        columnOrder: ["column-1"],
      });
    }
  }, [boardData]);

  useEffect(() => {
    const getBoardDataLocalStorage: any = localStorage.getItem("boardData");

    if (getBoardDataLocalStorage) {
      setBoardData(JSON.parse(getBoardDataLocalStorage));
    } else {
      //setBoardData();
    }
  }, []);

  return (
    <>
      <div className="test-section">
        <div className="board-actions">
          <button
            type="button"
            className="btn-add-column"
            onClick={createNewColumn}
          >
            <IoAddSharp className="icon" />
            Adicionar nova coluna
          </button>
        </div>

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
                {boardData ? (
                  boardData?.columnOrder.map((columnId: any, index: any) => {
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
                        boardData={boardData}
                        setBoardData={setBoardData}
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
      </div>

      {/* <div className={`modal ${modalIsOpen ? "show" : "hidden"}`}>
        <div className="modal-content">
          <div className="modal-dialog">
            <div className="modal-body">
              <textarea
                name=""
                id=""
                className="editable-textarea"
                value={valueTextArea}
                onChange={(e) => setValueTextArea(e.target.value)}
              ></textarea>

              <IoClose
                className="icon-close"
                onClick={() => setModalIsOpen(!modalIsOpen)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn-add-column">Adicionar coluna</button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

const Column = ({ column, tasks, index, boardData, setBoardData }: any) => {
  const [isClicked, setIsClicked] = useState<any>(false);
  const [titleOfColumn, setTitleOfColumn] = useState<string>();

  const handleSaveName = useCallback(() => {
    let newName = titleOfColumn?.replace(" ", "-").toLowerCase();
    let teste = { newName: { id: newName, title: titleOfColumn, taskIds: [] } };

    const objectData = {
      tasks: {},
      columns: {
        ...setBoardData,
        newName: { id: newName, title: titleOfColumn, taskIds: [] },
      },
      columnOrder: [...boardData.columnOrder, newName],
    };

    console.log(objectData);
  }, [titleOfColumn]);

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
              {column.title === "Nova coluna" ? (
                <>
                  <textarea
                    className="board-editable-area"
                    onChange={(e) => setTitleOfColumn(e.target.value)}
                    defaultValue={column.title}
                    value={titleOfColumn}
                    onClick={() => setIsClicked(!setIsClicked)}
                    cols={30}
                    rows={1}
                  ></textarea>
                  <button
                    type="button"
                    onClick={handleSaveName}
                    className="btn-save-name"
                  >
                    Salvar
                  </button>
                </>
              ) : (
                column.title
              )}
            </div>
            <Droppable droppableId={column.id} type="task">
              {(provided) => (
                <div
                  className="tasklist"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks ? (
                    tasks.map((task: any, index: any) => (
                      <Task key={task.id} index={index} task={task} />
                    ))
                  ) : (
                    <></>
                  )}
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

