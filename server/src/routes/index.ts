import { Router } from "express";
import userRouter from "./userRouter";
import kanbanRouter from "./kanbanRouter";
import uploadRouter from "./uploadRouter";

const router = Router();

router.use("/user", userRouter);
router.use("/kanban", kanbanRouter);
router.use("/upload", uploadRouter);

export default router;
