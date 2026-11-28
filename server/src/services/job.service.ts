import Job from "../models/job.model.js";
import mongoose from "mongoose";

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