import axios from "axios";
import cryptoRandomString from "crypto-random-string";

interface SignUpDataTypes {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

interface SignInTypes {
  email: string;
  password: string;
  stayConnected: boolean;
}

interface HeadersTypes {
  headers: {
    Authorization: string;
  };
}

interface BoardTypes {
  id: number;
  name: string;
  background: string;
}

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("token") as string
    )}`,
  },
});

const getBoards = async (headers: HeadersTypes) => {
  const promise = await api.get(`/workspaces`, headers);
  return promise;
};

const getBoard = async (stringId: any) => {
  const promise = await api.get(`/board/${stringId}`);
  return promise;
};

const createNewBoard = async (body: BoardTypes) => {
  const stringId = cryptoRandomString({ length: 16, type: "url-safe" });
  return await api.post("/boards", { ...body, stringId });
};

const createColumn = async (
  columnData: any,
  stringId: any,
  order: number = 0
) => {
  const promise = await api.post("/workspaces/create/column", {
    ...columnData,
    order,
    boardId: stringId,
  });
  return promise;
};

const createTask = async (
  taskData: any,
  stringId: any,
  columnId: any,
  order: number = 0
) => {
  const promise = await api.post("/workspaces/create/task", {
    ...taskData,
    order,
    boardId: stringId,
    columnId: columnId,
  });
  return promise;
};

export {
  getBoards,
  getBoard,
  createNewBoard,
  createColumn,
  createTask,
};
