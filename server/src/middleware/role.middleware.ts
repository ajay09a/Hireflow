import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

const restrictTo = (...roles: ("candidate" | "recruiter")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }

    next();
  };
};

export default restrictTo;