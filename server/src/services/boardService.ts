import boardRepository from "@/repositories/boardRepository";
import { notFoundError } from "@/utils/errorUtils";

async function createBoard(data, userId) {
  return await boardRepository.createBoard({ ...data, userId });
}

async function getUserBoards(userId) {
  return await boardRepository.getUserBoards(userId);
}

async function getBoard(boardURL) {
  return await boardRepository.getBoardByURL(boardURL);
}

async function updateBoard(data, boardURL) {
  const board = await boardRepository.getBoardByURL(boardURL);

  if (!board) {
    throw notFoundError("Board not found");
  }

  return await boardRepository.updateBoard(data, boardURL);
}

export default { createBoard, getUserBoards, getBoard, updateBoard };
