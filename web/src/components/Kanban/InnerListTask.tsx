import Task from './Task'

export default function InnerListTask({ tasks, index, boardURL }: any) {
  return tasks.map((task: any, index: number) => (
    <Task key={task.id} task={task} index={index} boardURL={boardURL} />
  ))
}
