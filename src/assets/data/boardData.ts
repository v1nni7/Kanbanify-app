export type TypeData = {
  tasks: any;
  columns: any;
  columnOrder: Array<string>;
};

const initialData: TypeData = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Página de Login",
      totalCheckbox: 6,
      completedCheckbox: 2,
    },
    "task-2": {
      id: "task-2",
      title: "Página de cadastro",
      totalCheckbox: 10,
      completedCheckbox: 4,
    },
    "task-3": {
      id: "task-3",
      title: "Área de trabalho",
      totalCheckbox: 5,
      completedCheckbox: 1,
    },
    "task-4": {
      id: "task-4",
      title: "Barra de navegação",
      totalCheckbox: 8,
      completedCheckbox: 3,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Em progresso",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "Em progresso 2",
      taskIds: ["task-3", "task-4"],
    },
  },
  columnOrder: ["column-1", "column-2"],
};

export default initialData;
