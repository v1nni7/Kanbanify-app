import { BoardContext } from "@/context/BoardContext";
import { customAlphabet } from "nanoid";
import { useCallback, useContext } from "react";

type OnSubmitBoardProps = {
  title: string;
  type: string;
  columnId?: string;
}

export default function useUpdateBoard() {
  const nanoId = customAlphabet("1234567890abcdef", 12);
  const { board, setBoard, updateBoard } = useContext(BoardContext);

  const onSubmitBoard = useCallback(
    async ({ title, type, columnId }: OnSubmitBoardProps) => {
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

      if (type === "task" && columnId) {
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
