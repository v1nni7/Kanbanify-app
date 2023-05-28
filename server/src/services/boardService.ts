import { randomUUID } from "node:crypto";
import { extname, resolve } from "node:path";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import boardRepository from "@/repositories/boardRepository";
import { notFoundError } from "@/utils/errorUtils";

const pump = promisify(pipeline);

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

async function uploadImage({ media: upload }: any) {
  console.log('Dasdadad')
  if (!upload) {
    throw new Error("No image provided");
  }

  const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/;
  const isValidFileFormat = mimeTypeRegex.test(upload.mimetype);

  if (!isValidFileFormat) {
    throw new Error("Invalid file format");
  }

  const fileId = randomUUID();
  const extension = extname(upload.name);

  const filename = fileId.concat(extension);

  upload.mv("./src/uploads/" + filename);

  // ! Change this to the get automatically the url
  const url = `http://localhost:5000/uploads/${filename}`;

  return url;
}

export default {
  createBoard,
  getUserBoards,
  getBoard,
  updateBoard,
  uploadImage,
};
