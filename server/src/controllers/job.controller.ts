import { Request, Response, NextFunction } from "express";
import { createJobService } from "../services/job.service.js";
import { createJobSchema } from "../validations/job.validation.js";

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const recruiterId = req.user?.userId;

    if (!recruiterId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }
    const validatedData = createJobSchema.safeParse(req.body);

    if (!validatedData.success) {
    res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validatedData.error.issues,
    });
    return;
    }

    const job = await createJobService(validatedData.data, recruiterId);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};