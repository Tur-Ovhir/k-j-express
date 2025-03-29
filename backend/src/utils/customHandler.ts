import { Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    userId: number;
    name: string;
    role: string;
  };
}
