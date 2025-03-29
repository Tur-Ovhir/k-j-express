import { RequestHandler, Response } from "express";
import db from "../database";
import {
  orders,
  orderItems,
  cartItems,
  carts,
  products,
} from "../database/schema";
import { eq } from "drizzle-orm";
import { CustomRequest } from "../utils/customHandler";

export const getAllOrders: RequestHandler = async (_req, res) => {
  try {
    const allOrders = await db.select().from(orders);

    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
// Get all orders for a user
export const getOrders = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = req.user.userId;

    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));

    res.status(200).json(userOrders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get order details by order ID
export const getOrderById: RequestHandler = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await db
      .select()
      .from(orders)
      .where(eq(orders.id, parseInt(orderId)));

    if (!order.length) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    const orderDetails = await db
      .select({
        productId: orderItems.productId,
        quantity: orderItems.quantity,
        price: orderItems.price,
      })
      .from(orderItems)
      .where(eq(orderItems.orderId, parseInt(orderId)));

    res.status(200).json({ ...order[0], items: orderDetails });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Create an order from cart
export const createOrder = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = req.user.userId;

    const userCart = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, userId));

    if (!userCart.length) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    const cartId = userCart[0].id;

    // Get cart items
    const cartItemsList = await db
      .select({
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        price: products.price, // Join products to get price
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, cartId));

    if (!cartItemsList.length) {
      res.status(400).json({ message: "No items in cart" });
      return;
    }

    // Calculate total amount
    const totalAmount = cartItemsList.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    // Create order
    const newOrder = await db
      .insert(orders)
      .values({ userId, totalAmount })
      .returning();

    const orderId = newOrder[0].id;

    // Insert order items
    const orderItemsData = cartItemsList.map((item) => ({
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    await db.insert(orderItems).values(orderItemsData);

    // Clear user's cart
    await db.delete(cartItems).where(eq(cartItems.cartId, cartId));

    res.status(201).json(newOrder[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update order status
export const updateOrderStatus: RequestHandler = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, parseInt(orderId)))
      .returning();

    if (!updatedOrder.length) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json(updatedOrder[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Delete order
export const deleteOrder: RequestHandler = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Check if order exists
    const orderExists = await db
      .select()
      .from(orders)
      .where(eq(orders.id, parseInt(orderId)));

    if (!orderExists.length) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    // Delete order items first
    await db
      .delete(orderItems)
      .where(eq(orderItems.orderId, parseInt(orderId)));

    // Delete order
    await db.delete(orders).where(eq(orders.id, parseInt(orderId)));

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
