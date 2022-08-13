export type TypeData = {
  tasks: any;
  columns: any;
  columnOrder: Array<string>;
};

export const initialData: TypeData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Página de Login",
      totalCheckbox: 6,
      completedCheckbox: 2,
    },
    "task-2": {
      id: "task-2",
      content: "Página de cadastro",
      totalCheckbox: 10,
      completedCheckbox: 4,
    },
    "task-3": {
      id: "task-3",
      content: "Área de trabalho",
      totalCheckbox: 5,
      completedCheckbox: 1,
    },
    "task-4": {
      id: "task-4",
      content: "Barra de navegação",
      totalCheckbox: 8,
      completedCheckbox: 3,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Em progresso",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
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
