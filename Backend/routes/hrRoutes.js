import express from "express";
import { getMyApplications, rejectApplicant, selectApplicant, viewApplications } from "../controllers/hrController.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";
import { createOpportunity_HR, getOpportunities_HR } from "../controllers/opportunityController.js";

const router = express.Router();

// HR only route to view all applications
router.get("/applications", authenticate, authorizeRoles("hr"), viewApplications);
router.put("/applications/:id/select", authenticate, authorizeRoles("hr"), selectApplicant);
router.put("/applications/:id/reject", authenticate, authorizeRoles("hr"), rejectApplicant);
router.get("/applications", authenticate, authorizeRoles("hr"), getMyApplications);

// HR creates opportunity (auto assigned)
router.post(
    "/opportunity",
    authenticate,
    authorizeRoles("hr"),
    createOpportunity_HR
);

// HR sees only assigned opportunities
router.get(
    "/opportunities",
    authenticate,
    authorizeRoles("hr"),
    getOpportunities_HR
);


export default router;