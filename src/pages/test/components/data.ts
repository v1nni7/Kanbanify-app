export const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Tarefa 01",
      totalCheckbox: 6,
      completedCheckbox: 6,
    },
    "task-2": {
      id: "task-2",
      content: "Tarefa 02",
      totalCheckbox: 6,
      completedCheckbox: 2,
    },
    "task-3": {
      id: "task-3",
      content: "Tarefa 03",
      isAction: false,
      column: "column-1",
      totalCheckbox: 6,
      completedCheckbox: 2,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Em progresso",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "Concluido",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Finalizado",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};
