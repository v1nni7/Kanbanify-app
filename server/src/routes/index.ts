import { Router } from "express";
import userRouter from "./userRouter";
import boardRouter from "./boardRouter";
import uploadRouter from "./uploadRouter";

const router = Router();

router.use("/user", userRouter);
router.use("/boards", boardRouter);
router.use("/upload", uploadRouter);

export default router;
