import { api } from "./api";

type CreateBoardRequestData = {
  name: string;
  background: string;
};

export const createBoardRequest = async (data: CreateBoardRequestData) => {
  return await api.post("/board", data);
};

export const getBoardsRequest = async () => {
  return await api.get("/board");
};