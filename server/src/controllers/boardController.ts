import { Request, Response } from "express";
import boardServices from "@/services/boardServices";

async function createBoard(req: Request, res: Response) {
  try {
    const { body } = req;
    const { userId } = res.locals;

    const newBoard = await boardServices.createBoard({ ...body, userId });

    res.status(201).json({ ...newBoard });
  } catch (error) {
    console.log(error);
  }
}

async function getBoards(req: Request, res: Response) {
  try {
    const { userId } = res.locals;

    const boards = await boardServices.getBoardsByUserId(userId);

    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
  }
}

async function getBoardContent(req: Request, res: Response) {
  try {
    const { boardURL } = req.params;

    const board = await boardServices.getBoardByURL(boardURL);

    res.status(200).json(board);
  } catch (error) {
    console.log(error);
  }
}

async function createColumn(req: Request, res: Response) {
  try {
    const { body } = req;
    const { boardURL } = req.params;

    const column = await boardServices.createColumn(body, boardURL);

    res.status(201).json(column);
  } catch (error) {
    console.log(error);
  }
}

async function createTask(req: Request, res: Response) {
  try {
    const { body } = req;
    const { columnId } = req.query;
    const { boardURL } = req.params;

    const task = await boardServices.createTask(body, boardURL, columnId);

    res.status(201).json(task);
  } catch (error) {
    console.log(error);
  }
}

export default {
  createBoard,
  getBoards,
  getBoardContent,
  createColumn,
  createTask,
};
