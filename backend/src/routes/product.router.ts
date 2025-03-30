import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
} from "../controllers";
import { authMiddleware, requireRole } from "../middleware";

const productRouter = Router();

productRouter
  .get("/", getAllProducts)
  .get("/:id", getProductById)
  .get("/category/:categoryId", getProductsByCategory)
  .post("/", authMiddleware, requireRole, createProduct)
  .put("/:id", authMiddleware, requireRole, updateProduct)
  .delete("/:id", authMiddleware, requireRole, deleteProduct);

export default productRouter;
