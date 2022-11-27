interface IBoard {
  tasks: IBoardTask;
  columns: IBoardColumn;
  columnOrder: string[];
}

interface IBoardTask {
  [key: string]: {
    id: string;
    title: string;
    totalCheckbox: number;
    completedCheckbox: number;
    display: {
      date: string;
      time: string;
      description: string;
      tags: { id: string; name: string; color: string; priority: number }[];
    };
  };
}

interface IBoardColumn {
  [key: string]: {
    id: string;
    title: string;
    taskIds: string[];
  };
}

interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

interface ITask {
  id: string;
  title: string;
  totalCheckbox: number;
  completedCheckbox: number;
  display: {
    date: string;
    time: string;
    description: string;
    tags: { id: string; name: string; color: string; priority: number }[];
  };
}

interface IColumnProps {
  column: IColumn;
  tasks: ITask[];
  index: number;
  board: IBoard;
  setBoard: Function;
}

export type { IBoard, IColumnProps };
