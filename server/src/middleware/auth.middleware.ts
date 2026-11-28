import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

interface TokenPayload {
  userId: string;
  role: "candidate" | "recruiter";
}

const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
    throw new AppError("Authentication required", 401);
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, secret);

    if (
    typeof decoded === "string" ||
    !("userId" in decoded) ||
    !("role" in decoded)
    ) {
    throw new AppError("Invalid token payload", 401);
    }

    const payload: TokenPayload = {
    userId: String(decoded.userId),
    role: decoded.role as TokenPayload["role"],
    };

    req.user = payload;

    next();
  } catch (error) {
    next(
      error instanceof AppError
        ? error
        : new AppError("Invalid or expired token", 401)
    );
  }
};

export default protect;