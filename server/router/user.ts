import { Router } from "express";
import userController from "../controllers/user";
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get("/getInfo", authMiddleware, userController.getUser);
router.delete("/testUser", userController.deleteTestUser);

export default router;
