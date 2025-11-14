import express from "express";
import { addHrManager, removeHrManager } from "../controllers/adminController.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";


const router = express.Router();

// Admin-only route to add HR manager
router.post("/add-hr", authenticate, authorizeRoles("admin"), addHrManager);
router.delete("/remove-hr/:id", authenticate, authorizeRoles("admin"), removeHrManager);

export default router;
