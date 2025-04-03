import { RequestHandler, Response } from "express";
import db from "../database";
import { carts, cartItems, products } from "../database/schema";
import { eq, and } from "drizzle-orm";
import { CustomRequest } from "../utils/customHandler";

export const getCart = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = req.user?.userId;

    const [userCart] = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, userId));

    const cart = await db
      .select({
        id: cartItems.id,
        cartId: cartItems.cartId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        name: products.name,
        price: products.price,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, userCart.id));

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const addToCart = async (req: CustomRequest, res: Response) => {
  const { productId, quantity } = req.body;

  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user?.userId;

    let userCart = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, userId));

    if (!userCart.length) {
      const newCart = await db.insert(carts).values({ userId }).returning();
      userCart = newCart;
    }

    const cartId = userCart[0].id;

    // Check if item exists in cart
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(
        and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId))
      );

    if (existingItem.length) {
      // Update quantity if item exists
      await db
        .update(cartItems)
        .set({ quantity: existingItem[0].quantity + quantity })
        .where(eq(cartItems.id, existingItem[0].id));
    } else {
      // Insert new item
      await db.insert(cartItems).values({ cartId, productId, quantity });
    }

    res.status(201).json({ message: "Item added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateCartItem: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedItem = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, parseInt(id)))
      .returning();

    if (!updatedItem.length) {
      res.status(404).json({ message: "Cart item not found" });
      return;
    }

    res.status(200).json(updatedItem[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const removeCartItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await db
      .delete(cartItems)
      .where(eq(cartItems.id, parseInt(id)))
      .returning();

    if (!deletedItem.length) {
      res.status(404).json({ message: "Cart item not found" });
      return;
    }

    res.status(204).send("Successfully! remove item from cart");
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const clearCart = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user?.userId;

    const userCart = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, userId));

    if (!userCart.length) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    await db.delete(cartItems).where(eq(cartItems.cartId, userCart[0].id));

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
