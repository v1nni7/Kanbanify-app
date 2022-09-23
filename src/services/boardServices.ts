import axios from "axios";
import cryptoRandomString from "crypto-random-string";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("token") as string
    )}`,
  },
});

const getBoards = () => {
  return api.get("/boards");
};

const createBoard = (body: any) => {
  const stringId = cryptoRandomString({ length: 16, type: "url-safe" });
  return api.post("/boards", { ...body, stringId });
};

const createColumn = (body: any) => {
  const stringId = cryptoRandomString({ length: 10, type: "url-safe" });
  return api.post("/boards/columns", { ...body, stringId });
};

export default { getBoards, createBoard, createColumn };
