"use client";

import { useContext, useEffect} from "react";
import { useForm } from "react-hook-form";
import useUpdateBoard from "@/hooks/useUpdateBoard";
import { BoardContext } from "@/context/BoardContext";
import { getBoardContentRequest } from "@/services/board";
import BoardContent from "@/components/Board/DragDropContext";

export type TypeData = {
  tasks: any;
  columns: any;
  columnOrder: Array<string>;
};

export default function Board({ params }: { params: { boardUrl: string } }) {
  const { onSubmitBoard } = useUpdateBoard();
  const { board, setBoard } = useContext(BoardContext);
  const { handleSubmit, register, resetField } = useForm();

  const onSubmit = async ({ title }: any) => {
    try {
      await onSubmitBoard({ title, type: "column" });
    } catch (error) {
      console.log(error);
    } finally {
      resetField("title");
    }
  };

  const loadingBoard = async () => {
    try {
      if (!board.isLoading) return;

      const response = await getBoardContentRequest(params.boardUrl);

      if (response.status === 200) {
        setBoard({ ...response.data.content, isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadingBoard();
    console.clear();
  }, []);

  return (
    <>
      <section className="relative flex h-[calc(100%-84px)] items-center">
        <aside className="h-full bg-slate-700 p-4">
          <ul className="flex flex-col">
            <li></li>
          </ul>
        </aside>

        <div className="h-full p-4">
          <BoardContent />
        </div>
      </section>
    </>
  );
}
