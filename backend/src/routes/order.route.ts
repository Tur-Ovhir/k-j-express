import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
} from "../controllers";
import { authMiddleware, requireRole } from "../middleware";

const orderRouter = Router();

orderRouter
  .get("/", authMiddleware, requireRole, getAllOrders)
  .get("/user", authMiddleware, getOrders)
  .get("/details/:orderId", getOrderById)
  .post("/", authMiddleware, createOrder)
  .put("/:orderId", authMiddleware, updateOrderStatus)
  .delete("/:orderId", authMiddleware, deleteOrder);

export default orderRouter;
