import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
} from "../controllers";
import { requireRole } from "../middleware";

const productRouter = Router();

productRouter
  .get("/", getAllProducts)
  .get("/:id", getProductById)
  .get("/category/:categoryId", getProductsByCategory)
  .post("/", requireRole, createProduct)
  .put("/:id", requireRole, updateProduct)
  .delete("/:id", requireRole, deleteProduct);

export default productRouter;
