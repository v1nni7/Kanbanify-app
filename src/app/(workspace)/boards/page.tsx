"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { customRandom, random, urlAlphabet } from "nanoid";
import useToggleClickOutside from "@/hooks/useToggleClickOutside";
import { createBoardRequest, getBoardsRequest } from "@/services/board";
import { BoardContext } from "@/context/BoardContext";

type FieldValues = {
  name: string;
  background: string;
};

export default function Boards() {
  const router = useRouter();
  /*   const { data: session } = useSession();
  console.log({ session }); */

  const { setBoard } = useContext(BoardContext);
  const [boards, setBoards] = useState<any>([]);

  const { handleSubmit, register } = useForm<FieldValues>();
  const [dropdownOpen, toggle, elementRef, buttonRef] =
    useToggleClickOutside(false);

  const loadingBoard = async (board: any) => {
    try {
      setBoard({ ...board.content, isLoading: false, url: board.url });
      router.push(`/board/${board.url}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const newUrl = customRandom(urlAlphabet, 12, random);
      const newData = { ...values, url: newUrl() };

      const response = await createBoardRequest(newData);

      if (response.status === 201) {
        setBoards([...boards, newData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadingBoards = async () => {
    try {
      const response = await getBoardsRequest();

      if (response.status === 200) setBoards(response.data);
    } catch (error) {
      console.log(error);
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

            <form
              ref={elementRef}
              onSubmit={handleSubmit(onSubmit)}
              className={`w-64 shadow-inner absolute bg-slate-600 rounded-md top-14 right-0 p-4 ${
                dropdownOpen ? "visible" : "hidden"
              }`}
            >
              <h1 className="text-slate-200 text-center mb-4">
                Create New Board
              </h1>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  {...register("name")}
                  autoComplete="off"
                  className="w-full p-2 outline-0 h-10 border-2 border-slate-500 focus:border-slate-400 text-slate-400 bg-transparent rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Background"
                  {...register("background")}
                  autoComplete="off"
                  className="w-full p-2 outline-0 h-10 border-2 border-slate-500 focus:border-slate-400 text-slate-400 bg-transparent rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-blue-400 hover:bg-blue-500 text-slate-50 transition p-1"
              >
                Create
              </button>
            </form>
          </div>
        </div>

        <ul className="flex flex-row items-center">
          {boards.map((board: any, index: number) => (
            <li
              key={index}
              className="w-64 h-32 mr-4 rounded-md flex items-center justify-center relative overflow-hidden hover:cursor-pointer hover:shadow-lg transition"
            >
              <button
                onClick={() => loadingBoard(board)}
                className="w-full h-full relative"
              >
                <img src={board.background} alt="" />
                <div className="z-20 inset-0 bg-gradient-to-t from-neutral-900/80 to-neutral-600/20 absolute"></div>

                <span className="block text-slate-50 text-xl z-30 bottom-0 left-0 absolute p-4">
                  {board.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}