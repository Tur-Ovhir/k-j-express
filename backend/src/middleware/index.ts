import jwt from "jsonwebtoken";
import { CustomRequest } from "../utils/customHandler";
import { Response, NextFunction } from "express";

const secret = process.env.JWT_SECRET || "secret";

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret) as {
      userId: number;
      name: string;
      role: string;
    };
    (req as CustomRequest).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};

export const requireRole = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Forbidden: Access denied" });
    return;
  }
  next();
};
