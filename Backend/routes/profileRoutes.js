import express from "express";

import {
  upsertProfile,
  getMyProfile,
  getProfileByUserId,
} from "../controllers/profileController.js";

import { authenticate } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// -------------------------
// Applicant Only Routes
// -------------------------

// Create or Update own profile
router.post(
  "/me",
  authenticate,
  authorizeRoles("applicant"),
  upload.single("cvFile"),
  upsertProfile
);

// Get own profile
router.get(
  "/me",
  authenticate,
  authorizeRoles("applicant"),
  getMyProfile
);

// -------------------------
// HR/Admin Access Routes
// -------------------------
router.get(
  "/user/:userId",
  authenticate,               // FIXED
  authorizeRoles("hr", "admin"),
  getProfileByUserId
);

export default router;
