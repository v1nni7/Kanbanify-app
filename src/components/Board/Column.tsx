import { useContext } from "react";
import { DroppableProvided } from "react-beautiful-dnd";
import { BoardContext } from "@/context/BoardContext";
import Draggable from "./Draggable";

interface ColumnProps extends DroppableProvided {}

export default function Column({
  droppableProps,
  innerRef,
  placeholder,
}: ColumnProps) {
  const { board } = useContext(BoardContext);

  return (
    <div className="relative flex h-full" {...droppableProps} ref={innerRef}>
      {board.columnOrder.map((columnId: string, index: number) => {
        const column = board.columns[columnId];

        return <Draggable key={column.id} column={column} index={index} />;
      })}
      {placeholder}
    </div>
  );
}
