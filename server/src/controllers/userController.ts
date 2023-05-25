import { Request, Response } from "express";
import userServices from "@/services/userServices";

async function getUser(req: Request, res: Response) {
  try {
    const { userId } = res.locals;

    const user = await userServices.getUser(Number(userId));

    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function signUp(req: Request, res: Response) {
  try {
    const { body } = req;

    await userServices.signUp(body);

    res.sendStatus(201);
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const { body } = req;

    const { token, user } = await userServices.signIn(body);

    res.status(200).json({ token, ...user });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

export default { signUp, signIn, getUser };
