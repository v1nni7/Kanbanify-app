import Task from './Task'

export default function InnerListTask({ tasks, index }: any) {
  return tasks.map((task: any, index: number) => (
    <Task key={task.id} task={task} index={index} />
  ))
}
