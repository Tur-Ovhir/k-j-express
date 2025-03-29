import { Router } from "express";
import { getMe, loginUser } from "../controllers";
import { authMiddleware } from "../middleware";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.get("/me", authMiddleware, getMe);

export default userRouter;
