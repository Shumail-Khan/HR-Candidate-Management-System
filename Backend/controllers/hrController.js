import User from "../models/User.js";
import Application from "../models/Application.js";
import Opportunity from "../models/Opportunity.js";
import ApplicantProfile from "../models/ApplicantProfile.js";

export const viewApplications = async (req, res) => {
  try {
    const hrId = req.user.id; // logged-in HR

    const applications = await Application.findAll({
      include: [
        {
          model: Opportunity,
          as: "opportunity",
          where: { createdBy: hrId }, // 👈 only opportunities made by this HR
          attributes: ["id", "title", "description"]
        },
        {
          model: User,
          as: "applicant",
          attributes: ["id", "email"],
          include: [
            {
              model: ApplicantProfile,
              attributes: ["fullName", "phone", "address", "cvFile"]
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ applications });
  } catch (err) {
    res.status(500).json({
      message: "Server error fetching applications",
      error: err.message
    });
  }
};


export const selectApplicant = async (req, res) => {
  try {
    const applicationId = req.params.id;

    const application = await Application.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = "selected";
    application.hrRemarks = req.body.hrRemarks || null;

    await application.save();

    res.json({ message: "Applicant selected successfully", application });
  } catch (err) {
    console.error("Select Applicant Error:", err);
    res.status(500).json({ message: "Server error selecting applicant" });
  }
};

export const rejectApplicant = async (req, res) => {
  try {
    const applicationId = req.params.id;

    const application = await Application.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = "rejected";
    application.hrRemarks = req.body.hrRemarks || null;

    await application.save();

    res.json({ message: "Applicant rejected successfully", application });
  } catch (err) {
    console.error("Reject Applicant Error:", err);
    res.status(500).json({ message: "Server error rejecting applicant" });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const hrId = req.user.id; // logged-in HR manager

    // Step 1: find all opportunities owned by this HR
    const myOpportunities = await Opportunity.findAll({
      where: { hrId },
      attributes: ["id", "title"]
    });

    const ids = myOpportunities.map(o => o.id);

    // Step 2: fetch applications linked to these opportunities
    const applications = await Application.findAll({
      where: { opportunityId: ids },
      include: [
        {
          model: User,
          as: "applicant",
          attributes: ["id", "name", "email"]
        },
        {
          model: Opportunity,
          attributes: ["id", "title"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    // Optional Step 3: group by status
    const grouped = {
      pending: applications.filter(a => a.status === "pending"),
      reviewing: applications.filter(a => a.status === "reviewing"),
      selected: applications.filter(a => a.status === "selected"),
      rejected: applications.filter(a => a.status === "rejected")
    };

    res.json({
      all: applications,
      grouped
    });

  } catch (err) {
    console.error("HR Dashboard Error:", err);
    res.status(500).json({ message: "Server error loading applications" });
  }
};


