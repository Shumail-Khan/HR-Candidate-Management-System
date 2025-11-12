import Candidate from "../models/Candidate.js";

// Get candidates for a user
export const getCandidates = async (req, res) => {
    const { userId } = req.query;
    try {
        const candidates = await Candidate.findAll({ where: { userId }, order: [["id", "DESC"]] });
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add candidate
export const addCandidate = async (req, res) => {
    const { name, position, status, userId } = req.body;
    try {
        const candidate = await Candidate.create({ name, position, status, userId });
        res.json(candidate);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Sync offline candidates
export const syncOfflineCandidates = async (req, res) => {
    const candidates = req.body;
    try {
        for (const c of candidates) {
            await Candidate.create(c);
        }
        res.json({ message: "Offline candidates synced successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
