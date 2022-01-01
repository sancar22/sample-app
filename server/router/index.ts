import { Router } from "express";
import userRouter from "./user";
import authRouter from "./auth";

const rootRouter = Router();

rootRouter.use("/api/user", userRouter);
rootRouter.use("/api/auth", authRouter);

export default rootRouter;
