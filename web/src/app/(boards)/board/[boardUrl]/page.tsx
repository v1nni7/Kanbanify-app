import Kanban from '@/components/Kanban'

export default function kanban({ params }: { params: { boardUrl: string } }) {
  return (
    <>
      <section className="relative h-full w-full overflow-hidden bg-neutral-600/20 p-4">
        <Kanban boardURL={params.boardUrl} />
      </section>
    </>
  )
}
