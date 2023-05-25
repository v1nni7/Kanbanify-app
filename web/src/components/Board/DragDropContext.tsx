import { useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BoardContext } from "@/context/BoardContext";
import Column from "./Column";

export default function DragDropContextComponent() {
  const { handleDragEnd } = useContext(BoardContext);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provider) => <Column {...provider} />}
      </Droppable>
    </DragDropContext>
  );
}
