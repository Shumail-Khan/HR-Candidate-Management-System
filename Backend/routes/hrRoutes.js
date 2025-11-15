import express from "express";
import { rejectApplicant, selectApplicant, viewApplications } from "../controllers/hrController.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const router = express.Router();

// HR only route to view all applications
router.get("/applications", authenticate, authorizeRoles("hr"), viewApplications);
router.put("/applications/:id/select", authenticate, authorizeRoles("hr"), selectApplicant);
router.put("/applications/:id/reject", authenticate, authorizeRoles("hr"), rejectApplicant);
router.get("/applications", authenticate, authorizeRoles("hr"), getMyApplication);


export default router;