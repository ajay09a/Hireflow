import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  employmentType: "full-time" | "part-time" | "internship" | "contract";
  salary?: string;
  skills: string[];
  recruiter: mongoose.Types.ObjectId;
  status: "open" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      required: true,
    },
    salary: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job;