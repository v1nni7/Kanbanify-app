import { randomUUID } from "node:crypto";
import boardRepository, { Board } from "@/repositories/boardRepository";

type Body = {
  name: string;
  userId: number;
  background: string;
};

async function createBoard(body: Body) {
  const newBoard = createBoardData({ ...body });

  boardRepository.createBoard(newBoard);

  return newBoard;
}

function createBoardData({ name, userId, background }: Body) {
  const newBoardData = {
    url: randomUUID(),
    name,
    userId,
    background,
    content: {
      tasks: {},
      columns: {},
      columnOrder: [],
    },
  };

  return newBoardData;
}

async function getBoardsByUserId(userId: number) {
  return boardRepository.findBoardByUserId(userId);
}

async function getBoardByURL(boardURL: string) {
  return await boardRepository.findBoardByURL(boardURL);
}

async function createColumn(body, boardURL: string) {
  const isBoardAlreadyCreated = await boardRepository.findBoardByURL(boardURL);

  if (!isBoardAlreadyCreated) {
    throw new Error("Board not found");
  }

  const columnId = randomUUID();

  const { content } = isBoardAlreadyCreated;

  const newContent = {
    ...content,
    columns: {
      ...content.columns,
      [columnId]: {
        id: columnId,
        title: body.title,
        taskIds: [],
      },
    },
    columnOrder: [...content.columnOrder, columnId],
  };

  await boardRepository.createColumnInBoard(newContent, boardURL);

  return newContent.columns[columnId];
}

async function createTask(body, boardURL: string, columnId: any) {
  const isBoardAlreadyCreated = await boardRepository.findBoardByURL(boardURL);

  if (!isBoardAlreadyCreated) {
    throw new Error("Board not found");
  }

  const taskId = randomUUID();

  const { content } = isBoardAlreadyCreated;

  const newContent = {
    ...content,
    tasks: {
      ...content.tasks,
      [taskId]: {
        id: taskId,
        title: body.title,
      },
    },
    columns: {
      ...content.columns,
      [columnId]: {
        ...content.columns[columnId],
        taskIds: [...content.columns[columnId].taskIds, taskId],
      },
    },
  };

  await boardRepository.createTaskInColumn(newContent, boardURL);

  return newContent.tasks[taskId];
}

async function updateBoard(content, boardURL: string) {
  const isBoardAlreadyCreated = await boardRepository.findBoardByURL(boardURL);

  if (!isBoardAlreadyCreated) {
    throw new Error("Board not found");
  }

  await boardRepository.updateBoard(content, boardURL);
}

async function updateTaskOrder(body, boardURL) {
  await boardRepository.updateTaskOrder(body, boardURL);

  return;
}

async function updateColumnOrder(newColumnOrder, boardURL) {
  await boardRepository.updateColumnOrder(newColumnOrder, boardURL);

  return;
}

async function updateTaskToNewColumn(content, boardURL) {
  await boardRepository.updateTaskToNewColumn(content, boardURL);

  return;
}

export default {
  createBoard,
  getBoardsByUserId,
  getBoardByURL,
  createColumn,
  createTask,
  updateBoard,
  updateTaskOrder,
  updateColumnOrder,
  updateTaskToNewColumn,
};
