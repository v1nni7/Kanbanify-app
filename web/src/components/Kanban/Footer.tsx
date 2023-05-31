export default function Footer({ tasks }: any) {
  console.log(tasks);

  return (
    <div className="px-2 py-4">
      <h2 className="font-alt text-lg font-semibold text-neutral-500">
        Tarefas: <span className="bg-neutral-700 px-1 rounded-md">{tasks.length}</span>
      </h2>
    </div>
  );
}
