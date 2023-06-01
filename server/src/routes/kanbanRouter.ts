import kanbanController from "@/controllers/kanbanController";
import validateTokenMiddleware from "@/middlewares/validateTokenMiddleware";
import { Router } from "express";

const kanbanRouter = Router();

kanbanRouter.post(
  "/",
  validateTokenMiddleware,
  kanbanController.createKanbanBoard
);

export default kanbanRouter;
