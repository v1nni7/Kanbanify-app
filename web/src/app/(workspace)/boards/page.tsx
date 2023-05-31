"use client";

import { useContext, useLayoutEffect, useState } from "react";
import { getBoardsRequest } from "@/services/board";
import NewBoardForm from "@/components/NewBoardForm";
import { BoardContext } from "@/context/BoardContext";
import { useRouter } from "next/navigation";

export default function Boards() {
  const router = useRouter();
  const { setBoard } = useContext(BoardContext);
  const [boards, setBoards] = useState<any | null>(null);

  const loadingBoards = async () => {
    try {
      const response = await getBoardsRequest();

      if (response.status !== 200) {
        return;
      }

      setBoards(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const goToBoardPage = async ({ content, url }: any) => {
    try {
      setBoard(content);
      router.push(`/board/${url}`);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    loadingBoards();
  }, []);

  return (
    <>
      <section className="p-4">
        <div className="h-full w-full rounded-lg bg-neutral-700/20">
          <div className="grid grid-cols-4 gap-4 p-4">
            <NewBoardForm setBoards={setBoards} />

            {boards
              ? boards.map((board: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => goToBoardPage(board)}
                    className="group relative h-44 cursor-pointer overflow-hidden rounded-lg transition hover:shadow-lg"
                  >
                    <img
                      src={board.background}
                      className="h-full object-cover transition group-hover:scale-125 group-hover:transform"
                    />

                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-neutral-950/95 to-neutral-700/20 p-4">
                      <h2 className="font-alt text-lg font-semibold text-neutral-400/80 group-hover:text-neutral-300/80">
                        {board.name}
                      </h2>
                    </div>
                  </div>
                ))
              : "Carregando..."}
          </div>
        </div>
      </section>
    </>
  );
}
