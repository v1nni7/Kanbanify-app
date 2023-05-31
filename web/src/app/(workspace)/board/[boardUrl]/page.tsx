"use client";

import { useCallback, useContext, useEffect } from "react";
import { KanbanContext } from "@/context/KanbanContext";
import { getBoardContentRequest } from "@/services/board";
import Kanban from "@/components/Kanban";

export default function kanban({ params }: { params: { boardUrl: string } }) {
  const { kanban, setKanban, handleDragEnd } = useContext(KanbanContext);

  const loadingBoard = useCallback(async () => {
    try {
      if (kanban.columnOrder.length > 0) {
        return;
      }

      const response = await getBoardContentRequest(params.boardUrl);

      if (response.status !== 200) {
        return;
      }

      setKanban(response.data.content);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadingBoard();
  }, [loadingBoard]);

  return (
    <>
      <section className="h-full w-full overflow-hidden bg-neutral-600/20 p-4">
        <Kanban />
      </section>
    </>
  );
}
