import { Router } from "express";
import userController from "../controllers/user";

const router = Router();

router.get("/:id", userController.getUser);
router.delete("/delete/:id", userController.deleteUser);

export default router;
