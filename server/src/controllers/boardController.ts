import { Request, Response } from "express";
import boardService from "@/services/boardService";

async function createBoard(req: Request, res: Response) {
  try {
    const { body } = req;
    const { userId } = res.locals;

    await boardService.createBoard(body, Number(userId));

    res.sendStatus(201);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

async function getUserBoards(req: Request, res: Response) {
  try {
    const { userId } = res.locals;

    const response = await boardService.getUserBoards(Number(userId));

    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

async function getBoard(req: Request, res: Response) {
  try {
    const { userId } = res.locals;
    const { boardURL } = req.params;

    const response = await boardService.getBoard(boardURL);

    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

async function updateBoard(req: Request, res: Response) {
  try {
    const { body } = req;
    const { boardURL } = req.params;

    await boardService.updateBoard(body, boardURL);

    res.sendStatus(200);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

export default {
  createBoard,
  getUserBoards,
  getBoard,
  updateBoard,
};
