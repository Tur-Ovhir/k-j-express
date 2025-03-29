import { RequestHandler } from "express";
import db from "../database";
import { categories } from "../database/schema";
import { eq } from "drizzle-orm";

export const createCategory: RequestHandler = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = await db
      .insert(categories)
      .values({ name, description })
      .returning();

    res.status(201).json(newCategory[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await db
      .update(categories)
      .set({ name, description })
      .where(eq(categories.id, parseInt(id)));

    if (!updatedCategory.rowCount) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await db
      .delete(categories)
      .where(eq(categories.id, parseInt(id)));

    if (!deletedCategory.rowCount) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getCategoryById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, parseInt(id)));

    if (!category.length) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllCategories: RequestHandler = async (_req, res) => {
  try {
    const categoriesList = await db.select().from(categories);

    res.status(200).json(categoriesList);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
