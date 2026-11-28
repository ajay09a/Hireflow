import { Request, Response, NextFunction } from "express";
import { createJobService, getAllJobsService, getJobByIdService, updateJobService, deleteJobService } from "../services/job.service.js";
import { createJobSchema } from "../validations/job.validation.js";
import AppError from "../utils/AppError.js";

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

export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jobs = await getAllJobsService();

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
    throw new AppError("Invalid job ID", 400);
    }

    const job = await getJobByIdService(id);

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError("Invalid job ID", 400);
    }

    const recruiterId = req.user?.userId;

    if (!recruiterId) {
      throw new AppError("Authentication required", 401);
    }

    const job = await updateJobService(id, recruiterId, req.body);

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError("Invalid job ID", 400);
    }

    const recruiterId = req.user?.userId;

    if (!recruiterId) {
      throw new AppError("Authentication required", 401);
    }

    await deleteJobService(id, recruiterId);

    res.status(200).json({
      success: true,
      message: "Job closed successfully",
    });
  } catch (error) {
    next(error);
  }
};