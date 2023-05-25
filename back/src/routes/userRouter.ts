import { Router } from "express";
import userController from "@/controllers/userController";
import { signInSchema, signUpSchema } from "@/schema/userSchema";
import validateTokenMiddleware from "@/middlewares/validateTokenMiddleware";
import validateSchemaMiddleware from "@/middlewares/validateSchemaMiddleware";

const userRouter = Router();

userRouter
  .get("/", validateTokenMiddleware, userController.getUser)
  .post(
    "/sign-up",
    validateSchemaMiddleware(signUpSchema),
    userController.signUp
  )
  .post(
    "/sign-in",
    validateSchemaMiddleware(signInSchema),
    userController.signIn
  );

export default userRouter;
