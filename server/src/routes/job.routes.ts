import { Router } from "express";
import protect from "../middleware/auth.middleware.js";
import restrictTo from "../middleware/role.middleware.js";
import { createJob } from "../controllers/job.controller.js";

const router = Router();

router.post("/", protect, restrictTo("recruiter"), createJob);

export default router;