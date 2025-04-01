import { RequestHandler, Response } from "express";
import db from "../database";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../utils/customHandler";

export const loginUser: RequestHandler = async (req, res) => {
  const { name, password } = req.body;

  const secret = process.env.JWT_SECRET || "secret";

  try {
    if (!name || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const [findUser] = await db
      .select()
      .from(users)
      .where(eq(users.name, name))
      .limit(1);

    if (!findUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const [newUser] = await db
        .insert(users)
        .values({
          name,
          password: hashedPassword,
          role: "user",
        })
        .returning();

      const token = jwt.sign(
        { userId: newUser.id, name: newUser.name, role: newUser.role },
        secret
      );

      res.status(201).json({
        message: "User created and logged in",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          role: newUser.role,
        },
      });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: findUser.id, name: findUser.name, role: findUser.role },
      secret
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: findUser.id,
        name: findUser.name,
        role: findUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const usersList = await db.select().from(users);

    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getMe = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.user.userId))
      .limit(1);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
