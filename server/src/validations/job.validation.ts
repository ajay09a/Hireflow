import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().trim().min(1, "Job title is required"),
  description: z.string().trim().min(1, "Description is required"),
  company: z.string().trim().min(1, "Company is required"),
  location: z.string().trim().min(1, "Location is required"),
  employmentType: z.enum([
    "full-time",
    "part-time",
    "internship",
    "contract",
  ]),
  salary: z.string().optional(),
  skills: z.array(z.string()).optional(),
});