import Opportunity from "../models/Opportunity.js";
import User from "../models/User.js";

// ==============================
// ADMIN: Create Opportunity + assign HR manually
// ==============================
export const createOpportunity_Admin = async (req, res) => {
  try {
    const { title, description, hrId } = req.body;

    // Validate HR exists
    const hrUser = await User.findByPk(hrId);
    if (!hrUser || hrUser.role !== "hr") {
      return res.status(400).json({ message: "Invalid HR ID" });
    }

    const opportunity = await Opportunity.create({
      title,
      description,
      createdBy: req.user.id,   // admin who created
      assignedTo: hrId,
    });

    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// HR: Create Opportunity (auto-assigned to HR)
// ==============================
export const createOpportunity_HR = async (req, res) => {
  try {
    const { title, description } = req.body;

    const opportunity = await Opportunity.create({
      title,
      description,
      createdBy: req.user.id,   // HR who created
      assignedTo: req.user.id,  // auto assigned
    });

    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// ADMIN: Get all opportunities
// ==============================
export const getOpportunities_Admin = async (req, res) => {
  try {
    const list = await Opportunity.findAll({
      where: { isDeleted: false },
      include: [
        { model: User, as: "creator", attributes: ["id", "name", "role"] },
        { model: User, as: "assignedHR", attributes: ["id", "name", "role"] }
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// HR: Get only MY assigned opportunities
// ==============================
export const getOpportunities_HR = async (req, res) => {
  try {
    const list = await Opportunity.findAll({
      where: { assignedTo: req.user.id, isDeleted: false },
      order: [["createdAt", "DESC"]],
    });

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Soft delete Opportunity
// ==============================
export const deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;

    const opportunity = await Opportunity.findByPk(id);
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    opportunity.isDeleted = true;
    await opportunity.save();

    res.json({ message: "Opportunity deleted (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};