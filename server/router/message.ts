import { Router } from "express";
import messageController from "../controllers/message";
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get("/getAll", authMiddleware, messageController.getAllMessages);
router.post("/", authMiddleware, messageController.postMessage);
router.delete("/testMessages", messageController.deleteTestMessages)

export default router;
