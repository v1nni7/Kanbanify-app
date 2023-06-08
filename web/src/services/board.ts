import { api } from "./api";

export async function createBoard(body: any) {
  return await api.post("/boards", body);
}

export async function getAllBoards() {
  return await api.get("/boards");
}

export async function getBoard(boardId: string) {
  return await api.get(`/boards/${boardId}`);
}

export async function createColumn(title: any, boardURL: string) {
  return await api.post(`/boards/column/${boardURL}`, { title });
}

export async function createTask(
  title: string,
  boardURL: string,
  columnId: string
) {
  return await api.post(
    `/boards/task/${boardURL}`,
    { title },
    { params: { columnId } }
  );
}

export async function updateBoard(content: any, boardURL: string) {
  return await api.put(`/boards/${boardURL}`, content);
}

export async function uploadImage(body: any) {
  return await api.post("/upload", body);
}
