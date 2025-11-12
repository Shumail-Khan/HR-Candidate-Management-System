import express from "express";
import { getCandidates, addCandidate, syncOfflineCandidates } from "../controllers/candidateController.js";

const router = express.Router();

router.get("/", getCandidates);
router.post("/", addCandidate);
router.post("/sync", syncOfflineCandidates);

export default router;
