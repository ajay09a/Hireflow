import Job from "../models/job.model.js";
import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

interface CreateJobInput {
  title: string;
  description: string;
  company: string;
  location: string;
  employmentType: "full-time" | "part-time" | "internship" | "contract";
  salary?: string | undefined;
  skills?: string[] | undefined;
}

export const createJobService = async (
  data: CreateJobInput,
  recruiterId: string
) => {
  const job = await Job.create({
    title: data.title,
    description: data.description,
    company: data.company,
    location: data.location,
    employmentType: data.employmentType,
    ...(data.salary !== undefined && { salary: data.salary }),
    ...(data.skills !== undefined && { skills: data.skills }),
    recruiter: new mongoose.Types.ObjectId(recruiterId),
    });

  return job;
};

export const getAllJobsService = async () => {
  const jobs = await Job.find({ status: "open" })
    .populate("recruiter", "name email")
    .sort({ createdAt: -1 });

  return jobs;
};

export const getJobByIdService = async (jobId: string) => {
  const job = await Job.findOne({
    _id: jobId,
    status: "open",
  }).populate("recruiter", "name email");

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  return job;
};

export const updateJobService = async (
  jobId: string,
  recruiterId: string,
  data: Partial<{
    title: string;
    description: string;
    company: string;
    location: string;
    employmentType: "full-time" | "part-time" | "internship" | "contract";
    salary: string;
    skills: string[];
    status: "open" | "closed";
  }>
) => {
  const job = await Job.findOneAndUpdate(
    {
      _id: jobId,
      recruiter: recruiterId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) {
    throw new AppError("Job not found or you are not authorized to update it", 404);
  }

  return job;
};

export const deleteJobService = async (
  jobId: string,
  recruiterId: string
) => {
  const job = await Job.findOneAndUpdate(
    {
      _id: jobId,
      recruiter: recruiterId,
    },
    {
      status: "closed",
    },
    {
      new: true,
    }
  );

  if (!job) {
    throw new AppError(
      "Job not found or you are not authorized to delete it",
      404
    );
  }

  return job;
};