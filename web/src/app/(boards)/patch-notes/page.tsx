export default function PathNotes() {
  return (
    <main className="h-full w-full bg-neutral-600/20 px-8 py-4">
      <div className="mb-6">
        <h1 className="text-2xl">Notas de Atualização</h1>

        <p className="text-md text-neutral-400">
          Aqui você pode ver as notas de atualização do Kanbanify.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl leading-tight">v0.1.0</h2>

          <ul className="list-disc pl-10 leading-relaxed">
            <li>Adicionado página de notas de atualização</li>
            <li>Adicionado página de feedback</li>
            <li>Adicionado a possbilidade de criar tarefas e tarefas</li>
            <li>Adicionado a possbilidade de mover os cards dos quadros</li>
            <li>Adicionado a possbilidade de criar quadros</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
