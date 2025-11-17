import express from "express";
import { authenticate } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";
import {
    applyToOpportunity,
    getMyApplications,
    getOpenOpportunities
} from "../controllers/applicantController.js";

const router = express.Router();

// Only applicant role can access these
router.use(authenticate, authorizeRoles("applicant"));

// Get all open opportunities
router.get("/opportunities", getOpenOpportunities);

// Apply to opportunity
router.post("/apply", applyToOpportunity);

// Get my applications
router.get("/applications", getMyApplications);

export default router;
