import { Router } from "express";
import userController from "../controllers/user";
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get("/getInfo", authMiddleware, userController.getUser);

export default router;
