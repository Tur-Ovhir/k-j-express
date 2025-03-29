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
  .get("/", requireRole, getAllOrders)
  .get("/user", authMiddleware, getOrders)
  .get("/details/:orderId", getOrderById)
  .post("/", authMiddleware, createOrder)
  .put("/:orderId", updateOrderStatus)
  .delete("/:orderId", deleteOrder);

export default orderRouter;
