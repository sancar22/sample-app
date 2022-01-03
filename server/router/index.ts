import { Router } from "express";
import userRouter from "./user";
import messageRouter from './message';
import authRouter from "./auth";


const rootRouter = Router();

rootRouter.use("/api/user", userRouter);
rootRouter.use("/api/message", messageRouter);
rootRouter.use("/api/auth", authRouter);

export default rootRouter;
