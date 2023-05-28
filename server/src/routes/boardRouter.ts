import { Router } from "express";
import boardController from "@/controllers/boardController";
import validateTokenMiddleware from "@/middlewares/validateTokenMiddleware";

const boardRouter = Router();

boardRouter
  .post("/", validateTokenMiddleware, boardController.createBoard)
  .post("/upload", validateTokenMiddleware, boardController.uploadImage)
  .get("/", validateTokenMiddleware, boardController.getUserBoards)
  .get("/:boardURL", validateTokenMiddleware, boardController.getBoard)
  .put("/:boardURL", validateTokenMiddleware, boardController.updateBoard);

export default boardRouter;
