import { BoardContext } from "@/context/BoardContext";
import { customAlphabet } from "nanoid";
import { useCallback, useContext, useState } from "react";

export default function useUpdateBoard() {
  const nanoId = customAlphabet("1234567890abcdef", 12);
  const { board, setBoard, updateBoard } = useContext(BoardContext);

  const onSubmitBoard = useCallback(
    async ({ title, type, columnId }: any) => {
      let newState: any = {};
      const newId = nanoId();

      if (type === "column") {
        newState = {
          ...board,
          columns: {
            ...board?.columns,
            [newId]: {
              id: newId,
              title,
              taskIds: [],
            },
          },
          columnOrder: [...board.columnOrder, newId],
        };
      }

      if (type === "task") {
        newState = {
          ...board,
          tasks: {
            ...board?.tasks,
            [newId]: {
              id: newId,
              title,
              description: "",
              totalCheckbox: 0,
              completedCheckbox: 0,
            },
          },
          columns: {
            ...board?.columns,
            [columnId]: {
              ...board?.columns[columnId],
              taskIds: [...board?.columns[columnId].taskIds, newId],
            },
          },
        };
      }

      setBoard(newState);
      updateBoard(newState);
    },
    [board]
  );

  return { onSubmitBoard };
}

// ! Função para criar coluna

// const onSubmit = ({ title }: any) => {
//   const newColumnId = `column-${Math.floor(Math.random() * 1000)}`;

//   const newColumn = {
//     id: newColumnId,
//     title,
//     taskIds: [],
//   };

//   const newState = {
//     ...board,
//     columns: {
//       ...board?.columns,
//       [newColumnId]: newColumn,
//     },

//     columnOrder: [...board.columnOrder, newColumnId],
//   };

//   updateBoard(newState);
//   setBoard(newState);
//   resetField("title");
// };

// ! Função para criar tarefas

// const onSubmit = (data: any) => {
//   const newTaskId = `task-${Math.floor(Math.random() * 1000)}`;

//   const newTask = {
//     id: newTaskId,
//     title: data.title,
//     description: "",
//     totalCheckbox: 0,
//     completedCheckbox: 0,
//   };

//   const newState = {
//     ...board,
//     tasks: {
//       ...board?.tasks,
//       [newTaskId]: newTask,
//     },

//     columns: {
//       ...board?.columns,
//       [column.id]: {
//         ...column,
//         taskIds: [...column.taskIds, newTaskId],
//       },
//     },
//   };

//   updateBoard(newState);
//   setBoard(newState);
//   resetField("title");
// };
