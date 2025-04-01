import { Router } from "express";
import { getAllUsers, getMe, loginUser } from "../controllers";
import { authMiddleware, requireRole } from "../middleware";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.get("/all", authMiddleware, requireRole, getAllUsers);
userRouter.get("/me", authMiddleware, getMe);

export default userRouter;
