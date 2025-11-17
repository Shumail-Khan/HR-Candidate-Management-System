import express from "express";
import { addHrManager, getAllHR_Admin, removeHrManager } from "../controllers/adminController.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";
import { createOpportunity_Admin, deleteOpportunity, getOpportunities_Admin } from "../controllers/opportunityController.js";


const router = express.Router();

// Admin-only route to add HR manager
router.post("/add-hr", authenticate, authorizeRoles("admin"), addHrManager);
router.delete("/remove-hr/:id", authenticate, authorizeRoles("admin"), removeHrManager);

// Admin creates opportunity + assigns HR
router.post(
    "/opportunity",
    authenticate,
    authorizeRoles("admin"),
    createOpportunity_Admin
);

// Admin gets all opportunities
router.get(
    "/opportunities",
    authenticate,
    authorizeRoles("admin"),
    getOpportunities_Admin
);

// Soft delete
router.delete(
    "/opportunity/:id",
    authenticate,
    authorizeRoles("admin"),
    deleteOpportunity
);

router.get(
    "/get-hr",
    authenticate,
    authorizeRoles("admin"),
    getAllHR_Admin
);


export default router;
