import { boards } from "@/config/mongo";

function findBoardByName(name: string) {
  return boards.findOne({ name });
}

function createKanbanBoard(body: any, userId: number) {
  return boards.insertOne({ ...body, userId, content: null });
}

function getKanbanBoards(userId: number) {
  return boards.find({ userId }).toArray();
}

export default { findBoardByName, createKanbanBoard, getKanbanBoards };
