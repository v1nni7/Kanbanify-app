import { useContext } from "react";
import { useRouter } from "next/navigation";
import { BoardContext } from "@/context/BoardContext";

interface BoardCardProps extends React.HTMLAttributes<HTMLLIElement> {
  board: any;
}

export default function BoardCard({ board }: BoardCardProps) {
  const router = useRouter();
  const { setBoard } = useContext(BoardContext);

  const loadingBoard = async () => {
    try {
      setBoard({ ...board.content, isLoading: false, url: board.url });
      router.push(`/board/${board.url}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="relative mr-4 flex h-32 w-64 items-center justify-center overflow-hidden rounded-md transition hover:cursor-pointer hover:shadow-lg">
      <button onClick={() => loadingBoard()} className="relative h-full w-full">
        <img src={board.background} alt="" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-neutral-900/80 to-neutral-600/20"></div>

        <span className="absolute bottom-0 left-0 z-30 block p-4 text-xl text-slate-50">
          {board.name}
        </span>
      </button>
    </li>
  );
}
