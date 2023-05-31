import Column from "./Column";

export default function InnerListColumn({ column, taskMap, index }: any) {
  const tasks = column.taskIds.map((taskId: string) => taskMap[taskId]);

  return <Column column={column} tasks={tasks} index={index} />;
}
