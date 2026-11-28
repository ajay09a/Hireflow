import { Request, Response, NextFunction } from "express";
import { getMyProfileService } from "../services/user.service.js";
import AppError from "../utils/AppError.js";

export const getMyProfile = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new AppError("Authentication required", 401);
    }

    const user = await getMyProfileService(userId);

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};