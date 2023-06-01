import kanbanServices from "@/services/kanbanServices";
import { Request, Response } from "express";

async function createKanbanBoard(req: Request, res: Response) {
  try {
    const { body } = req;
    const { userId } = res.locals;

    const response = await kanbanServices.createKanbanBoard(body, Number(userId));

    res.status(201).json(response);
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

export default { createKanbanBoard };
