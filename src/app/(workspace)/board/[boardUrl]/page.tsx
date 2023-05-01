

export default function Board({ params }: { params: { boardUrl: string } }) {
  return (
    <>
      <section className="flex h-[calc(100%-84px)] items-center relative">
        <aside className="h-full bg-slate-700 p-4">
          <ul className="flex flex-col">
            <li></li>
          </ul>
        </aside>
        <div className="">

        </div>
      </section>
    </>
  );
}
