import { ObjectId } from "mongodb";
import { boards } from "@/config/mongo";

async function createBoard(data) {
  return await boards.insertOne({
    ...data,
    content: { tasks: {}, columns: {}, columnOrder: [] },
  });
}

async function getUserBoards(userId) {
  return await boards.find({ userId }).toArray();
}

async function getBoardByURL(boardURL) {
  return await boards.findOne({ url: boardURL });
}

async function updateBoard(data, boardURL) {
  return await boards.updateOne({ url: boardURL }, { $set: { content: data } });
}

export default {
  createBoard,
  getUserBoards,
  getBoardByURL,
  updateBoard,
};
