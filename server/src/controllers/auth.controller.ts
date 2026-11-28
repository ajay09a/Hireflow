import { Request, Response, NextFunction } from "express";
import { registerService } from "../services/auth.service.js";
import { registerSchema } from "../validations/auth.validation.js";
import { loginService } from "../services/auth.service.js";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = registerSchema.safeParse(req.body);

    if (!validatedData.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validatedData.error.issues,
      });
      return;
    }

    const user = await registerService(validatedData.data);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await loginService(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};