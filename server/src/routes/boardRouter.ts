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
  .post("/task/:boardURL", boardController.createTask);

export default boardRouter;
