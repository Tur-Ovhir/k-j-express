import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers";

const categoryRouter = Router();

categoryRouter
  .post("/", createCategory)
  .get("/", getAllCategories)
  .get("/:id", getCategoryById);

export default categoryRouter;
