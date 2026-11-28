import { Router } from "express";
import protect from "../middleware/auth.middleware.js";
import restrictTo from "../middleware/role.middleware.js";
import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from "../controllers/job.controller.js";

const router = Router();

router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.post("/", protect, restrictTo("recruiter"), createJob);

router.put("/:id", protect, restrictTo("recruiter"), updateJob);

router.delete("/:id", protect, restrictTo("recruiter"), deleteJob);

export default router;