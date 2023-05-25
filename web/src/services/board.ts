import { api } from "./api";

type CreateBoardRequestData = {
  name: string;
  background: string;
  url: string;
};

export async function getBoardContentRequest(id: string) {
  return await api.get(`/board/${id}`);
}

export async function updateBoardRequest(data: any, boardURL: string) {
  return await api.put(`/board/${boardURL}`, data);
}

export async function createBoardRequest(data: CreateBoardRequestData) {
  return await api.post("/board", data);
}

export async function getBoardsRequest() {
  return await api.get("/board");
}
