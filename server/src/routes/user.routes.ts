import { Router } from "express";
import protect from "../middleware/auth.middleware.js";
import { getMyProfile } from "../controllers/user.controller.js";
import restrictTo from "../middleware/role.middleware.js";

const router = Router();

router.get("/me", protect, getMyProfile);

router.get(
  "/recruiter-dashboard",
  protect,
  restrictTo("recruiter"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome, recruiter!",
    });
  }
);

export default router;