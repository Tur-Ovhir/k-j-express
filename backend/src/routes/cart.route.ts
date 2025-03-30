import { Router } from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers";
import { authMiddleware } from "../middleware";

const cartRouter = Router();

cartRouter
  .get("/", authMiddleware, getCart)
  .post("/", authMiddleware, addToCart)
  .put("/:id", authMiddleware, updateCartItem)
  .delete("/:id", authMiddleware, removeCartItem)
  .delete("/clear", authMiddleware, clearCart);

export default cartRouter;
