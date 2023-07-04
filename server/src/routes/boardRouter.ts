import boardController from "@/controllers/boardController";
import validateTokenMiddleware from "@/middlewares/validateTokenMiddleware";
import { Router } from "express";

const boardRouter = Router();

boardRouter
  .all("/", validateTokenMiddleware)
  .post("/", boardController.createBoard)
  .get("/", boardController.getBoards)
  .put("/:boardURL", boardController.updateBoard)
  .get("/:boardURL", boardController.getBoardContent)
  .post("/column/:boardURL", boardController.createColumn)
  .post("/task/:boardURL", boardController.createTask)
  .put("/column/:boardURL", boardController.updateColumnTitle)
  .put("/taskOrder/:boardURL", boardController.updateTaskOrder)
  .put("/columnOrder/:boardURL", boardController.updateColumnOrder)
  .put("/task/column/:boardURL", boardController.updateTaskToNewColumn);

export default boardRouter;
