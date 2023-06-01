import { Router } from "express";
import userRouter from "./userRouter";
import kanbanRouter from "./kanbanRouter";

const router = Router();

router.use("/user", userRouter);
router.use("/kanban", kanbanRouter);

export default router;
