import { RequestHandler } from "express";
import db from "../database";
import { products } from "../database/schema";
import { eq } from "drizzle-orm";

export const createProduct: RequestHandler = async (req, res) => {
  const { name, description, price, images, quantity, categoryId } = req.body;

  try {
    const newProduct = await db
      .insert(products)
      .values({
        name,
        description,
        images,
        price: parseInt(price),
        quantity: parseInt(quantity),
        categoryId: categoryId ? parseInt(categoryId) : null,
      })
      .returning();

    res.status(201).json(newProduct[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, images, quantity, categoryId } = req.body;

  try {
    const updatedProduct = await db
      .update(products)
      .set({
        name,
        description,
        images,
        price: price ? parseInt(price) : undefined,
        quantity: quantity ? parseInt(quantity) : undefined,
        categoryId: categoryId ? parseInt(categoryId) : null,
      })
      .where(eq(products.id, parseInt(id)))
      .returning();

    if (!updatedProduct.length) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(updatedProduct[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await db
      .delete(products)
      .where(eq(products.id, parseInt(id)))
      .returning();

    if (!deletedProduct.length) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(id)));

    if (!product.length) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllProducts: RequestHandler = async (_req, res) => {
  try {
    const productsList = await db.select().from(products);
    res.status(200).json(productsList);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProductsByCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const productsList = await db
      .select()
      .from(products)
      .where(eq(products.categoryId, parseInt(categoryId)));

    res.status(200).json(productsList);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
