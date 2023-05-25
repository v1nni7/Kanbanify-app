import { Router } from "express";
import userRouter from "./userRouter";
import boardRouter from "./boardRouter";

const router = Router();

router.use("/user", userRouter);
router.use("/board", boardRouter);

export default router;
