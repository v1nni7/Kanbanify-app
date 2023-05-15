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
    <li className="w-64 h-32 mr-4 rounded-md flex items-center justify-center relative overflow-hidden hover:cursor-pointer hover:shadow-lg transition">
      <button onClick={() => loadingBoard()} className="w-full h-full relative">
        <img src={board.background} alt="" />
        <div className="z-20 inset-0 bg-gradient-to-t from-neutral-900/80 to-neutral-600/20 absolute"></div>

        <span className="block text-slate-50 text-xl z-30 bottom-0 left-0 absolute p-4">
          {board.name}
        </span>
      </button>
    </li>
  );
}
