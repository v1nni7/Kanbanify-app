"use client";

import { useEffect, useState } from "react";
import { getBoardsRequest } from "@/services/board";
import useToggleClickOutside from "@/hooks/useToggleClickOutside";
import useToggle from "@/hooks/useToggle";
import BoardCard from "../(components)/BoardCard";
import FormCreateBoard from "../(components)/Form";
import { ThreeCircles } from "react-loader-spinner";

export default function Boards() {
  const [isLoading, toggleLoading] = useToggle(false);
  const [boards, setBoards] = useState<any>([]);
  const [dropdownOpen, toggle, elementRef, buttonRef] =
    useToggleClickOutside(false);

  const loadingBoards = async () => {
    try {
      toggleLoading();
      const response = await getBoardsRequest();

      if (response.status === 200) setBoards(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoading();
    }
  };

  useEffect(() => {
    loadingBoards();
  }, []);

  return (
    <>
      <section className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-slate-200 font-bold text-2xl mb-4">
            Your boards
          </h1>

          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => toggle()}
              className="border-2 border-slate-500 text-slate-200 rounded-md bg-slate-500 hover:border-slate-400 hover:bg-slate-700 transition py-2 px-6"
            >
              Create
            </button>

            <div
              ref={elementRef}
              className={dropdownOpen ? "visible" : "hidden"}
            >
              <FormCreateBoard boards={boards} setBoards={setBoards} />
            </div>
          </div>
        </div>

        <ul className="flex flex-row items-center">
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <ThreeCircles color="#ffffff" />
            </div>
          ) : (
            boards.map((board: any, index: number) => (
              <BoardCard key={index} board={board} />
            ))
          )}
        </ul>
      </section>
    </>
  );
}
