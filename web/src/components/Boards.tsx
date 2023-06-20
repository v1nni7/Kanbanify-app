import { KanbanContext } from '@/context/KanbanContext'
import { Board } from '@/types/board-data'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

interface BoardCardProps {
  board: Board
  index: number
}

export default function BoardCard({ board, index }: BoardCardProps) {
  const { name, background, url } = board

  const router = useRouter()
  const { setKanban } = useContext(KanbanContext)

  const navigateToPage = () => {
    setKanban(board)
    router.push(`/board/${url}`)
  }

  return (
    <button
      key={index}
      onClick={() => navigateToPage()}
      className="relative h-44 w-72 cursor-pointer overflow-hidden rounded-lg bg-cover transition hover:scale-105 hover:shadow-lg focus:scale-105"
    >
      {background && (
        <Image
          width={300}
          height={180}
          src={background}
          className="absolute left-0 top-0 z-10 h-full w-full"
          alt=""
        />
      )}

      <div className="absolute inset-0 z-20 flex items-end bg-gradient-to-t from-neutral-950/95 to-neutral-700/20 p-4">
        <h2 className="font-alt text-lg font-semibold text-neutral-400/80 group-hover:text-neutral-300/80">
          {name}
        </h2>
      </div>
    </button>
  )
}
