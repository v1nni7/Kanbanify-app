import Column from './Column'

export default function InnerListColumn({
  column,
  taskMap,
  index,
  boardURL,
}: any) {
  const tasks = column.taskIds.map((taskId: string) => taskMap[taskId])

  return (
    <Column column={column} boardURL={boardURL} tasks={tasks} index={index} />
  )
}
