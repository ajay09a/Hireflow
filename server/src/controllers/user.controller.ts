import { Request, Response } from "express";

export const getMyProfile = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      userId: req.user?.userId,
      role: req.user?.role,
    },
  });
};