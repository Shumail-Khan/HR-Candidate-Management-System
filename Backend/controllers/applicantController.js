import Application from "../models/Application.js";
import Opportunity from "../models/Opportunity.js";
import User from "../models/User.js";

// ----------------------------
// Apply to an opportunity
// ----------------------------
export const applyToOpportunity = async (req, res) => {
    try {
        const applicantId = req.user.id;
        const { opportunityId } = req.body;

        // Validate opportunity exists and is open
        const opportunity = await Opportunity.findOne({
            where: { id: opportunityId, status: "open", isDeleted: false }
        });

        if (!opportunity) {
            return res.status(404).json({ message: "Opportunity not found or closed" });
        }

        // Check if applicant already applied
        const existing = await Application.findOne({
            where: { applicantId, opportunityId }
        });
        if (existing) {
            return res.status(400).json({ message: "You have already applied to this opportunity" });
        }

        const application = await Application.create({
            applicantId,
            opportunityId
        });

        res.status(201).json({ message: "Application submitted", application });
    } catch (err) {
        console.error("Apply Error:", err.message);
        res.status(500).json({ message: "Server error applying to opportunity", error: err.message });
    }
};

// ----------------------------
// Get all applications of logged-in applicant
// ----------------------------
export const getMyApplications = async (req, res) => {
    try {
        const applicantId = req.user.id;

        const applications = await Application.findAll({
            where: { applicantId },
            include: [
                {
                    model: Opportunity,
                    as: "opportunity",
                    attributes: ["id", "title", "description", "location", "status"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.json(applications);
    } catch (err) {
        console.error("Get My Applications Error:", err);
        res.status(500).json({ message: "Server error fetching applications" });
    }
};

// ----------------------------
// Get all open opportunities
// ----------------------------
export const getOpenOpportunities = async (req, res) => {
    try {
        const opportunities = await Opportunity.findAll({
            where: { status: "open", isDeleted: false },
            include: [
                {
                    model: User,
                    as: "assignedHR",
                    attributes: ["id", "email", "role"]
                },
                {
                    model: User,
                    as: "creator",
                    attributes: ["id", "email", "role"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.json(opportunities);
    } catch (err) {
        console.error("Get Open Opportunities Error:", err);
        res.status(500).json({ message: "Server error fetching opportunities" });
    }
};
