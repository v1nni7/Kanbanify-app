"use client";

import Kanban from "@/components/Kanban/ContainerKanban";

export default function kanban({ params }: { params: { boardUrl: string } }) {
  return (
    <>
      <section className="h-full w-full overflow-hidden bg-neutral-600/20 p-4 relative">
        <Kanban boardURL={params.boardUrl} />
      </section>
    </>
  );
}
