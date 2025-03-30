import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers";
import { authMiddleware } from "../middleware";

const categoryRouter = Router();

categoryRouter
  .post("/", authMiddleware, createCategory)
  .get("/", getAllCategories)
  .get("/:id", getCategoryById);

export default categoryRouter;
